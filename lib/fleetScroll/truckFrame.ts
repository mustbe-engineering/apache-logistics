import { TRUCK_FRAME } from "./constants";
import type { FleetScrollDom, MobileTruckSlot, TruckFrameConfig } from "./types";

export function getViewportTier(width: number) {
  if (width <= 767) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
}

export function syncTruckObjectPosition(
  dom: FleetScrollDom,
  focusY: number,
  viewOffsetY: number,
  mobileOutroActive: boolean,
  mobileTruckSlot: MobileTruckSlot | null,
) {
  const viewportHeight = dom.sticky.clientHeight || window.innerHeight;
  let objectY: number;
  const mobile = getViewportTier(dom.sticky.clientWidth) === "mobile";
  if (mobile && mobileTruckSlot) {
    objectY = Math.round(Math.min(72, Math.max(50, (mobileTruckSlot.centerY / viewportHeight) * 100)));
  } else {
    objectY = Math.round(Math.min(72, Math.max(50, (focusY - viewOffsetY * 0.45) * 100)));
  }
  const position = `center ${objectY}%`;
  dom.fallback.style.objectPosition = position;
  dom.sticky.style.setProperty("--truck-object-y", position);
}

export function measureTruckFrame(
  dom: FleetScrollDom,
  mobileOutroActive: boolean,
  mobileTruckSlot: MobileTruckSlot | null,
  setActive: (f: TruckFrameConfig) => void,
  setSlot: (s: MobileTruckSlot | null) => void,
) {
  const width = dom.sticky.clientWidth;
  const height = dom.sticky.clientHeight || window.innerHeight;
  const tier = getViewportTier(width);
  const base = { ...TRUCK_FRAME[tier] };
  if (tier === "desktop") {
    setActive(base);
    setSlot(null);
    syncTruckObjectPosition(dom, base.focusY, base.viewOffsetY, mobileOutroActive, null);
    return;
  }
  const layerStyle = getComputedStyle(dom.outroLayer);
  const paddingTop = parseFloat(layerStyle.paddingTop) || 0;
  const paddingBottom = parseFloat(layerStyle.paddingBottom) || 0;
  const outroHeight = dom.outro.offsetHeight || 0;
  const featuresHeight = dom.featuresWrap?.offsetHeight || 0;
  const gapBuffer = height * (tier === "mobile" ? 0.035 : 0.045);
  const topBoundary = paddingTop + outroHeight + gapBuffer;
  const bottomBoundary = height - paddingBottom - featuresHeight - gapBuffer;
  const slotHeight = Math.max(160, bottomBoundary - topBoundary);
  const middleCenter = topBoundary + slotHeight / 2;
  const centerDelta = middleCenter / height - 0.5;
  if (tier === "mobile") {
    const slot = { top: topBoundary, bottom: bottomBoundary, height: slotHeight, centerY: middleCenter };
    setSlot(slot);
    setActive({ ...base, fitMode: "slotCover", focusX: 0.5, focusY: 0.578, scaleBoost: 0.56, viewOffsetY: 0 });
    syncTruckObjectPosition(dom, base.focusY, base.viewOffsetY, mobileOutroActive, slot);
    return;
  }
  setSlot(null);
  setActive({
    ...base,
    focusY: Math.min(0.68, Math.max(0.56, base.focusY + centerDelta * 0.18)),
    viewOffsetY: Math.min(0.02, Math.max(-0.18, base.viewOffsetY - centerDelta * 0.5)),
  });
  syncTruckObjectPosition(dom, base.focusY, base.viewOffsetY, mobileOutroActive, null);
}
