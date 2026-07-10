import type { ServiceIconId } from "@/lib/data";

export const serviceIcons = {
  lcl: "/images/stats/lcl.svg",
  ltl: "/images/stats/ltl.svg",
  trasbordo: "/images/stats/transbordo.svg",
  maniobras: "/images/stats/maniobras.svg",
  almacen: "/images/stats/almacenaje.svg",
  ultima: "/images/stats/milla.svg",
} satisfies Record<ServiceIconId, string>;

/** width / height from each SVG viewBox — used to keep equal height, natural width */
export const serviceIconAspect: Record<ServiceIconId, number> = {
  lcl: 15.32 / 14.97,
  ltl: 14.72 / 14.77,
  trasbordo: 15.53 / 15.05,
  maniobras: 277.98 / 152.38,
  almacen: 14.79 / 14.18,
  ultima: 15.67 / 15.68,
};

export const serviceIconSlotRem = 3.96;
