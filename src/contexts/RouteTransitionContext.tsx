import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Rect = { top: number; left: number; width: number; height: number };

type TransitionState =
  | { active: false }
  | {
      active: true;
      imageSrc: string;
      from: Rect;
      expanded: boolean;
      fadingOut: boolean;
    };

type RouteTransitionApi = {
  startImageExpand: (from: Rect, imageSrc: string) => void;
  fadeOut: () => void;
  state: TransitionState;
};

const RouteTransitionContext = createContext<RouteTransitionApi | null>(null);

export function useRouteTransition(): RouteTransitionApi {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) {
    return {
      startImageExpand: () => {},
      fadeOut: () => {},
      state: { active: false },
    };
  }
  return ctx;
}

type Props = { children: ReactNode };

export function RouteTransitionProvider({ children }: Props) {
  const [state, setState] = useState<TransitionState>({ active: false });

  const startImageExpand = (from: Rect, imageSrc: string) => {
    setState({ active: true, from, imageSrc, expanded: false, fadingOut: false });
  };

  // Kick expansion on next frame so the browser can animate from the initial rect.
  useEffect(() => {
    if (!state.active) return;
    if (state.expanded) return;

    const raf = window.requestAnimationFrame(() => {
      setState((s) => (s.active ? { ...s, expanded: true } : s));
    });

    return () => window.cancelAnimationFrame(raf);
  }, [state]);

  const fadeOut = () => {
    setState((s) => (s.active ? { ...s, fadingOut: true } : s));
  };

  // Clear after fade out completes.
  useEffect(() => {
    if (!state.active) return;
    if (!state.fadingOut) return;

    const t = window.setTimeout(() => {
      setState({ active: false });
    }, 320);

    return () => window.clearTimeout(t);
  }, [state]);

  const value = useMemo<RouteTransitionApi>(
    () => ({ startImageExpand, fadeOut, state }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <RouteTransitionContext.Provider value={value}>{children}</RouteTransitionContext.Provider>;
}

export function RouteTransitionOverlay(): ReactNode {
  const { state } = useRouteTransition();
  if (!state.active) return null;

  // Expand to "almost" full screen.
  const to = { top: '2vh', left: '2vw', width: '96vw', height: '96vh', borderRadius: 24 };

  const style: any = {
    position: 'fixed',
    zIndex: 100,
    overflow: 'hidden',
    top: state.expanded ? to.top : state.from.top,
    left: state.expanded ? to.left : state.from.left,
    width: state.expanded ? to.width : state.from.width,
    height: state.expanded ? to.height : state.from.height,
    borderRadius: state.expanded ? to.borderRadius : 9999,
    transition: 'top 520ms ease-in-out, left 520ms ease-in-out, width 520ms ease-in-out, height 520ms ease-in-out, border-radius 520ms ease-in-out, opacity 300ms ease-in-out',
    opacity: state.fadingOut ? 0 : 1,
    pointerEvents: 'none',
    backgroundImage: `url('${state.imageSrc}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={style}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
    </div>
  );
}
