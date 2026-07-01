import Image from "next/image";
import { Reveal } from "./gsap/Reveal";
import { ServicesAccordion } from "./ServicesAccordion";

const description =
  "Conoce nuestros servicios de excelencia disponibles en toda la región operativa, desde servicios con rutas establecidas hasta necesidades específicas para tu logística.";

export function Services() {
  return (
    <section
      id="servicios"
      className="scroll-mt-[var(--nav-offset)] flex max-h-[100dvh] flex-col overflow-y-auto bg-nav py-[clamp(3rem,6vw,4.5rem)] text-base lg:h-[100dvh] lg:overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg,rgba(255,255,255,0.05) 0%,transparent 40%),radial-gradient(120% 80% at 50% 0%,rgba(45,98,145,0.2) 0%,transparent 60%)",
      }}
    >
      <div className="site-container flex min-h-0 flex-1 flex-col">
        <Reveal>
          <p className="mb-4 inline-flex rounded-full border border-white/14 bg-white/[0.07] px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em] text-white/55">
            [ OPERACIONES ]
          </p>
          <h2 className="macro-title mb-4 text-4xl md:mb-6 md:text-5xl">Servicios</h2>
          <p className="max-w-3xl text-sm leading-[1.6] text-base/90 md:text-[1rem]">{description}</p>
        </Reveal>
        <div className="mt-6 grid min-h-0 flex-1 gap-6 md:mt-8 lg:grid-cols-3 lg:items-stretch lg:gap-8">
          <div className="flex min-h-0 flex-col border border-white/10 bg-white/[0.05] lg:col-span-1">
            <ServicesAccordion />
          </div>
          <div className="relative min-h-[12rem] overflow-hidden border border-white/10 lg:col-span-2 lg:min-h-0 lg:h-full">
            <Image
              src="/images/truck-zoom-logo.jpg"
              alt="Unidad Apache Logistics con logo corporativo"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
