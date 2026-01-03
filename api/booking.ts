import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

type Locale = 'pt-BR' | 'en-US' | 'es-ES';

type Localized = Record<Locale, string>;

type BookingMode = 'full' | 'doubleFront' | 'doubleBack' | 'ensuite';

export type BookingListing = {
  mode: BookingMode;
  imageUrl?: string;
  price?: string;
  minStay?: number;
  airbnbUrl?: string;
  bookingUrl?: string;
  title?: Localized;
  includes?: Localized;
  ideal?: Localized;
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function normalizePrivateKey(key: string): string {
  return key.replace(/\\n/g, '\n');
}

function extractDriveFileId(input: string): string | null {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed) && !trimmed.startsWith('http')) return trimmed;
  const m1 = trimmed.match(/\/file\/d\/([^/]+)/);
  if (m1?.[1]) return m1[1];
  const m2 = trimmed.match(/[?&]id=([^&]+)/);
  if (m2?.[1]) return m2[1];
  return null;
}

function normalizeImageUrl(value: string): string {
  const v = (value ?? '').trim();
  if (!v) return '';
  if (v.startsWith('http') && !v.includes('drive.google.com')) return v;
  const fileId = extractDriveFileId(v);
  if (!fileId) return v;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
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

function toLocalized(row: Record<string, string>, prefix: string): Localized | undefined {
  const pt = get(row, `${prefix}_pt_br`);
  const en = get(row, `${prefix}_en_us`);
  const es = get(row, `${prefix}_es_es`);
  if (!pt && !en && !es) return undefined;
  return {
    'pt-BR': pt,
    'en-US': en,
    'es-ES': es,
  };
}

function rowToListing(row: Record<string, string>): BookingListing {
  const mode = parseMode(get(row, 'mode'));
  const imageRaw = get(row, 'image');
  const imageUrl = imageRaw ? normalizeImageUrl(imageRaw) : undefined;

  return {
    mode,
    imageUrl,
    price: get(row, 'price') || undefined,
    minStay: parseMinStay(get(row, 'min_stay')),
    airbnbUrl: get(row, 'airbnb_url') || undefined,
    bookingUrl: get(row, 'booking_url') || undefined,
    title: toLocalized(row, 'title'),
    includes: toLocalized(row, 'includes'),
    ideal: toLocalized(row, 'ideal'),
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
    res.status(500).json({ error: message });
  }
}
