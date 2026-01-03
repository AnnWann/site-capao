import { type JSX, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
      .then((data) => setItems(data))
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'));
    return () => ctrl.abort();
  }, []);

  const cards = useMemo(() => items ?? [], [items]);

  const pick = (v: Record<string, string>) => {
    return (v[locale] ?? v['pt-BR'] ?? v['en-US'] ?? v['es-ES'] ?? '').trim();
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 text-neutral-900">
      <Navbar
        locale={locale}
        currentSection="rooms"
        onNavigate={navigateToSection}
        onLocaleChange={setLocale}
        mobileTitle={t('nav.voluntary')}
      />

      <main className="pt-24 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">{t('nav.voluntary')}</h1>

          <p className="text-neutral-700 text-center">{t('voluntary.body')}</p>

          <div className="mt-10">
            {error && (
              <div className="bg-white rounded-2xl shadow-lg p-4 text-center text-red-700">
                {t('voluntary.error')}: {error}
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
                  <div key={it.id} className="bg-white rounded-2xl shadow-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Image */}
                      <div className="shrink-0">
                        {it.imageUrl ? (
                          <img
                            src={it.imageUrl}
                            alt={pick(it.title)}
                            className="w-full sm:w-32 h-28 sm:h-24 object-cover rounded-xl"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full sm:w-32 h-28 sm:h-24 rounded-xl bg-neutral-200" />
                        )}
                      </div>

                      {/* Title + description */}
                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold text-neutral-900">{pick(it.title)}</div>
                        <div className="text-sm text-neutral-700 mt-1">{pick(it.description)}</div>
                      </div>

                      {/* Button */}
                      <div className="shrink-0">
                        <a
                          href={it.worldpackersUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex justify-center w-full sm:w-auto px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                        >
                          {t('voluntary.cta')}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
