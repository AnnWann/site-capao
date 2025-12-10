import { type JSX, useRef, useState } from 'react';
import Lightbox from './Lightbox';

type Props = {
  src: string;
  title?: string;
  heightClass?: string;
  alt?: string;
};

export default function Card({ src, title = '', heightClass = 'h-64', alt = '' }: Props): JSX.Element {
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  return (
    <article className="relative rounded-2xl overflow-hidden shadow-lg bg-neutral-50 h-full flex flex-col">
      <div className={`${heightClass} w-full bg-neutral-200 overflow-hidden flex items-center justify-center`}> 
        <img
          src={src}
          alt={alt || title}
          className={`w-full h-full block ${isPortrait === null ? 'object-cover' : isPortrait ? 'object-contain' : 'object-cover'} object-center cursor-pointer`}
          draggable={false}
          onPointerDown={(e) => {
            startXRef.current = e.clientX;
            startYRef.current = e.clientY;
            movedRef.current = false;
          }}
          onPointerMove={(e) => {
            if (startXRef.current == null) return;
            const dx = Math.abs(e.clientX - startXRef.current);
            const dy = Math.abs(e.clientY - startYRef.current!);
            if (dx > 6 || dy > 6) movedRef.current = true;
          }}
          onPointerUp={() => {
            // only treat as click if it wasn't a drag (small movement)
            if (!movedRef.current) setOpen(true);
            startXRef.current = null;
            startYRef.current = null;
            movedRef.current = false;
          }}
          onLoad={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            // If fallback was applied, naturalWidth/naturalHeight still valid for SVG
            const w = img.naturalWidth || 0;
            const h = img.naturalHeight || 0;
            if (w === 0 && h === 0) return;
            setIsPortrait(h > w);
          }}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (img.dataset.fallback) return;
            img.dataset.fallback = '1';
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial,Helvetica,sans-serif' font-size='20'%3ENenhuma%20imagem%3C/text%3E%3C/svg%3E";
            // fallback is typically landscape-ish; clear orientation to default to cover
            setIsPortrait(false);
          }}
        />
      </div>
      {title && (
        <div className="p-3 md:p-4 bg-gradient-to-t from-black/60 to-transparent text-white absolute bottom-0 left-0 w-full">
          <p className="text-lg md:text-lg font-semibold">{title}</p>
        </div>
      )}

      {open && <Lightbox src={src} alt={alt || title} title={title} onClose={() => setOpen(false)} />}
    </article>
  );
}
