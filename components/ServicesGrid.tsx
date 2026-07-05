import { services } from "@/lib/data";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-4 lg:gap-5">
      {services.map((s) => (
        <ServiceCard key={s.name} name={s.name} desc={s.desc} icon={s.icon} />
      ))}
    </div>
  );
}
