import Image from "next/image";
import { services } from "@/lib/data";
import { Reveal } from "./gsap/Reveal";
import { Stagger } from "./gsap/Stagger";
import { SectionTag, Shell } from "./ui";

export function Services() {
  return (
    <Shell id="servicios">
      <Reveal>
        <SectionTag>[ OPERACIONES ]</SectionTag>
        <h2 className="macro-title mb-10 text-4xl md:text-5xl">Servicios</h2>
      </Reveal>
      <Stagger className="grid grid-cols-1 gap-px border border-ink/20 bg-ink/20 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.name} data-stagger className="group flex flex-col bg-base">
            <div className="relative aspect-[16/10] border-b border-ink/20">
              <Image src={`https://picsum.photos/seed/${s.seed}/640/400`} alt={s.name} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-macro text-xl uppercase tracking-tight">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed">{s.desc}</p>
              <span className="mt-4 text-[0.65rem] uppercase tracking-[0.12em] text-accent">{" >>> Detalle"}</span>
            </div>
          </article>
        ))}
      </Stagger>
    </Shell>
  );
}
