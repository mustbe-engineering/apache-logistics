export const FRAME_COUNT = 193;
export const FRAME_START = 6964;

export const fleetFrames = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/frames/${FRAME_START + i}.webp`,
);
