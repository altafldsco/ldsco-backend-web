const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verifies a Cloudflare Turnstile response token server-side. Each widget on
 * the site (Login, Contact form, ...) has its own site key/secret key pair,
 * so the caller passes the secret for the specific widget being checked
 * (e.g. process.env.TURNSTILE_SECRET_KEY for Login, TURNSTILE_CONTACT_SECRET_KEY
 * for the Contact form) rather than this module assuming a single global one.
 */
export async function verifyTurnstileToken(token: string, secret: string | undefined, remoteIp?: string): Promise<boolean> {
  if (!secret) {
    console.error('[turnstile] secret key is not set — refusing to verify.');
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body });
    const json = (await res.json()) as { success: boolean };
    return json.success === true;
  } catch (err) {
    console.error('[turnstile] verification request failed', err);
    return false;
  }
}
