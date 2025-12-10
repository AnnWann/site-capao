import { type JSX } from 'react';

export default function Inicio(): JSX.Element {
  const infos = [
    {
      key: 'sleep',
      label: 'Acomoda até 8',
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="7" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 13v3M21 13v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      key: 'wifi',
      label: 'Wi‑Fi',
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M2 8.5c6-4.5 14-4.5 20 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 12c3.2-2.3 7.8-2.3 11 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      key: 'dist',
      label: '2 km da vila',
      svg: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2v20M5 7l7-5 7 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <header id="inicio" className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-white relative" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <h1 className="text-5xl font-bold drop-shadow-xl">Pousada Espaço Gaia</h1>
      <p className="text-2xl mt-4 drop-shadow-lg">Vale do Capão – Chapada Diamantina</p>
      <p className="text-xl mt-2 drop-shadow-lg italic">natureza e conforto em harmonia</p>

      <div className="mt-10 w-full max-w-3xl px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {infos.map((it) => (
            <div key={it.key} className="w-1/2 sm:w-auto flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center text-emerald-800 shadow-lg">
                {it.svg}
              </div>
              <span className="mt-2 text-sm font-medium text-white drop-shadow">{it.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vinheta / foco de filme: overlay radial para escurecer bordas */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)'
          }}
        />
      </div>
    </header>
  );
}

