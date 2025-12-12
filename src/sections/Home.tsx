import { type JSX, useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import InfoGrid, { type InfoItemType } from '../components/InfoGrid';
import { buildInicioInfos as buildHomeInfos } from '../util/infos';
import Modal from '../components/Modal';

export default function Home(): JSX.Element {
  const { t } = useLocale();

  const [modalOpen, setModalOpen] = useState(false);

  const items: InfoItemType[] = buildHomeInfos(t);

  return (
    <header id="home" className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-white relative" style={{ backgroundImage: "url('/fotos/CasaCompleta3.avif')" }}>
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Split the title so mobile shows two centered lines: "Pousada" / "Espaço Gaia" */}
        {(() => {
          const full = t('home.title');
          const parts = full.split(' ');
          const first = parts.slice(0, 1).join(' ');
          const rest = parts.slice(1).join(' ');
          return (
            <h1 className="font-bold drop-shadow-xl leading-tight">
              <span className="block text-3xl md:text-5xl">{first}</span>
              <span className="block text-4xl md:text-6xl">{rest}</span>
            </h1>
          );
        })()}

        <p className="mt-3 text-sm md:text-2xl drop-shadow-lg max-w-full">{t('home.subtitle')}</p>
        <p className="text-xs md:text-xl mt-2 drop-shadow-lg italic max-w-full">{t('home.tagline')}</p>

      <div className="mt-10 w-full max-w-5xl px-6 mx-auto">
        {/* Desktop / larger screens: show grid inline */}
        <div className="hidden md:flex md:justify-center">
          <InfoGrid items={items} />
        </div>

        {/* Mobile: show a single button that opens a modal with the infos */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full bg-white/90 text-emerald-800 rounded-lg py-3 shadow-md flex items-center justify-center font-medium"
          >
            {t('home.more_infos')}
          </button>

          {modalOpen && (
            <Modal title={t('home.more_infos')} onClose={() => setModalOpen(false)}>
              <div className="p-2">
                <InfoGrid items={items} labelClass="text-gray-800" />
              </div>
            </Modal>
          )}
        </div>

        {/* Booking button */}
        <div className="mt-6 flex justify-center">
          <a
            href="#reservas"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors"
          >
            {t('home.book') ?? 'Reservar'}
          </a>
        </div>
      </div>

      </div>

      {/* Full dark overlay to improve text legibility (subtle) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/40" />
        {/* retain subtle radial vignette on top of the dark overlay for focus */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)'
          }}
        />
      </div>
    </header>
  );
}

