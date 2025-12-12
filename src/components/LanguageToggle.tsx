import { type JSX, useEffect, useRef, useState } from 'react';

type Locale = 'pt-BR' | 'en-US' | 'es-ES';

export default function LanguageToggle({
  value,
  onChange,
  compact = false,
}: {
  value?: Locale;
  onChange?: (locale: Locale) => void;
  compact?: boolean;
}): JSX.Element {
  const defaultLocale = ((): Locale => {
    try {
      const stored = window.localStorage.getItem('locale');
      if (stored === 'pt-BR' || stored === 'en-US' || stored === 'es-ES') return stored;
      const nav = navigator.language || 'en-US';
      return nav.toLowerCase().startsWith('pt') ? 'pt-BR' :  nav.toLowerCase().startsWith('es') ? 'es-ES' : 'en-US';
    } catch {
      return 'en-US';
    }
  })();

  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(value ?? defaultLocale);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) setLocale(value);
  }, [value]);

  useEffect(() => {
    try {
      window.localStorage.setItem('locale', locale);
    } catch {}
    onChange?.(locale);
  }, [locale]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const options: { key: Locale; label: string; flag: string }[] = [
    { key: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' },
    { key: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { key: 'es-ES', label: 'Español (ES)', flag: '🇪🇸' },
  ];

  const btnClass = compact
    ? 'inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 text-neutral-900 text-sm'
    : 'inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/90 text-neutral-900';

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={btnClass}
      >
        <span className="text-lg leading-none">{options.find((o) => o.key === locale)?.flag}</span>
        {!compact && <span className="text-sm">{locale === 'pt-BR' ? 'PT‑BR' : 'EN‑US'}</span>}
        <svg className="w-4 h-4 opacity-70" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-36 bg-white/95 text-neutral-900 rounded-md shadow-lg ring-1 ring-black/5 p-1 flex flex-col gap-1"
        >
          {options.map((opt) => (
            <button
              key={opt.key}
              role="menuitem"
              onClick={() => {
                setLocale(opt.key);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm hover:bg-neutral-100 ${locale === opt.key ? 'font-semibold' : ''}`}
            >
              <span className="text-lg">{opt.flag}</span>
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
