import { type JSX, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { WalkthroughPillButton, WalkthroughPillLabel } from '../components/WalkthroughPill';
import WalkthroughViewport from './WalkthroughViewport';
import WalkthroughSceneView from './WalkthroughSceneView';
import type { WalkthroughNodeRef } from './WalkthroughNode';
import { getWalkthroughNode } from './walkthroughGraph';

type Props = {
  initial: WalkthroughNodeRef;
  dragHintText: string;
};

export default function WalkthroughRunner({ initial, dragHintText }: Props): JSX.Element {
  const [stack, setStack] = useState<WalkthroughNodeRef[]>(() => [initial]);
  const [transitionToken, setTransitionToken] = useState(0);
  const [transitionKind, setTransitionKind] = useState<'forward' | 'back'>('forward');

  const currentRef = stack[stack.length - 1];
  const canGoBack = stack.length > 1;

  useEffect(() => {
    // Fire transitions after the new scene is actually current.
    setTransitionToken((t) => t + 1);
  }, [currentRef]);

  const goTo = (next: WalkthroughNodeRef) => {
    setTransitionKind('forward');
    setStack((prev) => [...prev, next]);
  };

  const back = () => {
    setTransitionKind('back');
    setStack((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  };

  const restart = () => {
    setTransitionKind('forward');
    setStack([initial]);
  };

  const node = useMemo(() => {
    try {
      return getWalkthroughNode(currentRef);
    } catch {
      return null;
    }
  }, [currentRef]);

  const imageSrc = node?.imageSrc ?? '';

  if (!node) {
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
    <WalkthroughViewport
      imageSrc={imageSrc}
      dragHintText={dragHintText}
      transitionKind={transitionKind}
      transitionToken={transitionToken}
    >
      <WalkthroughSceneView
        node={node}
        params={currentRef.params}
        canGoBack={canGoBack}
        back={back}
        goTo={goTo}
      />
    </WalkthroughViewport>
  );
}
