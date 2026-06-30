import Image from "next/image";

export function SectionDivider() {
  return (
    <section aria-hidden className="py-[var(--section-y)]">
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-[var(--gutter)]">
        <div className="relative aspect-[21/9] w-full max-w-3xl border border-ink/20">
          <Image
            src="https://picsum.photos/seed/apache-separator/1200/514"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 48rem"
          />
        </div>
      </div>
    </section>
  );
}
