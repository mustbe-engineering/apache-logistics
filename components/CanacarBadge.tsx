type Props = { className?: string; imgClassName?: string };

const imgClass = "w-auto brightness-0 opacity-70";

export function CanacarBadge({ className, imgClassName }: Props) {
  return (
    <a
      href="https://canacar.com.mx/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="CANACAR"
      className={`flex flex-col items-start gap-2 text-sm text-nav/70 transition-opacity hover:opacity-80 ${className ?? ""}`}
    >
      <span>Miembros de </span>
      <img
        src="/images/clients/canacar.svg"
        alt=""
        className={`${imgClass} ${imgClassName ?? "h-12"}`}
      />
    </a>
  );
}
