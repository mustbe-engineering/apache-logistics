"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { NavEnter } from "./gsap/NavEnter";
import { NavLogo } from "./NavLogo";
import { usePastHero } from "./nav/usePastHero";
import { SectionLink } from "./SectionLink";

const links = [
  { href: "#home", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#flota", label: "Flota" },
  { href: "#rutas", label: "Rutas" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pastHero = usePastHero();
  const close = () => setOpen(false);

  return (
    <NavEnter
      data-nav-shell
      className={`nav-shell sticky top-0 z-50${pastHero ? " nav-shell--glass" : ""}`}
    >
      <div className="site-container flex h-[4.25rem] items-center md:h-[5rem] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex items-center gap-4 md:gap-6 lg:col-start-1">
          <Link
            href="/"
            data-nav-logo
            className="inline-flex shrink-0 items-center"
            onClick={close}
          >
            <NavLogo
              lightText={!pastHero}
              className="nav-logo h-7 w-auto md:h-8 lg:h-9"
            />
          </Link>

          <span
            role="separator"
            aria-orientation="vertical"
            data-nav-separator
            className="nav-separator hidden h-5 w-px shrink-0 bg-base/35 transition-colors duration-500 md:block lg:hidden lg:h-6"
          />
        </div>

        <nav
          data-nav-links
          className="hidden items-center gap-6 lg:col-start-2 lg:flex xl:gap-7"
          aria-label="Principal"
        >
          {links.map((l) => (
            <SectionLink key={l.href} href={l.href} className="nav-link">
              <span className="nav-link-text">{l.label}</span>
            </SectionLink>
          ))}
        </nav>

        <div
          data-nav-actions
          className="ml-auto flex items-center gap-3 lg:col-start-3 lg:ml-0 lg:justify-self-end"
        >
          <SectionLink href="#contacto" className="btn-cotizar btn-cotizar-nav shrink-0">
            <span>Cotizar</span>
          </SectionLink>
          <button
            type="button"
            className="nav-menu-btn inline-flex h-10 w-10 items-center justify-center transition-colors duration-500 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile-panel border-t border-base/10 px-[var(--gutter)] py-5 transition-[background-color,border-color] duration-500 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Móvil">
            {links.map((l) => (
              <SectionLink
                key={l.href}
                href={l.href}
                onNavigate={close}
                className="nav-link-mobile"
              >
                <span className="nav-link-mobile-text">{l.label}</span>
              </SectionLink>
            ))}
          </nav>
        </div>
      )}
    </NavEnter>
  );
}
