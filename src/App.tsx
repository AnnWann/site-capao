import { type JSX, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import VoluntaryPage from './pages/voluntary';
// import WalkthroughPage from './pages/walkthrough';
import { LocaleContext, translate, type Locale } from './contexts/LocaleContext';
import { RouteTransitionOverlay, RouteTransitionProvider } from './contexts/RouteTransitionContext';
import { getInitialLocale } from './util/navigation';
import './styles/global.css';

export default function App(): JSX.Element {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale() as Locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: (k: string) => translate(locale, k) }}>
      <RouteTransitionProvider>
        <RouteTransitionOverlay />
        <Routes>
          <Route path="/" element={<Landing locale={locale} setLocale={setLocale} />} />
          <Route path="/voluntary" element={<VoluntaryPage locale={locale} setLocale={setLocale} />} />
          {/* Walkthrough page intentionally disabled */}
          {/* <Route path="/walkthrough" element={<WalkthroughPage locale={locale} setLocale={setLocale} />} /> */}
        </Routes>
      </RouteTransitionProvider>
    </LocaleContext.Provider>
  );
}
