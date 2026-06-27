import { HeroEnter } from "./gsap/HeroEnter";
import { HeroOverlay } from "./HeroOverlay";
import { SectionLink } from "./SectionLink";

export function Hero() {
  return (
    <section className="relative h-[100dvh] min-h-[max(36rem,100dvh)] overflow-hidden text-base">
      <HeroEnter>
        <div className="relative h-full">
          <video
            data-hero-media
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          >
            <source src="/videos/apache-optimized.mp4" type="video/mp4" />
          </video>
          <HeroOverlay />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-[var(--gutter)] pb-10 pt-16 md:items-center md:pb-14 md:pt-20">
            <div data-hero-copy className="max-w-xl">
              <p className="mb-4 text-[0.65rem] uppercase tracking-[0.14em] text-highlight">
                [ TRANSPORTE NOROESTE ]
              </p>
              <h1 className="macro-title max-w-xl text-base">Conocemos el camino</h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-base/90 md:text-base">
                Más de 10 años moviendo carga por el noroeste de México con la seguridad y el trato de una empresa familiar.
              </p>
              <SectionLink
                data-hero-cta
                href="#contacto"
                className="mt-8 inline-block w-fit bg-hero px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-base"
              >
                Cotiza tu envío.
              </SectionLink>
            </div>
          </div>
        </div>
      </HeroEnter>
    </section>
  );
}
