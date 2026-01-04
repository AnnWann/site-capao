export type Locale = 'pt-BR' | 'en-US' | 'es-ES';
export type BookingMode = 'full' | 'doubleFront' | 'doubleBack' | 'ensuite';
export type Localized = Record<Locale, string>;

export type BookingListingOverride = {
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

export type BookingOverridesResponse = {
  listings: Partial<Record<BookingMode, BookingListingOverride>>;
};

export type BookingOverridesResult = {
  listings: Partial<Record<BookingMode, BookingListingOverride>>;
  source: 'api' | 'sample' | 'empty';
  error?: string;
};

const SAMPLE: BookingOverridesResponse = {
  listings: {
    full: {
      mode: 'full',
      price: 'R$ 900',
      minStay: 2,
      airbnbUrl: 'https://www.airbnb.com.br/rooms/11793301',
      bookingUrl: 'https://www.booking.com/',
    },
  },
};

function isLocalhost(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

export async function fetchBookingOverrides(signal?: AbortSignal): Promise<BookingOverridesResponse> {
  const res = await fetch('/api/booking', { method: 'GET', signal });
  if (!res.ok) throw new Error(`Failed to load booking overrides (${res.status})`);
  const ct = (res.headers.get('content-type') ?? '').toLowerCase();
  if (!ct.includes('application/json')) throw new Error('Non-JSON response from API');

  const raw = (await res.json()) as unknown;
  const listings = (raw as any)?.listings;

  if (!listings || typeof listings !== 'object' || Array.isArray(listings)) {
    throw new Error('Invalid booking overrides payload');
  }

  // Empty payload should behave like a fetch failure (same error path / fallbacks).
  if (Object.keys(listings).length === 0) {
    throw new Error('Empty booking overrides');
  }

  return { listings } as BookingOverridesResponse;
}

export async function getBookingOverrides(signal?: AbortSignal): Promise<BookingOverridesResult> {
  try {
    const data = await fetchBookingOverrides(signal);
    return { listings: data.listings ?? {}, source: 'api' };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error';
    if (import.meta.env.DEV || isLocalhost()) return { listings: SAMPLE.listings, source: 'sample', error: msg };
    return { listings: {}, source: 'empty', error: msg };
  }
}

export function pickLocalized(locale: Locale, value?: Localized): string | undefined {
  if (!value) return undefined;
  return (value[locale] ?? value['pt-BR'] ?? value['en-US'] ?? value['es-ES'] ?? '').trim() || undefined;
}
