import { SectionLink } from "./SectionLink";

export function Footer() {
  return (
    <footer className="border-t border-base/20 bg-nav text-base">
      <div className="mx-auto grid max-w-7xl gap-8 px-[var(--gutter)] py-12 md:grid-cols-3">
        <div>
          <p className="font-macro text-lg uppercase">Apache® Logistics</p>
          <p className="mt-3 text-sm leading-relaxed text-base/80">
            Transporte de carga especializado en el noroeste de México.
          </p>
        </div>
        <div className="text-[0.7rem] uppercase tracking-[0.1em]">
          <p className="mb-3 text-highlight">Enlaces</p>
          {[
            { href: "#nosotros", label: "Nosotros" },
            { href: "#servicios", label: "Servicios" },
            { href: "#flota", label: "Flota" },
            { href: "#contacto", label: "Contacto" },
          ].map((l) => (
            <SectionLink key={l.href} href={l.href} className="block py-1 hover:text-highlight">
              {l.label}
            </SectionLink>
          ))}
        </div>
        <div className="text-sm text-base/80">
          <p>© 2026 Apache Logistics</p>
          <p className="mt-2">Permiso SCT vigente · Monitoreo GPS activo</p>
        </div>
      </div>
    </footer>
  );
}
