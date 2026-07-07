"use client";

import type { ServiceIconId } from "@/lib/data";
import { serviceIcons } from "@/lib/serviceIcons";
import { ServiceIcon } from "./ServiceIcon";

type Props = { index: number; name: string; desc: string; icon: ServiceIconId };

export function ServiceCard({ index, name, desc, icon }: Props) {
  const src = serviceIcons[icon];
  const label = String(index).padStart(2, "0");

  return (
    <article className="group relative min-h-[15.75rem] overflow-hidden bg-[#123d60] px-4 py-5 text-base transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-highlight">
      <span className="absolute right-4 top-4 text-[12px] tracking-wide text-base/45">{label}</span>
      <div className="flex h-full flex-col items-center justify-center gap-2.5 transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0">
        <ServiceIcon src={src} className="h-[3.3rem] w-[3.3rem] text-base" />
        <p className="text-center font-macro text-sm uppercase tracking-tight text-base">{name}</p>
      </div>
      <div className="absolute inset-0 flex flex-col p-4 opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
        <p className="line-clamp-4 flex-1 text-xs leading-relaxed text-nav">{desc}</p>
        <ServiceIcon src={src} className="mt-3 h-[1.925rem] w-[1.925rem] shrink-0 text-nav" />
      </div>
    </article>
  );
}
