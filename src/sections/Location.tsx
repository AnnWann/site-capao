import { type JSX } from 'react';
import { useLocale } from '../contexts/LocaleContext';

export default function Location(): JSX.Element {
  const { t } = useLocale();
  return (
    <section id="location" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-neutral-100">
      <div className="max-w-4xl w-full mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-4 hidden sm:block">{t('nav.location')}</h2>

        <div className="w-full bg-white p-4 rounded-2xl shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=-12.6159711,-41.5037977&z=17&output=embed"
            className="w-full h-64 md:h-96 rounded-xl border-0 mx-auto block"
            loading="lazy"
            title="Mapa - Localização"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
