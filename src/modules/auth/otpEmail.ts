export interface OtpEmailData {
  name: string;
  code: string;
  expiresInMinutes: number;
  ipAddress?: string | null;
  requestedAt: Date;
}

const BRAND = '#1a5266';
const ORG = 'Loren D. Stark Company';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  });
}

export function buildOtpEmail(data: OtpEmailData): { subject: string; html: string; text: string } {
  const name = escapeHtml(data.name);
  const requested = formatDate(data.requestedAt);
  const ip = data.ipAddress ? escapeHtml(data.ipAddress) : null;
  const subject = `${data.code} is your ${ORG} admin verification code`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your admin sign-in code expires in ${data.expiresInMinutes} minutes.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f4f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e1e6e9;">

          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND};padding:28px 36px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:26px;color:#ffffff;font-weight:bold;">${ORG}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#bcd3db;padding-top:4px;">Admin Sign-in</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 8px 36px;">
              <h1 style="margin:0 0 12px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;color:#1f2a30;font-weight:bold;">Your verification code</h1>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;color:#3d4a50;">
                Hi ${name}, use the code below to finish signing in to the admin panel.
              </p>
            </td>
          </tr>

          <!-- Code -->
          <tr>
            <td align="center" style="padding:24px 36px;">
              <div style="display:inline-block;background-color:#f6f8f9;border:1px solid #e1e6e9;border-radius:8px;padding:18px 32px;font-family:'Courier New',Courier,monospace;font-size:34px;line-height:40px;letter-spacing:10px;font-weight:bold;color:${BRAND};">${data.code}</div>
              <p style="margin:14px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:#5b6a71;">
                This code expires in <strong>${data.expiresInMinutes} minutes</strong> and can only be used once.
              </p>
            </td>
          </tr>

          <!-- Security note -->
          <tr>
            <td style="padding:8px 36px 32px 36px;">
              <div style="background-color:#fff8e6;border-left:4px solid #e0a800;border-radius:4px;padding:14px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#5a4a1a;">
                Didn't try to sign in? Someone may know your password. Do not share this code, and change your password or contact an administrator.
              </div>
              <p style="margin:16px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#8a979d;">
                Requested ${requested}${ip ? ` from IP ${ip}` : ''}.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f6f8f9;border-top:1px solid #e6ebee;padding:20px 36px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#8a979d;">
                This is an automated security email from the ${ORG} website. ${ORG} staff will never ask you for this code.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `${ORG} — Admin sign-in`,
    '',
    `Hi ${data.name},`,
    '',
    `Your verification code is: ${data.code}`,
    `It expires in ${data.expiresInMinutes} minutes and can only be used once.`,
    '',
    `Requested ${requested}${data.ipAddress ? ` from IP ${data.ipAddress}` : ''}.`,
    '',
    "Didn't try to sign in? Someone may know your password. Do not share this code, and change your password or contact an administrator.",
  ].join('\n');

  return { subject, html, text };
}
