import { Reveal } from "./gsap/Reveal";
import { RoutesAnimatedLines } from "./routes/RoutesAnimatedLines";

const description =
  "Operamos rutas diarias dentro del estado de Baja California, cubriendo puntos clave como Tijuana y Ensenada. Nuestras rutas dentro del estado cuentan con una sólida red de transporte que se extiende a Sonora, Chihuahua y BCS.";

export function Routes() {
  return (
    <section id="rutas" className="scroll-mt-[var(--nav-offset)] pb-0 pt-[var(--section-y)]">
      <div className="site-container">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-normal leading-[1.6] text-nav md:text-5xl">Nuestras Rutas</h2>
          <p className="mt-4 text-sm leading-[1.6] text-nav md:text-[1rem]">{description}</p>
        </Reveal>
      </div>
      <div className="mx-auto mt-10 w-full max-w-[var(--content-max)] px-[var(--gutter)]">
        <div className="relative aspect-[1451.45/596.8] w-full">
          <img
            src="/images/map/map.svg"
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain object-left-bottom"
          />
          <RoutesAnimatedLines className="absolute inset-0 z-10 h-full w-full object-contain object-left-bottom" />
        </div>
      </div>
    </section>
  );
}
