import { type JSX } from 'react';

export default function Inicio(): JSX.Element {
  return (
    <header id="inicio" className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-white relative" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <h1 className="text-5xl font-bold drop-shadow-xl">Pousada Espaço Gaia</h1>
      <p className="text-2xl mt-4 drop-shadow-lg">Vale do Capão – Chapada Diamantina</p>
      <p className="text-xl mt-2 drop-shadow-lg italic">natureza e conforto em harmonia</p>

      <a
        href="#reservas"
        className="mt-10 bg-green-700 px-8 py-3 rounded-xl text-xl font-semibold shadow-lg hover:bg-green-800 transition"
      >
        Quero reservar
      </a>
    </header>
  );
}
