export function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4;
}

export function organicEase(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5 ? 4 * clamped ** 3 : 1 - ((-2 * clamped + 2) ** 3) / 2;
}
