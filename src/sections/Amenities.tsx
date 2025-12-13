import { type JSX } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import Carousel from '../components/Carousel';
import * as Icons from '../icons';

export default function Amenities(): JSX.Element {
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
      title: t('amenities.quartos'),
      items: [
        { key: 'bed', label: t('amenities.bed') },
        { key: 'towels', label: t('amenities.towels') },
        { key: 'hanger', label: t('amenities.hanger') },
        { key: 'wardrobe', label: t('amenities.wardrobe') },
        { key: 'hammock', label: t('amenities.hammock') },
      ],
    },
    {
      id: 'cozinha',
      title: t('amenities.cozinha'),
      items: [
        { key: 'fridge', label: t('amenities.fridge') },
        { key: 'stove', label: t('amenities.stove') },
        { key: 'oven', label: t('amenities.oven') },
        { key: 'coffee', label: t('amenities.coffee') },
        { key: 'wine', label: t('amenities.wine') },
        { key: 'tray', label: t('amenities.tray') },
        { key: 'blender', label: t('amenities.blender') },
        { key: 'bbqtools', label: t('amenities.bbqtools') },
      ],
    },
    
    {
      id: 'lavanderia',
      title: t('amenities.lavanderia'),
      items: [
        { key: 'washing', label: t('amenities.washing') },
        { key: 'dryer', label: t('amenities.dryer') },
        { key: 'line', label: t('amenities.line') },
        { key: 'iron', label: t('amenities.iron') },
      ],
    },
    {
      id: 'banheiros',
      title: t('amenities.banheiros'),
      items: [
        { key: 'shower', label: t('amenities.shower') },
        { key: 'hairdryer', label: t('amenities.hairdryer') },
        { key: 'hot', label: t('amenities.hot') },
      ],
    },
    {
      id: 'outdoor',
      title: t('amenities.arLivre'),
      items: [
        { key: 'fire', label: t('amenities.fire') },
        { key: 'grill', label: t('amenities.grill') },
        { key: 'porch', label: t('amenities.porch') },
        { key: 'water', label: t('amenities.water') },
        { key: 'walk', label: t('amenities.walk') },
      ],
    },
  ];
  return (
    <section id="amenities" className="min-h-screen flex items-center justify-center bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 text-center w-full pt-20 pb-8">
        <h2 className="text-3xl font-semibold mb-6 hidden sm:block">{t('nav.amenities')}</h2>

        {/* subtitle visible only on md+ */}
        <p className="mb-6 text-gray-600 hidden md:block">{t('amenities.info')}</p>

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
            <h3 className="text-xl font-semibold mb-3">{t('amenities.quartos')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.bedIcon()}</span><span>{t('amenities.bed')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.towelsIcon()}</span><span>{t('amenities.towels')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hangerIcon()}</span><span>{t('amenities.hanger')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.wardrobeIcon()}</span><span>{t('amenities.wardrobe')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hammockIcon()}</span><span>{t('amenities.hammock')}</span></li>
            </ul>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-3">{t('amenities.cozinha')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.fridgeIcon()}</span><span>{t('amenities.fridge')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.stoveIcon()}</span><span>{t('amenities.stove')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.ovenIcon()}</span><span>{t('amenities.oven')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.coffeeIcon()}</span><span>{t('amenities.coffee')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.wineIcon()}</span><span>{t('amenities.wine')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.trayIcon()}</span><span>{t('amenities.tray')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.blenderIcon()}</span><span>{t('amenities.blender')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.bbqtoolsIcon()}</span><span>{t('amenities.bbqtools')}</span></li>
            </ul>
          </div>

          

          <div>
            <h3 className="text-xl font-semibold mb-3">{t('amenities.lavanderia')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.washingIcon()}</span><span>{t('amenities.washing')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.dryerIcon()}</span><span>{t('amenities.dryer')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.lineIcon()}</span><span>{t('amenities.line')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.ironIcon()}</span><span>{t('amenities.iron')}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">{t('amenities.banheiros')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hairdryerIcon()}</span><span>{t('amenities.hairdryer')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.showerIcon()}</span><span>{t('amenities.shower')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.hotIcon()}</span><span>{t('amenities.hot')}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">{t('amenities.arLivre')}</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.fireIcon()}</span><span>{t('amenities.fire')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.grillIcon()}</span><span>{t('amenities.grill')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.porchIcon()}</span><span>{t('amenities.porch')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.waterIcon()}</span><span>{t('amenities.water')}</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5">{Icons.walkIcon()}</span><span>{t('amenities.walk')}</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* (carousel moved above the content so it appears under the title on mobile) */}
    </section>
  );
}
