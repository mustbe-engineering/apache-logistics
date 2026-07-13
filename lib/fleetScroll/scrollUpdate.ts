import {
  FOCUS_START_PROGRESS, FRAME_PLAY_COUNT, FRAME_TRAVEL_PX, INTRO_TRAVEL_PX, TITLE_FADE_PX,
  TITLE_HOLD_PX, TITLE_REVEAL_PX, TOTAL_TRAVEL_PX, TRUCK_SEQUENCE_START_PX, TRUCK_START_FRAME,
} from "./constants";
import { FRAME_COUNT } from "@/lib/fleetFrames";
import { hideOutro, setOutroAnimation } from "./outroAnim";
import { renderFrame } from "./images";
import { hideTitle, setRevealState, setTitleFade } from "./titleAnim";
import type { FleetScrollActions, FleetScrollDom, FleetScrollRuntime } from "./types";

function setFleetFocusLock(dom: FleetScrollDom, locked: boolean) {
  if (locked) dom.section.setAttribute("data-fleet-focus", "");
  else dom.section.removeAttribute("data-fleet-focus");
}

export function updateFromScroll(
  dom: FleetScrollDom, scrollPx: number, runtime: FleetScrollRuntime, actions: FleetScrollActions,
) {
  const clamped = Math.min(TOTAL_TRAVEL_PX, Math.max(0, scrollPx));
  const fadeStart = TITLE_REVEAL_PX + TITLE_HOLD_PX;
  if (clamped <= TITLE_REVEAL_PX) setRevealState(dom, clamped / TITLE_REVEAL_PX);
  else if (clamped <= fadeStart) setRevealState(dom, 1);
  else if (clamped <= INTRO_TRAVEL_PX) setTitleFade(dom, (clamped - fadeStart) / TITLE_FADE_PX);
  else hideTitle(dom);
  if (clamped < TRUCK_SEQUENCE_START_PX) {
    renderFrame(dom, 0, runtime);
    hideOutro(dom, runtime, actions);
    setFleetFocusLock(dom, false);
    return;
  }
  const frameProgress = Math.min(1, (clamped - TRUCK_SEQUENCE_START_PX) / FRAME_TRAVEL_PX);
  const index = Math.min(
    FRAME_COUNT - 1,
    TRUCK_START_FRAME + Math.round(frameProgress * (FRAME_PLAY_COUNT - 1)),
  );
  renderFrame(dom, index, runtime);
  setOutroAnimation(dom, frameProgress, runtime, actions);
  setFleetFocusLock(dom, frameProgress >= FOCUS_START_PROGRESS);
}
