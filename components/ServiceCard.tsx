"use client";

import type { ServiceIconId } from "@/lib/data";
import { serviceIcons, serviceIconSize, serviceIconSlotRem } from "@/lib/serviceIcons";
import { ServiceIcon } from "./ServiceIcon";

type Props = { index: number; name: string; desc: string; icon: ServiceIconId };

export function ServiceCard({ index, name, desc, icon }: Props) {
  const src = serviceIcons[icon];
  const label = String(index).padStart(2, "0");
  const main = serviceIconSize(3.3, icon);
  const hover = serviceIconSize(1.925, icon);

  return (
    <article className="group relative min-h-[15.75rem] overflow-hidden bg-[#123d60] px-4 py-5 text-base transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#f6a309]">
      <div className="absolute inset-x-4 top-4 z-20 flex items-start justify-between gap-3">
        <p className="font-display text-sm leading-none text-nav opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
          {name}
        </p>
        <span className="shrink-0 text-[12px] leading-none tracking-wide text-base/45">{label}</span>
      </div>
      <div className="flex h-full flex-col transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0">
        <div
          className="flex flex-1 items-center justify-center"
          style={{ minHeight: `${serviceIconSlotRem}rem` }}
        >
          <ServiceIcon src={src} sizeRem={main} className="text-base" />
        </div>
        <p className="shrink-0 pb-1 text-center font-display text-sm leading-tight tracking-tight text-base">
          {name}
        </p>
      </div>
      <div className="absolute inset-0 flex flex-col p-4 pt-10 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
        <p className="line-clamp-4 flex-1 text-xs leading-relaxed text-nav">{desc}</p>
        <ServiceIcon src={src} sizeRem={hover} className="mt-3 shrink-0 text-nav" />
      </div>
    </article>
  );
}
