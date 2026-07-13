import type { FleetScrollDom } from "./types";

export function getFleetScrollDom(section: HTMLElement): FleetScrollDom | null {
  const canvas = section.querySelector<HTMLCanvasElement>(".scroll-sequence__canvas");
  const ctx = canvas?.getContext("2d");
  const sticky = section.querySelector<HTMLElement>(".scroll-sequence__sticky");
  const fallback = section.querySelector<HTMLImageElement>(".scroll-sequence__fallback");
  const title = section.querySelector<HTMLElement>(".scroll-sequence__title");
  const outroLayer = section.querySelector<HTMLElement>(".scroll-sequence__outro-layer");
  const outro = section.querySelector<HTMLElement>(".scroll-sequence__outro");
  const loader = section.querySelector<HTMLElement>(".scroll-sequence__loader");
  if (!canvas || !ctx || !sticky || !fallback || !title || !outroLayer || !outro || !loader) return null;
  const titleLineWraps = section.querySelectorAll<HTMLElement>(".scroll-sequence__title-line-wrap");
  const titleRevealLines = section.querySelectorAll<HTMLElement>(".scroll-sequence__title-line--reveal");
  const featureItems = section.querySelectorAll<HTMLElement>(".scroll-sequence__feature");
  if (!titleLineWraps.length || !titleRevealLines.length || !featureItems.length) return null;
  return {
    section, sticky, canvas, ctx, fallback, title, titleLineWraps, titleRevealLines,
    outroLayer, outro,
    featuresWrap: section.querySelector<HTMLElement>(".scroll-sequence__features-wrap"),
    featuresCarousel: section.querySelector<HTMLElement>(".scroll-sequence__features"),
    featureItems,
    vehiclePanel: section.querySelector<HTMLElement>(".scroll-sequence__vehicle-panel"),
    loader,
  };
}
