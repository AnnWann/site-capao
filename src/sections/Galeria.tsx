import { type JSX } from 'react';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import photos from '../util/fotos';

export default function Galeria(): JSX.Element {
  return (
    <section id="galeria" className="min-h-screen w-full flex flex-col justify-center relative px-6 bg-neutral-100">
      <h2 className="text-3xl font-bold text-center mb-8">Galeria</h2>

      <div className="max-w-6xl mx-auto w-full px-4">
        <Carousel
          items={photos}
          renderItem={(p) => (
            <Card src={p.src} title={p.title} heightClass={'h-72 md:h-[56vh]'} />
          )}
          heightClass="h-72 md:h-[56vh]"
          interval={4000}
          showArrows={true}
          showDots={true}
          slideWidthFactor={0.97}
        />
      </div>
    </section>
  );
}
