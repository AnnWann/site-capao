import type { JSX } from 'react';

export type WalkthroughSceneId = string;

export type WalkthroughSceneParams = Record<string, unknown>;

export type WalkthroughSceneRef = {
  id: WalkthroughSceneId;
  params?: WalkthroughSceneParams;
};

export type WalkthroughRoute = {
  label: string;
  to: WalkthroughSceneRef;
};

export type WalkthroughScene = {
  id: WalkthroughSceneId;
  // Scene title / label (kept as "walkthrough" per spec)
  walkthrough: string;
  place: string;
  description: string;
  imageSrc: string;
  routes: WalkthroughRoute[];
  Scene: (props: WalkthroughSceneComponentProps) => JSX.Element;
};

export type WalkthroughSceneComponentProps = {
  scene: WalkthroughScene;
  imageSrc: string;
  goTo: (next: WalkthroughSceneRef) => void;
  back: () => void;
  canGoBack: boolean;
};
