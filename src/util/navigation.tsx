import type { JSX } from 'react';

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

// compute direction from one section to another: +1 = forward/down, -1 = backward/up
export function computeDirection(from: SectionId, to: SectionId): 1 | -1 {
  const before = sectionOrder.indexOf(from);
  const after = sectionOrder.indexOf(to);
  return after >= before ? 1 : -1;
}

// clamp next index given a direction
export function findNextIndex(current: SectionId, dir: 1 | -1): number {
  const idx = sectionOrder.indexOf(current);
  return Math.max(0, Math.min(sectionOrder.length - 1, idx + dir));
}

// Map a SectionId to its rendered component. Keep here for reuse and testability.
import Home from '../sections/Home';
import Rooms from '../sections/Rooms';
import Amenities from '../sections/Amenities';
import Attractions from '../sections/Attractions';
import Gallery from '../sections/Gallery';
import Booking from '../sections/Booking';
import Location from '../sections/Location';

export function getSectionComponent(id: SectionId): JSX.Element {
  switch (id) {
    case 'home':
      return <Home />;
    case 'rooms':
      return <Rooms />;
    case 'amenities':
      return <Amenities />;
    case 'attractions':
      return <Attractions />;
    case 'gallery':
      return <Gallery />;
    case 'booking':
      return <Booking />;
    case 'location':
      return <Location />;
    default:
      return <Home />;
  }
}
