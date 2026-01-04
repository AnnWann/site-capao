export function normalizePrivateKey(key: string): string {
  let v = (key ?? '').trim();

  // If someone pasted the full service-account JSON into the env var, extract the PEM.
  if (v.startsWith('{') && v.endsWith('}') && v.includes('"private_key"')) {
    try {
      const parsed = JSON.parse(v) as { private_key?: unknown };
      if (typeof parsed.private_key === 'string' && parsed.private_key.trim()) {
        v = parsed.private_key.trim();
      }
    } catch {
      // ignore JSON parse errors; fall back to normal handling
    }
  }

  // Strip accidental surrounding quotes.
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }

  // Normalize both literal escape sequences (\n) and actual newlines (CRLF/LF).
  const normalized = v
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .trim();

  // Guardrail: key must be a PEM private key.
  const beginOk = /^-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(normalized);
  const endOk = /-----END [A-Z ]*PRIVATE KEY-----\s*$/.test(normalized);
  if (!beginOk || !endOk) {
    throw new Error(
      'Invalid GOOGLE_PRIVATE_KEY format. Use the Google service account JSON field "private_key" (PEM). It must start with "-----BEGIN ...PRIVATE KEY-----" and end with "-----END ...PRIVATE KEY-----". In Vercel, store it as a single line with literal \\n sequences (recommended) and without surrounding quotes.'
    );
  }

  return normalized;
}

export function isPrivateKeyDecodeError(message: string): boolean {
  const m = (message ?? '').toLowerCase();
  return m.includes('decoder routines::unsupported') || m.includes('error:1e08010c');
}
