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

## Google Sheets schemas

Both `/api/voluntary` and `/api/booking` read **one tab each** from the same spreadsheet (`GOOGLE_SHEET_ID`).

Important rules:

- The **first row must be a header row** with the exact column names below.
- Columns can be in **any order** (mapping is by header name).
- Ranges should include the header row (defaults already do).
- Image cells can be either:
  - a normal image URL, or
  - a Google Drive *file id*, or
  - a Google Drive share URL (`.../file/d/<id>...` or `...?id=<id>`)

### Tab: `voluntary` (default range: `voluntary!A1:Z`)

Used by: `/api/voluntary`

Required columns:

- `id` (string, unique)
- `worldpackers_url` (string, required)

Optional columns:

- `order` (number; used for sorting; defaults to `0`)
- `image` (string; URL or Drive id/link)
- `title_pt_br`, `title_en_us`, `title_es_es` (strings)
- `desc_pt_br`, `desc_en_us`, `desc_es_es` (strings)

Notes:

- If `order` is missing/invalid, the item sorts as `0`.
- `title_*` / `desc_*` are not validated by the API, but if they are empty you’ll get empty strings in the UI.

### Tab: `booking` (default range: `booking!A1:Z`)

Used by: `/api/booking`

Required columns:

- `mode` (string; must be one of: `full`, `doubleFront`, `doubleBack`, `ensuite`)

Optional columns:

- `price` (string)
- `min_stay` (number)
- `airbnb_url` (string)
- `booking_url` (string)

Notes:

- If `min_stay` is missing/invalid, it’s omitted from the API response.
- If you have multiple rows with the same `mode`, the last one read wins.

UI defaults:

- `title`, `image`, `includes`, and `ideal` are always taken from the site defaults/translations (not from the sheet).
