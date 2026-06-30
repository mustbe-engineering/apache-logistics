import { clients, quotes } from "@/lib/content";
import { Reveal } from "./gsap/Reveal";
import { Stagger } from "./gsap/Stagger";
import { Shell } from "./ui";

function LogoMark({ mark }: { mark: string }) {
  return (
    <svg viewBox="0 0 80 40" className="h-10 w-20" aria-hidden>
      <rect width="80" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="40" y="26" textAnchor="middle" className="fill-current text-[14px] font-sans uppercase">
        {mark}
      </text>
    </svg>
  );
}

export function Clients() {
  return (
    <Shell id="clientes">
      <Reveal>
        <h2 className="macro-title mb-10 text-4xl md:text-5xl">Confianza de clientes</h2>
      </Reveal>
      <Stagger className="grid grid-cols-2 gap-px border border-ink/20 bg-ink/20 sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((c) => (
          <div key={c.name} data-stagger className="flex items-center justify-center bg-base p-6 text-ink/80">
            <LogoMark mark={c.mark} />
          </div>
        ))}
      </Stagger>
      <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
        {quotes.map((q) => (
          <blockquote key={q.author} data-stagger className="compartment p-6">
            <p className="text-sm leading-relaxed">&ldquo;{q.text}&rdquo;</p>
            <footer className="mt-4 border-t border-ink/20 pt-4 text-[0.7rem] uppercase tracking-[0.1em]">
              {q.author}
              <span className="mt-1 block normal-case tracking-normal text-ink/70">{q.role}</span>
            </footer>
          </blockquote>
        ))}
      </Stagger>
    </Shell>
  );
}
