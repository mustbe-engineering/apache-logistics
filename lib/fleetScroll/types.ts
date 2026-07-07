export type FitMode = "cover" | "contain" | "slot" | "slotCover";

export type TruckFrameConfig = {
  focusX: number;
  focusY: number;
  scaleBoost: number;
  viewOffsetY: number;
  fitMode: FitMode;
};

export type MobileTruckSlot = {
  top: number;
  bottom: number;
  height: number;
  centerY: number;
};

export type FleetScrollRuntime = {
  frameIndex: number;
  images: (HTMLImageElement | undefined)[];
  loaded: Set<number>;
  activeTruckFrame: TruckFrameConfig;
  mobileTruckSlot: MobileTruckSlot | null;
  mobileOutroActive: boolean;
};

export type FleetScrollActions = {
  setOutroActive: (v: boolean) => void;
  setSlot: (s: MobileTruckSlot | null) => void;
  setFrame: (f: TruckFrameConfig) => void;
};

export type FleetScrollDom = {
  section: HTMLElement;
  sticky: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  fallback: HTMLImageElement;
  title: HTMLElement;
  titleLineWraps: NodeListOf<HTMLElement>;
  titleRevealLines: NodeListOf<HTMLElement>;
  outroLayer: HTMLElement;
  outro: HTMLElement;
  featuresWrap: HTMLElement | null;
  featuresCarousel: HTMLElement | null;
  featureItems: NodeListOf<HTMLElement>;
  loader: HTMLElement;
};

