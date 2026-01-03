export type Locale = 'pt-BR' | 'en-US' | 'es-ES';

export type Localized = Record<Locale, string>;

export type VoluntaryOpportunity = {
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

export async function fetchVoluntaryOpportunities(signal?: AbortSignal): Promise<VoluntaryOpportunity[]> {
  const forceSample = (() => {
    try {
      if (typeof window === 'undefined') return false;
      return new URLSearchParams(window.location.search).get('sample') === '1';
    } catch {
      return false;
    }
  })();

  const isLocalhost = (() => {
    try {
      if (typeof window === 'undefined') return false;
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    } catch {
      return false;
    }
  })();

  if (forceSample) return SAMPLE_ITEMS;

  const tryFetch = async (url: string) => {
    const res = await fetch(url, { method: 'GET', signal });
    if (!res.ok) throw new Error(`Failed to load opportunities (${res.status})`);
    const ct = (res.headers.get('content-type') ?? '').toLowerCase();
    if (!ct.includes('application/json')) throw new Error('Non-JSON response from API');
    const data = (await res.json()) as { items?: VoluntaryOpportunity[] };
    return Array.isArray(data.items) ? data.items : [];
  };

  try {
    return await tryFetch('/api/voluntary');
  } catch (err) {
    // In Vite dev, /api/* is not executed as Vercel serverless.
    // Fall back to a local sample so the UI can be previewed.
    if (import.meta.env.DEV || isLocalhost) return SAMPLE_ITEMS;
    throw err;
  }
}
