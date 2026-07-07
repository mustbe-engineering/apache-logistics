import { services } from "@/lib/data";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  return (
    <div className="mx-auto mt-8 grid w-full max-w-[52.5rem] grid-cols-3 gap-3">
      {services.map((s) => (
        <ServiceCard key={s.name} name={s.name} desc={s.desc} icon={s.icon} />
      ))}
    </div>
  );
}
