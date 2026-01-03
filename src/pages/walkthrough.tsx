import { type JSX, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageToggle from '../components/LanguageToggle';
import { useLocale, type Locale } from '../contexts/LocaleContext';
import { useRouteTransition } from '../contexts/RouteTransitionContext';
import Walkthrough from '../sections/Walkthrough';

type Props = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

export default function WalkthroughPage({ locale, setLocale }: Props): JSX.Element {
  const { t } = useLocale();
  const HERO_IMG = '/fotos/Portao.avif';
  const transition = useRouteTransition();

  useEffect(() => {
    transition.fadeOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_IMG}')` }} />
      <div className="absolute inset-0 bg-black/45" />

      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="px-4 py-2 rounded-full bg-white/90 text-emerald-800 font-semibold shadow-md hover:bg-white transition-colors"
        >
          {t('walkthrough.back')}
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle value={locale} onChange={setLocale} compact />
      </div>

      <main className="relative pt-24 pb-10">
        <Walkthrough />
      </main>
    </div>
  );
}
