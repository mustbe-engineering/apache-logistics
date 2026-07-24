import Link from "next/link";
import { siteContact } from "@/lib/siteContact";

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
      <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM17.8 6.3a1.2 1.2 0 1 1-1.2 1.2 1.2 0 0 1 1.2-1.2Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 382 382" className={`scale-[0.82] ${className ?? ""}`} aria-hidden>
      <path
        fill="currentColor"
        d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z"
      />
    </svg>
  );
}

export const footerSocials = [
  { label: "WhatsApp", href: siteContact.whatsappHref, Icon: WhatsappIcon },
  { label: "Facebook", href: "https://www.facebook.com/apachelogisticsbc", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/apachebc.logistics/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/apache-logistics/", Icon: LinkedinIcon },
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
