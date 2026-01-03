import type { WalkthroughNode } from './WalkthroughNode';

type SceneDef = Omit<WalkthroughNode, 'children'>;

type GraphInput<Id extends string> = {
  root: Id;
  scenes: Record<Id, SceneDef>;
  links?: Partial<Record<Id, readonly Id[]>>;
};

type BuiltGraph = {
  rootNode: WalkthroughNode;
  nodeById: Record<string, WalkthroughNode>;
};

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}

function computeParentCounts<Id extends string>(
  scenes: Record<Id, SceneDef>,
  links: Partial<Record<Id, readonly Id[]>>,
): Record<Id, number> {
  const counts = Object.fromEntries(Object.keys(scenes).map((id) => [id, 0])) as Record<Id, number>;

  for (const fromId of Object.keys(links) as Id[]) {
    if (!(fromId in scenes)) {
      throw new Error(`Walkthrough graph: link from unknown id: ${fromId}`);
    }

    const toIds = links[fromId] ?? [];
    for (const toId of toIds) {
      if (!(toId in scenes)) {
        throw new Error(`Walkthrough graph: link to unknown id: ${toId}`);
      }
      counts[toId] += 1;
    }
  }

  return counts;
}

function assertAcyclicAndReachable<Id extends string>(
  root: Id,
  scenes: Record<Id, SceneDef>,
  links: Partial<Record<Id, readonly Id[]>>,
): void {
  type State = 'unvisited' | 'visiting' | 'visited';
  const state = Object.fromEntries(Object.keys(scenes).map((id) => [id, 'unvisited'])) as Record<Id, State>;

  const path: Id[] = [];

  const visit = (id: Id) => {
    const s = state[id];
    switch (s) {
      case 'visited':
        return;
      case 'visiting': {
        const cycleStart = path.indexOf(id);
        const cycle = cycleStart >= 0 ? [...path.slice(cycleStart), id] : [...path, id];
        throw new Error(`Walkthrough graph: cycle detected: ${cycle.join(' -> ')}`);
      }
      case 'unvisited':
        break;
      default:
        assertNever(s);
    }

    state[id] = 'visiting';
    path.push(id);

    for (const child of links[id] ?? []) {
      visit(child);
    }

    path.pop();
    state[id] = 'visited';
  };

  if (!(root in scenes)) {
    throw new Error(`Walkthrough graph: root id not found in scenes: ${root}`);
  }

  visit(root);

  // Optional: warn on unreachable nodes (throw to keep it strict).
  const unreachable = (Object.keys(state) as Id[]).filter((id) => state[id] !== 'visited');
  if (unreachable.length) {
    throw new Error(`Walkthrough graph: unreachable scenes: ${unreachable.join(', ')}`);
  }
}

function buildTree<Id extends string>(
  root: Id,
  scenes: Record<Id, SceneDef>,
  links: Partial<Record<Id, readonly Id[]>>,
): WalkthroughNode {
  const cache = new Map<Id, WalkthroughNode>();

  const build = (id: Id): WalkthroughNode => {
    const existing = cache.get(id);
    if (existing) return existing;

    const def = scenes[id];
    const node: WalkthroughNode = {
      ...def,
      children: [],
    };

    cache.set(id, node);

    node.children = (links[id] ?? []).map((childId) => build(childId));

    return node;
  };

  return build(root);
}

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

export function defineWalkthroughGraph<const Id extends string>(input: GraphInput<Id>): BuiltGraph {
  const links = input.links ?? {};

  const parentCounts = computeParentCounts(input.scenes, links);

  // Preserve the current tree-based runtime: each node must have 0 or 1 parent (except root).
  for (const id of Object.keys(parentCounts) as Id[]) {
    const count = parentCounts[id];
    if (id === input.root) continue;
    if (count === 0) {
      throw new Error(`Walkthrough graph: scene '${id}' has no parent (not connected from root).`);
    }
    if (count > 1) {
      throw new Error(`Walkthrough graph: scene '${id}' has multiple parents (${count}). Tree required.`);
    }
  }

  assertAcyclicAndReachable(input.root, input.scenes, links);

  const rootNode = buildTree(input.root, input.scenes, links);
  const nodeById = buildNodeIndex(rootNode);

  return { rootNode, nodeById };
}

export function scene(def: SceneDef): SceneDef {
  return def;
}
