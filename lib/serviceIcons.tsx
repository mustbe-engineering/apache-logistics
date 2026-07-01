import {
  Archive,
  ArrowsLeftRight,
  Crane,
  MapPin,
  Package,
  Truck,
} from "@phosphor-icons/react";
import type { ServiceIconId } from "@/lib/data";

export const serviceIcons = {
  lcl: Package,
  ltl: Truck,
  trasbordo: ArrowsLeftRight,
  maniobras: Crane,
  almacen: Archive,
  ultima: MapPin,
} satisfies Record<ServiceIconId, typeof Package>;
