"use client";

import { Minus, Plus, type Icon } from "@phosphor-icons/react";

type RowProps = {
  name: string;
  tagline: string;
  desc: string;
  benefits: string;
  tone: string;
  index: number;
  active: boolean;
  Icon: Icon;
  onSelect: () => void;
};

export function ServiceAccordionRow({ name, tagline, desc, benefits, tone, index, active, Icon, onSelect }: RowProps) {
  return (
    <div
      className="flex h-full min-h-0 flex-col transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{ backgroundColor: active ? "#2a6694" : tone }}
    >
      <button
        type="button"
        aria-expanded={active}
        onClick={onSelect}
        className="group flex h-16 shrink-0 items-center gap-4 px-5 text-left md:px-7"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-white/12">
          <Icon size={20} weight="light" className="text-white/90" />
        </span>
        <span className="font-macro flex-1 text-lg uppercase tracking-tight text-white/90 md:text-xl">{name}</span>
        <span className="font-sans text-[0.65rem] tracking-[0.18em] text-white/38">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06]">
          {active ? <Minus size={14} weight="light" className="text-white/70" /> : (
            <Plus size={14} weight="light" className="text-white/50 transition-transform duration-500 group-hover:rotate-90" />
          )}
        </span>
      </button>
      <div
        aria-hidden={!active}
        className={`flex flex-1 flex-col justify-end overflow-y-auto px-5 pb-8 md:px-9 md:pb-10 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ transition: "opacity 0.65s cubic-bezier(0.32,0.72,0,1)" }}
      >
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-highlight">{tagline}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-[0.9375rem]">{desc}</p>
        <p className="mt-4 text-xs leading-relaxed text-white/60">
          <span className="font-medium text-white/75">Beneficios clave: </span>
          {benefits}
        </p>
      </div>
    </div>
  );
}
