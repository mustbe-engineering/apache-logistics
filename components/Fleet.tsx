import Image from "next/image";
import { fleetSpecs } from "@/lib/data";
import { Reveal } from "./gsap/Reveal";
import { Stagger } from "./gsap/Stagger";
import { SectionTag, Shell } from "./ui";

export function Fleet() {
  return (
    <Shell id="flota">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SectionTag>[ TELEMETRÍA ]</SectionTag>
          <h2 className="macro-title text-4xl md:text-5xl">Flota y tecnología</h2>
          <p className="mt-6 max-w-prose text-sm leading-relaxed">
            Cada unidad reporta ubicación, velocidad y eventos críticos. Operamos con permisos vigentes y protocolos documentados.
          </p>
          <div className="relative mt-8 aspect-video border border-ink/20">
            <Image src="https://picsum.photos/seed/apache-fleet/900/506" alt="Centro de monitoreo de flota" fill className="object-cover" />
          </div>
        </Reveal>
        <Stagger className="compartment-dark">
          <table className="w-full text-left text-[0.75rem] uppercase tracking-[0.08em]">
            <tbody>
              {fleetSpecs.map((row, i) => (
                <tr key={row.id} data-stagger className={i < fleetSpecs.length - 1 ? "border-b border-base/20" : ""}>
                  <th scope="row" className="w-2/5 px-4 py-4 font-normal text-highlight">{row.id}</th>
                  <td className="px-4 py-4 normal-case tracking-normal">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Stagger>
      </div>
    </Shell>
  );
}
