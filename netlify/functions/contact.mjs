import { buildContactEmail } from "./emailTemplate.mjs";

const TO = process.env.CONTACT_TO || "murillojorgealberto@gmail.com";

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function parseBody(body) {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const service = String(body?.service || "—").trim();
  const message = String(body?.message || "").trim();
  if (!name || !email || !message) return null;
  return { name, email, service, message };
}

async function sendEmail(data) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY missing");
  const mail = buildContactEmail(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Apache Logistics <onboarding@resend.dev>",
      to: [TO],
      reply_to: data.email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
}

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });
  try {
    const data = parseBody(await req.json());
    if (!data) return json(400, { error: "Datos incompletos" });
    await sendEmail(data);
    return json(200, { ok: true });
  } catch (err) {
    return json(500, { error: err.message || "Error al enviar" });
  }
};
