import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runImport } from './importWorker';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    await runImport();
    res.status(200).json({ ok: true, message: 'import run' });
  } catch (err: any) {
    console.error('cron import error', err);
    res.status(500).json({ ok: false, error: String(err) });
  }
}
