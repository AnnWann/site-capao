-- Supabase prototype schema for calendar bookings
-- Enable required extension
create extension if not exists pgcrypto;

-- bookings table: stores confirmed and tentative bookings
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  start_date date not null,
  end_date date not null,
  status varchar(20) not null default 'tentative', -- tentative|confirmed|cancelled
  source varchar(50), -- e.g., 'airbnb'|'booking.com'|'website'
  source_id text, -- OTA booking id
  ical_uid text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists bookings_dates_idx on bookings (start_date, end_date);

-- locks table: short reservation holds to avoid races
create table if not exists locks (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- store raw iCal items or mapping
create table if not exists ical_feed_items (
  id uuid primary key default gen_random_uuid(),
  uid text unique,
  source varchar(50),
  raw jsonb,
  created_at timestamptz default now()
);
