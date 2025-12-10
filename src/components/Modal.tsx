import { type JSX, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, onClose, children }: Props): JSX.Element {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-2xl p-6">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 bg-gray-100 text-gray-800 rounded-full p-2 shadow"
        >
          ✕
        </button>

        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

        <div className="text-gray-800 text-base leading-relaxed">{children}</div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}
