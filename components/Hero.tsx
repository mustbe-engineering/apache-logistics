import Image from "next/image";
import { HeroEnter } from "./gsap/HeroEnter";
import { SectionLink } from "./SectionLink";

export function Hero() {
  return (
    <section className="border-b border-ink/20 bg-hero text-base">
      <HeroEnter>
        <div className="mx-auto grid max-w-7xl md:grid-cols-12">
          <div data-hero-copy className="flex flex-col justify-end px-[var(--gutter)] pb-10 pt-16 md:col-span-7 md:pb-14 md:pt-20">
            <p className="mb-4 text-[0.65rem] uppercase tracking-[0.14em] text-base/90">
              [ TRANSPORTE NOROESTE ]
            </p>
            <h1 className="macro-title max-w-xl">Conocemos el camino</h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed md:text-base">
              Más de 10 años moviendo carga por el noroeste de México con la seguridad y el trato de una empresa familiar.
            </p>
            <SectionLink data-hero-cta href="#contacto" className="mt-8 inline-block w-fit border-2 border-base bg-base px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink">
              Cotiza tu envío.
            </SectionLink>
          </div>
          <div data-hero-media className="relative min-h-[280px] border-t border-base/30 md:col-span-5 md:min-h-[420px] md:border-l md:border-t-0">
            <Image src="https://picsum.photos/seed/apache/800/600" alt="Camión de carga en ruta del noroeste" fill className="object-cover mix-blend-multiply opacity-90" priority />
          </div>
        </div>
      </HeroEnter>
    </section>
  );
}
