import { stats } from "@/lib/data";
import { Stagger } from "./gsap/Stagger";

export function StatsBar() {
  return (
    <section aria-label="Estadísticas" className="border-b border-ink/20 bg-ink text-base">
      <Stagger className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-base/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} data-stagger className="px-[var(--gutter)] py-10 text-center sm:py-12">
            <data value={s.value} className="block font-macro text-5xl uppercase leading-none tracking-tight text-highlight md:text-6xl">
              {s.value}
            </data>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.14em]">{s.label}</p>
          </div>
        ))}
      </Stagger>
    </section>
  );
}
