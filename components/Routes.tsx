import Image from "next/image";
import { Reveal } from "./gsap/Reveal";
import { Shell } from "./ui";

const description =
  "Operamos rutas diarias dentro del estado de Baja California, cubriendo puntos clave como Tijuana y Ensenada. Nuestras rutas dentro del estado cuentan con una sólida red de transporte que se extiende a Sonora, Chihuahua y BCS.";

export function Routes() {
  return (
    <Shell id="rutas">
      <Reveal>
        <h2 className="macro-title mb-8 text-4xl text-nav md:text-5xl">Nuestras Rutas (aqui va el mapa)</h2>
        <p className="max-w-3xl text-sm leading-[1.6] text-nav md:text-[1rem]">{description}</p>
      </Reveal>
      <div className="relative mt-10 aspect-[2080/1161] w-full overflow-hidden border border-ink/10">
        <Image
          src="/images/back-trucks.jpg"
          alt="Flota Apache en ruta por el noroeste de México"
          fill
          className="object-cover"
          sizes="(max-width: 90rem) 100vw, 1440px"
        />
      </div>
    </Shell>
  );
}
