import { type JSX } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import photos from '../util/fotos';

function getLanguageFromItem(p: { pt_br: string; en_us: string; es_es: string }, locale: string): string {
  if (locale === 'pt-BR') {
    return p.pt_br;
  } else if (locale === 'es-ES') {
    return p.es_es;
  } else {
    return p.en_us;
  }
}

export default function Gallery(): JSX.Element {
  const { t, locale } = useLocale();
  return (
    <section id="gallery" className="min-h-screen w-full flex flex-col justify-center relative px-6 bg-neutral-100">
      <h2 className="text-3xl font-bold text-center pt-20 pb-8 hidden sm:block">{t('nav.gallery')}</h2>

      <div className="max-w-6xl mx-auto w-full px-4">
        <Carousel
          items={photos}
          renderItem={(p) => (
            <Card src={p.src} title={getLanguageFromItem(p, locale)} heightClass={'h-72 md:h-[56vh]'} />
          )}
          heightClass="h-72 md:h-[56vh]"
          interval={4000}
          showArrows={true}
          showDots={true}
          hideDotsOnMobile={true}
          slideWidthFactor={0.97}
        />
      </div>
    </section>
  );
}
