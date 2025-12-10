import { type JSX, useEffect, useRef, useState } from 'react';
import Inicio from './sections/Inicio';
import Acomodacoes from './sections/Acomodacoes';
import Galeria from './sections/Galeria';
import Reservas from './sections/Reservas';
import Localizacao from './sections/Localizacao';

export default function App(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = useState<string>('inicio');
  const isScrollingRef = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionOrder = ['inicio', 'acomodacoes', 'galeria', 'reservas', 'localizacao'];
  const sectionLabels: Record<string, string> = {
    inicio: 'Início',
    acomodacoes: 'Acomodações',
    galeria: 'Galeria',
    reservas: 'Reservas',
    localizacao: 'Localização',
  };

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

  // transition state
  const TRANSITION_MS = 700;
  const [prevSection, setPrevSection] = useState<string | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  // +1 = moving down (new page comes from bottom), -1 = moving up (new page comes from top)
  const [lastDirection, setLastDirection] = useState<number>(1);

  // render a section by id
  const renderSection = (id: string) => {
    switch (id) {
      case 'inicio':
        return <Inicio />;
      case 'acomodacoes':
        return <Acomodacoes />;
      case 'galeria':
        return <Galeria />;
      case 'reservas':
        return <Reservas />;
      case 'localizacao':
        return <Localizacao />;
      default:
        return <Inicio />;
    }
  };

  const idx = sectionOrder.indexOf(currentSection);
  const prev = idx > 0 ? sectionOrder[idx - 1] : '';
  const next = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : '';

  // cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  return (
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
      <nav className={`fixed top-0 left-0 w-full py-4 z-50 flex items-center justify-between px-4 ${currentSection !== 'inicio' ? 'bg-green-800 text-white shadow-md' : 'bg-transparent text-white/0'}`}>
        <div className="flex items-center gap-6">
          <div className="text-lg font-bold">Pousada Espaço Gaia</div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('inicio'); }} className="font-semibold">Início</a>
          <a href="#acomodacoes" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('acomodacoes'); }} className="font-semibold">Acomodações</a>
          <a href="#galeria" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('galeria'); }} className="font-semibold">Galeria</a>
          <a href="#reservas" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('reservas'); }} className="font-semibold">Reservas</a>
          <a href="#localizacao" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('localizacao'); }} className="font-semibold">Localização</a>
        </div>

        {/* Mobile burger */}
        <div className="md:hidden">
          <button aria-label="Menu" onClick={() => setMobileMenuOpen((s) => !s)} className="p-2 rounded-md bg-white/10">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute right-4 top-16 bg-white/95 text-neutral-900 rounded-lg shadow-lg p-4 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
            <a href="#inicio" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('inicio'); }} className="font-semibold">Início</a>
            <a href="#acomodacoes" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('acomodacoes'); }} className="font-semibold">Acomodações</a>
            <a href="#galeria" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('galeria'); }} className="font-semibold">Galeria</a>
            <a href="#reservas" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('reservas'); }} className="font-semibold">Reservas</a>
            <a href="#localizacao" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('localizacao'); }} className="font-semibold">Localização</a>
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
          <div className="mb-1 text-xs font-semibold px-2 py-1 rounded-md shadow-sm bg-white/90 text-neutral-900">{sectionLabels[prev]}</div>
          <div className={`text-4xl font-bold ${currentSection === 'inicio' ? 'text-white' : 'text-neutral-900'}`}>↑</div>
        </button>
      )}

      {next && (
        <button onClick={() => next && scrollToSection(next)} aria-label="Descer" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div className={`text-4xl font-bold ${currentSection === 'inicio' ? 'text-white' : 'text-neutral-900'}`}>↓</div>
          <div className="mt-1 text-xs font-semibold px-2 py-1 rounded-md shadow-sm bg-white/90 text-neutral-900">{sectionLabels[next]}</div>
        </button>
      )}

      {/* Footer visible only on Localizacao */}
      {currentSection === 'localizacao' && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div className="bg-green-900 text-white px-6 py-3 text-center">
            <p className="text-sm font-semibold">Contato</p>
            <p className="text-xs">WhatsApp: (71) 99220-6321</p>
            <p className="text-xs">Email: contato@espacogaia.com</p>
            <p className="text-xs opacity-80">© 2025 Pousada Espaço Gaia</p>
          </div>
        </div>
      )}
    </div>
  );
}
