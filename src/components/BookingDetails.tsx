import { type JSX, useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';

export type BookingDetailsProps = {
  title?: string;
  image: string;
  includes: string;
  ideal: string;
  price: string;
  minStay: number;
  airbnbUrl: string;
  bookingUrl?: string;
};

export default function BookingDetails({
  title,
  image,
  includes,
  ideal,
  price,
  minStay,
  airbnbUrl,
  bookingUrl,
}: BookingDetailsProps): JSX.Element {
  const { t } = useLocale();
  const showBooking = Boolean(bookingUrl);
    const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center gap-6 items-stretch h-full sm:h-80">
      <div className="hidden sm:flex sm:w-1/2 justify-center items-center overflow-hidden sm:h-full">
        <img
          src={image}
          alt={title ?? 'Listing'}
          className="block rounded-lg shadow-md h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="sm:w-1/2 text-left flex flex-col justify-between gap-3 px-2 flex-1 min-h-0">
        <div className="overflow-auto">
          <h3 className="text-xl font-semibold">{title ?? 'Listing'}</h3>
          <p className="text-sm text-gray-600">{includes}</p>

            <ul className="text-sm mt-2 space-y-1 hidden sm:block">
              <li><strong>{t('listing.label.includes')}</strong> {includes}</li>
              <li><strong>{t('listing.label.ideal')}</strong> {ideal}</li>
              <li><strong>{t('listing.label.price')}</strong> {price}</li>
              <li><strong>{t('listing.label.minStay')}</strong> {minStay > 1 ? `${minStay} ${t('listing.label.nights.plural')}` : `${minStay} ${t('listing.label.nights.singular')}`}</li>
            </ul>
            <div className="sm:hidden mt-3">
              <button
                onClick={() => setShowModal(true)}
                className="text-sm text-green-700 font-medium underline"
                aria-expanded={showModal}
              >
                {t('label.moreDetails')}
              </button>
            </div>
        </div>

        <div className="mt-2">
          <div className="text-sm font-medium mb-2">{t('booking.bookOn')}</div>

          <div className="flex flex-wrap sm:flex-row sm:flex-nowrap sm:items-center gap-3">
            <a
              href={airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-3 py-2 min-w-[90px] sm:min-w-0 sm:w-auto h-9 items-center justify-center bg-green-700 text-white rounded-md text-sm font-semibold shadow whitespace-nowrap leading-none"
            >
              {t('platform.airbnb')}
            </a>

            {showBooking && (
              <>
                <div className="flex items-center justify-center px-2 text-sm text-gray-600">{t('label.or')}</div>

                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-3 py-2 min-w-[90px] sm:min-w-0 sm:w-auto h-9 items-center justify-center border border-gray-300 rounded-md text-sm font-semibold shadow text-gray-800 whitespace-nowrap leading-none"
                >
                  {t('platform.booking')}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
        {/* Mobile details modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-4 text-left">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold">{title}</h4>
                <button onClick={() => setShowModal(false)} className="text-gray-500 ml-2">Close</button>
              </div>
              <div className="mt-3 text-sm space-y-2">
                {image && (
                  <div className="w-full">
                    <img
                      src={image}
                      alt={title ?? 'Listing'}
                      className="w-full h-44 object-cover rounded-md shadow-sm"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="pt-2"><strong>{t('listing.label.includes')}</strong> {includes}</div>
                <div><strong>{t('listing.label.ideal')}</strong> {ideal}</div>
                <div><strong>{t('listing.label.price')}</strong> {price}</div>
                <div><strong>{t('listing.label.minStay')}</strong> {minStay > 1 ? `${minStay} ${t('listing.label.nights.plural')}` : `${minStay} ${t('listing.label.nights.singular')}`}</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
