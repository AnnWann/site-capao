import { type JSX, type ReactNode, useRef, useState } from 'react';

type Props = {
  imageSrc: string;
  dragHintText: string;
  children: ReactNode;
};

export default function WalkthroughViewport({ imageSrc, dragHintText, children }: Props): JSX.Element {
  const [bgPos, setBgPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const dragRef = useRef<{
    active: boolean;
    pointerId: number | null;
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  }>({ active: false, pointerId: null, startX: 0, startY: 0, startPosX: 50, startPosY: 50 });

  const clamp01 = (v: number) => Math.max(0, Math.min(100, v));

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
          cursor: dragRef.current.active ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          const el = e.currentTarget as HTMLDivElement;
          el.setPointerCapture(e.pointerId);
          dragRef.current.active = true;
          dragRef.current.pointerId = e.pointerId;
          dragRef.current.startX = e.clientX;
          dragRef.current.startY = e.clientY;
          dragRef.current.startPosX = bgPos.x;
          dragRef.current.startPosY = bgPos.y;
        }}
        onPointerMove={(e) => {
          if (!dragRef.current.active) return;
          if (dragRef.current.pointerId !== e.pointerId) return;
          const el = e.currentTarget as HTMLDivElement;
          const rect = el.getBoundingClientRect();
          const dx = e.clientX - dragRef.current.startX;
          const dy = e.clientY - dragRef.current.startY;

          const nextX = dragRef.current.startPosX - (dx / Math.max(1, rect.width)) * 100;
          const nextY = dragRef.current.startPosY - (dy / Math.max(1, rect.height)) * 100;
          setBgPos({ x: clamp01(nextX), y: clamp01(nextY) });
        }}
        onPointerUp={(e) => {
          if (dragRef.current.pointerId !== e.pointerId) return;
          dragRef.current.active = false;
          dragRef.current.pointerId = null;
        }}
        onPointerCancel={(e) => {
          if (dragRef.current.pointerId !== e.pointerId) return;
          dragRef.current.active = false;
          dragRef.current.pointerId = null;
        }}
      />

      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      {/* Pan hint: subtle edge fades + arrows so users know there is more image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/35 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-2xl">←</div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 text-2xl">→</div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white/70 text-2xl">↑</div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 text-2xl">↓</div>

        <div className="absolute bottom-6 right-6 text-white/70 text-xs bg-black/25 px-3 py-2 rounded-full backdrop-blur">
          {dragHintText}
        </div>
      </div>

      {children}
    </div>
  );
}
