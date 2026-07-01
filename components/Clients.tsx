import { Reveal } from "./gsap/Reveal";
import { ClientsCarousel } from "./ClientsCarousel";

const intro =
  "Las empresas que deciden adquirir nuestro servicio son el pilar de nuestra empresa y la razón de nuestras metas. Trabajamos cada día para ofrecerles el mejor servicio, con compromiso, calidad y dedicación, porque su satisfacción es nuestra mayor prioridad.";

export function Clients() {
  return (
    <section id="clientes" className="scroll-mt-[var(--nav-offset)] bg-nav py-[clamp(6.24rem,15.6vw,9.36rem)] text-base">
      <div className="site-container">
        <Reveal>
          <h2 className="macro-title mb-12 text-4xl md:text-5xl">Nuestros clientes</h2>
          <p className="max-w-3xl text-sm leading-[1.6] text-base/90 md:text-[1rem]">{intro}</p>
        </Reveal>
        <ClientsCarousel />
      </div>
    </section>
  );
}
