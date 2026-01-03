import { type JSX, useMemo, useState } from 'react';
import type { WalkthroughScene, WalkthroughSceneRef } from './WalkthroughScene';
import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { WalkthroughPillButton, WalkthroughPillLabel } from '../components/WalkthroughPill';
import WalkthroughViewport from './WalkthroughViewport';
import { getWalkthroughScene } from './sceneRegistry';

type Props = {
  initial: WalkthroughSceneRef;
  dragHintText: string;
};

export default function WalkthroughRunner({ initial, dragHintText }: Props): JSX.Element {
  const [stack, setStack] = useState<WalkthroughSceneRef[]>(() => [initial]);

  const currentRef = stack[stack.length - 1];
  const canGoBack = stack.length > 1;

  const goTo = (next: WalkthroughSceneRef) => {
    setStack((prev) => [...prev, next]);
  };

  const back = () => {
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  };

  const restart = () => {
    setStack([initial]);
  };

  const scene = useMemo<WalkthroughScene | null>(() => {
    try {
      return getWalkthroughScene(currentRef);
    } catch {
      return null;
    }
  }, [currentRef]);

  const imageSrc = scene?.imageSrc ?? '';

  if (!scene) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,520px)] pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-center gap-2 flex-wrap">
          <WalkthroughPillLabel>
            <AlertTriangle size={18} className="text-white/90" aria-hidden />
            <span className="text-sm">Erro ao carregar cena</span>
          </WalkthroughPillLabel>

          {canGoBack ? (
            <WalkthroughPillButton onClick={back}>
              <ArrowLeft size={16} className="text-white/85" aria-hidden />
              <span className="text-sm">Voltar</span>
            </WalkthroughPillButton>
          ) : null}

          <WalkthroughPillButton onClick={restart}>
            <RotateCcw size={16} className="text-white/85" aria-hidden />
            <span className="text-sm">Reiniciar</span>
          </WalkthroughPillButton>
        </div>
      </div>
    );
  }

  return (
    <WalkthroughViewport imageSrc={imageSrc} dragHintText={dragHintText}>
      <scene.Scene scene={scene} imageSrc={imageSrc} goTo={goTo} back={back} canGoBack={canGoBack} />
    </WalkthroughViewport>
  );
}
