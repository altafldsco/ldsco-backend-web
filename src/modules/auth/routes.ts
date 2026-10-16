import crypto from 'crypto';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import { User, Role, Permission, LoginOtp } from '../../db/models';
import { HttpError } from '../../middleware/errorHandler';
import { authenticate } from '../../middleware/authenticate';
import { verifyTurnstileToken } from '../../core/turnstile';
import { sendMail } from '../../core/mailer';
import { buildOtpEmail } from './otpEmail';

const router = Router();

const OTP_TTL_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 5;
const OTP_MAX_RESENDS = 5;
const OTP_RESEND_COOLDOWN_SECONDS = 60;

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a few minutes and try again.' },
});

function generateCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
}

/** HMAC keyed by the server secret and bound to the challenge, so a leaked DB row can't be brute-forced offline. */
function hashCode(challengeId: string, code: string): string {
  return crypto
    .createHmac('sha256', process.env.JWT_SECRET as string)
    .update(`${challengeId}:${code}`)
    .digest('hex');
}

function codeMatches(storedHash: string, candidateHash: string): boolean {
  const a = Buffer.from(storedHash, 'hex');
  const b = Buffer.from(candidateHash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  const visible = local.length <= 2 ? local[0] : local.slice(0, 2);
  return `${visible}${'•'.repeat(Math.max(1, local.length - visible.length))}@${domain}`;
}

async function findActiveChallenge(challengeId: string) {
  const otp = await LoginOtp.findOne({
    where: { challengeId, consumedAt: null, expiresAt: { [Op.gt]: new Date() } },
  });
  if (!otp) throw new HttpError(410, 'Your verification code has expired. Please sign in again.');
  return otp;
}

async function sendOtpEmail(user: any, code: string, ip?: string) {
  const { subject, html, text } = buildOtpEmail({
    name: user.name,
    code,
    expiresInMinutes: OTP_TTL_MINUTES,
    ipAddress: ip,
    requestedAt: new Date(),
  });
  await sendMail({ to: user.email, subject, html, text });
}

function signToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '12h',
  });
}

function serializeUser(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    role: {
      id: user.role.id,
      name: user.role.name,
      slug: user.role.slug,
      isSuperAdmin: user.role.isSuperAdmin,
    },
    permissions: (user.role.permissions || []).map((p: any) => `${p.resource}:${p.action}`),
  };
}

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isString().notEmpty(),
  body('turnstileToken').isString().notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Invalid credentials payload', errors.array());

      const { email, password, turnstileToken } = req.body;

      const captchaOk = await verifyTurnstileToken(turnstileToken, process.env.TURNSTILE_SECRET_KEY, req.ip);
      if (!captchaOk) throw new HttpError(400, 'CAPTCHA verification failed. Please try again.');

      const user = await User.findOne({
        where: { email },
        include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }],
      });

      if (!user || !user.isActive || !(await user.verifyPassword(password))) {
        throw new HttpError(401, 'Invalid email or password');
      }

      // Password is correct — the JWT is only issued after the emailed code is verified.
      const challengeId = crypto.randomBytes(32).toString('hex');
      const code = generateCode();
      const now = new Date();
      const otp = await LoginOtp.create({
        challengeId,
        userId: user.id,
        codeHash: hashCode(challengeId, code),
        expiresAt: new Date(now.getTime() + OTP_TTL_MINUTES * 60 * 1000),
        lastSentAt: now,
        ipAddress: req.ip ?? null,
      });

      try {
        await sendOtpEmail(user, code, req.ip);
      } catch (err) {
        await otp.destroy();
        console.error(`[auth] failed to send login OTP to user #${user.id}`, err);
        throw new HttpError(503, 'We could not send your verification code. Please try again shortly.');
      }

      res.json({
        otpRequired: true,
        challengeId,
        email: maskEmail(user.email),
        expiresInSeconds: OTP_TTL_MINUTES * 60,
        resendAfterSeconds: OTP_RESEND_COOLDOWN_SECONDS,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login/verify',
  otpLimiter,
  body('challengeId').isString().isLength({ min: 64, max: 64 }),
  body('code').isString().trim().matches(/^\d{6}$/),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Enter the 6-digit code from your email.');

      const { challengeId } = req.body;
      const code = String(req.body.code).trim();

      const otp = await findActiveChallenge(challengeId);
      if (otp.attempts >= OTP_MAX_ATTEMPTS) {
        throw new HttpError(429, 'Too many incorrect attempts. Please sign in again.');
      }

      if (!codeMatches(otp.codeHash, hashCode(challengeId, code))) {
        const remaining = OTP_MAX_ATTEMPTS - (otp.attempts + 1);
        await otp.increment('attempts');
        if (remaining <= 0) throw new HttpError(429, 'Too many incorrect attempts. Please sign in again.');
        throw new HttpError(401, `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`);
      }

      // Mark consumed atomically so the same code can't be replayed by a parallel request.
      const [updated] = await LoginOtp.update(
        { consumedAt: new Date() },
        { where: { id: otp.id, consumedAt: null } }
      );
      if (updated === 0) throw new HttpError(410, 'This code has already been used. Please sign in again.');

      const user = await User.findByPk(otp.userId, {
        include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }],
      });
      if (!user || !user.isActive) throw new HttpError(401, 'Invalid email or password');

      await user.update({ lastLoginAt: new Date() });

      const token = signToken(user.id);
      res.json({ token, user: serializeUser(user) });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login/resend',
  otpLimiter,
  body('challengeId').isString().isLength({ min: 64, max: 64 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Invalid request');

      const otp = await findActiveChallenge(req.body.challengeId);
      if (otp.attempts >= OTP_MAX_ATTEMPTS) {
        throw new HttpError(429, 'Too many incorrect attempts. Please sign in again.');
      }
      if (otp.resendCount >= OTP_MAX_RESENDS) {
        throw new HttpError(429, 'Too many codes requested. Please sign in again.');
      }

      const waitSeconds = Math.ceil(
        (new Date(otp.lastSentAt).getTime() + OTP_RESEND_COOLDOWN_SECONDS * 1000 - Date.now()) / 1000
      );
      if (waitSeconds > 0) throw new HttpError(429, `Please wait ${waitSeconds}s before requesting a new code.`);

      const user = await User.findByPk(otp.userId);
      if (!user || !user.isActive) throw new HttpError(401, 'Invalid email or password');

      // A new code replaces the old one and gets a fresh expiry and attempt budget.
      const code = generateCode();
      const now = new Date();
      await otp.update({
        codeHash: hashCode(otp.challengeId, code),
        expiresAt: new Date(now.getTime() + OTP_TTL_MINUTES * 60 * 1000),
        lastSentAt: now,
        attempts: 0,
        resendCount: otp.resendCount + 1,
      });

      try {
        await sendOtpEmail(user, code, req.ip);
      } catch (err) {
        console.error(`[auth] failed to resend login OTP to user #${user.id}`, err);
        throw new HttpError(503, 'We could not send your verification code. Please try again shortly.');
      }

      res.json({
        expiresInSeconds: OTP_TTL_MINUTES * 60,
        resendAfterSeconds: OTP_RESEND_COOLDOWN_SECONDS,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user!.id, {
      include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }],
    });
    if (!user) throw new HttpError(404, 'User not found');
    res.json({ data: serializeUser(user) });
  } catch (err) {
    next(err);
  }
});

export default router;
