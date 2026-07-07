import Image from "next/image";
import { aboutBlocks } from "@/lib/content";
import { AboutCarousel } from "./AboutCarousel";
import { Reveal } from "./gsap/Reveal";

export function About() {
  return (
    <section
      id="nosotros"
      className="group relative min-h-[max(22rem,62dvh)] overflow-hidden scroll-mt-[var(--nav-offset)] py-[var(--section-y)] text-nav min-[1021px]:min-h-[max(32rem,90dvh)]"
    >
      <Image
        src="/images/about-us-bk.jpg"
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
        <div className="mx-auto flex w-full max-w-[90rem] justify-end min-[1021px]:justify-start">
          <Reveal className="inline-block self-end">
            <Image
              src="/images/worker.png"
              alt="Operaciones logísticas Apache"
              width={1037}
              height={1345}
              sizes="(max-width: 1020px) 300px, 760px"
              className="block h-auto w-[min(70vw,300px)] object-contain object-bottom !max-w-none min-[1021px]:w-[min(52vw,760px)]"
            />
          </Reveal>
        </div>
      </div>
      <div className="site-container relative z-10 flex min-h-0 items-start justify-center min-[1021px]:min-h-[max(28rem,calc(90dvh-var(--section-y)*2))] min-[1021px]:justify-start">
        <div className="max-w-xl text-center min-[1021px]:mt-[18dvh] min-[1021px]:ml-auto min-[1021px]:text-left">
          <Reveal>
            <h2 className="macro-title text-4xl text-nav md:text-5xl">Quiénes somos</h2>
            <p className="mx-auto mt-8 max-w-prose text-sm leading-relaxed !text-[#164775] md:text-base min-[1021px]:mx-0">
              Apache Logistics nació en Hermosillo como operador familiar. Hoy conectamos plantas, puertos y centros de distribución con rutas trazables y personal directo.
            </p>
            <AboutCarousel items={aboutBlocks} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
