import { QuoteOpenButton } from "./QuoteOpenButton";
import { Reveal } from "./gsap/Reveal";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesMobile } from "./ServicesMobile";

const desktopDesc =
  "Ya sea un contenedor compartido, un envio pequeño o el último tramo de la entrega, en Apache Logistics tenemos una solución para cada tipo de carga. Conocemos el camino, dominamos el terreno y cuidamos tu mercancía en cada etapa, desde que sale hasta que llega.";

export function Services() {
  return (
    <section
      id="servicios"
      className="scroll-mt-[var(--nav-offset)] bg-[#1b4776] py-[clamp(3rem,6vw,4.5rem)] text-base"
    >
      <div className="site-container">
        <ServicesMobile />
        <div className="hidden min-[1021px]:block">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-display text-4xl font-normal leading-[1.6] text-base md:text-5xl">Servicios</h2>
            <p className="text-sm leading-[1.65] text-base/90 md:text-[0.9375rem]">{desktopDesc}</p>
          </Reveal>
          <ServicesGrid />
        </div>
        <div className="mt-10 flex justify-center">
          <QuoteOpenButton className="btn-cotizar btn-cotizar-flat px-6 py-3 md:px-8 md:py-3.5">
            <span>Cotizar servicio → </span>
          </QuoteOpenButton>
        </div>
      </div>
    </section>
  );
}
