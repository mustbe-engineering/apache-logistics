"use client";

import type { ServiceIconId } from "@/lib/data";
import { serviceIcons } from "@/lib/serviceIcons";
import { QuoteOpenButton } from "./QuoteOpenButton";
import { ServiceIcon } from "./ServiceIcon";

type Props = { name: string; desc: string; icon: ServiceIconId };

export function ServiceCard({ name, desc, icon }: Props) {
  return (
    <article className="group relative aspect-square overflow-hidden bg-nav p-6 text-base transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-highlight">
      <ServiceIcon
        src={serviceIcons[icon]}
        className="pointer-events-none absolute left-1/2 top-[40%] z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-base transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:left-6 group-hover:top-auto group-hover:bottom-6 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-nav"
      />
      <p className="absolute inset-x-6 top-[58%] -translate-y-1/2 text-center font-macro text-lg uppercase tracking-tight text-base transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0 md:text-xl">
        {name}
      </p>
      <p className="absolute inset-x-6 top-6 line-clamp-5 text-sm leading-relaxed text-nav opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100">
        {desc}
      </p>
      <QuoteOpenButton className="absolute bottom-6 right-6 border border-nav bg-nav px-3 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-base opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100 hover:opacity-90">
        Cotización
      </QuoteOpenButton>
    </article>
  );
}
