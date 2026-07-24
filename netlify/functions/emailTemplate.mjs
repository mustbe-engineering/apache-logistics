const C = {
  base: "#FDFDFD",
  nav: "#164775",
  accent: "#B6753B",
  highlight: "#FBD70E",
  muted: "rgba(22,71,117,0.62)",
  border: "rgba(22,71,117,0.12)",
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function field(label, value) {
  return `<tr><td style="padding:16px 0;border-bottom:1px solid ${C.border}">
    <div style="font:600 11px/1.2 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${C.accent}">${label}</div>
    <div style="margin-top:8px;font:400 15px/1.55 Arial,sans-serif;color:${C.nav};white-space:pre-wrap">${value}</div>
  </td></tr>`;
}

function headerHtml() {
  return `<tr><td style="background:${C.nav};padding:22px 28px">
    <div style="font:700 11px/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:${C.highlight}">Apache Logistics</div>
    <div style="margin-top:10px;font:400 26px/1.15 Arial,sans-serif;color:#fff">Nueva cotización</div>
  </td></tr>
  <tr><td style="height:4px;background:${C.accent};font-size:0;line-height:0">&nbsp;</td></tr>`;
}

function bodyHtml(data) {
  const email = esc(data.email);
  return `${headerHtml()}
  <tr><td style="padding:8px 28px 28px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${field("Nombre", esc(data.name))}
      ${field("Email", `<a href="mailto:${email}" style="color:${C.nav};text-decoration:none">${email}</a>`)}
      ${field("Servicio", esc(data.service))}
      ${field("Mensaje", esc(data.message))}
    </table>
    <p style="margin:24px 0 0;font:400 12px/1.5 Arial,sans-serif;color:${C.muted}">Responde a este correo para contactar al cliente.</p>
  </td></tr>`;
}

export function buildContactEmail(data) {
  const text = `Nombre: ${data.name}\nEmail: ${data.email}\nServicio: ${data.service}\n\n${data.message}`;
  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${C.base}">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.base};padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#fff;border:1px solid ${C.border}">
        ${bodyHtml(data)}
      </table>
    </td></tr>
  </table>
</body></html>`;
  return { subject: `Cotización — ${data.name}`, text, html };
}
