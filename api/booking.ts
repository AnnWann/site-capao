import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';
import { isPrivateKeyDecodeError, normalizePrivateKey } from './util';

type BookingMode = 'full' | 'doubleFront' | 'doubleBack' | 'ensuite';

export type BookingListing = {
  mode: BookingMode;
  price?: string;
  minStay?: number;
  airbnbUrl?: string;
  bookingUrl?: string;
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function rowsFromValues(values: unknown[][]): Record<string, string>[] {
  if (!values?.length) return [];
  const header = (values[0] ?? []).map((h) => String(h ?? '').trim());
  const rows = values.slice(1);

  return rows
    .filter((r) => (r ?? []).some((c) => String(c ?? '').trim() !== ''))
    .map((r) => {
      const rec: Record<string, string> = {};
      header.forEach((key, idx) => {
        if (!key) return;
        rec[key] = String((r ?? [])[idx] ?? '').trim();
      });
      return rec;
    });
}

function get(row: Record<string, string>, key: string): string {
  return (row[key] ?? '').trim();
}

function parseMode(v: string): BookingMode {
  if (v === 'full' || v === 'doubleFront' || v === 'doubleBack' || v === 'ensuite') return v;
  throw new Error(`Invalid mode: ${v}`);
}

function parseMinStay(v: string): number | undefined {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function rowToListing(row: Record<string, string>): BookingListing {
  const mode = parseMode(get(row, 'mode'));
  return {
    mode,
    price: get(row, 'price') || undefined,
    minStay: parseMinStay(get(row, 'min_stay')),
    airbnbUrl: get(row, 'airbnb_url') || undefined,
    bookingUrl: get(row, 'booking_url') || undefined,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const sheetId = requireEnv('GOOGLE_SHEET_ID');
    const range = process.env.GOOGLE_BOOKING_RANGE || 'booking!A1:Z';

    const clientEmail = requireEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    const privateKey = normalizePrivateKey(requireEnv('GOOGLE_PRIVATE_KEY'));

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const resp = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
      valueRenderOption: 'FORMATTED_VALUE',
    });

    const values = (resp.data.values ?? []) as unknown[][];
    const rawRows = rowsFromValues(values);

    const listings: Partial<Record<BookingMode, BookingListing>> = {};
    for (const row of rawRows) {
      const item = rowToListing(row);
      listings[item.mode] = item;
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ listings });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (isPrivateKeyDecodeError(message)) {
      res.status(500).json({
        error:
          'Could not decode GOOGLE_PRIVATE_KEY. Make sure it is the PEM private key from the Google service account JSON (it should contain BEGIN/END PRIVATE KEY) and that in Vercel it is stored with literal \\n sequences (no surrounding quotes).',
        details: message,
      });
      return;
    }
    res.status(500).json({ error: message });
  }
}
