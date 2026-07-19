import { Reveal } from "./gsap/Reveal";
import { RoutesLinesGate } from "./routes/RoutesLinesGate";

export function Routes() {
  return (
    <section
      id="rutas"
      className="routes-section scroll-mt-[var(--nav-offset)] overflow-x-clip pb-0 pt-[var(--section-y)]"
    >
      <div className="site-container relative z-10">
        <Reveal className="flex w-full justify-center">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
            <h2 className="-translate-y-2.5 shrink-0 font-display text-4xl font-normal leading-none text-nav md:text-5xl">
              <span className="block">Nuestras</span>
              <span className="block">Rutas</span>
            </h2>
            <div className="max-w-xl md:text-left">
              <p className="text-sm leading-[1.2] text-nav md:text-[1rem]">
                Operamos rutas diarias dentro del estado de Baja California, cubriendo puntos clave como{" "}
                <strong className="font-semibold">Tijuana</strong> y{" "}
                <strong className="font-semibold">Ensenada</strong>. Nuestras rutas dentro del estado
                cuentan con una sólida red de transporte que se extiende a{" "}
                <strong className="font-semibold">Sonora</strong>,{" "}
                <strong className="font-semibold">Chihuahua</strong> y{" "}
                <strong className="font-semibold">BCS</strong>.
              </p>
              <hr className="mt-[18px] border-0 border-t border-nav" />
            </div>
          </div>
        </Reveal>
      </div>
      <div className="routes-map-shell">
        <div className="routes-map">
          <img
            src="/images/map/map.svg"
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain object-left-bottom"
          />
          <RoutesLinesGate />
        </div>
      </div>
    </section>
  );
}
