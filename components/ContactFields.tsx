export function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <label className="block text-[0.7rem] uppercase tracking-[0.1em]">
      {label}
      <input required name={name} type={type} className="field mt-1" />
    </label>
  );
}

export function SelectField({ label, options }: { label: string; options: string[] }) {
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

export function AreaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block text-[0.7rem] uppercase tracking-[0.1em]">
      {label}
      <textarea required name={name} rows={4} className="field mt-1" />
    </label>
  );
}

export function Info({ label, text, href }: { label: string; text: string; href?: string }) {
  return (
    <p>
      <span className="text-[0.65rem] uppercase tracking-[0.12em] text-highlight">{label}</span>
      <br />
      {href ? <a href={href} className="hover:text-highlight">{text}</a> : text}
    </p>
  );
}
