import type { MobileTruckSlot, TruckFrameConfig } from "./types";

type DrawRect = { offsetX: number; offsetY: number; drawWidth: number; drawHeight: number };

function slotCoverDraw(
  image: HTMLImageElement, width: number, slot: MobileTruckSlot, frame: TruckFrameConfig,
): DrawRect {
  // contain-then-boost so scaleBoost maps to visible size (max was already full-bleed)
  const fit = Math.min(width / image.naturalWidth, slot.height / image.naturalHeight);
  const scale = fit * frame.scaleBoost;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  let offsetX = width / 2 - drawWidth * frame.focusX;
  let offsetY = slot.centerY - drawHeight * frame.focusY;
  if (drawWidth <= width) offsetX = Math.max(0, Math.min(width - drawWidth, offsetX));
  if (drawHeight <= slot.height) offsetY = Math.max(slot.top, Math.min(slot.bottom - drawHeight, offsetY));
  return { offsetX, offsetY, drawWidth, drawHeight };
}

function slotDraw(image: HTMLImageElement, width: number, slot: MobileTruckSlot, frame: TruckFrameConfig): DrawRect {
  const scale = Math.min(width / image.naturalWidth, slot.height / image.naturalHeight) * frame.scaleBoost;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  let offsetY = slot.centerY - drawHeight * frame.focusY;
  offsetY = Math.max(slot.top, Math.min(slot.bottom - drawHeight, offsetY));
  return { offsetX: (width - drawWidth) / 2, offsetY, drawWidth, drawHeight };
}

export function getCoverDraw(
  image: HTMLImageElement, width: number, height: number,
  frame: TruckFrameConfig, mobileTruckSlot: MobileTruckSlot | null,
): DrawRect {
  const { focusX, focusY, scaleBoost, viewOffsetY, fitMode = "cover" } = frame;
  if (fitMode === "slotCover" && mobileTruckSlot) return slotCoverDraw(image, width, mobileTruckSlot, frame);
  if (fitMode === "slot" && mobileTruckSlot) return slotDraw(image, width, mobileTruckSlot, frame);
  const wR = width / image.naturalWidth;
  const hR = height / image.naturalHeight;
  const baseScale = fitMode === "contain" ? Math.min(wR, hR) : Math.max(wR, hR);
  const scale = baseScale * scaleBoost;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  let offsetX = width / 2 - drawWidth * focusX;
  let offsetY = height / 2 - drawHeight * focusY;
  if (fitMode === "contain") {
    offsetX = Math.max(0, Math.min(width - drawWidth, offsetX));
    offsetY = Math.max(0, Math.min(height - drawHeight, offsetY));
  } else if (drawWidth <= width) {
    offsetX = Math.max(0, Math.min(width - drawWidth, offsetX));
    offsetY = drawHeight <= height ? Math.max(0, Math.min(height - drawHeight, offsetY)) : Math.min(0, Math.max(height - drawHeight, offsetY));
  } else {
    offsetX = Math.min(0, Math.max(width - drawWidth, offsetX));
    offsetY = Math.min(0, Math.max(height - drawHeight, offsetY));
  }
  offsetY += height * viewOffsetY;
  return { offsetX, offsetY, drawWidth, drawHeight };
}
