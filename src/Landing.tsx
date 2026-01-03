import { type JSX, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageToggle from './components/LanguageToggle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ArrowNav from './components/ArrowNav';
import WalkthroughTeaser from './components/WalkthroughTeaser';
import { useLocale, type Locale } from './contexts/LocaleContext';
import { useRouteTransition } from './contexts/RouteTransitionContext';
import { sectionOrder, setHash, computeDirection, findNextIndex, getSectionComponent } from './util/navigation';

import type { SectionId } from './util/navigation';

type Props = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

export default function Landing({ locale, setLocale }: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = useState<SectionId>('home');
  const isScrollingRef = useRef(false);
  const { t } = useLocale();
  const navigate = useNavigate();
  const transition = useRouteTransition();

  const WALKTHROUGH_CLOSED_IMG = '/fotos/Portao.avif';
  const WALKTHROUGH_OPEN_IMG = '/fotos/TrilhaEntrada.avif';

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

  // wheel navigation
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

    window.addEventListener('wheel', onWheel as EventListener, { passive: false });
    return () => window.removeEventListener('wheel', onWheel as EventListener);
  }, [currentSection]);

  // touch navigation
  const touchStartYRef = useRef<number | null>(null);
  const touchMovedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current || window;
    const THRESHOLD_PX = 60;

    const onTouchStart = (ev: Event) => {
      const tev = ev as TouchEvent;
      if (!tev.touches || tev.touches.length !== 1) return;
      touchStartYRef.current = tev.touches[0].clientY;
      touchMovedRef.current = false;
    };

    const onTouchMove = (ev: Event) => {
      const tev = ev as TouchEvent;
      if (touchStartYRef.current == null) return;
      const y = tev.touches[0].clientY;
      const dy = y - touchStartYRef.current;
      if (Math.abs(dy) > 8) {
        touchMovedRef.current = true;
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

      if (!isScrollingRef.current && touchMovedRef.current && Math.abs(dy) > THRESHOLD_PX) {
        isScrollingRef.current = true;
        const dir = dy < 0 ? 1 : -1;
        const nextIdx = findNextIndex(currentSection, dir);
        if (nextIdx !== sectionOrder.indexOf(currentSection)) scrollToSection(sectionOrder[nextIdx] as SectionId);

        window.setTimeout(() => {
          isScrollingRef.current = false;
        }, 250);
      }

      touchStartYRef.current = null;
      touchMovedRef.current = false;
    };

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
  const [lastDirection, setLastDirection] = useState<number>(1);

  const renderSection = (id: SectionId) => getSectionComponent(id);

  const idx = sectionOrder.indexOf(currentSection);
  const prev: SectionId | null = idx > 0 ? sectionOrder[idx - 1] : null;
  const next: SectionId | null = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : null;

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="font-sans bg-neutral-100 text-neutral-900 h-screen w-screen overflow-hidden relative">
      <Navbar locale={locale} currentSection={currentSection} onNavigate={scrollToSection} onLocaleChange={setLocale} />

      {/* Home top-right CTAs (separate from hidden navbar on Home) */}
      {currentSection === 'home' && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          <Link
            to="/voluntary"
            className="px-4 py-2 rounded-full bg-white/90 text-emerald-800 font-semibold shadow-md hover:bg-white transition-colors"
          >
            {t('cta.volunteer')}
          </Link>
          <LanguageToggle value={locale} onChange={setLocale} compact />
        </div>
      )}

      {currentSection === 'home' && (
        <WalkthroughTeaser
          label={t('walkthrough.teaser')}
          imageClosedSrc={WALKTHROUGH_CLOSED_IMG}
          imageOpenSrc={WALKTHROUGH_OPEN_IMG}
          onClick={(rect) => {
            transition.startImageExpand(
              { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
              WALKTHROUGH_CLOSED_IMG
            );
            // Navigate shortly after start so the overlay expands over the route change.
            window.setTimeout(() => navigate('/walkthrough'), 120);
          }}
        />
      )}

      <main className="h-full w-full relative">
        <div className="absolute inset-0">
          {prevSection && (
            <div key={prevSection} className={`section leave ${lastDirection === 1 ? 'to-top' : 'to-bottom'}`}>
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

      <ArrowNav prev={prev} next={next} locale={locale} onNavigate={scrollToSection} emphasizeNext={currentSection === 'home'} emphasizePrev={false} />

      {currentSection === 'location' && <Footer locale={locale} />}
    </div>
  );
}
