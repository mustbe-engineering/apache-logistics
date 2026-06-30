"use client";

import Image from "next/image";
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
  { href: "#rutas", label: "Rutas" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <NavEnter className="sticky top-0 z-50 border-b border-base/20 bg-nav text-base">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center px-[var(--gutter)] md:h-20">
        <Link href="/" className="inline-flex shrink-0 items-center">
          <Image
            src="/logo/white-logo.svg"
            alt="Apache Logistics"
            width={1198}
            height={222}
            className="h-[1.125rem] w-auto"
            priority
          />
        </Link>
        <span
          role="separator"
          aria-orientation="vertical"
          className="mx-3 hidden h-4 w-px shrink-0 bg-base/35 md:mx-4 md:block lg:mx-5 lg:h-5"
        />
        <div className="ml-auto hidden items-center md:flex md:gap-4 lg:gap-6 xl:gap-8">
          <nav className="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {links.map((l) => (
              <SectionLink key={l.href} href={l.href} className="text-[0.7rem] uppercase tracking-[0.12em] hover:text-highlight">
                {l.label}
              </SectionLink>
            ))}
          </nav>
          <SectionLink href="#contacto" className="shrink-0 bg-hero px-4 py-2 text-[0.7rem] uppercase tracking-[0.1em] text-base">
            Cotiza tu envío.
          </SectionLink>
        </div>
        <button type="button" className="ml-auto md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
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
