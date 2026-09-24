import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { ContactSubmission } from '../../db/models';
import { HttpError } from '../../middleware/errorHandler';
import { verifyTurnstileToken } from '../../core/turnstile';

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
    } catch (err) {
      next(err);
    }
  }
);

export default router;
