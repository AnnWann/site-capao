import { type JSX, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VoluntaryCard from '../components/VoluntaryCard';
import Footer from '../components/Footer';
import { useLocale, type Locale } from '../contexts/LocaleContext';
import type { SectionId } from '../util/navigation';
import { fetchVoluntaryOpportunities, type VoluntaryOpportunity } from '../util/voluntary';

type Props = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

export default function VoluntaryPage({ locale, setLocale }: Props): JSX.Element {
  const { t } = useLocale();
  const navigate = useNavigate();

  const [items, setItems] = useState<VoluntaryOpportunity[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigateToSection = (id: SectionId) => {
    navigate({ pathname: '/', hash: `#${id}` });
  };

  useEffect(() => {
    const ctrl = new AbortController();
    setItems(null);
    setError(null);
    fetchVoluntaryOpportunities(ctrl.signal)
      .then((data) => {
        // Treat "successful but empty" as an error (same UX as a failed API call).
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No opportunities returned from API');
        }else{
        setItems(data);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'));
    return () => ctrl.abort();
  }, []);

  const cards = useMemo(() => items ?? [], [items]);

  const pick = (v: Record<string, string>) => {
    return (v[locale] ?? v['pt-BR'] ?? v['en-US'] ?? v['es-ES'] ?? '').trim();
  };

  const appMode = String((import.meta as any).env?.VITE_MODE ?? (import.meta as any).env?.MODE ?? '').toUpperCase();
  const isDev = appMode === 'DEV';

  const isNotFound = (msg: string | null) => (msg ?? '').includes('404');

  return (
    <div className="min-h-screen w-full bg-neutral-100 text-neutral-900">
      <Navbar
        locale={locale}
        currentSection="rooms"
        onNavigate={navigateToSection}
        onLocaleChange={setLocale}
        mobileTitle={t('nav.voluntary')}
      />

      <main className="pt-24 px-6 py-12 pb-28">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">{t('nav.voluntary')}</h1>

          <p className="text-neutral-700 text-center">{t('voluntary.body')}</p>

          <div className="mt-10">
            {error && (
              <div
                className={`bg-white rounded-2xl shadow-lg p-4 text-center ${isDev ? 'text-red-700' : 'text-neutral-700'}`}
              >
                {isDev ? (
                  <>
                    {t('voluntary.error')}: {error}
                    {isNotFound(error) ? <div className="mt-1 text-red-700/90">{t('voluntary.contactError')}</div> : null}
                  </>
                ) : (
                  <>
                    {t('voluntary.contactError')}
                  </>
                )}
              </div>
            )}

            {!error && items === null && (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-neutral-700">
                {t('voluntary.loading')}
              </div>
            )}

            {!error && items && items.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-neutral-700">
                {t('voluntary.empty')}
              </div>
            )}

            {!error && items && items.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {cards.map((it) => (
                  <VoluntaryCard
                    key={it.id}
                    imageUrl={it.imageUrl}
                    imageAlt={pick(it.title)}
                    title={pick(it.title)}
                    description={pick(it.description)}
                    ctaLabel={t('voluntary.cta')}
                    href={it.worldpackersUrl}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
