import Image from "next/image";
import { posts } from "@/lib/content";
import { Reveal } from "./gsap/Reveal";
import { Stagger } from "./gsap/Stagger";
import { SectionLink } from "./SectionLink";
import { Shell } from "./ui";

export function Blog() {
  return (
    <Shell id="blog">
      <Reveal>
        <h2 className="macro-title mb-10 text-4xl md:text-5xl">Noticias</h2>
      </Reveal>
      <Stagger className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} data-stagger className="compartment flex flex-col">
            <div className="relative aspect-[3/2] border-b border-ink/20">
              <Image src={`https://picsum.photos/seed/${p.seed}/600/400`} alt={p.title} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <time className="text-[0.65rem] uppercase tracking-[0.12em] text-accent">{p.date}</time>
              <h3 className="mt-2 font-macro text-lg uppercase leading-tight tracking-tight">{p.title}</h3>
              <SectionLink href="#contacto" className="mt-auto pt-4 text-[0.65rem] uppercase tracking-[0.12em] text-hero">
                Leer más
              </SectionLink>
            </div>
          </article>
        ))}
      </Stagger>
    </Shell>
  );
}
