import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLocale, type Locale } from '../contexts/LocaleContext';
import type { SectionId } from '../util/navigation';

type Props = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

export default function VoluntaryPage({ locale, setLocale }: Props): JSX.Element {
  const { t } = useLocale();
  const navigate = useNavigate();

  const navigateToSection = (id: SectionId) => {
    navigate({ pathname: '/', hash: `#${id}` });
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 text-neutral-900">
      <Navbar
        locale={locale}
        currentSection="rooms"
        onNavigate={navigateToSection}
        onLocaleChange={setLocale}
        mobileTitle={t('nav.voluntary')}
      />

      <main className="pt-24 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">{t('nav.voluntary')}</h1>
          <p className="text-neutral-700 text-center">{t('voluntary.body')}</p>
        </div>
      </main>
    </div>
  );
}
