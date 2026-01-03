import type { JSX } from 'react';
import { ArrowLeft, ArrowRight, Footprints } from 'lucide-react';
import { WalkthroughPillButton } from '../components/WalkthroughPill';
import type { WalkthroughNode, WalkthroughNodeRef, WalkthroughParams } from './WalkthroughNode';

type Props = {
  node: WalkthroughNode;
  params?: WalkthroughParams;
  canGoBack: boolean;
  back: () => void;
  goTo: (next: WalkthroughNodeRef) => void;
};

export default function WalkthroughSceneView({ node, params, canGoBack, back, goTo }: Props): JSX.Element {
  // Params are intentionally unused for now; they exist so we can evolve nodes later.
  void params;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,520px)] pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-center gap-2 flex-wrap">
        {canGoBack ? (
          <WalkthroughPillButton onClick={back}>
            <ArrowLeft size={16} className="text-white/85" aria-hidden />
            <span className="text-sm">Voltar</span>
          </WalkthroughPillButton>
        ) : null}

        {node.children.map((child) => (
          <WalkthroughPillButton key={child.id} onClick={() => goTo({ id: child.id })}>
            <Footprints size={18} className="text-white/90" aria-hidden />
            <span className="text-sm">{child.place}</span>
            <ArrowRight size={16} className="text-white/80" aria-hidden />
          </WalkthroughPillButton>
        ))}
      </div>
    </div>
  );
}
