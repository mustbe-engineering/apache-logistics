import { Reveal } from "./gsap/Reveal";
import { ClientsCarousel } from "./ClientsCarousel";

export function Clients() {
  return (
    <section id="clientes" className="scroll-mt-[var(--nav-offset)] bg-nav py-[clamp(6.24rem,15.6vw,9.36rem)] text-base">
      <div className="site-container">
        <Reveal className="flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
          <h2 className="shrink-0 font-display text-4xl font-normal leading-[1.6] md:text-5xl">
            <span className="block">Nuestros</span>
            <span className="block">clientes</span>
          </h2>
          <p className="max-w-xl text-sm leading-[1.6] text-base/90 md:text-left md:text-[1rem]">
            Las empresas que deciden adquirir nuestro servicio son el pilar de nuestra empresa y la
            razón de nuestras metas. Trabajamos cada día para ofrecerles el mejor servicio, con{" "}
            <strong className="font-semibold">compromiso</strong>,{" "}
            <strong className="font-semibold">calidad</strong> y{" "}
            <strong className="font-semibold">dedicación</strong>, porque su satisfacción es nuestra
            mayor prioridad.
          </p>
        </Reveal>
        <ClientsCarousel />
      </div>
    </section>
  );
}
