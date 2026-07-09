import { Reveal } from "./gsap/Reveal";
import { RoutesAnimatedLines } from "./routes/RoutesAnimatedLines";

export function Routes() {
  return (
    <section id="rutas" className="routes-section scroll-mt-[var(--nav-offset)] pb-0 pt-[var(--section-y)]">
      <div className="site-container relative z-10">
        <Reveal className="flex w-full flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
          <h2 className="shrink-0 font-display text-4xl font-normal leading-[1.6] text-nav md:text-5xl">
            <span className="block">Nuestras</span>
            <span className="block">Rutas</span>
          </h2>
          <p className="max-w-xl text-sm leading-[1.6] text-nav md:text-left md:text-[1rem]">
            Operamos rutas diarias dentro del estado de Baja California, cubriendo puntos clave como{" "}
            <strong className="font-semibold">Tijuana</strong> y{" "}
            <strong className="font-semibold">Ensenada</strong>. Nuestras rutas dentro del estado
            cuentan con una sólida red de transporte que se extiende a{" "}
            <strong className="font-semibold">Sonora</strong>,{" "}
            <strong className="font-semibold">Chihuahua</strong> y{" "}
            <strong className="font-semibold">BCS</strong>.
          </p>
        </Reveal>
      </div>
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[var(--content-max)] px-[var(--gutter)]">
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
