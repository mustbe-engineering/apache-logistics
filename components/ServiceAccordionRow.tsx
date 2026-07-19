"use client";

import { Minus, Plus } from "@phosphor-icons/react";
import { ServiceIcon } from "./ServiceIcon";

type RowProps = {
  name: string;
  tagline: string;
  desc: string;
  tone: string;
  active: boolean;
  iconSrc: string;
  aspect?: number;
  onSelect: () => void;
};

function condense(desc: string) {
  const end = desc.indexOf(". ");
  return end > 0 ? desc.slice(0, end + 1) : desc;
}

export function ServiceAccordionRow({
  name, tagline, desc, tone, active, iconSrc, aspect = 1, onSelect,
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
        className={`flex flex-1 flex-col justify-start overflow-hidden px-4 pb-4 pt-1 sm:px-5 sm:pb-5 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ transition: "opacity 0.65s cubic-bezier(0.32,0.72,0,1)" }}
      >
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-highlight">{tagline}</p>
        <p className="mt-1.5 line-clamp-3 text-xs leading-snug text-white/80 sm:text-sm">
          {condense(desc)}
        </p>
      </div>
    </div>
  );
}
