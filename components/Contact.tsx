"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, MapPin, Mail } from "lucide-react";
import { services } from "@/lib/content";
import { Reveal, XMark } from "./ui";

type Errors = Partial<Record<"name" | "email" | "phone" | "service" | "message", string>>;

const field =
  "w-full min-h-12 rounded-xl border border-line bg-bg px-4 py-3 text-base text-fg sm:text-sm placeholder:text-muted/70 focus:border-fg";

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Enter a valid email, like name@company.com.";
    if (data.phone && !/^[+\d][\d\s-]{7,15}$/.test(data.phone.trim()))
      next.phone = "Enter a valid phone number, for example +91 98765 43210.";
    if (!data.service) next.service = "Choose the service you are interested in.";
    if (!data.message?.trim() || data.message.trim().length < 10)
      next.message = "Tell us a little about your project (at least 10 characters).";

    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("failed");
    }
  }

  const err = (k: keyof Errors) => errors[k];
  const errList = Object.entries(errors);

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="grad-ink relative mx-auto grid max-w-[1240px] gap-10 overflow-hidden rounded-[36px] p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-16">
        <XMark className="pointer-events-none absolute -left-16 -top-16 h-96 w-96 text-accent opacity-[0.07]" />
        <Reveal className="relative">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#b4b4ac]">
            <span className="h-2 w-2 rounded-full bg-[#cbdc3f]" aria-hidden="true" />
            Free strategy call
          </p>
          <h2 className="text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.08] text-[#f5f5f0]">
            Ready to Bridge Beyond Next?
          </h2>
          <p className="mt-5 max-w-md text-sm text-[#b4b4ac]">
            Tell us about your goals. We will reply within one business day with a time for a free 30-minute
            strategy call.
          </p>
          <ul className="mt-8 space-y-4 text-[#f5f5f0]">
            <li className="flex items-center gap-3">
              <MapPin size={20} aria-hidden className="text-[#cbdc3f]" /> Noida, Uttar Pradesh, India
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} aria-hidden className="text-[#cbdc3f]" /> Replies within one business day
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120} className="relative">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[26px] bg-surface2 p-5 text-fg sm:p-8"
            aria-describedby={errList.length ? "form-errors" : undefined}
          >
            {errList.length > 0 && (
              <div
                id="form-errors"
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="mb-6 rounded-xl border-2 border-[var(--error)] bg-bg p-4 text-sm"
              >
                <p className="mb-2 font-bold">Please fix {errList.length} {errList.length === 1 ? "field" : "fields"}:</p>
                <ul className="list-disc space-y-1 pl-5">
                  {errList.map(([k, v]) => (
                    <li key={k}>
                      <a className="underline" href={`#f-${k}`}>
                        {v}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className="mb-2 block text-sm font-bold">
                  Name <span aria-hidden>*</span>
                </label>
                <input id="f-name" name="name" autoComplete="name" required aria-required="true"
                  aria-invalid={!!err("name")} aria-describedby={err("name") ? "e-name" : undefined} className={field} />
                {err("name") && <p id="e-name" className="mt-1.5 text-sm font-semibold text-[var(--error)]">{err("name")}</p>}
              </div>
              <div>
                <label htmlFor="f-email" className="mb-2 block text-sm font-bold">
                  Email <span aria-hidden>*</span>
                </label>
                <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required aria-required="true"
                  aria-invalid={!!err("email")} aria-describedby={err("email") ? "e-email" : undefined} className={field} />
                {err("email") && <p id="e-email" className="mt-1.5 text-sm font-semibold text-[var(--error)]">{err("email")}</p>}
              </div>
              <div>
                <label htmlFor="f-phone" className="mb-2 block text-sm font-bold">
                  Phone / WhatsApp <span className="font-normal text-muted">(optional)</span>
                </label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210"
                  aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "e-phone" : undefined} className={field} />
                {err("phone") && <p id="e-phone" className="mt-1.5 text-sm font-semibold text-[var(--error)]">{err("phone")}</p>}
              </div>
              <div>
                <label htmlFor="f-service" className="mb-2 block text-sm font-bold">
                  Service <span aria-hidden>*</span>
                </label>
                <select id="f-service" name="service" defaultValue="" required aria-required="true"
                  aria-invalid={!!err("service")} aria-describedby={err("service") ? "e-service" : undefined} className={field}>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => (
                    <option key={s.key} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                {err("service") && <p id="e-service" className="mt-1.5 text-sm font-semibold text-[var(--error)]">{err("service")}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="mb-2 block text-sm font-bold">
                  About your project <span aria-hidden>*</span>
                </label>
                <textarea id="f-message" name="message" rows={4} required aria-required="true"
                  aria-invalid={!!err("message")} aria-describedby={err("message") ? "e-message" : "h-message"} className={field} />
                <p id="h-message" className="mt-1.5 text-sm text-muted">Goals, timeline and rough budget help us prepare.</p>
                {err("message") && <p id="e-message" className="mt-1.5 text-sm font-semibold text-[var(--error)]">{err("message")}</p>}
              </div>
              {/* honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn" disabled={status === "sending"}>
                <span className="dot" aria-hidden="true">
                  {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} strokeWidth={2.5} />}
                </span>
                {status === "sending" ? "Sending…" : "Let’s Talk Business"}
              </button>
              <p className="text-sm text-muted">We never share your details.</p>
            </div>

            <div aria-live="polite" className="mt-5">
              {status === "sent" && (
                <p className="flex items-start gap-2 rounded-xl bg-bg p-4 font-semibold">
                  <CheckCircle2 aria-hidden className="mt-0.5 shrink-0" /> Thank you! We have your message and will reply within one business day.
                </p>
              )}
              {status === "failed" && (
                <p role="alert" className="rounded-xl border-2 border-[var(--error)] bg-bg p-4 font-semibold">
                  Something went wrong sending your message. Please try again in a moment.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
