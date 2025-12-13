import { type JSX } from 'react';

type Props = {
  direction: 'up' | 'down';
  label?: string;
  emphasized?: boolean;
  onClick: () => void;
  ariaLabel?: string;
};

export default function ArrowButton({ direction, label, emphasized = false, onClick, ariaLabel }: Props): JSX.Element {
  if (direction === 'up') {
    return (
      <button onClick={onClick} aria-label={ariaLabel ?? 'Up'} className="fixed top-16 md:top-18 left-1/2 -translate-x-1/2 z-40">
        {label && <div className="mb-1 text-xs font-semibold px-2 py-1 rounded-md shadow-sm bg-white/90 text-neutral-900">{label}</div>}
        <div className={`text-4xl font-bold ${emphasized ? 'text-white' : 'text-neutral-900'}`}>↑</div>
      </button>
    );
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel ?? 'Down'} className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className={`flex flex-col items-center ${emphasized ? 'scale-110' : ''}`}>
        <div className={`${emphasized ? 'tiny-bounce text-7xl md:text-6xl font-extrabold text-white' : 'text-4xl font-bold text-neutral-900'}`}>↓</div>
        {label && <div className={`mt-2 ${emphasized ? 'text-base md:text-sm font-semibold px-3 py-1 rounded-md shadow bg-white/90 text-neutral-900' : 'mt-1 text-xs font-semibold px-2 py-1 rounded-md shadow-sm bg-white/90 text-neutral-900'}`}>{label}</div>}
      </div>
    </button>
  );
}
