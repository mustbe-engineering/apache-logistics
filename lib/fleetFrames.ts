export const FRAME_COUNT = 189;
export const FRAME_START = 404;

export const fleetFrames = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/frames/${FRAME_START + i}.webp`,
);
