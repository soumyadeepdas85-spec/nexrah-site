import { NextResponse } from "next/server";

// Emails form submissions via Resend (https://resend.com).
// Set RESEND_API_KEY, CONTACT_TO_EMAIL and (optionally) CONTACT_FROM_EMAIL in .env.local.
// Without a key, submissions are logged server-side so you can test locally.

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill this, humans never see it.
  if (body.website) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const service = String(body.service ?? "").trim().slice(0, 120);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !service || message.length < 10) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set; enquiry NOT delivered");
      return NextResponse.json({ error: "Email not configured" }, { status: 500 });
    }
    console.log("[contact] (email not configured) new enquiry:", { name, email, phone, service, message });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "NexRah Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New strategy call request: ${name} (${service})`,
      html: `<h2>New enquiry from nexrah website</h2>
        <p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone || "-")}<br><b>Service:</b> ${esc(service)}</p>
        <p><b>Message:</b></p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Email provider error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
