import { FleetFeatures } from "./FleetFeatures";

function TitleLine({ text }: { text: string }) {
  return (
    <div className="scroll-sequence__title-line-wrap">
      <span className="scroll-sequence__title-line scroll-sequence__title-line--base">{text}</span>
      <span className="scroll-sequence__title-line scroll-sequence__title-line--reveal" aria-hidden="true">{text}</span>
    </div>
  );
}

function TitleSet({ lines, variant }: { lines: string[]; variant: "desktop" | "mobile" }) {
  return (
    <div className={`scroll-sequence__title-set scroll-sequence__title-set--${variant}`}>
      {lines.map((text) => (
        <TitleLine key={text} text={text} />
      ))}
    </div>
  );
}

export function FleetSequenceContent() {
  return (
    <div className="scroll-sequence__sticky">
      <canvas className="scroll-sequence__canvas" aria-hidden="true" />
      <img className="scroll-sequence__fallback" alt="" hidden />
      <div className="scroll-sequence__title">
        <TitleSet variant="desktop" lines={["Unidades listas", "para cualquier ruta."]} />
        <TitleSet variant="mobile" lines={["Unidades", "listas para", "cualquier ruta."]} />
      </div>
      <div className="scroll-sequence__outro-layer" aria-hidden="true">
        <div className="scroll-sequence__outro">
          <h2 className="scroll-sequence__outro-heading">
            Nuestras <br className="md:hidden" />unidades
          </h2>
          <p className="scroll-sequence__outro-copy scroll-sequence__outro-copy--desktop">
            <span className="scroll-sequence__outro-line">Cada unidad reporta ubicación, velocidad y eventos críticos.</span>
            <span className="scroll-sequence__outro-line">Operamos con permisos vigentes y protocolos documentados</span>
          </p>
          <p className="scroll-sequence__outro-copy scroll-sequence__outro-copy--mobile">
            <span>Cada unidad reporta ubicación,</span>
            <span>velocidad y eventos críticos.</span>
            <span>Operamos con permisos vigentes</span>
            <span>y protocolos documentados.</span>
          </p>
        </div>
        <FleetFeatures />
      </div>
      <div className="scroll-sequence__loader" aria-live="polite">
        <span className="scroll-sequence__loader-ring" />
        <span className="scroll-sequence__loader-text">Cargando secuencia…</span>
      </div>
    </div>
  );
}
