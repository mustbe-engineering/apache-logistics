import { fleetFrames } from "@/lib/fleetFrames";
import { TOTAL_TRAVEL_PX } from "./constants";
import { getFleetScrollDom } from "./dom";
import { initFeaturesDragScroll } from "./featuresDrag";
import { loadFrameImage } from "./images";
import { hideTitle } from "./titleAnim";
import { setOutroAnimation } from "./outroAnim";
import { updateFromScroll } from "./scrollUpdate";
import { drawFrameToCanvas } from "./drawFrame";
import { measureTruckFrame, getViewportTier } from "./truckFrame";
import { TRUCK_FRAME } from "./constants";
import { loadGsap } from "@/lib/gsapCore";
import { scheduleIdle } from "@/lib/scheduleIdle";
import { scheduleScrollRefresh } from "@/lib/scheduleScrollRefresh";
import type { FleetScrollActions, FleetScrollRuntime, TruckFrameConfig } from "./types";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function encodePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export async function createFleetScrollSequence(section: HTMLElement) {
  const dom = getFleetScrollDom(section);
  if (!dom) return () => {};
  const { ScrollTrigger } = await loadGsap();
  const runtime: FleetScrollRuntime = {
    frameIndex: -1, images: [], loaded: new Set(), activeTruckFrame: { ...TRUCK_FRAME.desktop },
    mobileTruckSlot: null, mobileOutroActive: false,
  };
  const actions: FleetScrollActions = {
    setOutroActive: (v) => { runtime.mobileOutroActive = v; },
    setSlot: (s) => { runtime.mobileTruckSlot = s; },
    setFrame: (f: TruckFrameConfig) => { runtime.activeTruckFrame = f; },
  };
  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = dom.sticky.getBoundingClientRect();
    measureTruckFrame(dom, runtime.mobileOutroActive, runtime.mobileTruckSlot, actions.setFrame, actions.setSlot);
    dom.canvas.width = Math.round(width * dpr);
    dom.canvas.height = Math.round(height * dpr);
    dom.canvas.style.width = `${width}px`;
    dom.canvas.style.height = `${height}px`;
    dom.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (runtime.frameIndex >= 0 && runtime.images[runtime.frameIndex]?.complete) {
      drawFrameToCanvas(dom, runtime.frameIndex, runtime.images, runtime.activeTruckFrame, runtime.mobileTruckSlot);
    }
  };
  const setSectionHeight = () => {
    const unit = getViewportTier(window.innerWidth) === "desktop" ? "100vh" : "100dvh";
    dom.section.style.height = `calc(${unit} + ${TOTAL_TRAVEL_PX}px)`;
  };
  const showStaticFallback = (src: string) => {
    dom.canvas.hidden = true;
    dom.fallback.hidden = false;
    dom.fallback.src = encodePath(src);
    hideTitle(dom);
    measureTruckFrame(dom, true, runtime.mobileTruckSlot, actions.setFrame, actions.setSlot);
    setOutroAnimation(dom, 1, runtime, actions);
    section.classList.add("is-ready");
  };
  setSectionHeight();
  const cleanupDrag = initFeaturesDragScroll(dom.featuresCarousel);
  if (prefersReducedMotion()) {
    showStaticFallback(fleetFrames[fleetFrames.length - 1]);
    return () => cleanupDrag();
  }
  const first = await loadFrameImage(fleetFrames[0]);
  if (first) { runtime.images[0] = first; runtime.loaded.add(0); }
  updateFromScroll(dom, 0, runtime, actions);
  resizeCanvas();
  section.classList.add("is-ready");
  const trigger = ScrollTrigger.create({
    trigger: section, start: "top top", end: "bottom bottom", scrub: 1.4,
    onUpdate: (self) => updateFromScroll(dom, self.progress * TOTAL_TRAVEL_PX, runtime, actions),
  });
  scheduleScrollRefresh();
  const queue = fleetFrames.slice(1).map((src, index) => ({ src, index: index + 1 }));
  const loadNext = () => {
    const batch = queue.splice(0, 3);
    if (!batch.length) return;
    void Promise.all(batch.map(({ src, index }) => loadFrameImage(src).then((image) => {
      if (!image) return;
      runtime.images[index] = image;
      runtime.loaded.add(index);
    }))).finally(() => {
      if (queue.length) scheduleIdle(loadNext, 1200);
    });
  };
  scheduleIdle(loadNext, 800);
  const onResize = () => { setSectionHeight(); resizeCanvas(); scheduleScrollRefresh(); };
  window.addEventListener("resize", onResize);
  return () => { trigger.kill(); window.removeEventListener("resize", onResize); cleanupDrag(); };
}
