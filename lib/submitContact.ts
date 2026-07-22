export type ContactPayload = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export async function submitContact(data: ContactPayload) {
  const res = await fetch("/.netlify/functions/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "No se pudo enviar");
  return body;
}

export function payloadFromForm(form: HTMLFormElement): ContactPayload {
  const fd = new FormData(form);
  return {
    name: String(fd.get("name") || ""),
    email: String(fd.get("email") || ""),
    service: String(fd.get("service") || ""),
    message: String(fd.get("message") || ""),
  };
}
