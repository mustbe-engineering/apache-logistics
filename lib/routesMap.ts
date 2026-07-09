export const routePaths = [
  { d: "m 101.93,62.95 c 0,0 1.91,0 5.53,0.16", group: 0 },
  { d: "m 118.34,63.81 c 53.85,4.41 229.9,31.35 372.5,195.76", group: 0 },
  { d: "m 101.93,62.95 c 0,0 494.94,-210.58 682.8,281.51", group: 1 },
  { d: "M 89.7,98.92 C 66.61,178.54 43.49,367.85 307.46,449.46", group: 2 },
] as const;

export const routeGroups = [
  { dot: 1, label: 1 },
  { dot: 2, label: 2 },
  { dot: 3, label: 3 },
] as const;

export const routeDots = [
  { cx: 102.77, cy: 62.95, always: true },
  { cx: 497.97, cy: 267.95 },
  { cx: 784.73, cy: 344.46 },
  { cx: 307.46, cy: 449.46 },
] as const;

export const routeLabels = [
  { x: 82.95, y: 88.98, text: "BC", always: true },
  { x: 436.81, y: 294.83, text: "SONORA", always: true },
  { x: 708.39, y: 372.17, text: "CHIHUAHUA", always: true },
  { x: 287.41, y: 473.66, text: "BCS", always: true },
] as const;
