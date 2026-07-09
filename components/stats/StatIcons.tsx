import Image from "next/image";
import type { StatIconId } from "@/lib/data";

const statIconSrc: Record<StatIconId, string> = {
  trips: "/images/stats/viajes.svg",
  clients: "/images/stats/clientes.svg",
  deliver: "/images/stats/deliver.svg",
};

type StatIconProps = {
  id: StatIconId;
  className?: string;
};

export function StatIcon({ id, className }: StatIconProps) {
  return (
    <Image
      src={statIconSrc[id]}
      alt=""
      width={256}
      height={256}
      aria-hidden
      className={className}
    />
  );
}
