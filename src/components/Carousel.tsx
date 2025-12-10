import { type JSX, useEffect, useRef, useState } from 'react';

export type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  heightClass?: string; // tailwind class like 'h-64'
  interval?: number; // ms
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  // fraction of the wrapper width each slide should occupy (0 < v <= 1)
  // e.g. 0.98 keeps slides slightly inset so next slide doesn't peek
  slideWidthFactor?: number;
};

export default function Carousel<T>({
  items,
  renderItem,
  heightClass = 'h-64',
  interval = 3500,
  showDots = true,
  showArrows = true,
  className = '',
  slideWidthFactor = 1,
}: CarouselProps<T>): JSX.Element {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const interactionRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const draggingRef = useRef(false);
  const holdTimeoutRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  // dragOffset state removed; we use offsetX (px) for live transform
  const [containerWidth, setContainerWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const [offsetX, setOffsetX] = useState(0); // px offset for track
  const [withTransition, setWithTransition] = useState(false);
  const panelWidth = containerWidth * Math.max(0.01, Math.min(1, slideWidthFactor));

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Keep track visually centered when index or container width changes
  useEffect(() => {
    if (isAnimatingRef.current) return;
    setWithTransition(false);
    setOffsetX(-panelWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, containerWidth, slideWidthFactor]);

  useEffect(() => {
    const onResize = () => {
      const w = wrapperRef.current?.clientWidth ?? 0;
      setContainerWidth(w);
      // center the track when we know width
      setOffsetX(-w * Math.max(0.01, Math.min(1, slideWidthFactor)));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    if (interval <= 0 || items.length <= 1) return;
    autoplayRef.current = window.setInterval(() => {
      if (interactionRef.current) return;
      // animate to next for smooth transition
      animateDirection(1);
    }, interval);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const goto = (i: number) => {
    // direct jump to index (from dots) — update immediately
    interactionRef.current = true;
    setIndex(i);
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setTimeout(() => {
      interactionRef.current = false;
      startAutoplay();
    }, Math.max(2000, interval)) as unknown as number;
  };

  // next/prev convenience removed; use animateDirection to ensure animations

  // Pointer / drag handlers
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (items.length <= 1) return;
    if (isAnimatingRef.current) return;
    const node = e.currentTarget;
    // Save start position and pointer id. We start actual dragging only after a short hold.
    startXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    interactionRef.current = true;
    pointerIdRef.current = e.pointerId;
    // require a small hold to begin drag so quick taps (clicks) still register on children
    const HOLD_MS = 180;
    if (holdTimeoutRef.current) window.clearTimeout(holdTimeoutRef.current);
    holdTimeoutRef.current = window.setTimeout(() => {
      // begin dragging: capture pointer and stop autoplay
      try {
        node.setPointerCapture(e.pointerId);
      } catch {}
      draggingRef.current = true;
      stopAutoplay();
      holdTimeoutRef.current = null;
    }, HOLD_MS);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    dragOffsetRef.current = dx;
    // live update offset in pixels relative to center (-containerWidth)
    setWithTransition(false);
    setOffsetX(-panelWidth + dx);
  };

  const finishDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    // If a hold timer exists, cancel it (user released before hold completed)
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (!draggingRef.current) {
      // quick tap / no drag: just resume autoplay after short delay
      window.setTimeout(() => {
        interactionRef.current = false;
        startAutoplay();
      }, 200);
      return;
    }
    draggingRef.current = false;
    if (e) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
    const dx = dragOffsetRef.current;
    const threshold = Math.min(80, (panelWidth || 300) * 0.15); // 15% or 80px
    if (Math.abs(dx) > threshold) {
      if (dx < 0) animateDirection(1);
      else animateDirection(-1);
    } else {
      // snap back to center
      setWithTransition(true);
      setOffsetX(-panelWidth);
      const onEnd = () => {
        setWithTransition(false);
        trackRef.current?.removeEventListener('transitionend', onEnd);
      };
      trackRef.current?.addEventListener('transitionend', onEnd);
    }

    // resume autoplay after short delay
    window.setTimeout(() => {
      interactionRef.current = false;
      startAutoplay();
    }, 500);
  };

  const animateDirection = (dir: 1 | -1) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    // dir=1 -> next -> move to -2 * panelWidth; dir=-1 -> prev -> move to 0
    setOffsetX(dir === 1 ? -2 * panelWidth : 0);

    const onEnd = () => {
      trackRef.current?.removeEventListener('transitionend', onEnd);
      // update logical index now
      setIndex((i) => (i + dir + items.length) % items.length);
      // reset position to center without transition
      setWithTransition(false);
      setOffsetX(-panelWidth);
      isAnimatingRef.current = false;
    };

    trackRef.current?.addEventListener('transitionend', onEnd);
  };

  const prevIdx = (index - 1 + items.length) % items.length;
  const nextIdx = (index + 1) % items.length;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={wrapperRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onDragStart={(e) => e.preventDefault()}
        style={{ touchAction: 'pan-y', userSelect: 'none' }}
        className={`w-full ${heightClass} rounded-2xl overflow-hidden bg-neutral-50`}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: panelWidth ? `${panelWidth * 3}px` : undefined,
            transform: `translateX(${offsetX}px)`,
            transition: withTransition ? 'transform 300ms ease' : 'none',
          }}
        >
          <div className="flex-none h-full" style={{ width: panelWidth ? `${panelWidth}px` : '100%' }}>
            {renderItem(items[prevIdx], prevIdx)}
          </div>
          <div className="flex-none h-full" style={{ width: panelWidth ? `${panelWidth}px` : '100%' }}>
            {renderItem(items[index], index)}
          </div>
          <div className="flex-none h-full" style={{ width: panelWidth ? `${panelWidth}px` : '100%' }}>
            {renderItem(items[nextIdx], nextIdx)}
          </div>
        </div>
      </div>

      {showArrows && items.length > 1 && (
        <>
          <button onClick={() => animateDirection(-1)} aria-label="prev" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md">‹</button>
          <button onClick={() => animateDirection(1)} aria-label="next" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md">›</button>
        </>
      )}

      {showDots && items.length > 1 && (
          <div className="flex justify-center gap-3 mt-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const nextI = (index + 1) % items.length;
                const prevI = (index - 1 + items.length) % items.length;
                if (i === nextI) animateDirection(1);
                else if (i === prevI) animateDirection(-1);
                else goto(i);
              }}
              aria-label={`Go to ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-emerald-800 scale-110' : 'bg-gray-300'}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
