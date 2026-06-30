import Image from "next/image";
import { aboutBlocks } from "@/lib/content";
import { AboutCarousel } from "./AboutCarousel";
import { Reveal } from "./gsap/Reveal";

export function About() {
  return (
    <section
      id="nosotros"
      className="group relative min-h-[max(32rem,90dvh)] overflow-hidden scroll-mt-[var(--nav-offset)] py-[var(--section-y)] text-nav"
    >
      <Image
        src="/images/about-us-bk.png"
        alt=""
        fill
        className="-z-20 object-cover"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-base/25 backdrop-blur-lg transition-all duration-500 group-hover:bg-base/40 group-hover:backdrop-blur-2xl"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <div className="site-container flex justify-center min-[1024px]:justify-start">
          <Reveal className="inline-block">
            <Image
              src="/images/worker.png"
              alt="Operaciones logísticas Apache"
              width={1037}
              height={1345}
              sizes="(max-width: 1023px) 220px, 560px"
              className="block h-auto max-h-[min(42dvh,320px)] w-[min(48vw,220px)] object-contain object-bottom !max-w-none min-[1024px]:max-h-[min(58dvh,680px)] min-[1024px]:w-[min(52vw,560px)]"
            />
          </Reveal>
        </div>
      </div>
      <div className="site-container relative z-10 flex min-h-[max(28rem,calc(90dvh-var(--section-y)*2))] items-start">
        <div className="mt-[18dvh] lg:ml-auto lg:max-w-xl">
          <Reveal>
            <h2 className="macro-title text-4xl text-nav md:text-5xl">Quiénes somos</h2>
            <p className="mt-8 max-w-prose text-sm leading-relaxed !text-[#164775] md:text-base">
              Apache Logistics nació en Hermosillo como operador familiar. Hoy conectamos plantas, puertos y centros de distribución con rutas trazables y personal directo.
            </p>
            <AboutCarousel items={aboutBlocks} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
