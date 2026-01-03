import { type JSX } from 'react';
import { useLocale } from '../contexts/LocaleContext';

export default function Voluntary(): JSX.Element {
  const { t } = useLocale();

  return (
    <section id="voluntary" className="min-h-screen w-full flex items-center justify-center bg-neutral-100">
      <div className="max-w-3xl w-full mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-4">{t('nav.voluntary')}</h2>
        <p className="text-neutral-700 text-center">{t('voluntary.body')}</p>
      </div>
    </section>
  );
}
