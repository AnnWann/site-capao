import { type JSX, useRef, useState } from 'react';

type Props = {
  label: string;
  imageClosedSrc: string;
  imageOpenSrc: string;
  onClick: (rect: DOMRect) => void;
};

export default function WalkthroughTeaser({ label, imageClosedSrc, imageOpenSrc, onClick }: Props): JSX.Element {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed left-4 top-4 z-40">
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={() => {
          const el = btnRef.current;
          if (!el) return;
          onClick(el.getBoundingClientRect());
        }}
        className="relative select-none flex flex-col items-center transition-transform duration-200 ease-out hover:scale-[1.12] focus-visible:scale-[1.12]"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg border border-white/60">
          {/* Closed gate (base) */}
          <img
            src={imageClosedSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Open gate (fade transition overlay) */}
          <div
            className="absolute inset-0"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 260ms ease-in-out',
            }}
          >
            <img
              src={imageOpenSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* frame highlight */}
          <div className="absolute inset-0 rounded-full ring-1 ring-white/40" />
        </div>

        <div className="mt-2 text-xs sm:text-sm font-semibold text-white drop-shadow-md text-center max-w-[11rem]">
          {label}
        </div>
      </button>
    </div>
  );
}
