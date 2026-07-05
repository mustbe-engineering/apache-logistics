import type { ServiceIconId } from "@/lib/data";

export const serviceIcons = {
  lcl: "/images/stats/lcl.svg",
  ltl: "/images/stats/ltl.svg",
  trasbordo: "/images/stats/transbordo.svg",
  maniobras: "/images/stats/maniobras.svg",
  almacen: "/images/stats/almacenaje.svg",
  ultima: "/images/stats/milla.svg",
} satisfies Record<ServiceIconId, string>;
