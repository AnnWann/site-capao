import type { WalkthroughScene, WalkthroughSceneId, WalkthroughSceneParams, WalkthroughSceneRef } from './WalkthroughScene';
import { buildGateScene } from './scenes/sceneGate';
import { buildRootScene } from './scenes/root';
import { buildTrailScene } from './scenes/sceneTrail';

export const WALKTHROUGH_ROOT: WalkthroughSceneRef = { id: 'root' };

const registry: Record<WalkthroughSceneId, (params?: WalkthroughSceneParams) => WalkthroughScene> = {
  root: buildRootScene,
  gate: buildGateScene,
  trail: buildTrailScene,
};

export function getWalkthroughScene(ref: WalkthroughSceneRef): WalkthroughScene {
  const builder = registry[ref.id];
  if (!builder) {
    throw new Error(`Unknown scene id: ${ref.id}`);
  }
  return builder(ref.params);
}
