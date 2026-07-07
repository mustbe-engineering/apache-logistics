import { Reveal } from "./gsap/Reveal";
import { RoutesAnimatedLines } from "./routes/RoutesAnimatedLines";
import { Shell } from "./ui";

const description =
  "Operamos rutas diarias dentro del estado de Baja California, cubriendo puntos clave como Tijuana y Ensenada. Nuestras rutas dentro del estado cuentan con una sólida red de transporte que se extiende a Sonora, Chihuahua y BCS.";

export function Routes() {
  return (
    <Shell id="rutas">
      <Reveal className="max-w-2xl">
        <h2 className="macro-title text-4xl text-nav md:text-5xl">Nuestras Rutas</h2>
        <p className="mt-4 text-sm leading-[1.6] text-nav md:text-[1rem]">{description}</p>
      </Reveal>
      <div className="relative mt-10 aspect-[1451.45/596.8] w-[calc(50vw+50%)]">
        <img
          src="/images/map/map.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain object-left-bottom"
        />
        <RoutesAnimatedLines className="absolute inset-0 z-10 h-full w-full object-contain object-left-bottom" />
      </div>
    </Shell>
  );
}
