import Image from "next/image";
import { aboutBlocks } from "@/lib/content";
import { Reveal } from "./gsap/Reveal";
import { Stagger } from "./gsap/Stagger";
import { Shell } from "./ui";

export function About() {
  return (
    <Shell id="nosotros">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <h2 className="macro-title text-4xl md:text-5xl">Quiénes somos</h2>
          <p className="mt-6 max-w-prose text-sm leading-relaxed">
            Apache Logistics nació en Hermosillo como operador familiar. Hoy conectamos plantas, puertos y centros de distribución con rutas trazables y personal directo.
          </p>
          <div className="relative mt-8 aspect-[4/3] border border-ink/20">
            <Image src="https://picsum.photos/seed/apache-about/900/675" alt="Operaciones logísticas Apache" fill className="object-cover" />
          </div>
        </Reveal>
        <Stagger>
          <dl className="grid gap-px border border-ink/20 bg-ink/20">
            {aboutBlocks.map((b) => (
              <div key={b.term} data-stagger className="grid gap-2 bg-base p-6 md:grid-cols-[8rem_1fr]">
                <dt className="text-[0.7rem] uppercase tracking-[0.12em] text-accent">{b.term}</dt>
                <dd className="text-sm leading-relaxed">{b.text}</dd>
              </div>
            ))}
          </dl>
        </Stagger>
      </div>
    </Shell>
  );
}
