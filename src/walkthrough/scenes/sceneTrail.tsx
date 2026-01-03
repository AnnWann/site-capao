import type { JSX } from 'react';
import type { WalkthroughScene, WalkthroughSceneComponentProps } from '../WalkthroughScene';
import { Footprints, ArrowRight, ArrowLeft } from 'lucide-react';
import { WalkthroughPillButton } from '../../components/WalkthroughPill';

function TrailSceneView({ scene, goTo, back, canGoBack }: WalkthroughSceneComponentProps): JSX.Element {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,520px)] pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-center gap-2 flex-wrap">
        {canGoBack ? (
          <WalkthroughPillButton onClick={back}>
            <ArrowLeft size={16} className="text-white/85" aria-hidden />
            <span className="text-sm">Voltar</span>
          </WalkthroughPillButton>
        ) : null}

        {scene.routes.map((route) => {
          return (
            <WalkthroughPillButton
              key={route.label}
              onClick={() => goTo(route.to)}
            >
              <Footprints size={18} className="text-white/90" aria-hidden />
              <span className="text-sm">{route.label}</span>
              <ArrowRight size={16} className="text-white/80" aria-hidden />
            </WalkthroughPillButton>
          );
        })}
      </div>
    </div>
  );
}

export const buildTrailScene = (): WalkthroughScene => ({
  id: 'trail',
  walkthrough: 'Walkthrough',
  place: 'Trilha',
  description: 'Cena de exemplo para demonstrar múltiplas rotas e backtracking.',
  imageSrc: '/fotos/TrilhaEntrada.avif',
  routes: [
    { label: 'Portão', to: { id: 'gate' } },
    { label: 'Entrada', to: { id: 'root' } },
  ],
  Scene: TrailSceneView,
});
