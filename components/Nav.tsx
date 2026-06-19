"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { NavEnter } from "./gsap/NavEnter";
import { SectionLink } from "./SectionLink";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#flota", label: "Flota" },
  { href: "#clientes", label: "Clientes" },
  { href: "#blog", label: "Noticias" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <NavEnter className="sticky top-0 z-50 border-b border-base/20 bg-nav text-base">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-[var(--gutter)] md:h-20">
        <Link href="/" className="font-macro text-lg uppercase tracking-tight text-base">
          Apache®
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <SectionLink key={l.href} href={l.href} className="text-[0.7rem] uppercase tracking-[0.12em] hover:text-highlight">
              {l.label}
            </SectionLink>
          ))}
          <SectionLink href="#contacto" className="bg-hero px-4 py-2 text-[0.7rem] uppercase tracking-[0.1em] text-base">
            Cotiza tu envío.
          </SectionLink>
        </nav>
        <button type="button" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-base/20 bg-nav px-[var(--gutter)] py-4 md:hidden">
          {links.map((l) => (
            <SectionLink key={l.href} href={l.href} onNavigate={close} className="block py-2 text-[0.75rem] uppercase tracking-[0.12em]">
              {l.label}
            </SectionLink>
          ))}
        </div>
      )}
    </NavEnter>
  );
}
