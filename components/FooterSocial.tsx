import Link from "next/link";

type IconProps = { className?: string };

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.66 15l-1.17 4.3 4.42-1.16A10 10 0 1 0 12 2Zm0 18a7.9 7.9 0 0 1-4-1.08l-.29-.17-2.62.69.7-2.55-.19-.3A8 8 0 1 1 12 20Zm4.3-5.7c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.5 6.5 0 0 1-1.92-1.18 7.2 7.2 0 0 1-1.34-1.68c-.14-.24 0-.37.1-.49s.24-.28.36-.42a1 1 0 0 0 .12-.42.5.5 0 0 0 0-.18c0-.06-.54-1.3-.74-1.78s-.4-.42-.54-.42h-.46a.88.88 0 0 0-.64.3 2.7 2.7 0 0 0-.84 2 5.2 5.2 0 0 0 1.08 2.74 11.9 11.9 0 0 0 4.58 4.04 4.8 4.8 0 0 0 1.2.44 2.9 2.9 0 0 0 1.34.08 2.2 2.2 0 0 0 1.44-1 1.8 1.8 0 0 0 .12-1 2 2 0 0 0-.18-.36Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.1H13.5V9.1c0-.9.2-1.5 1.5-1.5h1.6V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7v3.1h2.9v8h3.6Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM17.8 6.3a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2Z" />
    </svg>
  );
}

export const footerSocials = [
  { label: "WhatsApp", href: "https://google.com", Icon: WhatsappIcon },
  { label: "Facebook", href: "https://google.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://google.com", Icon: InstagramIcon },
] as const;

export function FooterSocialLinks() {
  return (
    <div className="mt-3 flex gap-3">
      {footerSocials.map(({ label, href, Icon }) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-nav transition-opacity hover:opacity-70">
          <Icon className="h-6 w-6" />
        </Link>
      ))}
    </div>
  );
}
