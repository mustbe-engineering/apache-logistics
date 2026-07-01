"use client";

import { useState } from "react";
import { unitMarkers } from "@/lib/unitMarkers";
import { Reveal } from "./gsap/Reveal";
import { UnitsMap } from "./UnitsMap";

export function Units() {
  const [active, setActive] = useState<number | null>(null);
  const picked = active !== null ? unitMarkers[active] : null;

  return (
    <section id="unidades" className="scroll-mt-[var(--nav-offset)] bg-[#F7F6F3] py-[clamp(4rem,10vw,6rem)]">
      <div className="site-container">
        <div className="relative min-h-[min(92dvh,calc(52rem+240px))]">
          <div className="pointer-events-none relative z-10 w-full">
            <Reveal className="max-w-md">
              <p className="mb-4 inline-block rounded-lg bg-[#E1F3FE] px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-nav">
                [ UNIDADES ]
              </p>
              <h2 className="font-macro text-4xl uppercase tracking-tight text-nav md:text-5xl">
                Nuestras unidades
              </h2>
            </Reveal>
            <div className="mt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-x-12">
              <p className="max-w-md text-sm leading-[1.6] text-nav md:text-[1rem]">
                Cada unidad reporta ubicación, velocidad y eventos críticos. Operamos con permisos vigentes y protocolos documentados.
              </p>
              <div className="mt-8 max-w-sm border-t border-nav/15 pt-6 lg:mt-0 lg:max-w-xs lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                {picked ? (
                  <div key={picked.title} className="fleet-detail">
                    <p className="text-[0.65rem] uppercase tracking-[0.12em] text-nav">{picked.title}</p>
                    <p className="mt-2 text-sm leading-[1.6] text-nav md:text-[1rem]">{picked.detail}</p>
                  </div>
                ) : (
                  <p className="text-xs tracking-wide text-nav/50">Selecciona un punto en el mapa.</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12 flex translate-y-[70px] justify-center lg:absolute lg:inset-0 lg:mt-0 lg:items-center">
            <div className="w-full max-w-[90rem] lg:pointer-events-auto">
              <UnitsMap active={active} onSelect={setActive} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
