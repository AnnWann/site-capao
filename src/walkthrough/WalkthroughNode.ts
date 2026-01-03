export type WalkthroughParams = Record<string, unknown>;

export type WalkthroughNodeRef = {
  id: string;
  params?: WalkthroughParams;
};

export type WalkthroughNode = {
  id: string;
  place: string;
  description?: string;
  imageSrc: string;
  children: WalkthroughNode[];
};
