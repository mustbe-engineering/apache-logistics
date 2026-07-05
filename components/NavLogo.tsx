import Image from "next/image";

type NavLogoProps = {
  lightText?: boolean;
  className?: string;
};

export function NavLogo({ lightText = false, className }: NavLogoProps) {
  return (
    <Image
      src={lightText ? "/logo/logo-white.svg" : "/logo/logo.svg"}
      alt="Apache Logistics"
      width={2549}
      height={563}
      priority
      className={className}
    />
  );
}
