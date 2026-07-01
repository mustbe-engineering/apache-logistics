"use client";

import { MapPin, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { privacyContent, termsContent } from "@/lib/legalContent";
import { FooterSocialLinks } from "./FooterSocial";
import { LegalModal } from "./LegalModal";

const labelClass = "text-[0.65rem] tracking-[0.28em] text-nav";

export function Footer() {
  const [legal, setLegal] = useState<"terms" | "privacy" | null>(null);
  const close = () => setLegal(null);

  return (
    <footer className="border-t border-nav/10 bg-base text-nav">
      <div className="site-container grid gap-10 py-12 lg:grid-cols-[minmax(0,1.35fr)_1fr_1fr] lg:gap-12">
        <div className="max-w-xs md:max-w-sm">
          <Image
            src="/logo/apache-logo.svg"
            alt="Apache Logistics"
            width={2548}
            height={563}
            className="h-auto w-full"
          />
        </div>
        <div>
          <p className={labelClass}>C O N T A C T O</p>
          <div className="mt-4 flex gap-3 text-sm leading-relaxed text-nav">
            <MapPin size={20} weight="bold" className="mt-0.5 shrink-0" aria-hidden />
            <p>
              Callejon C #126. Col. El Naranjo
              <br />
              C.P 22785. Ensenada BC
            </p>
          </div>
          <a href="tel:+526461509120" className="mt-4 flex items-center gap-3 text-sm text-nav hover:opacity-75">
            <Phone size={20} weight="bold" className="shrink-0" aria-hidden />
            +52 646 150 9120
          </a>
          <p className={`${labelClass} mt-8`}>R E D E S</p>
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
      </div>
      <LegalModal open={legal === "terms"} title="Términos y condiciones" content={termsContent} onClose={close} />
      <LegalModal open={legal === "privacy"} title="Aviso de privacidad" content={privacyContent} onClose={close} />
    </footer>
  );
}
