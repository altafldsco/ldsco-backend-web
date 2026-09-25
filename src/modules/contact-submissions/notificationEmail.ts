export interface ContactEmailData {
  id: number;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  message: string;
  submittedAt: Date;
  companyName?: string | null;
}

const BRAND = '#1a5266';

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

function detailRow(label: string, valueHtml: string, last = false): string {
  const border = last ? '' : 'border-bottom:1px solid #e6ebee;';
  return `
    <tr>
      <td style="padding:14px 0;${border}width:120px;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7a82;">${label}</td>
      <td style="padding:14px 0;${border}vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1f2a30;">${valueHtml}</td>
    </tr>`;
}

export function buildContactEmail(data: ContactEmailData): { subject: string; html: string; text: string } {
  const org = data.companyName || 'Loren D. Stark Company';
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const company = data.company ? escapeHtml(data.company) : '';
  const phone = data.phone ? escapeHtml(data.phone) : '';
  const message = escapeHtml(data.message).replace(/\r?\n/g, '<br>');
  const submitted = formatDate(data.submittedAt);
  const muted = '<span style="color:#9aa7ad;">Not provided</span>';

  const subject = `New contact inquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`;

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
    ${name} sent a message through the website contact form.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f4f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e1e6e9;">

          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND};padding:28px 36px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:26px;color:#ffffff;font-weight:bold;">${escapeHtml(org)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#bcd3db;padding-top:4px;">Website Contact Form</div>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:32px 36px 8px 36px;">
              <h1 style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:28px;color:#1f2a30;font-weight:bold;">New inquiry received</h1>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#5b6a71;">
                Submitted ${submitted} &middot; Reference #${data.id}
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:16px 36px 8px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${detailRow('Name', `<strong>${name}</strong>`)}
                ${detailRow('Company', company || muted)}
                ${detailRow('Email', `<a href="mailto:${email}" style="color:${BRAND};text-decoration:none;">${email}</a>`)}
                ${detailRow('Phone', phone ? `<a href="tel:${phone.replace(/[^\d+]/g, '')}" style="color:${BRAND};text-decoration:none;">${phone}</a>` : muted, true)}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:16px 36px 8px 36px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7a82;padding-bottom:10px;">Message</div>
              <div style="background-color:#f6f8f9;border-left:4px solid ${BRAND};border-radius:4px;padding:18px 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:23px;color:#1f2a30;">${message}</div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 36px 32px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:6px;background-color:${BRAND};">
                    <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your inquiry to ${org}`)}" style="display:inline-block;padding:12px 26px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">Reply to ${name}</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:#7a888e;">
                You can also reply directly to this email &mdash; it will go to the sender.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f6f8f9;border-top:1px solid #e6ebee;padding:20px 36px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#8a979d;">
                This notification was generated automatically from the ${escapeHtml(org)} website. The submission is also saved in the admin panel under Contact Submissions.
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
    `New inquiry received — ${org} website contact form`,
    `Submitted: ${submitted}`,
    `Reference: #${data.id}`,
    '',
    `Name:    ${data.name}`,
    `Company: ${data.company || 'Not provided'}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone || 'Not provided'}`,
    '',
    'Message:',
    data.message,
    '',
    '—',
    'Reply to this email to respond directly to the sender.',
  ].join('\n');

  return { subject, html, text };
}
