import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { sendMail } from '../../core/mailer';
import { verifyTurnstileToken } from '../../core/turnstile';
import { ContactSubmission, SiteSetting } from '../../db/models';
import { HttpError } from '../../middleware/errorHandler';
import { buildContactEmail } from './notificationEmail';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/',
  contactLimiter,
  body('name').isString().trim().notEmpty(),
  body('company').optional({ values: 'falsy' }).isString().trim(),
  body('email').isEmail(),
  body('phone').optional({ values: 'falsy' }).isString().trim(),
  body('message').isString().trim().notEmpty(),
  body('turnstileToken').isString().notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Invalid contact form payload', errors.array());

      const { name, company, email, phone, message, turnstileToken } = req.body;

      const captchaOk = await verifyTurnstileToken(turnstileToken, process.env.TURNSTILE_CONTACT_SECRET_KEY, req.ip);
      if (!captchaOk) throw new HttpError(400, 'CAPTCHA verification failed. Please try again.');

      const submission = await ContactSubmission.create({ name, company, email, phone, message });
      res.status(201).json({ data: { id: submission.id } });

      // Notify the site's contact inbox. Runs after the response so SMTP
      // latency or failure never affects the visitor — the submission is
      // already saved and visible in the admin panel either way.
      void notifyContactInbox(submission);
    } catch (err) {
      next(err);
    }
  }
);

async function notifyContactInbox(submission: ContactSubmission): Promise<void> {
  try {
    const settings = await SiteSetting.findOne({ order: [['id', 'ASC']] });
    const to = settings?.email;
    if (!to) {
      console.warn(`[contact] site_settings.email is empty — skipping notification for submission #${submission.id}`);
      return;
    }

    const { subject, html, text } = buildContactEmail({
      id: submission.id,
      name: submission.name,
      company: submission.company,
      email: submission.email,
      phone: submission.phone,
      message: submission.message,
      submittedAt: submission.createdAt ?? new Date(),
      companyName: settings.legalName,
    });

    await sendMail({ to, replyTo: { name: submission.name, address: submission.email }, subject, html, text });
  } catch (err) {
    console.error(`[contact] failed to send notification for submission #${submission.id}`, err);
  }
}

export default router;
