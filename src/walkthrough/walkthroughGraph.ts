import type { WalkthroughNode, WalkthroughNodeRef } from './WalkthroughNode';
import { defineWalkthroughGraph, scene } from './walkthroughGraphBuilder';

export const WALKTHROUGH_ROOT: WalkthroughNodeRef = { id: 'root' };

const built = defineWalkthroughGraph({
  root: 'root',
  scenes: {
    root: scene({
      id: 'root',
      place: 'Entrada',
      description: 'Ponto inicial do percurso. (Estrutura de navegação — conteúdo real depois.)',
      imageSrc: '/fotos/Portao.avif',
    }),
    gate: scene({
      id: 'gate',
      place: 'Portão',
      description: 'Cena de exemplo. Cada nó decide para onde pode seguir.',
      imageSrc: '/fotos/Portao.avif',
    }),
    trail: scene({
      id: 'trail',
      place: 'Trilha',
      description: 'Cena de exemplo para demonstrar rotas e backtracking.',
      imageSrc: '/fotos/TrilhaEntrada.avif',
    }),
  },
  links: {
    root: ['gate', 'trail'],
    gate: [],
    trail: [],
  },
});

export const walkthroughRootNode: WalkthroughNode = built.rootNode;
export const walkthroughNodeById = built.nodeById;

export function getWalkthroughNode(ref: WalkthroughNodeRef): WalkthroughNode {
  const node = walkthroughNodeById[ref.id];
  if (!node) throw new Error(`Unknown walkthrough node id: ${ref.id}`);
  return node;
}
