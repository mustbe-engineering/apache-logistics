type TagProps = { children: string };

export function SectionTag({ children }: TagProps) {
  return (
    <p className="mb-4 text-[0.65rem] uppercase tracking-[0.14em] text-accent">
      {children}
    </p>
  );
}

export function Shell({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[var(--nav-offset)] border-t border-ink/20 py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-7xl px-[var(--gutter)]">{children}</div>
    </section>
  );
}
