import Image from "next/image";
import { HeroEnter } from "./gsap/HeroEnter";
import { HeroVideo } from "./HeroVideo";
import { QuoteOpenButton } from "./QuoteOpenButton";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100dvh-var(--nav-offset))] overflow-hidden text-base">
      <HeroEnter>
        <div className="relative min-h-[calc(100dvh-var(--nav-offset))]">
          <Image
            src="/images/assets/hero-poster.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={72}
            className="absolute inset-0 object-cover object-[center_42%]"
            aria-hidden
          />
          <HeroVideo />

          <div
            aria-hidden
            data-hero-scrim
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-nav/85 from-0% via-nav/45 via-[42%] to-nav/10 to-[72%]"
          />
          <div
            aria-hidden
            data-hero-scrim
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-transparent to-nav/15"
          />

          <div className="site-container relative z-10 flex min-h-[calc(100dvh-var(--nav-height))] items-center py-12 md:py-16">
            <div data-hero-copy className="w-full max-w-[38rem]">

              <h1 className="hero-title">
                <span className="hero-title-line">Conocemos</span>
                <span className="hero-title-line">el&nbsp;camino.</span>
              </h1>

              <p className="hero-lead mt-[clamp(1.25rem,1.5vw+0.75rem,1.75rem)] max-w-[32rem] text-base/90">
                Más de 10 años de experiencia, moviendo la carga por el noroeste de México con la
                seguridad y el trato de una buena empresa familiar.
              </p>

              <QuoteOpenButton
                data-hero-cta
                className="btn-cotizar btn-cotizar-hero mt-8 md:mt-10"
              >
                <span>Cotizar servicio</span>
                <span className="btn-cotizar-icon" aria-hidden>
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      className="btn-cotizar-icon-arrow"
                      d="M4 10h8.25M12.25 10l-3.25-3.25M12.25 10l-3.25 3.25"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </QuoteOpenButton>
            </div>
          </div>
        </div>
      </HeroEnter>
    </section>
  );
}
