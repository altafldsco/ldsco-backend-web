import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User, Role, Permission } from '../../db/models';
import { HttpError } from '../../middleware/errorHandler';
import { authenticate } from '../../middleware/authenticate';
import { verifyTurnstileToken } from '../../core/turnstile';

const router = Router();

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

      await user.update({ lastLoginAt: new Date() });

      const token = signToken(user.id);
      res.json({ token, user: serializeUser(user) });
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
