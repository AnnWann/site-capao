import { type JSX } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import Carousel from '../components/Carousel';
import * as Icons from '../icons';

export default function Atrativos(): JSX.Element {
  const { t } = useLocale();
  // Safe icon renderer: call named icon functions exported from `src/icons`.
  const renderIconByKey = (key: string) => {
    // e.g. 'fridge' -> 'fridgeIcon'
    const fnName = `${key}Icon`;
    const fn = (Icons as any)[fnName];
    if (typeof fn === 'function') return fn();
    // fallback: return a neutral box icon
    return (Icons as any).tableIcon ? (Icons as any).tableIcon() : <span className="w-5 h-5" />;
  };
  const categories = [
    {
      id: 'quartos',
      title: t('atrativos.quartos'),
      items: [
        { key: 'bed', label: t('atrativos.bed') },
        { key: 'towels', label: t('atrativos.towels') },
        { key: 'hanger', label: t('atrativos.hanger') },
        { key: 'wardrobe', label: t('atrativos.wardrobe') },
        { key: 'hammock', label: t('atrativos.hammock') },
      ],
    },
    {
      id: 'cozinha',
      title: t('atrativos.cozinha'),
      items: [
        { key: 'fridge', label: t('atrativos.fridge') },
        { key: 'stove', label: t('atrativos.stove') },
        { key: 'oven', label: t('atrativos.oven') },
        { key: 'coffee', label: t('atrativos.coffee') },
        { key: 'wine', label: t('atrativos.wine') },
        { key: 'tray', label: t('atrativos.tray') },
        { key: 'blender', label: t('atrativos.blender') },
        { key: 'bbqtools', label: t('atrativos.bbqtools') },
      ],
    },
    
    {
      id: 'lavanderia',
      title: t('atrativos.lavanderia'),
      items: [
        { key: 'washing', label: t('atrativos.washing') },
        { key: 'dryer', label: t('atrativos.dryer') },
        { key: 'line', label: t('atrativos.line') },
        { key: 'iron', label: t('atrativos.iron') },
      ],
    },
    {
      id: 'banheiros',
      title: t('atrativos.banheiros'),
      items: [
        { key: 'shower', label: t('atrativos.shower') },
        { key: 'hairdryer', label: t('atrativos.hairdryer') },
        { key: 'hot', label: t('atrativos.hot') },
      ],
    },
    {
      id: 'outdoor',
      title: t('atrativos.arLivre'),
      items: [
        { key: 'fire', label: t('atrativos.fire') },
        { key: 'grill', label: t('atrativos.grill') },
        { key: 'porch', label: t('atrativos.porch') },
        { key: 'water', label: t('atrativos.water') },
        { key: 'walk', label: t('atrativos.walk') },
      ],
    },
  ];
  return (
    <section id="atrativos" className="h-full flex items-center bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 text-center w-full pt-8 md:pt-12">
        <h2 className="text-3xl font-semibold mb-6">{t('nav.atrativos')}</h2>

        {/* subtitle visible only on md+ */}
        <p className="mb-6 text-gray-600 hidden md:block">{t('atrativos.info')}</p>

        {/* Mobile carousel - placed directly under the title on small screens */}
        <div className="md:hidden px-4 py-6">
          <Carousel
            items={categories}
            renderItem={(cat) => (
              <div className="p-4 bg-white rounded-lg shadow h-full overflow-auto">
                <h3 className="text-lg font-semibold mb-3">{cat.title}</h3>
                <ul className="list-none m-0 p-0 space-y-2 text-left">
                  {cat.items.map((it: any) => (
                    <li key={it.key} className="flex items-start gap-3">
                      <span className="mt-0.5">{renderIconByKey(it.key)}</span>
                      <span>{it.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            heightClass="h-80"
            showArrows={false}
            showDots={true}
            slideWidthFactor={1}
            renderDot={(cat: any, _i: number, active: boolean) => {
              const representative = cat.items?.[0]?.key ?? null;
              const icon = representative ? renderIconByKey(representative) : <span className="w-4 h-4" />;
              return (
                <div className={`w-8 h-8 flex items-center justify-center rounded ${active ? 'bg-emerald-100' : ''}`}>
                  {icon}
                </div>
              );
            }}
          />
        </div>

        {/* Desktop grid - hidden on small screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          
          
          <div>
            <h3 className="text-xl font-semibold mb-3">{t('atrativos.quartos')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.bedIcon()}</span><span>{t('atrativos.bed')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.towelsIcon()}</span><span>{t('atrativos.towels')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hangerIcon()}</span><span>{t('atrativos.hanger')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.wardrobeIcon()}</span><span>{t('atrativos.wardrobe')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hammockIcon()}</span><span>{t('atrativos.hammock')}</span></li>
            </ul>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-3">{t('atrativos.cozinha')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.fridgeIcon()}</span><span>{t('atrativos.fridge')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.stoveIcon()}</span><span>{t('atrativos.stove')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.ovenIcon()}</span><span>{t('atrativos.oven')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.coffeeIcon()}</span><span>{t('atrativos.coffee')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.wineIcon()}</span><span>{t('atrativos.wine')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.trayIcon()}</span><span>{t('atrativos.tray')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.blenderIcon()}</span><span>{t('atrativos.blender')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.bbqtoolsIcon()}</span><span>{t('atrativos.bbqtools')}</span></li>
            </ul>
          </div>

          

          <div>
            <h3 className="text-xl font-semibold mb-3">{t('atrativos.lavanderia')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.washingIcon()}</span><span>{t('atrativos.washing')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.dryerIcon()}</span><span>{t('atrativos.dryer')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.lineIcon()}</span><span>{t('atrativos.line')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.ironIcon()}</span><span>{t('atrativos.iron')}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">{t('atrativos.banheiros')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hairdryerIcon()}</span><span>{t('atrativos.hairdryer')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.showerIcon()}</span><span>{t('atrativos.shower')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hotIcon()}</span><span>{t('atrativos.hot')}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">{t('atrativos.arLivre')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.fireIcon()}</span><span>{t('atrativos.fire')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.grillIcon()}</span><span>{t('atrativos.grill')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.porchIcon()}</span><span>{t('atrativos.porch')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.waterIcon()}</span><span>{t('atrativos.water')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.walkIcon()}</span><span>{t('atrativos.walk')}</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* (carousel moved above the content so it appears under the title on mobile) */}
    </section>
  );
}
