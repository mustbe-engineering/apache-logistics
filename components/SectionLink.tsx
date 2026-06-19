"use client";

import { scrollToSection } from "@/lib/scrollTo";

type SectionLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  onNavigate?: () => void;
};

export function SectionLink({
  href,
  children,
  className,
  onNavigate,
  onClick,
  ...rest
}: SectionLinkProps) {
  const id = href.replace("#", "");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection(id);
    onNavigate?.();
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
