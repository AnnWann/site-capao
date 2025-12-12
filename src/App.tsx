import { type JSX, useEffect, useRef, useState } from 'react';
import Home from './sections/Home';
import Rooms from './sections/Rooms';
import Amenities from './sections/Amenities';
import Attractions from './sections/Attractions';
import Gallery from './sections/Gallery';
import Booking from './sections/Booking';
import Location from './sections/Location';
import LanguageToggle from './components/LanguageToggle';
import NavLinks from './components/NavLinks';
import { LocaleContext, translate, type Locale } from './contexts/LocaleContext';

export default function App(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const isScrollingRef = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionOrder = ['home', 'rooms', 'amenities', 'attractions', 'gallery', 'booking', 'location'];

  const setHash = (id: string) => {
    try {
      window.location.hash = `#${id}`;
    } catch {
      // ignore
    }
  };

  const scrollToSection = (id: string) => {
    if (id === currentSection) return;
    const idxBefore = sectionOrder.indexOf(currentSection);
    const idxAfter = sectionOrder.indexOf(id);
    const dir = idxAfter > idxBefore ? 1 : -1;
    setLastDirection(dir);
    setPrevSection(currentSection);
    setCurrentSection(id);
    setHash(id);
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(() => {
      setPrevSection(null);
      
      transitionTimerRef.current = null;
    }, TRANSITION_MS);
  };

  useEffect(() => {
    // initialize from hash
    const h = (window.location.hash || '').replace('#', '');
    if (h && sectionOrder.includes(h)) setCurrentSection(h);

    const onHash = () => {
      const newHash = (window.location.hash || '').replace('#', '');
      if (newHash && sectionOrder.includes(newHash)) setCurrentSection(newHash);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // wheel navigation: change sections based on wheel
  useEffect(() => {
    let wheelTimer: number | null = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const idx = sectionOrder.indexOf(currentSection);
      const nextIdx = Math.max(0, Math.min(sectionOrder.length - 1, idx + dir));
      if (nextIdx !== idx) {
        const id = sectionOrder[nextIdx];
        scrollToSection(id);
      }
      if (wheelTimer) window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        isScrollingRef.current = false;
        wheelTimer = null;
      }, 250);
    };

    // attach to window for consistent behavior and simpler typing
    window.addEventListener('wheel', onWheel as EventListener, { passive: false });
    return () => window.removeEventListener('wheel', onWheel as EventListener);
  }, [currentSection]);

  // touch navigation: swipe up/down on mobile to change sections
  const touchStartYRef = useRef<number | null>(null);
  const touchMovedRef = useRef(false);
  const touchStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current || window;
    const THRESHOLD_PX = 60; // required px to consider a swipe

    const onTouchStart = (ev: Event) => {
      const tev = ev as TouchEvent;
      if (!tev.touches || tev.touches.length !== 1) return;
      touchStartYRef.current = tev.touches[0].clientY;
      touchStartTimeRef.current = Date.now();
      touchMovedRef.current = false;
    };

    const onTouchMove = (ev: Event) => {
      const tev = ev as TouchEvent;
      if (touchStartYRef.current == null) return;
      const y = tev.touches[0].clientY;
      const dy = y - touchStartYRef.current;
      if (Math.abs(dy) > 8) {
        touchMovedRef.current = true;
        // prevent the default subtle bounce/scroll on some devices
        tev.preventDefault();
      }
    };

    const onTouchEnd = (ev: Event) => {
      const tev = ev as TouchEvent;
      if (touchStartYRef.current == null) return;
      const touch = (tev.changedTouches && tev.changedTouches[0]) ? tev.changedTouches[0] : null;
      const endY = touch ? touch.clientY : null;
      if (endY == null) {
        touchStartYRef.current = null;
        return;
      }
      const dy = endY - touchStartYRef.current;

      // only act on an intentional swipe (enough distance)
      if (!isScrollingRef.current && touchMovedRef.current && Math.abs(dy) > THRESHOLD_PX) {
        isScrollingRef.current = true;
        const dir = dy < 0 ? 1 : -1; // dy<0 means user swiped up -> next section
        const idx = sectionOrder.indexOf(currentSection);
        const nextIdx = Math.max(0, Math.min(sectionOrder.length - 1, idx + dir));
        if (nextIdx !== idx) scrollToSection(sectionOrder[nextIdx]);

        // small debounce to avoid multiple triggers
        window.setTimeout(() => {
          isScrollingRef.current = false;
        }, 250);
      }

      touchStartYRef.current = null;
      touchMovedRef.current = false;
      touchStartTimeRef.current = null;
    };

    // attach
    el.addEventListener('touchstart', onTouchStart as EventListener, { passive: true } as AddEventListenerOptions);
    el.addEventListener('touchmove', onTouchMove as EventListener, { passive: false } as AddEventListenerOptions);
    el.addEventListener('touchend', onTouchEnd as EventListener, { passive: true } as AddEventListenerOptions);

    return () => {
      try {
        el.removeEventListener('touchstart', onTouchStart as EventListener);
        el.removeEventListener('touchmove', onTouchMove as EventListener);
        el.removeEventListener('touchend', onTouchEnd as EventListener);
      } catch {
        // ignore
      }
    };
  }, [currentSection]);

  // transition state
  const TRANSITION_MS = 700;
  const [prevSection, setPrevSection] = useState<string | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  // +1 = moving down (new page comes from bottom), -1 = moving up (new page comes from top)
  const [lastDirection, setLastDirection] = useState<number>(1);

  // render a section by id
  const renderSection = (id: string) => {
    switch (id) {
      case 'home':
        return <Home />;
      case 'rooms':
        return <Rooms />;
      case 'amenities':
        return <Amenities />;
      case 'attractions':
        return <Attractions />;
      case 'gallery':
        return <Gallery />;
      case 'booking':
        return <Booking />;
      case 'location':
        return <Location />;
      default:
        return <Home />;
    }
  };

  const idx = sectionOrder.indexOf(currentSection);
  const prev = idx > 0 ? sectionOrder[idx - 1] : '';
  const next = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : '';
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const stored = window.localStorage.getItem('locale');
      if (stored === 'pt-BR' || stored === 'en-US' || stored === 'es-ES') return stored as Locale;
      const nav = navigator.language || 'en-US';
      return nav.toLowerCase().startsWith('pt') ? 'pt-BR' :  nav.toLowerCase().startsWith('es') ? 'es-ES' : 'en-US';
    } catch {
      return 'en-US';
    }
  });

  // cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: (k: string) => translate(locale, k) }}>
      <div ref={containerRef} className="font-sans bg-neutral-100 text-neutral-900 h-screen w-screen overflow-hidden relative">
      <style>{`
        /* Reset and prevent small scrollbars caused by body/page gaps */
        html, body, #root { height: 100%; margin: 0; padding: 0; }
        body { overflow: hidden; }
        *, *::before, *::after { box-sizing: border-box; }

        /* Ensure sections strictly fit the container to avoid tiny overflows during transforms */
        .section { position: absolute; inset: 0; will-change: transform, opacity; width: 100%; height: 100%; }

        @keyframes slideInFromBottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideInFromTop { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes slideOutToTop { from { transform: translateY(0); } to { transform: translateY(-100%); } }
        @keyframes slideOutToBottom { from { transform: translateY(0); } to { transform: translateY(100%); } }

        .section.enter.from-bottom { animation: slideInFromBottom ${TRANSITION_MS}ms ease forwards; }
        .section.enter.from-top { animation: slideInFromTop ${TRANSITION_MS}ms ease forwards; }

        .section.leave.to-top { animation: slideOutToTop ${TRANSITION_MS}ms ease forwards; }
        .section.leave.to-bottom { animation: slideOutToBottom ${TRANSITION_MS}ms ease forwards; }

        /* Make iframes and images responsive and prevent them from causing overflow */
        iframe, img, video { max-width: 100%; display: block; }
      `}</style>

      {/* NAVBAR */}
      <nav
        aria-hidden={currentSection === 'home'}
        className={`fixed top-0 left-0 w-full py-4 z-50 flex items-center justify-between px-4 ${currentSection !== 'home' ? 'bg-green-800 text-white shadow-md' : 'bg-transparent text-white/0 pointer-events-none select-none'}`}>
        <div className="flex items-center gap-6"> 
          <div className="text-lg font-bold">Pousada Espaço Gaia</div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLinks locale={locale} onNavigate={(id) => { setMobileMenuOpen(false); scrollToSection(id); }} />
          {/* Language toggle shown inside navbar on non-home (desktop) */}
          {currentSection !== 'home' && (
            <div className="ml-4">
              <LanguageToggle value={locale} onChange={setLocale} compact />
            </div>
          )}
        </div>

        {/* placeholder to keep nav height stable */}
        <div className="md:hidden" />
      </nav>

      {/* Floating language toggle on Inicio (small and slim) - visible on all sizes so it's separate from the navbar */}
      {currentSection === 'home' && (
        <div className="fixed top-4 right-20 z-50">
          <LanguageToggle value={locale} onChange={setLocale} compact />
        </div>
      )}

      {/* Mobile burger (moved out of nav so it remains clickable when nav is inert) */}
      <div className="fixed top-[14px] right-4 z-50 md:hidden">
        <button aria-label="Menu" aria-controls="mobile-menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((s) => !s)} className="p-2 rounded-md bg-white/10">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      {/* Mobile overlay menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/50" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute right-4 top-16 bg-white/95 text-neutral-900 rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 px-2">
              <div className="text-sm font-semibold">{translate(locale,'label.language')}</div>
              <div>
                <LanguageToggle value={locale} onChange={setLocale} compact />
              </div>
            </div>
            <div className="h-px bg-neutral-200 my-2" />
            <NavLinks locale={locale} onNavigate={(id) => { setMobileMenuOpen(false); scrollToSection(id); }} closeMenu={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Active page area */}
      <main className="h-full w-full relative">
        <div className="absolute inset-0">
          {prevSection && (
            <div
              key={prevSection}
              className={`section leave ${lastDirection === 1 ? 'to-top' : 'to-bottom'}`}
            >
              {renderSection(prevSection)}
            </div>
          )}
          <div
            key={currentSection}
            className={`section enter ${prevSection ? (lastDirection === 1 ? 'from-bottom' : 'from-top') : ''}`}
          >
            {renderSection(currentSection)}
          </div>
        </div>
      </main>

      {/* Arrows */}
      {prev && (
        <button onClick={() => prev && scrollToSection(prev)} aria-label="Subir" className="fixed top-24 md:top-16 left-1/2 -translate-x-1/2 z-40">
            <div className="mb-1 text-xs font-semibold px-2 py-1 rounded-md shadow-sm bg-white/90 text-neutral-900">{translate(locale, `nav.${prev}`)}</div>
          <div className={`text-4xl font-bold ${currentSection === 'home' ? 'text-white' : 'text-neutral-900'}`}>↑</div>
        </button>
      )}

      {next && (
        <button onClick={() => next && scrollToSection(next)} aria-label="Descer" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          {/* Emphasize arrow on home */}
          <div className={`flex flex-col items-center ${currentSection === 'home' ? 'scale-110' : ''}`}>
            <div className={`${currentSection === 'home' ? 'tiny-bounce text-7xl md:text-6xl font-extrabold text-white' : 'text-4xl font-bold text-neutral-900'}`}>↓</div>
            <div className={`mt-2 ${currentSection === 'home' ? 'text-base md:text-sm font-semibold px-3 py-1 rounded-md shadow bg-white/90 text-neutral-900' : 'mt-1 text-xs font-semibold px-2 py-1 rounded-md shadow-sm bg-white/90 text-neutral-900'}`}>{translate(locale, `nav.${next}`)}</div>
          </div>
        </button>
      )}

      {/* Footer visible only on Localizacao */}
      {currentSection === 'location' && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div className="bg-green-900 text-white px-6 py-3 text-center">
            <p className="text-sm font-semibold">{translate(locale,'footer.contact')}</p>
            <p className="text-xs">{translate(locale,'footer.whatsapp')}: (71) 99220-6321</p>
            <p className="text-xs">{translate(locale,'footer.email')}: contato@pousadagaia.com</p>
            <p className="text-xs opacity-80">{translate(locale,'footer.copy')}</p>
          </div>
        </div>
      )}
      </div>
    </LocaleContext.Provider>
  );
}
