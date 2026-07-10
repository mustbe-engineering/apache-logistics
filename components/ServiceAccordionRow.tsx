"use client";

import { Minus, Plus } from "@phosphor-icons/react";
import { ServiceIcon } from "./ServiceIcon";

type RowProps = {
  name: string;
  tagline: string;
  desc: string;
  benefits: string;
  tone: string;
  active: boolean;
  iconSrc: string;
  aspect?: number;
  onSelect: () => void;
};

export function ServiceAccordionRow({
  name, tagline, desc, benefits, tone, active, iconSrc, aspect = 1, onSelect,
}: RowProps) {
  return (
    <div
      className="flex h-full min-h-0 flex-col transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{ backgroundColor: active ? "#2a6694" : tone }}
    >
      <button
        type="button"
        aria-expanded={active}
        onClick={onSelect}
        className="group flex h-12 shrink-0 items-center gap-3 px-4 text-left sm:h-[3.25rem] sm:gap-4 sm:px-5"
      >
        <span className="flex h-8 w-10 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-white/12 sm:h-10 sm:w-12">
          <ServiceIcon src={iconSrc} sizeRem={1.25} aspect={aspect} className="text-white/90" />
        </span>
        <span className="font-display flex-1 text-base tracking-tight text-white/90 sm:text-lg">{name}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] sm:h-8 sm:w-8">
          {active ? <Minus size={14} weight="light" className="text-white/70" /> : (
            <Plus size={14} weight="light" className="text-white/50 transition-transform duration-500 group-hover:rotate-90" />
          )}
        </span>
      </button>
      <div
        aria-hidden={!active}
        className={`flex flex-1 flex-col justify-end overflow-y-auto px-4 pb-5 sm:px-5 sm:pb-6 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ transition: "opacity 0.65s cubic-bezier(0.32,0.72,0,1)" }}
      >
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-highlight">{tagline}</p>
        <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/80 sm:mt-3 sm:text-sm">{desc}</p>
        <p className="mt-3 text-[0.6875rem] leading-relaxed text-white/60 sm:mt-4 sm:text-xs">
          <span className="font-medium text-white/75">Beneficios clave: </span>
          {benefits}
        </p>
      </div>
    </div>
  );
}
