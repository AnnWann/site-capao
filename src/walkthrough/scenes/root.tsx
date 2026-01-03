import type { JSX } from 'react';
import type { WalkthroughScene, WalkthroughSceneComponentProps } from '../WalkthroughScene';
import { Footprints, ArrowRight } from 'lucide-react';
import { WalkthroughPillButton } from '../../components/WalkthroughPill';

function RootSceneView({ scene, goTo }: WalkthroughSceneComponentProps): JSX.Element {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,520px)] pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-center gap-2 flex-wrap">
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

export const buildRootScene = (): WalkthroughScene => ({
  id: 'root',
  walkthrough: 'Walkthrough',
  place: 'Entrada',
  description: 'Ponto inicial do percurso. (Estrutura de navegação — conteúdo real depois.)',
  imageSrc: '/fotos/Portao.avif',
  routes: [
    { label: 'Portão', to: { id: 'gate' } },
    { label: 'Trilha', to: { id: 'trail' } },
  ],
  Scene: RootSceneView,
});
