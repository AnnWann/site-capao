Supabase Prototype — iCal-based channel sync

Overview
- Source of truth: `bookings` table in Supabase.
- Export: Vercel serverless endpoint `/api/ical/export` returns a calendar (.ics) of confirmed bookings.
- Import: scheduled worker polls OTA iCal feeds (environment var `ICAL_FEEDS`) and upserts non-duplicate events.

Quick setup
1. Create a Supabase project.
2. Run `db/schema.sql` in the SQL editor to create tables.
3. Add environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY` (or `SUPABASE_KEY` for server use)
   - `ICAL_FEEDS` (comma-separated OTA iCal URLs to poll)

Endpoints & scripts
- `/api/ical/export` — returns confirmed bookings as an ICS (used as your site iCal feed).
- `api/ical/importWorker.ts` — a small node script you can run periodically (GitHub Actions cron or Vercel scheduled functions) to import OTA feeds.

Notes & limitations
- This prototype uses simple iCal parsing and naive overlap checks. It reduces double-booking risk but does not eliminate race conditions.
- Use short reservation holds for website-based bookings: create a tentative booking and expire it if not paid/confirmed.
- For production reliability, add:
  - idempotent upserts by OTA booking id
  - more robust timezone handling
  - notifications/alerts on conflicts
  - tests and monitoring

Next steps (I can implement):
- Wire a GitHub Action to run `node api/ical/importWorker.js` on a cron schedule.
- Add a website endpoint to create tentative bookings and expose a Stripe Checkout flow to confirm.
- Add an admin UI to view/imported events and resolve conflicts.
