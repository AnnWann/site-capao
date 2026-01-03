# Environment variables

This project has two "kinds" of environment variables:

1) **Client-side (Vite)**: variables prefixed with `VITE_` are available in the browser.
2) **Server-side (Vercel Functions)**: variables used by `/api/*` functions (never exposed to the browser).

Use [.env.example](../.env.example) as the source of truth.

## Client (Vite)

- `VITE_MODE`
  - If set to `DEV`, the Voluntary page shows sample cards locally.
  - In production, it should be unset (or anything other than `DEV`).

## Server (Vercel Functions)

These are required for the Google Sheets integration:

- `GOOGLE_SHEET_ID`
  - The spreadsheet ID from the Google Sheets URL.

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - The service account email.
  - You must share the spreadsheet with this email (Viewer is enough).

- `GOOGLE_PRIVATE_KEY`
  - Private key for the service account.
  - In Vercel, it is common to store multiline keys using literal `\n` sequences.

Optional ranges (defaults are shown):

- `GOOGLE_SHEET_RANGE` (default: `voluntary!A1:Z`)
- `GOOGLE_BOOKING_RANGE` (default: `booking!A1:Z`)
