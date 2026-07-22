import { FRAME_COUNT } from "@/lib/fleetFrames";

export const TRUCK_START_FRAME = 9;
export const FRAME_PLAY_COUNT = FRAME_COUNT - TRUCK_START_FRAME;
export const FRAME_TRAVEL_PX = (FRAME_PLAY_COUNT - 1) * 18;
export const TITLE_REVEAL_PX = 420;
export const TITLE_HOLD_PX = 72;
export const TITLE_FADE_PX = 320;
export const TRUCK_OVERLAP_PX = 200;
export const INTRO_TRAVEL_PX = TITLE_REVEAL_PX + TITLE_HOLD_PX + TITLE_FADE_PX;
export const TRUCK_SEQUENCE_START_PX = INTRO_TRAVEL_PX - TRUCK_OVERLAP_PX;
export const FINAL_LOCK_PX = 960;
export const FOCUS_START_PROGRESS = 0.985;
export const TOTAL_TRAVEL_PX = INTRO_TRAVEL_PX + FRAME_TRAVEL_PX + FINAL_LOCK_PX;
export const TITLE_LINE_STAGGER = 0.14;
export const REVEAL_MASK_FEATHER = 14;
export const OUTRO_START_PROGRESS = 0.8;
export const OUTRO_FEATURE_STAGGER = 0.07;
export const SCENE_BG = "#e8e8e8";

export const TRUCK_FRAME = {
  desktop: { focusX: 0.49, focusY: 0.53, scaleBoost: 0.7, viewOffsetY: -0.04, fitMode: "cover" as const },
  tablet: { focusX: 0.49, focusY: 0.56, scaleBoost: 0.735, viewOffsetY: -0.045, fitMode: "cover" as const },
  mobile: { focusX: 0.49, focusY: 0.57, scaleBoost: 1.38, viewOffsetY: -0.03, fitMode: "cover" as const },
};
