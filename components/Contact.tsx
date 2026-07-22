"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import { siteAddressText, siteContact } from "@/lib/siteContact";
import { payloadFromForm, submitContact } from "@/lib/submitContact";
import { AreaField, Field, Info, SelectField } from "./ContactFields";
import { WhatsappIcon } from "./FooterSocial";

const serviceOptions = services.map((s) => s.name);

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      await submitContact(payloadFromForm(form));
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Error al enviar");
    }
  }

  return (
    <>
      <h2 className="mb-10 pr-10 font-display text-4xl font-normal leading-[1.6] text-nav md:text-5xl">Contacto</h2>
      <div className="grid gap-8 lg:grid-cols-5">
        <form className="compartment space-y-4 p-6 lg:col-span-3" onSubmit={onSubmit}>
          <Field label="Nombre" name="name" type="text" />
          <Field label="Email" name="email" type="email" />
          <SelectField label="Servicio" options={serviceOptions} />
          <AreaField label="Mensaje" name="message" />
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button type="submit" disabled={status === "sending"} className="btn-cotizar w-full px-4 py-3 md:w-auto">
              {status === "sending" ? "Enviando…" : "Cotiza tu envío."}
            </button>
            <a
              href={siteContact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex w-full items-center justify-center gap-2 px-4 py-3 md:w-auto"
            >
              <WhatsappIcon className="h-5 w-5 shrink-0" />
              <span>Contactar con asesor</span>
            </a>
          </div>
          {status === "ok" && <p className="text-sm text-nav">Mensaje enviado. Te contactamos pronto.</p>}
          {status === "err" && <p className="text-sm text-red-700">{error}</p>}
        </form>
        <address className="compartment-dark not-italic lg:col-span-2">
          <div className="space-y-6 p-6 text-sm leading-relaxed">
            <Info label="Dirección" text={siteAddressText} />
            <Info label="Teléfono" href={siteContact.phoneHref} text={siteContact.phone} />
            <Info label="Email" href={`mailto:${siteContact.email}`} text={siteContact.email} />
            <Info label="Horario" text={siteContact.hours} />
          </div>
        </address>
      </div>
    </>
  );
}
