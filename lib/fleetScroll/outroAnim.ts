import { getGsap } from "@/lib/gsapCore";
import { OUTRO_FEATURE_STAGGER, OUTRO_START_PROGRESS } from "./constants";
import { easeOutQuart } from "./easing";
import { drawFrameToCanvas } from "./drawFrame";
import { measureTruckFrame } from "./truckFrame";
import type { FleetScrollActions, FleetScrollDom, FleetScrollRuntime } from "./types";

function setFeatureTab(item: HTMLElement, progress: number) {
  const { gsap } = getGsap();
  const tab = item.querySelector<HTMLElement>(".scroll-sequence__feature-tab");
  if (!tab) return;
  gsap.set(tab, { y: `${70 * (1 - progress)}%` });
}

function setVehiclePanel(dom: FleetScrollDom, progress: number) {
  if (!dom.vehiclePanel) return;
  const { gsap } = getGsap();
  gsap.set(dom.vehiclePanel, { opacity: progress, y: 14 * (1 - progress) });
}

export function hideOutro(dom: FleetScrollDom, runtime: FleetScrollRuntime, actions: FleetScrollActions) {
  const { gsap } = getGsap();
  if (!runtime.mobileOutroActive) return;
  actions.setOutroActive(false);
  dom.outroLayer.style.visibility = "hidden";
  dom.outroLayer.setAttribute("aria-hidden", "true");
  gsap.set(dom.outro, { opacity: 0, y: 20 });
  gsap.set(dom.featureItems, { opacity: 0, y: 18, scale: 0.92 });
  dom.featureItems.forEach((item) => setFeatureTab(item, 0));
  setVehiclePanel(dom, 0);
  measureTruckFrame(dom, false, runtime.mobileTruckSlot, actions.setFrame, actions.setSlot);
  if (runtime.frameIndex >= 0) {
    drawFrameToCanvas(dom, runtime.frameIndex, runtime.images, runtime.activeTruckFrame, runtime.mobileTruckSlot);
  }
}

export function setOutroAnimation(
  dom: FleetScrollDom, frameProgress: number, runtime: FleetScrollRuntime, actions: FleetScrollActions,
) {
  const { gsap } = getGsap();
  if (frameProgress < OUTRO_START_PROGRESS) {
    hideOutro(dom, runtime, actions);
    return;
  }
  const entering = !runtime.mobileOutroActive;
  const raw = (frameProgress - OUTRO_START_PROGRESS) / (1 - OUTRO_START_PROGRESS);
  const eased = easeOutQuart(Math.min(1, Math.max(0, raw)));
  actions.setOutroActive(true);
  if (entering) {
    dom.outroLayer.style.visibility = "visible";
    dom.outroLayer.setAttribute("aria-hidden", "false");
    measureTruckFrame(dom, true, runtime.mobileTruckSlot, actions.setFrame, actions.setSlot);
  }
  if (runtime.frameIndex >= 0) {
    drawFrameToCanvas(dom, runtime.frameIndex, runtime.images, runtime.activeTruckFrame, runtime.mobileTruckSlot);
  }
  gsap.set(dom.outro, { opacity: eased, y: 20 * (1 - eased) });
  setVehiclePanel(dom, eased);
  dom.featureItems.forEach((item, index) => {
    const stagger = index * OUTRO_FEATURE_STAGGER;
    const itemProgress = Math.min(1, Math.max(0, (raw - stagger) / (1 - stagger)));
    const itemEased = easeOutQuart(itemProgress);
    const tabDelay = stagger + 0.05;
    const tabProgress = Math.min(1, Math.max(0, (raw - tabDelay) / (1 - tabDelay)));
    gsap.set(item, { opacity: itemEased, y: 18 * (1 - itemEased), scale: 0.92 + 0.08 * itemEased });
    setFeatureTab(item, easeOutQuart(tabProgress));
  });
}
