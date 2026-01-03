import type { WalkthroughNode, WalkthroughNodeRef } from './WalkthroughNode';

export const WALKTHROUGH_ROOT: WalkthroughNodeRef = { id: 'root' };

export const walkthroughRootNode: WalkthroughNode = {
  id: 'root',
  place: 'Entrada',
  description: 'Ponto inicial do percurso. (Estrutura de navegação — conteúdo real depois.)',
  imageSrc: '/fotos/Portao.avif',
  children: [
    {
      id: 'gate',
      place: 'Portão',
      description: 'Cena de exemplo. Cada nó decide para onde pode seguir.',
      imageSrc: '/fotos/Portao.avif',
      children: [],
    },
    {
      id: 'trail',
      place: 'Trilha',
      description: 'Cena de exemplo para demonstrar rotas e backtracking.',
      imageSrc: '/fotos/TrilhaEntrada.avif',
      children: [],
    },
  ],
};

function buildNodeIndex(root: WalkthroughNode): Record<string, WalkthroughNode> {
  const byId: Record<string, WalkthroughNode> = {};
  const stack: WalkthroughNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    if (byId[node.id]) {
      throw new Error(`Duplicate walkthrough node id: ${node.id}`);
    }
    byId[node.id] = node;
    for (const child of node.children) stack.push(child);
  }

  return byId;
}

export const walkthroughNodeById = buildNodeIndex(walkthroughRootNode);

export function getWalkthroughNode(ref: WalkthroughNodeRef): WalkthroughNode {
  const node = walkthroughNodeById[ref.id];
  if (!node) throw new Error(`Unknown walkthrough node id: ${ref.id}`);
  return node;
}
