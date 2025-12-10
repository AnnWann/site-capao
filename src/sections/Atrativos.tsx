import { type JSX } from 'react';
import Carousel from '../components/Carousel';

function Icon({ name }: { name: string }): JSX.Element {
  const base = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as any;
  switch (name) {
    case 'kitchen':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 3h18v4H3zM8 7v13" stroke="currentColor"/></svg>
      );
    case 'fridge':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="3" y="3" width="8" height="18" rx="1" stroke="currentColor"/><rect x="13" y="7" width="8" height="14" rx="1" stroke="currentColor"/></svg>
      );
    case 'stove':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor"/><circle cx="8" cy="12" r="1" stroke="currentColor"/><circle cx="12" cy="12" r="1" stroke="currentColor"/><circle cx="16" cy="12" r="1" stroke="currentColor"/></svg>
      );
    case 'oven':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor"/><rect x="7" y="9" width="10" height="7" stroke="currentColor"/><circle cx="9" cy="7" r="0.8" fill="currentColor"/></svg>
      );
    case 'coffee':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 7h12v6a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" stroke="currentColor"/><path d="M15 8h1a3 3 0 010 6h-1" stroke="currentColor"/></svg>
      );
    case 'wine':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M8 2v6a4 4 0 004 4v3h-4v3h8v-3h-4v-3a4 4 0 004-4V2" stroke="currentColor"/></svg>
      );
    case 'toaster':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor"/><path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor"/></svg>
      );
    case 'tray':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor"/><path d="M8 10h8" stroke="currentColor"/></svg>
      );
    case 'blender':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="9" y="3" width="6" height="4" stroke="currentColor"/><path d="M10 7v9a3 3 0 006 0V7" stroke="currentColor"/><path d="M8 20h8" stroke="currentColor"/></svg>
      );
    case 'bbqtools':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M6 3v9" stroke="currentColor"/><path d="M10 3v9" stroke="currentColor"/><path d="M3 20h18" stroke="currentColor"/></svg>
      );
    case 'table':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="3" y="6" width="18" height="8" rx="1" stroke="currentColor"/><path d="M6 20v-6M18 20v-6" stroke="currentColor"/></svg>
      );
    case 'bed':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 7v10h18V7M3 11h18" stroke="currentColor"/></svg>
      );
    case 'towels':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 7h14v10H3zM21 7v10" stroke="currentColor"/></svg>
      );
    case 'hanger':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M12 3s4 1 4 4v1H8V7c0-3 4-4 4-4zM3 21h18" stroke="currentColor"/></svg>
      );
    case 'wardrobe':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor"/><path d="M8 8v8M16 8v8" stroke="currentColor"/></svg>
      );
    case 'hammock':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 7c5 4 10 4 18 0" stroke="currentColor"/><path d="M3 7v6c7 4 12 4 18 0V7" stroke="currentColor"/></svg>
      );
    case 'washing':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor"/><circle cx="12" cy="12" r="4" stroke="currentColor"/></svg>
      );
    case 'dryer':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor"/><path d="M8 12h8" stroke="currentColor"/></svg>
      );
    case 'line':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 7h18M3 11h18" stroke="currentColor"/></svg>
      );
    case 'iron':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 12h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor"/><path d="M7 12V8a5 5 0 0110 0v4" stroke="currentColor"/></svg>
      );
    case 'hairdryer':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M2 12h2l3 2h6l3-2h2" stroke="currentColor"/><path d="M15 7v5" stroke="currentColor"/></svg>
      );
    case 'shower':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M6 3v6" stroke="currentColor"/><path d="M6 9a6 6 0 0012 0" stroke="currentColor"/><path d="M9 17v.01M12 17v.01M15 17v.01" stroke="currentColor"/></svg>
      );
    case 'hot':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M12 2s1.5 2 1.5 4.5S12 10 12 10s-1.5-3.5-1.5-3.5S12 2 12 2z" stroke="currentColor"/><path d="M6 18c1.5-2 4-3 6-3s4.5 1 6 3" stroke="currentColor"/></svg>
      );
    case 'fire':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M12 3s4 4 2 8c0 0 3 1 3 6-4 0-6-3-7-3s-3 3-7 3c0-5 3-6 3-6-2-4 2-8 6-8z" stroke="currentColor"/></svg>
      );
    case 'grill':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M3 7h18M7 7v10M17 7v10" stroke="currentColor"/><path d="M5 17h14" stroke="currentColor"/></svg>
      );
    case 'porch':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor"/><path d="M7 7v-2h10v2" stroke="currentColor"/></svg>
      );
    case 'water':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M12 2s4 4 4 7a4 4 0 01-8 0c0-3 4-7 4-7z" stroke="currentColor"/></svg>
      );
    case 'walk':
      return (
        <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><path d="M13 3v4l-2 4v6" stroke="currentColor"/><circle cx="14" cy="17" r="1" stroke="currentColor"/></svg>
      );
    default:
      return <svg {...base} viewBox="0 0 24 24" className="w-5 h-5 text-green-700"><circle cx="12" cy="12" r="3" stroke="currentColor"/></svg>;
  }
}

export default function Atrativos(): JSX.Element {
  const categories = [
    {
      id: 'cozinha',
      title: 'Cozinha',
      items: [
        { key: 'fridge', label: 'Geladeira Electrolux' },
        { key: 'stove', label: 'Fogão Dako' },
        { key: 'oven', label: 'Forno' },
        { key: 'coffee', label: 'Cafeteira' },
        { key: 'wine', label: 'Taças de vinho' },
        { key: 'toaster', label: 'Torradeira' },
        { key: 'tray', label: 'Assadeira' },
        { key: 'blender', label: 'Liquidificador' },
        { key: 'bbqtools', label: 'Utensílios para churrasqueira' },
        { key: 'table', label: 'Mesa de jantar' },
      ],
    },
    {
      id: 'quartos',
      title: 'Quartos',
      items: [
        { key: 'bed', label: 'Roupa de cama' },
        { key: 'towels', label: 'Básico – Toalhas, lençóis, sabonete e papel higiênico' },
        { key: 'hanger', label: 'Cabides' },
        { key: 'wardrobe', label: 'Guarda-roupa' },
        { key: 'hammock', label: 'Rede' },
      ],
    },
    {
      id: 'lavanderia',
      title: 'Lavanderia',
      items: [
        { key: 'washing', label: 'Máquina de lavar na acomodação (gratuita)' },
        { key: 'dryer', label: 'Secadora' },
        { key: 'line', label: 'Varal para secar roupas' },
        { key: 'iron', label: 'Ferro de passar' },
      ],
    },
    {
      id: 'banheiros',
      title: 'Banheiros',
      items: [
        { key: 'hairdryer', label: 'Secador de cabelo' },
        { key: 'shower', label: 'Chuveiro externo' },
        { key: 'hot', label: 'Água quente' },
      ],
    },
    {
      id: 'outdoor',
      title: 'Ao ar livre',
      items: [
        { key: 'fire', label: 'Fogueira' },
        { key: 'grill', label: 'Churrasqueira' },
        { key: 'porch', label: 'Pátio ou varanda (privativa)' },
        { key: 'water', label: 'Acesso ao lago' },
        { key: 'walk', label: '15 minutos de distância da vila (a pé)' },
      ],
    },
  ];
  return (
    <section id="atrativos" className="h-full flex items-center bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 text-center w-full">
        <h2 className="text-3xl font-semibold mb-6">Atrativos</h2>

        <p className="mb-6 text-gray-600">Conheça algumas comodidades e facilidades do Espaço Gaia.</p>

        {/* Desktop grid - hidden on small screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Cozinha</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="fridge" /></span><span>Geladeira Electrolux</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="stove" /></span><span>Fogão Dako</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="oven" /></span><span>Forno</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="coffee" /></span><span>Cafeteira</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="wine" /></span><span>Taças de vinho</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="toaster" /></span><span>Torradeira</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="tray" /></span><span>Assadeira</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="blender" /></span><span>Liquidificador</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="bbqtools" /></span><span>Utensílios para churrasqueira</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="table" /></span><span>Mesa de jantar</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Quartos</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="bed" /></span><span>Roupa de cama</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="towels" /></span><span>Básico – Toalhas, lençóis, sabonete e papel higiênico</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="hanger" /></span><span>Cabides</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="wardrobe" /></span><span>Guarda-roupa</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="hammock" /></span><span>Rede</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Lavanderia</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="washing" /></span><span>Máquina de lavar na acomodação (gratuita)</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="dryer" /></span><span>Secadora</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="line" /></span><span>Varal para secar roupas</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="iron" /></span><span>Ferro de passar</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Banheiros</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="hairdryer" /></span><span>Secador de cabelo</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="shower" /></span><span>Chuveiro externo</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="hot" /></span><span>Água quente</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Ao ar livre</h3>
            <ul className="list-none m-0 p-0 space-y-2 text-left md:text-left">
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="fire" /></span><span>Fogueira</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="grill" /></span><span>Churrasqueira</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="porch" /></span><span>Pátio ou varanda (privativa)</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="water" /></span><span>Acesso ao lago</span></li>
              <li className="flex items-start gap-3"><span className="mt-0.5"><Icon name="walk" /></span><span>15 minutos de distância da vila (a pé)</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile carousel - show only on small screens */}
      <div className="md:hidden px-4 py-6">
        <Carousel
          items={categories}
          renderItem={(cat) => (
            <div className="p-4 bg-white rounded-lg shadow h-full overflow-auto">
              <h3 className="text-lg font-semibold mb-3">{cat.title}</h3>
              <ul className="list-none m-0 p-0 space-y-2 text-left">
                {cat.items.map((it: any) => (
                  <li key={it.key} className="flex items-start gap-3">
                    <span className="mt-0.5"><Icon name={it.key} /></span>
                    <span>{it.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          heightClass="h-72"
          showArrows={false}
          showDots={true}
          slideWidthFactor={0.92}
        />
      </div>
    </section>
  );
}
