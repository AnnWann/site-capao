import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';
import { isPrivateKeyDecodeError, normalizePrivateKey } from './util.js';

type Locale = 'pt-BR' | 'en-US' | 'es-ES';

type Localized = Record<Locale, string>;

type VoluntaryOpportunity = {
  id: string;
  order: number;
  imageUrl: string;
  title: Localized;
  description: Localized;
  worldpackersUrl: string;
};

const SAMPLE_ITEMS: VoluntaryOpportunity[] = [
  {
    id: 'capao-host-001',
    order: 1,
    imageUrl: '',
    title: {
      'pt-BR': 'Ajuda na horta e manutenção',
      'en-US': 'Help with garden and maintenance',
      'es-ES': 'Ayuda en el huerto y mantenimiento',
    },
    description: {
      'pt-BR': 'Apoio na horta, pequenos reparos, organização de ferramentas e cuidado do espaço.',
      'en-US': 'Support in the garden, small repairs, tool organization, and general space care.',
      'es-ES': 'Apoyo en el huerto, pequeñas reparaciones, organización de herramientas y cuidado general del espacio.',
    },
    worldpackersUrl: 'https://www.worldpackers.com/positions/12345',
  },
];

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function extractDriveFileId(input: string): string | null {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return null;

  // Raw file id
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed) && !trimmed.startsWith('http')) return trimmed;

  // Common patterns
  const m1 = trimmed.match(/\/file\/d\/([^/]+)/);
  if (m1?.[1]) return m1[1];

  const m2 = trimmed.match(/[?&]id=([^&]+)/);
  if (m2?.[1]) return m2[1];

  return null;
}

function normalizeImageUrl(value: string): string {
  const v = (value ?? '').trim();
  if (!v) return '';

  // If it's already a normal URL and not a Drive share link, keep it
  if (v.startsWith('http') && !v.includes('drive.google.com')) return v;

  const fileId = extractDriveFileId(v);
  if (!fileId) return v; // best-effort

  // Direct-ish rendering URL; requires the file to be shared publicly
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

function parseOrder(v: string | undefined): number {
  const n = Number((v ?? '').trim());
  return Number.isFinite(n) ? n : 0;
}

function get(row: Record<string, string>, key: string): string {
  return (row[key] ?? '').trim();
}

function rowToOpportunity(row: Record<string, string>): VoluntaryOpportunity {
  const id = get(row, 'id');
  if (!id) throw new Error('Row missing required field: id');

  const worldpackersUrl = get(row, 'worldpackers_url');
  if (!worldpackersUrl) throw new Error(`Row ${id} missing required field: worldpackers_url`);

  const imageUrl = normalizeImageUrl(get(row, 'image'));

  const title: Localized = {
    'pt-BR': get(row, 'title_pt_br'),
    'en-US': get(row, 'title_en_us'),
    'es-ES': get(row, 'title_es_es'),
  };

  const description: Localized = {
    'pt-BR': get(row, 'desc_pt_br'),
    'en-US': get(row, 'desc_en_us'),
    'es-ES': get(row, 'desc_es_es'),
  };

  return {
    id,
    order: parseOrder(get(row, 'order')),
    imageUrl,
    title,
    description,
    worldpackersUrl,
  };
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const sampleParam = req.query.sample;
  const useSample = sampleParam === '1' || (Array.isArray(sampleParam) && sampleParam.includes('1'));
  if (useSample) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json({ items: SAMPLE_ITEMS });
    return;
  }

  try {
    const sheetId = requireEnv('GOOGLE_SHEET_ID');
    const range = process.env.GOOGLE_SHEET_RANGE || 'voluntary!A1:Z';

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

    const items = rawRows
      .map(rowToOpportunity)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ items });
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
