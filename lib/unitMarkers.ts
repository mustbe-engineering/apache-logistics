import { fleetSpecs } from "./data";

const positions = [
  { x: 18, y: 52 },
  { x: 38, y: 48 },
  { x: 58, y: 46 },
  { x: 78, y: 44 },
];

export const unitMarkers = fleetSpecs.slice(0, 4).map((spec, i) => ({
  title: spec.id,
  detail: spec.detail,
  ...positions[i],
}));
