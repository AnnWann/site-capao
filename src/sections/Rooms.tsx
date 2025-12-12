import { type JSX } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

type Item = { src: string; title: string; heightClass?: string };

export default function Rooms(): JSX.Element {
  const { t } = useLocale();
  const items: Item[] = [
    { src: '/fotos/Quarto2.avif', title: t('rooms.quartoDuplo'), heightClass: 'h-64' },
    { src: '/fotos/Suite.avif', title: t('rooms.quartoSuite'), heightClass: 'h-64' },
    { src: '/fotos/TrilhaExterna.jpg', title: t('rooms.areaVerde'), heightClass: 'h-48' },
    { src: '/fotos/Fogueira.webp', title: t('rooms.fogueira'), heightClass: 'h-48' },
    { src: '/fotos/garagem.jpg', title: t('rooms.garagem'), heightClass: 'h-48' },
  ];

  // We'll use the reusable Carousel component for mobile

  return (
    <section id="rooms" className="h-screen w-full flex flex-col justify-center relative max-w-5xl mx-auto px-6 bg-neutral-100">
      <h2 className="text-3xl font-bold mb-6 text-center">{t('nav.rooms')}</h2>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div className="max-w-lg mx-auto">
          <Carousel
            items={items}
            renderItem={(it) => (
              <Card src={it.src} title={it.title} heightClass={'h-64'} />
            )}
            heightClass="h-64"
            interval={3500}
            showArrows={true}
            showDots={true}
          />
        </div>
      </div>

      {/* Desktop grid uses the same `items` array so sources are consistent */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.slice(0, 2).map((it, i) => (
            <Card key={i} src={it.src} title={it.title} heightClass={it.heightClass ?? 'h-64'} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {items.slice(2).map((it, i) => (
            <Card key={i} src={it.src} title={it.title} heightClass={it.heightClass ?? 'h-48'} />
          ))}
        </div>
      </div>
    </section>
  );
}
