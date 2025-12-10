import { type JSX, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  alt?: string;
  title?: string;
  onClose: () => void;
};

export default function Lightbox({ src, alt = '', title, onClose }: Props): JSX.Element {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // prevent body scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative max-w-[95vw] max-h-[95vh] p-4">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-2 top-2 z-20 bg-white/90 text-black rounded-full p-2 shadow-md"
        >
          ✕
        </button>

        <div className="w-full h-full flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-neutral-900"
            draggable={false}
          />
        </div>

        {title && (
          <div className="mt-3 text-center text-white text-lg">{title}</div>
        )}
      </div>
    </div>
  );

  // Render as a portal to body so it's not clipped by transformed/overflow parents
  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;

}
