// Minimal iCal generator and simple parser for the prototype

type Booking = {
  id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  source?: string;
  source_id?: string;
  ical_uid?: string;
};

function fmtDateYYYYMMDD(dateStr: string) {
  // return basic DTSTART/DTEND in YYYYMMDD format
  return dateStr.replace(/-/g, '');
}

export function generateICS(bookings: Booking[], opts?: {prodId?: string}) {
  const prodId = opts?.prodId || '-//site-capao//Supabase Prototype//EN';
  const lines: string[] = [];
  lines.push('BEGIN:VCALENDAR');
  lines.push('VERSION:2.0');
  lines.push(`PRODID:${prodId}`);

  bookings.forEach((b) => {
    const uid = b.ical_uid || b.id;
    const dtstart = fmtDateYYYYMMDD(b.start_date);
    const dtend = fmtDateYYYYMMDD(b.end_date);
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`);
    lines.push(`DTSTART;VALUE=DATE:${dtstart}`);
    lines.push(`DTEND;VALUE=DATE:${dtend}`);
    lines.push(`SUMMARY:Booked (${b.source || 'unknown'})`);
    if (b.source && b.source_id) lines.push(`DESCRIPTION:source=${b.source};id=${b.source_id}`);
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

// Very small parser: extracts VEVENTs {uid, dtstart, dtend}
export function parseICS(ics: string) {
  const items: Array<{uid: string; dtstart: string; dtend: string; raw?: string}> = [];
  const vevents = ics.split(/BEGIN:VEVENT/i).slice(1);
  vevents.forEach((chunk) => {
    const raw = chunk.split('END:VEVENT')[0];
    const uidMatch = raw.match(/UID:(.+)/i);
    const dtstartMatch = raw.match(/DTSTART(?:;[^:]*)?:([0-9T]+)(?:Z)?/i);
    const dtendMatch = raw.match(/DTEND(?:;[^:]*)?:([0-9T]+)(?:Z)?/i);
    if (uidMatch && dtstartMatch) {
      const uid = uidMatch[1].trim();
      const dtstart = dtstartMatch[1].trim();
      const dtend = dtendMatch ? dtendMatch[1].trim() : dtstart;
      // Convert basic YYYYMMDD to YYYY-MM-DD if needed
      const fmt = (d: string) => (d.length === 8 ? `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}` : d);
      items.push({uid, dtstart: fmt(dtstart), dtend: fmt(dtend), raw});
    }
  });
  return items;
}

export type { Booking };
