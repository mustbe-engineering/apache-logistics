type Props = {
  src: string;
  alt?: string;
  className?: string;
  sizeRem?: number;
};

export function ServiceIcon({ src, alt = "", className = "", sizeRem }: Props) {
  const size = sizeRem ? { width: `${sizeRem}rem`, height: `${sizeRem}rem` } : undefined;

  return (
    <span
      role={alt ? "img" : "presentation"}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`inline-block bg-current ${className}`}
      style={{
        ...size,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
