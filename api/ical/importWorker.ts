// Simple import worker for OTA iCal feeds.
// Intended to run as a scheduled job (GitHub Actions cron or serverless scheduled function).
import supabaseAdmin from '../../src/util/supabaseClient.js';

// Use global `fetch` (Node 18+ / Vercel). If not available, the script will fail
// locally — prefer running with Node 18+ or via a CI runner that provides fetch.
const fetchFn: typeof fetch = (globalThis as any).fetch;
import { parseICS } from '../../src/util/ical.js';
import { pathToFileURL } from 'node:url';

const FEEDS = (process.env.ICAL_FEEDS || '').split(',').map(s => s.trim()).filter(Boolean);

async function fetchFeed(url: string) {
  if (!fetchFn) throw new Error('global fetch not available; run on Node 18+ or use Vercel/GH Actions');
  const res = await fetchFn(url);
  if (!res.ok) throw new Error(`bad feed ${url} ${res.status}`);
  return res.text();
}

async function upsertEvent(uid: string, dtstart: string, dtend: string, source: string, raw: string) {
  // store uid in ical_feed_items to avoid duplicate processing
  const { data: existing } = await supabaseAdmin
    .from('ical_feed_items')
    .select('id')
    .eq('uid', uid)
    .maybeSingle();

  if (existing) return false; // already processed

  // create tentative booking if no overlap exists
  const { data: overlap } = await supabaseAdmin
    .from('bookings')
    .select('id')
    .or(`and(start_date.gte.${dtstart},start_date.lt.${dtend}),and(end_date.gt.${dtstart},end_date.lte.${dtend})`)
    .limit(1);

  // If overlap exists, still store the event mapping to avoid repeated attempts
  await supabaseAdmin.from('ical_feed_items').insert([{ uid, source, raw: { dtstart, dtend, raw } }]);

  if (overlap && overlap.length) {
    // conflict — skip creating booking but log
    return false;
  }

  const { data: b, error } = await supabaseAdmin.from('bookings').insert([{
    start_date: dtstart,
    end_date: dtend,
    status: 'confirmed',
    source,
    ical_uid: uid,
  }]).select('*').single();

  if (error) {
    console.error('booking insert error', error);
    return false;
  }

  return true;
}

export async function runImport() {
  if (!FEEDS.length) {
    console.log('No ICAL_FEEDS configured');
    return;
  }

  for (const url of FEEDS) {
    try {
      console.log('fetch', url);
      const text = await fetchFeed(url);
      const items = parseICS(text);
      for (const it of items) {
        await upsertEvent(it.uid, it.dtstart, it.dtend, url, it.raw || '');
      }
    } catch (err: any) {
      console.error('feed error', url, err.message || err);
    }
  }
}

// if called directly (node), run once (ESM-safe)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runImport().then(() => console.log('done')).catch(e => { console.error(e); process.exit(1); });
}
