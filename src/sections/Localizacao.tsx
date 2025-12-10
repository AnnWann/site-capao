import { type JSX } from 'react';

export default function Localizacao(): JSX.Element {
  return (
    <section id="localizacao" className="h-screen w-full flex flex-col relative overflow-hidden bg-neutral-100">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 min-h-0">
        <h2 className="text-2xl font-bold text-center mb-4">Localização</h2>

        <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=-12.6159711,-41.5037977&z=17&output=embed"
            className="w-full h-64 md:h-96 rounded-xl border-0 mx-auto block"
            loading="lazy"
            title="Mapa - Localização"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
