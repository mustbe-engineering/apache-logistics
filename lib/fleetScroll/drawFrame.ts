import { SCENE_BG } from "./constants";
import { getCoverDraw } from "./coverDraw";
import { getViewportTier } from "./truckFrame";
import type { FleetScrollDom, MobileTruckSlot, TruckFrameConfig } from "./types";

type DrawRect = { offsetX: number; offsetY: number; drawWidth: number; drawHeight: number };

function paintDesktopBottomFade(ctx: CanvasRenderingContext2D, width: number, height: number, imageBottom: number) {
  const bleed = Math.min(168, Math.max(88, height * 0.14));
  const fadeStart = Math.max(0, imageBottom - bleed);
  const gradient = ctx.createLinearGradient(0, fadeStart, 0, height);
  gradient.addColorStop(0, "rgba(232, 232, 232, 0)");
  gradient.addColorStop(0.34, "rgba(232, 232, 232, 0.28)");
  gradient.addColorStop(0.62, "rgba(232, 232, 232, 0.72)");
  gradient.addColorStop(0.84, "rgba(232, 232, 232, 0.94)");
  gradient.addColorStop(1, "rgba(232, 232, 232, 1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, fadeStart, width, height - fadeStart);
}

function paintSoftEdgeFade(ctx: CanvasRenderingContext2D, rect: DrawRect) {
  const { offsetX: x, offsetY: y, drawWidth: w, drawHeight: h } = rect;
  const bleed = Math.min(110, Math.max(56, Math.min(w, h) * 0.09));
  const stops = (g: CanvasGradient) => {
    g.addColorStop(0, "rgba(232, 232, 232, 1)");
    g.addColorStop(0.45, "rgba(232, 232, 232, 0.45)");
    g.addColorStop(1, "rgba(232, 232, 232, 0)");
  };
  let g = ctx.createLinearGradient(x, y, x + bleed, y);
  stops(g); ctx.fillStyle = g; ctx.fillRect(x, y, bleed, h);
  g = ctx.createLinearGradient(x + w, y, x + w - bleed, y);
  stops(g); ctx.fillStyle = g; ctx.fillRect(x + w - bleed, y, bleed, h);
  g = ctx.createLinearGradient(x, y, x, y + bleed);
  stops(g); ctx.fillStyle = g; ctx.fillRect(x, y, w, bleed);
  g = ctx.createLinearGradient(x, y + h, x, y + h - bleed);
  stops(g); ctx.fillStyle = g; ctx.fillRect(x, y + h - bleed, w, bleed);
}

function patchBottomGap(
  ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number,
  offsetX: number, offsetY: number, drawWidth: number, drawHeight: number,
) {
  const bottomGap = height - (offsetY + drawHeight);
  if (bottomGap <= 0.5 || bottomGap > 52) return;
  const scaleY = drawHeight / image.naturalHeight;
  const srcStripH = Math.max(1, Math.ceil(bottomGap / scaleY));
  ctx.drawImage(image, 0, image.naturalHeight - srcStripH, image.naturalWidth, srcStripH, offsetX, offsetY + drawHeight, drawWidth, bottomGap);
}

function syncFleetDrawRect(dom: FleetScrollDom, rect: DrawRect) {
  const root = dom.sticky;
  root.style.setProperty("--fleet-draw-x", `${rect.offsetX}px`);
  root.style.setProperty("--fleet-draw-y", `${rect.offsetY}px`);
  root.style.setProperty("--fleet-draw-w", `${rect.drawWidth}px`);
  root.style.setProperty("--fleet-draw-h", `${rect.drawHeight}px`);
}

export function drawFrameToCanvas(
  dom: FleetScrollDom, index: number, images: (HTMLImageElement | undefined)[],
  frame: TruckFrameConfig, mobileTruckSlot: MobileTruckSlot | null,
) {
  const image = images[index];
  if (!image?.complete || !image.naturalWidth) return;
  const width = dom.canvas.clientWidth;
  const height = dom.canvas.clientHeight;
  const rect = getCoverDraw(image, width, height, frame, mobileTruckSlot);
  dom.ctx.fillStyle = SCENE_BG;
  dom.ctx.fillRect(0, 0, width, height);
  dom.ctx.drawImage(image, rect.offsetX, rect.offsetY, rect.drawWidth, rect.drawHeight);
  paintSoftEdgeFade(dom.ctx, rect);
  syncFleetDrawRect(dom, rect);
  const imageBottom = rect.offsetY + rect.drawHeight;
  if (getViewportTier(width) === "desktop") paintDesktopBottomFade(dom.ctx, width, height, imageBottom);
  else patchBottomGap(dom.ctx, image, width, height, rect.offsetX, rect.offsetY, rect.drawWidth, rect.drawHeight);
}
