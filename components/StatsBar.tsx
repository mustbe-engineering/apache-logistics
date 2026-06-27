import { stats } from "@/lib/data";
import { Stagger } from "./gsap/Stagger";
import { StatCounter } from "./StatCounter";

export function StatsBar() {
  return (
    <section aria-label="Estadísticas" className="bg-nav text-base">
      <Stagger className="mx-auto grid max-w-[1440px] grid-cols-1 place-items-center sm:grid-cols-3">
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </Stagger>
    </section>
  );
}
