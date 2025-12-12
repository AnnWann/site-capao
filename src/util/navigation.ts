export const sectionOrder = ['home', 'rooms', 'amenities', 'attractions', 'gallery', 'booking', 'location'] as const;
export type SectionId = typeof sectionOrder[number];

export function setHash(id: string): void {
  try {
    window.location.hash = `#${id}`;
  } catch {
    // ignore
  }
}

export function getInitialLocale(): string {
  try {
    const stored = window.localStorage.getItem('locale');
    if (stored === 'pt-BR' || stored === 'en-US' || stored === 'es-ES') return stored;
    const nav = navigator.language || 'en-US';
    return nav.toLowerCase().startsWith('pt') ? 'pt-BR' : nav.toLowerCase().startsWith('es') ? 'es-ES' : 'en-US';
  } catch {
    return 'en-US';
  }
}
