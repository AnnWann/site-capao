import { type JSX, useEffect, useRef, useState } from 'react';
// section components are now resolved via util/getSectionComponent
import LanguageToggle from './components/LanguageToggle';
import Navbar from './components/Navbar';
import HamburgerMenu from './components/HamburgerMenu';
import Footer from './components/Footer';
import ArrowNav from './components/ArrowNav';
import { LocaleContext, translate, type Locale } from './contexts/LocaleContext';
import { sectionOrder, setHash, getInitialLocale, computeDirection, findNextIndex, getSectionComponent } from './util/navigation';
import './styles/global.css';

import type { SectionId } from './util/navigation';

export default function App(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = useState<SectionId>('home');
  const isScrollingRef = useRef(false);

  // sectionOrder and small helpers live in src/util/navigation.ts

  const scrollToSection = (id: SectionId) => {
    if (id === currentSection) return;
    const dir = computeDirection(currentSection, id);
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
      if (h && (sectionOrder as readonly string[]).includes(h)) setCurrentSection(h as SectionId);

    const onHash = () => {
        const newHash = (window.location.hash || '').replace('#', '');
        if (newHash && (sectionOrder as readonly string[]).includes(newHash)) setCurrentSection(newHash as SectionId);
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
      const nextIdx = findNextIndex(currentSection, dir);
      if (nextIdx !== sectionOrder.indexOf(currentSection)) {
        const id = sectionOrder[nextIdx];
        scrollToSection(id as SectionId);
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
        const nextIdx = findNextIndex(currentSection, dir);
        if (nextIdx !== sectionOrder.indexOf(currentSection)) scrollToSection(sectionOrder[nextIdx] as SectionId);

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
  const [prevSection, setPrevSection] = useState<SectionId | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  // +1 = moving down (new page comes from bottom), -1 = moving up (new page comes from top)
  const [lastDirection, setLastDirection] = useState<number>(1);

  // render a section by id (delegated to util)
  const renderSection = (id: SectionId) => getSectionComponent(id);

  const idx = sectionOrder.indexOf(currentSection);
  const prev: SectionId | null = idx > 0 ? sectionOrder[idx - 1] : null;
  const next: SectionId | null = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : null;
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale() as Locale);

  // cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: (k: string) => translate(locale, k) }}>
      <div ref={containerRef} className="font-sans bg-neutral-100 text-neutral-900 h-screen w-screen overflow-hidden relative">

      {/* NAVBAR */}
      <Navbar locale={locale} currentSection={currentSection} onNavigate={scrollToSection} onLocaleChange={setLocale} />

      {/* Floating language toggle on Inicio (small and slim) - visible on all sizes so it's separate from the navbar */}
      {currentSection === 'home' && (
        <div className="fixed top-4 right-20 z-50">
          <LanguageToggle value={locale} onChange={setLocale} compact />
        </div>
      )}

      <HamburgerMenu locale={locale} onNavigate={scrollToSection} />

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
      <ArrowNav prev={prev} next={next} locale={locale} onNavigate={scrollToSection} emphasizeNext={currentSection === 'home'} emphasizePrev={false} />

      {/* Footer visible only on Localizacao */}
      {currentSection === 'location' && <Footer locale={locale} />}
      </div>
    </LocaleContext.Provider>
  );
}
