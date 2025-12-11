import { type JSX } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import Carousel from '../components/Carousel';

type Waterfall = {
  name: string;
  distance: string;
  walking_time: string;
  image: string;
};

export default function Atracoes(): JSX.Element {
  const { t } = useLocale();

  const waterfalls: Waterfall[] = [
    {
      name: 'Princesinha',
      distance: '1.4 km',
      walking_time: '25 min',
      image: 'cachoeiras/princesinha.jpg',
    },
    {
      name: 'Cachoeira do Rio Preto',
      distance: '3.0 km',
      walking_time: '1h',
      image: 'cachoeiras/rio_preto.webp',
    },
    {
      name: 'Poço do Gavião',
      distance: '3.0 km',
      walking_time: '1:30h',
      image: 'cachoeiras/poco_gaviao.jpg',
    },
    {
      name: 'Cachoeira da Fumaça',
      distance: '3.1 km',
      walking_time: '2:30h',
      image: 'cachoeiras/fumaca.jpg',
    },
    {
      name: 'Cachoeira da Purificação',
      distance: '6.2 km',
      walking_time: '1h',
      image: 'cachoeiras/purificacao.webp',
    },
  ];

  return (
    <section id="atracoes" className="h-full flex items-center bg-neutral-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 w-full pt-8 md:pt-12">
        <h2 className="text-3xl font-semibold mb-4">{t('nav.atracoes') || 'Atrações Turísticas'}</h2>
        <p className="mb-6 text-gray-600 hidden md:block">{t('atracoes.info') ?? 'Cachoeiras próximas à pousada'}</p>

        <div className="px-2 md:px-0">
          <Carousel
            items={waterfalls}
            renderItem={(wf: Waterfall) => (
              <div className="h-full flex flex-col md:flex-row items-stretch gap-4 p-4">
                <div className="flex-none w-full md:w-1/2 h-72 md:h-full rounded-lg overflow-hidden bg-gray-200">
                  <img src={wf.image} alt={wf.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-center p-2">
                  <div className="text-xl font-semibold text-center md:text-left">{wf.name}</div>
                  <div className="text-sm text-gray-600 mt-2">{wf.distance} {t('atracoes.from_house') ?? 'da pousada'}</div>
                  <div className="text-sm text-gray-600">{wf.walking_time} {t('atracoes.walk')}</div>
                </div>
              </div>
            )}
            interval={5000}
            heightClass="h-auto md:h-80"
            showArrows={true}
            showDots={true}
            className="rounded-2xl"
            slideWidthFactor={1}
          />
        </div>
      </div>
    </section>
  );
}
