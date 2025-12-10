import { type JSX } from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

type Item = { src: string; title: string; heightClass?: string };

export default function Acomodacoes(): JSX.Element {
  const items: Item[] = [
    { src: '/fotos/Quarto2.avif', title: 'Quartos confortáveis', heightClass: 'h-64' },
    { src: '/fotos/Suite.avif', title: 'Suíte com vista para o vale', heightClass: 'h-64' },
    { src: '/fotos/TrilhaExterna.jpg', title: 'Área verde ampla', heightClass: 'h-48' },
    { src: '/fotos/Cafe.jpg', title: 'Café da manhã', heightClass: 'h-48' },
    { src: '/fotos/PorDoSol.jpg', title: 'Ambiente silencioso e acolhedor', heightClass: 'h-48' },
  ];

  // We'll use the reusable Carousel component for mobile

  return (
    <section id="acomodacoes" className="h-screen w-full flex flex-col justify-center relative max-w-5xl mx-auto px-6 bg-neutral-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Acomodações</h2>

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
