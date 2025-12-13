import type { VercelRequest, VercelResponse } from '@vercel/node';
import supabaseAdmin from '../../src/util/supabaseClient.js';
import { generateICS } from '../../src/util/ical.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // fetch confirmed bookings
    const today = new Date().toISOString().slice(0,10);
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select('id, start_date, end_date, source, source_id, ical_uid')
      .gte('end_date', today)
      .eq('status', 'confirmed');

    if (error) {
      console.error('supabase error', error);
      res.status(500).send('db error');
      return;
    }

    const bookings = (data || []).map((b: any) => ({
      id: b.id,
      start_date: b.start_date,
      end_date: b.end_date,
      source: b.source,
      source_id: b.source_id,
      ical_uid: b.ical_uid,
    }));

    const ics = generateICS(bookings);
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Cache-Control', 'max-age=30');
    res.status(200).send(ics);
  } catch (err) {
    console.error(err);
    res.status(500).send('internal error');
  }
}
