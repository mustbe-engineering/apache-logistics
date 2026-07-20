"use client";

import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { useSiteMusic } from "@/lib/useSiteMusic";

export function MusicToggle() {
  const { on, toggle } = useSiteMusic();
  const Icon = on ? SpeakerHigh : SpeakerSlash;

  return (
    <button
      type="button"
      className="nav-music-btn"
      aria-pressed={on}
      aria-label={on ? "Silenciar" : "Activar música"}
      onClick={toggle}
    >
      <Icon size={20} weight="bold" aria-hidden />
    </button>
  );
}
