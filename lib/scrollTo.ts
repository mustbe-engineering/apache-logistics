const NAV_OFFSET = 80;

export function scrollToSection(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (id === "home") {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
