import { type JSX } from 'react';

export default function Reservas(): JSX.Element {
  return (
    <section id="reservas" className="h-screen w-full flex flex-col justify-center relative px-6 bg-neutral-100">
      <h2 className="text-3xl font-bold text-center mb-8">Reservas</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-lg mb-4">Reserve sua estadia diretamente pelo Airbnb:</p>
        <a
          href="https://www.airbnb.com.br/rooms/11793301"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow"
        >
          Reservar no Airbnb
        </a>
      </div>
    </section>
  );
}
