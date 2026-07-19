import { getGsap } from "@/lib/gsapCore";
import { REVEAL_MASK_FEATHER, TITLE_LINE_STAGGER } from "./constants";
import { easeOutQuart, organicEase } from "./easing";
import type { FleetScrollDom } from "./types";

function lineReveal(global: number, lineIndex: number, count: number) {
  const raw = Math.min(1, Math.max(0, global));
  const segment = 1 / count;
  const start = lineIndex * segment;
  const end = (lineIndex + 1) * segment;
  if (raw <= start) return 0;
  if (raw >= end) return 1;
  return (raw - start) / segment;
}

function applyReveal(line: HTMLElement, progress: number) {
  const { gsap } = getGsap();
  const eased = organicEase(progress);
  if (eased <= 0) {
    gsap.set(line, { opacity: 0, clipPath: "inset(0 100% 0 0)", WebkitMaskImage: "none", maskImage: "none" });
    return;
  }
  if (eased >= 1) {
    gsap.set(line, { opacity: 1, clipPath: "inset(0 0% 0 0)", WebkitMaskImage: "none", maskImage: "none" });
    return;
  }
  const edge = eased * 100;
  const mask = `linear-gradient(to right, #000 ${edge}%, transparent ${Math.min(100, edge + REVEAL_MASK_FEATHER)}%)`;
  gsap.set(line, { opacity: 0.76 + eased * 0.24, clipPath: "none", WebkitMaskImage: mask, maskImage: mask });
}

export function setRevealState(dom: FleetScrollDom, revealProgress: number) {
  const { gsap } = getGsap();
  const count = dom.titleLineWraps.length;
  dom.title.style.visibility = "visible";
  dom.titleLineWraps.forEach((wrap, index) => {
    gsap.set(wrap, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
    applyReveal(dom.titleRevealLines[index], lineReveal(revealProgress, index, count));
  });
}

export function setTitleFade(dom: FleetScrollDom, fadeProgress: number) {
  const { gsap } = getGsap();
  dom.title.style.visibility = "visible";
  const raw = Math.min(1, Math.max(0, fadeProgress));
  dom.titleLineWraps.forEach((wrap, index) => {
    applyReveal(dom.titleRevealLines[index], 1);
    const stagger = index * TITLE_LINE_STAGGER;
    const lineProgress = Math.min(1, Math.max(0, (raw - stagger) / (1 - stagger)));
    const eased = easeOutQuart(lineProgress);
    gsap.set(wrap, { opacity: 1 - eased, y: -36 * eased, scale: 1 - 0.06 * eased, filter: `blur(${12 * eased}px)` });
  });
}

export function hideTitle(dom: FleetScrollDom) {
  const { gsap } = getGsap();
  dom.title.style.visibility = "hidden";
  gsap.set(dom.titleLineWraps, { opacity: 0, y: -36, scale: 0.94, filter: "blur(12px)" });
}
