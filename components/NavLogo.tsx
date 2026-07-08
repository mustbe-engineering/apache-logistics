type NavLogoProps = {
  lightText?: boolean;
  className?: string;
  loading?: "eager" | "lazy";
};

export function NavLogo({ lightText = false, className, loading = "eager" }: NavLogoProps) {
  return (
    <img
      src={lightText ? "/logo/logo-white.svg" : "/logo/logo.svg"}
      alt="Apache Logistics"
      width={2549}
      height={563}
      decoding="async"
      loading={loading}
      className={className}
    />
  );
}
