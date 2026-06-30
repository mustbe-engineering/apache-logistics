import { stats } from "@/lib/data";
import { Stagger } from "./gsap/Stagger";
import { StatCounter } from "./StatCounter";

export function StatsBar() {
  return (
    <section aria-label="Estadísticas" className="stats-bar">
      <Stagger className="stats-bar__grid" start="top 86%" y={18} duration={0.72} stagger={0.12}>
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} label={s.label} icon={s.icon} />
        ))}
      </Stagger>
    </section>
  );
}
