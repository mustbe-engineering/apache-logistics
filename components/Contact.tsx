"use client";

import { Reveal } from "./gsap/Reveal";
import { Stagger } from "./gsap/Stagger";
import { Shell } from "./ui";

const serviceOptions = ["LCL", "LTL", "Trasbordos", "Maniobras", "Almacenaje", "Última milla"];

export function Contact() {
  return (
    <Shell id="contacto">
      <Reveal>
        <h2 className="macro-title mb-10 text-4xl md:text-5xl">Contacto</h2>
      </Reveal>
      <Stagger className="grid gap-8 lg:grid-cols-5">
        <form data-stagger className="compartment space-y-4 p-6 lg:col-span-3" onSubmit={(e) => e.preventDefault()}>
          <Field label="Nombre" name="name" type="text" />
          <Field label="Email" name="email" type="email" />
          <SelectField label="Servicio" options={serviceOptions} />
          <AreaField label="Mensaje" name="message" />
          <button type="submit" className="btn-cotizar w-full px-4 py-3 md:w-auto">
            Cotiza tu envío.
          </button>
        </form>
        <address data-stagger className="compartment-dark not-italic lg:col-span-2">
          <div className="space-y-6 p-6 text-sm leading-relaxed">
            <Info label="Dirección" text="Blvd. Colosio 1240, Col. Pitic, Hermosillo, Sonora, CP 83100" />
            <Info label="Teléfono" href="tel:+526621234567" text="+52 662 123 4567" />
            <Info label="Email" href="mailto:operaciones@apachelogistics.mx" text="operaciones@apachelogistics.mx" />
            <Info label="Horario" text="Lunes a viernes, 07:00 a 19:00" />
          </div>
        </address>
      </Stagger>
    </Shell>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <label className="block text-[0.7rem] uppercase tracking-[0.1em]">
      {label}
      <input required name={name} type={type} className="field mt-1" />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block text-[0.7rem] uppercase tracking-[0.1em]">
      {label}
      <select name="service" className="field mt-1">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function AreaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block text-[0.7rem] uppercase tracking-[0.1em]">
      {label}
      <textarea required name={name} rows={4} className="field mt-1" />
    </label>
  );
}

function Info({ label, text, href }: { label: string; text: string; href?: string }) {
  return (
    <p>
      <span className="text-[0.65rem] uppercase tracking-[0.12em] text-highlight">{label}</span>
      <br />
      {href ? <a href={href} className="hover:text-highlight">{text}</a> : text}
    </p>
  );
}
