import { services } from "@/lib/data";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  return (
    <div className="mx-auto mt-8 w-full max-w-[52.5rem] overflow-hidden rounded-md border-2 border-[#234b6e]">
      <div className="grid grid-cols-3 gap-[5px] bg-[#234b6e]">
        {services.map((s, i) => (
          <ServiceCard key={s.name} index={i + 1} name={s.name} desc={s.desc} icon={s.icon} />
        ))}
      </div>
    </div>
  );
}
