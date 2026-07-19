"use client";

import { useMinWidth } from "@/lib/useMinWidth";
import { Reveal } from "./gsap/Reveal";
import { ServicesAccordion } from "./ServicesAccordion";

const mobileDesc =
  "Conoce nuestros servicios de excelencia disponibles en toda la región operativa, desde servicios con rutas establecidas hasta necesidades específicas para tu logística.";

export function ServicesMobile() {
  const desktop = useMinWidth(1021);
  if (desktop) return null;

  return (
    <>
      <Reveal>
        <h2 className="mb-4 font-display text-4xl font-normal leading-[1.6] text-base md:text-5xl">Servicios</h2>
        <p className="max-w-3xl text-sm leading-[1.6] text-base/90">{mobileDesc}</p>
      </Reveal>
      <div className="mt-6 h-[26rem] border border-white/10 bg-white/[0.05] sm:h-[28rem]">
        <ServicesAccordion />
      </div>
    </>
  );
}
