"use client";

import { MapPin, Phone } from "@phosphor-icons/react";
import { useState } from "react";
import { privacyContent, termsContent } from "@/lib/legalContent";
import { siteContact } from "@/lib/siteContact";
import { FooterSocialLinks } from "./FooterSocial";
import { LegalModal } from "./LegalModal";
import { NavLogo } from "./NavLogo";

const labelClass = "text-[0.65rem] tracking-[0.28em] text-nav";
const logoClass = "nav-logo h-[1.4rem] w-auto md:h-[1.6rem] lg:h-[1.8rem]";

export function Footer() {
  const [legal, setLegal] = useState<"terms" | "privacy" | null>(null);
  const close = () => setLegal(null);

  return (
    <footer className="border-t border-nav/10 bg-base text-nav">
      <div className="site-container grid grid-cols-1 justify-items-start gap-10 py-12 min-[1021px]:grid-cols-4 min-[1021px]:gap-12">
        <div>
          <NavLogo lightText={false} loading="lazy" className={logoClass} />
        </div>
        <div>
          <p className={labelClass}>CONTACTO</p>
          <div className="mt-4 flex gap-3 text-sm leading-relaxed text-nav">
            <MapPin size={20} weight="bold" className="mt-0.5 shrink-0" aria-hidden />
            <p>
              <a
                href={siteContact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75"
              >
                {siteContact.street}
              </a>
              <br />
              {siteContact.city}
            </p>
          </div>
          <a href={siteContact.phoneHref} className="mt-4 flex items-center gap-3 text-sm text-nav hover:opacity-75">
            <Phone size={20} weight="bold" className="shrink-0" aria-hidden />
            {siteContact.phone}
          </a>
          <p className={`${labelClass} mt-8`}>REDES</p>
          <FooterSocialLinks />
        </div>
        <div className="flex flex-col text-sm text-nav">
          <button type="button" onClick={() => setLegal("terms")} className="py-1 text-left hover:opacity-75">
            Términos y condiciones
          </button>
          <button type="button" onClick={() => setLegal("privacy")} className="py-1 text-left hover:opacity-75">
            Aviso de privacidad
          </button>
          <p className="mt-auto pt-8 text-nav/70">© 2026 Apache Logistics</p>
          <p className="mt-2 text-nav/70">Permiso SCT vigente · Monitoreo GPS activo</p>
        </div>
        <div aria-hidden className="hidden min-[1021px]:block" />
      </div>
      <LegalModal open={legal === "terms"} title="Términos y condiciones" content={termsContent} onClose={close} />
      <LegalModal open={legal === "privacy"} title="Aviso de privacidad" content={privacyContent} onClose={close} />
    </footer>
  );
}
