import { FRAME_COUNT } from "@/lib/fleetFrames";
import { drawFrameToCanvas } from "./drawFrame";
import type { FleetScrollDom, FleetScrollRuntime } from "./types";

function encodePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export function loadFrameImage(src: string): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = encodePath(src);
    image.onload = () => resolve(image);
    image.onerror = () => resolve(undefined);
  });
}

export function nearestLoaded(target: number, loaded: Set<number>) {
  if (loaded.has(target)) return target;
  for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
    const before = target - offset;
    const after = target + offset;
    if (before >= 0 && loaded.has(before)) return before;
    if (after < FRAME_COUNT && loaded.has(after)) return after;
  }
  return 0;
}

export function renderFrame(dom: FleetScrollDom, index: number, runtime: FleetScrollRuntime) {
  const clamped = Math.min(Math.max(index, 0), FRAME_COUNT - 1);
  const resolved = runtime.loaded.has(clamped) ? clamped : nearestLoaded(clamped, runtime.loaded);
  if (resolved === runtime.frameIndex) return;
  runtime.frameIndex = resolved;
  drawFrameToCanvas(dom, resolved, runtime.images, runtime.activeTruckFrame, runtime.mobileTruckSlot);
}
