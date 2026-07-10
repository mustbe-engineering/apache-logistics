type Props = {
  src: string;
  alt?: string;
  className?: string;
  sizeRem?: number;
  /** Intrinsic SVG aspect ratio width/height. Defaults to 1 (square). */
  aspect?: number;
};

export function ServiceIcon({ src, alt = "", className = "", sizeRem, aspect = 1 }: Props) {
  const size = sizeRem
    ? { height: `${sizeRem}rem`, width: `${sizeRem * aspect}rem` }
    : undefined;

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
