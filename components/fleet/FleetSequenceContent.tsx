import { FleetFeatures } from "./FleetFeatures";

function TitleLine({ text }: { text: string }) {
  return (
    <div className="scroll-sequence__title-line-wrap">
      <span className="scroll-sequence__title-line scroll-sequence__title-line--base">{text}</span>
      <span className="scroll-sequence__title-line scroll-sequence__title-line--reveal" aria-hidden="true">{text}</span>
    </div>
  );
}

export function FleetSequenceContent() {
  return (
    <div className="scroll-sequence__sticky">
      <canvas className="scroll-sequence__canvas" aria-hidden="true" />
      <img className="scroll-sequence__fallback" alt="" hidden />
      <div className="scroll-sequence__title">
        <TitleLine text="Unidades listas" />
        <TitleLine text="para cualquier ruta." />
      </div>
      <div className="scroll-sequence__outro-layer" aria-hidden="true">
        <div className="scroll-sequence__outro">
          <h2 className="scroll-sequence__outro-heading">Nuestras unidades</h2>
          <p className="scroll-sequence__outro-copy">
            <span className="scroll-sequence__outro-line">Cada unidad reporta ubicación, velocidad y eventos críticos.</span>
            <span className="scroll-sequence__outro-line">Operamos con permisos vigentes y protocolos documentados</span>
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
