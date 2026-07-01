import { fleetSpecs } from "./data";

const positions = [
  { x: 18, y: 38 },
  { x: 36, y: 41 },
  { x: 54, y: 43 },
  { x: 73, y: 45 },
];

export const fleetMarkers = fleetSpecs.slice(0, 4).map((spec, i) => ({
  title: spec.id,
  detail: spec.detail,
  ...positions[i],
}));
