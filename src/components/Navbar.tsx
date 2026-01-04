import { type JSX, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import HamburgerMenu from './HamburgerMenu';
import NavLinks from './NavLinks';
import { type Locale, useLocale } from '../contexts/LocaleContext';
import type { SectionId } from '../util/navigation';

type Props = {
  locale: Locale;
  currentSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onLocaleChange: (l: Locale) => void;
  mobileTitle?: string;
};

export default function Navbar({ locale, currentSection, onNavigate, onLocaleChange, mobileTitle }: Props): JSX.Element {
  const { t } = useLocale();
  const [, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handler = (ev: MediaQueryListEvent) => setIsMobile(ev.matches);
    try {
      mq.addEventListener('change', handler);
    } catch {
      // fallback
      // @ts-ignore
      mq.addListener(handler);
    }
    return () => {
      try { mq.removeEventListener('change', handler); } catch { try { /* @ts-ignore */ mq.removeListener(handler); } catch {} }
    };
  }, []);
  return (
    <nav
      aria-hidden={currentSection === 'home'}
      className={`fixed top-0 left-0 w-full py-4 z-50 flex items-center justify-between px-4 ${currentSection !== 'home' ? 'bg-green-800 text-white shadow-md' : 'bg-transparent text-white pointer-events-none select-none opacity-0'}`}>
      <div className="flex items-center gap-6">
        <Link to={{ pathname: '/', hash: '#home' }} className="text-lg font-bold">
          Pousada Espaço Gaia
        </Link>
      </div>

      {/* Mobile: show section title to the left of the hamburger, within the right-side group */}

      

      {/* Right-side area: desktop links or mobile compact group (title + hamburger) */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-8 items-center">
          <NavLinks locale={locale} onNavigate={onNavigate} />
          <Link
            to="/voluntary"
            className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold transition-colors"
          >
            {t('cta.volunteer')}
          </Link>
          {currentSection !== 'home' && (
            <div className="ml-4">
              <LanguageToggle value={locale} onChange={onLocaleChange} compact />
            </div>
          )}
        </div>

        <div className="flex items-center md:hidden gap-2">
          {currentSection !== 'home' && (
            <div className="text-sm font-medium text-white/95 max-w-[60vw] truncate text-right">{mobileTitle ?? t(`nav.${currentSection}`)}</div>
          )}
          <HamburgerMenu locale={locale} onNavigate={onNavigate} onLocaleChange={onLocaleChange} />
        </div>
      </div>
    </nav>
  );
}
