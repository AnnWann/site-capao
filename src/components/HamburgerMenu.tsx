import { useState } from 'react';
import { type JSX } from 'react';
import LanguageToggle from './LanguageToggle';
import NavLinks from './NavLinks';
import { type Locale, translate } from '../contexts/LocaleContext';
import type { SectionId } from '../util/navigation';



type Props = {
  locale: Locale;
  onNavigate: (id: SectionId) => void;
  onLocaleChange: (l: Locale) => void;
  className?: string;
};

export default function HamburgerMenu({ locale, onNavigate, onLocaleChange, className }: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={className ?? 'md:hidden'}>
        <button aria-label="Menu" aria-controls="mobile-menu" aria-expanded={open} onClick={() => setOpen((s) => !s)} className="p-2 rounded-md bg-white/10">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/50" onClick={() => setOpen(false)}>
          <div className="absolute right-4 top-16 bg-white/95 text-neutral-900 rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 px-2">
              <div className="text-sm font-semibold">{translate(locale,'label.language')}</div>
              <div>
                <LanguageToggle value={locale} onChange={onLocaleChange} compact />
              </div>
            </div>
            <div className="h-px bg-neutral-200 my-2" />
            <NavLinks locale={locale} onNavigate={(id) => { setOpen(false); onNavigate(id); }} closeMenu={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
