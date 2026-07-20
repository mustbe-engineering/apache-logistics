"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { NavEnter } from "./gsap/NavEnter";
import { NavLogo } from "./NavLogo";
import { NavActiveLine } from "./nav/NavActiveLine";
import { NAV_LINKS } from "./nav/links";
import { useActiveSection } from "./nav/useActiveSection";
import { usePastHero } from "./nav/usePastHero";
import { MusicToggle } from "./MusicToggle";
import { QuoteOpenButton } from "./QuoteOpenButton";
import { SectionLink } from "./SectionLink";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pastHero = usePastHero();
  const activeSection = useActiveSection();
  const close = () => setOpen(false);

  return (
    <NavEnter
      data-nav-shell
      className={`nav-shell${pastHero ? " nav-shell--glass" : ""}`}
    >
      <div className="nav-bar site-container relative flex items-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex min-w-0 items-center gap-4 md:gap-6 lg:w-full lg:min-w-0 lg:gap-0">
          <Link
            href="/"
            data-nav-logo
            className="nav-logo-link inline-flex shrink-0 items-center"
            onClick={close}
          >
            <NavLogo
              lightText={!pastHero}
              className="nav-logo h-[1.4rem] w-auto md:h-[1.6rem] lg:h-[1.8rem]"
            />
          </Link>
          <span
            role="presentation"
            data-nav-separator
            className="nav-separator-wrap hidden min-w-0 md:flex lg:flex-1 lg:justify-center"
          >
            <span role="separator" aria-orientation="vertical" className="nav-separator" />
          </span>
        </div>

        <nav
          data-nav-links
          className="hidden items-center lg:flex lg:justify-self-center"
          aria-label="Principal"
        >
          {NAV_LINKS.map((l) => (
            <SectionLink
              key={l.href}
              href={l.href}
              className={`nav-link${activeSection === l.href.slice(1) ? " nav-link--active" : ""}`}
            >
              <span className="nav-link-text">{l.label}</span>
            </SectionLink>
          ))}
        </nav>

        <div data-nav-actions className="ml-auto flex items-center gap-3 lg:ml-0 lg:justify-self-end">
          <MusicToggle />
          <QuoteOpenButton className="btn-cotizar btn-cotizar-nav shrink-0" onClick={close}>
            <span>COTIZAR</span>
          </QuoteOpenButton>
          <button
            type="button"
            className="nav-menu-btn lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
        <NavActiveLine activeId={activeSection} pastHero={pastHero} />
      </div>

      {open && (
        <div className="nav-mobile-panel px-[var(--gutter)] py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Móvil">
            {NAV_LINKS.map((l) => (
              <SectionLink
                key={l.href}
                href={l.href}
                onNavigate={close}
                className={`nav-link-mobile${activeSection === l.href.slice(1) ? " nav-link-mobile--active" : ""}`}
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
