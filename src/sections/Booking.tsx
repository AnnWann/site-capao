import { type JSX, useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import BookingDetails from '../components/BookingDetails';
import ModeSwitcher from '../components/ModeSwitcher';

type BookingMode = 'full' | 'doubleFront' | 'doubleBack' | 'ensuite';

// Read listing URLs from Vite env vars at build time. Set these in Vercel as
// `VITE_AIRBNB_FULL`, `VITE_BOOKING_FULL`, `VITE_AIRBNB_BEDROOM`.
// const env = (import.meta as any).env || {};
// const LISTINGS: Record<BookingMode, {
//   title: string;
//   image: string;
//   includes: string;
//   ideal: string;
//   price: string;
//   minStay: string;
//   airbnbUrl: string;
//   bookingUrl?: string;
// }> = {
//   full: {
//     title: 'Full house',
//     image: env.VITE_FULL_IMAGE || '/fotos/CasaCompleta3.avif',
//     includes: env.VITE_FULL_INCLUDES || 'Entire house, kitchen, 3 bedrooms, 2 bathrooms, outdoor area',
//     ideal: env.VITE_FULL_IDEAL || 'Families or groups looking for the whole house',
//     price: env.VITE_FULL_PRICE || 'R$ 900',
//     minStay: env.VITE_FULL_MIN || '2 nights',
//     airbnbUrl: env.VITE_AIRBNB_FULL || 'https://www.airbnb.com.br/rooms/11793301',
//     bookingUrl: env.VITE_BOOKING_FULL || 'https://www.booking.com/',
//   },
//   doubleFront: {
//     title: 'Double Bedroom (front)',
//     image: env.VITE_DOUBLE_FRONT_IMAGE || env.VITE_BEDROOM_IMAGE || '/fotos/Quarto1.avif',
//     includes: env.VITE_DOUBLE_FRONT_INCLUDES || env.VITE_BED_INCLUDES || 'Double bedroom, shared kitchen and bathroom',
//     ideal: env.VITE_DOUBLE_FRONT_IDEAL || env.VITE_BED_IDEAL || 'Couples or friends wanting a double room',
//     price: env.VITE_DOUBLE_FRONT_PRICE || env.VITE_BED_PRICE || 'R$ 150',
//     minStay: env.VITE_DOUBLE_FRONT_MIN || env.VITE_BED_MIN || '1 night',
//     airbnbUrl: env.VITE_AIRBNB_DOUBLE_FRONT || env.VITE_AIRBNB_BEDROOM || env.VITE_AIRBNB_FULL || 'https://www.airbnb.com.br/rooms/11793301',
//     bookingUrl: undefined,
//   },
//   doubleBack: {
//     title: 'Double Bedroom (back)',
//     image: env.VITE_DOUBLE_BACK_IMAGE || env.VITE_BEDROOM_IMAGE || '/fotos/Quarto2.avif',
//     includes: env.VITE_DOUBLE_BACK_INCLUDES || env.VITE_BED_INCLUDES || 'Double bedroom, shared kitchen and bathroom',
//     ideal: env.VITE_DOUBLE_BACK_IDEAL || env.VITE_BED_IDEAL || 'Couples or friends wanting a quieter room',
//     price: env.VITE_DOUBLE_BACK_PRICE || env.VITE_BED_PRICE || 'R$ 150',
//     minStay: env.VITE_DOUBLE_BACK_MIN || env.VITE_BED_MIN || '1 night',
//     airbnbUrl: env.VITE_AIRBNB_DOUBLE_BACK || env.VITE_AIRBNB_BEDROOM || env.VITE_AIRBNB_FULL || 'https://www.airbnb.com.br/rooms/11793301',
//     bookingUrl: undefined,
//   },
//   ensuite: {
//     title: 'En-Suite',
//     image: env.VITE_ENSUITE_IMAGE || env.VITE_BEDROOM_IMAGE || '/fotos/Suite.avif',
//     includes: env.VITE_ENSUITE_INCLUDES || 'Private bedroom with en-suite bathroom',
//     ideal: env.VITE_ENSUITE_IDEAL || 'Travelers who want private bathroom access',
//     price: env.VITE_ENSUITE_PRICE || 'R$ 250',
//     minStay: env.VITE_ENSUITE_MIN || '1 night',
//     airbnbUrl: env.VITE_AIRBNB_ENSUITE || env.VITE_AIRBNB_BEDROOM || env.VITE_AIRBNB_FULL || 'https://www.airbnb.com.br/rooms/11793301',
//     bookingUrl: undefined,
//   },
// };

export default function Booking(): JSX.Element {
  const { t } = useLocale();
  const [mode, setMode] = useState<BookingMode>('full');

  // Build listings here so we can use translations from `t()` as default sentences
  const LISTINGS = {
    full: {
      title: t('listing.full.title'),
      image: '/fotos/CasaCompleta3.avif',
      includes: t('listing.full.includes'),
      ideal: t('listing.full.ideal'),
      price: 'R$ 900',
      minStay: 2,
      airbnbUrl: 'https://www.airbnb.com.br/rooms/11793301',
      bookingUrl: 'https://www.booking.com/',
    },
    doubleFront: {
      title: t('listing.doubleFront.title'),
      image: '/fotos/Quarto1.avif',
      includes: t('listing.doubleFront.includes'),
      ideal: t('listing.doubleFront.ideal'),
      price: 'R$ 150',
      minStay: 1,
      airbnbUrl: 'https://www.airbnb.com.br/rooms/11793301',
      bookingUrl: undefined,
    },
    doubleBack: {
      title: t('listing.doubleBack.title'),
      image: '/fotos/Quarto2.avif',
      includes: t('listing.doubleBack.includes'),
      ideal: t('listing.doubleBack.ideal'),
      price: 'R$ 150',
      minStay: 1,
      airbnbUrl: 'https://www.airbnb.com.br/rooms/11793301',
      bookingUrl: undefined,
    },
    ensuite: {
      title: t('listing.ensuite.title'),
      image: '/fotos/Suite.avif',
      includes: t('listing.ensuite.includes'),
      ideal: t('listing.ensuite.ideal'),
      price: 'R$ 250',
      minStay: 1,
      airbnbUrl: 'https://www.airbnb.com.br/rooms/11793301',
      bookingUrl: undefined,
    },
  } as const;

  return (
    <section id="booking" className="w-full flex flex-col items-center justify-center min-h-screen relative px-6 pt-24 pb-10 sm:pt-12 bg-neutral-100">
      <h2 className="hidden sm:block text-3xl font-bold text-center mb-6 w-full max-w-2xl">{t('nav.booking')}</h2>

      <div className="bg-white rounded-2xl shadow-lg p-8 pb-16 text-center max-w-2xl w-full overflow-hidden relative flex flex-col h-full min-h-[360px] sm:min-h-0 max-h-[calc(100vh-6.5rem)]">

        <ModeSwitcher
          modes={[
            { key: 'full', label: LISTINGS.full.title },
            { key: 'doubleFront', label: LISTINGS.doubleFront.title },
            { key: 'doubleBack', label: LISTINGS.doubleBack.title },
            { key: 'ensuite', label: LISTINGS.ensuite.title },
          ]}
          value={mode}
          onChange={(k) => setMode(k as BookingMode)}
        />

        {/** use LISTINGS to pick the right listing config for the selected mode */}
        <div className="flex-1 min-h-0">
          <BookingDetails
            {...LISTINGS[mode]}
            />
        </div>

        {/* Bottom-right note about where reservations are completed (inside card) */}
          <div className="absolute left-4 right-4 bottom-6 z-20">
            <div className="max-w-full text-xs text-gray-600 italic text-right pr-4">
              {t('booking.note')}
            </div>
          </div>
      </div>
    </section>
  );
}
