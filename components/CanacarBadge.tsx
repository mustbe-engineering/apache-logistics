const imgClass = "w-auto brightness-0 opacity-70";

type Props = { className?: string; imgClassName?: string };

export function CanacarBadge({ className, imgClassName }: Props) {
  return (
    <div className={`flex flex-col items-start gap-2 text-sm text-nav/70 ${className ?? ""}`}>
      <span>Miembros de </span>
      <img
        src="/images/clients/canacar.svg"
        alt="CANACAR"
        className={`${imgClass} ${imgClassName ?? "h-12"}`}
      />
    </div>
  );
}
