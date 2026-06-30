import Image from "next/image";
import type { StatIconId } from "@/lib/data";

const statIconSrc: Record<StatIconId, string> = {
  trips: "/images/stats/viajes.png",
  clients: "/images/stats/clientes.png",
  comments: "/images/stats/comentarios.png",
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
