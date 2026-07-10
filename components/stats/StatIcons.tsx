import Image from "next/image";
import type { StatIconId } from "@/lib/data";

const statIconSrc: Record<StatIconId, string> = {
  trips: "/images/stats/viajes.svg",
  clients: "/images/stats/clientes.svg",
  deliver: "/images/stats/deliver.svg",
};

const statIconRatio: Record<StatIconId, { w: number; h: number }> = {
  trips: { w: 151, h: 104 },
  clients: { w: 160, h: 123 },
  deliver: { w: 153, h: 153 },
};

type StatIconProps = {
  id: StatIconId;
  className?: string;
};

export function StatIcon({ id, className }: StatIconProps) {
  const { w, h } = statIconRatio[id];
  return (
    <Image
      src={statIconSrc[id]}
      alt=""
      width={w}
      height={h}
      aria-hidden
      className={className}
    />
  );
}
