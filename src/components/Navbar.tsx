import { type JSX } from 'react';
import LanguageToggle from './LanguageToggle';
import NavLinks from './NavLinks';
import { type Locale } from '../contexts/LocaleContext';
import type { SectionId } from '../util/navigation';

type Props = {
  locale: Locale;
  currentSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onLocaleChange: (l: Locale) => void;
};

export default function Navbar({ locale, currentSection, onNavigate, onLocaleChange }: Props): JSX.Element {
  return (
    <nav
      aria-hidden={currentSection === 'home'}
      className={`fixed top-0 left-0 w-full py-4 z-50 flex items-center justify-between px-4 ${currentSection !== 'home' ? 'bg-green-800 text-white shadow-md' : 'bg-transparent text-white/0 pointer-events-none select-none'}`}>
      <div className="flex items-center gap-6">
        <div className="text-lg font-bold">Pousada Espaço Gaia</div>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex gap-8 items-center">
        <NavLinks locale={locale} onNavigate={onNavigate} />
        {currentSection !== 'home' && (
          <div className="ml-4">
            <LanguageToggle value={locale} onChange={onLocaleChange} compact />
          </div>
        )}
      </div>

      {/* placeholder to keep nav height stable on mobile */}
      <div className="md:hidden" />
    </nav>
  );
}
