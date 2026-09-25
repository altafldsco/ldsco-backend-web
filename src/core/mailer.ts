import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

let transporter: Transporter | null = null;

/**
 * Lazily builds a single shared SMTP transport from the SMTP_* env vars.
 * Returns null (and logs) when the config is incomplete so callers can skip
 * sending instead of crashing the request.
 */
function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('[mailer] SMTP_HOST / SMTP_USER / SMTP_PASS not set — email disabled.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export function defaultFrom(): string | undefined {
  const { SMTP_FROM_EMAIL, SMTP_FROM_NAME } = process.env;
  if (!SMTP_FROM_EMAIL) return undefined;
  return SMTP_FROM_NAME ? `"${SMTP_FROM_NAME.replace(/"/g, '')}" <${SMTP_FROM_EMAIL}>` : SMTP_FROM_EMAIL;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  const t = getTransporter();
  if (!t) throw new Error('SMTP transport is not configured');
  await t.sendMail({ from: defaultFrom(), ...options });
}
