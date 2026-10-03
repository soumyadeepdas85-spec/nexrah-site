"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { services } from "@/lib/content";
import { Reveal } from "./ui";

type Errors = Partial<Record<"name" | "email" | "phone" | "service" | "message", string>>;

// Borderless "line" fields: calm on the gradient, the line darkens when focused
const field =
  "w-full min-h-12 rounded-none border-0 border-b border-[color:var(--line)] bg-transparent px-0 py-3 text-base text-fg shadow-[inset_0_0_0_0_var(--accent-text)] transition-[border-color,box-shadow] duration-300 placeholder:text-muted/75 focus:border-[color:var(--fg)] focus:shadow-[inset_0_-2px_0_0_var(--accent-text)] sm:text-sm";
const label = "mb-1.5 block text-[13px] font-medium text-muted";
const errText = "mt-1.5 text-sm font-semibold text-[var(--error)]";

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
    <section id="contact" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 md:py-36 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal>
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-accent-text">( Free Strategy Call )</p>
          <h2 className="mt-6 text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.06] tracking-[-0.035em]">
            <span className="block line">Ready to Bridge</span>
            <span className="block line text-fg/55">Beyond Next?</span>
          </h2>
          <p className="mt-6 max-w-md text-sm text-muted">
            Tell us about your goals. We will reply within one business day with a time for a free 30-minute strategy
            call.
          </p>
          <dl className="mt-10 space-y-5 border-t border-[color:var(--line)] pt-8">
            <div>
              <dt className={label}>Based in</dt>
              <dd className="text-sm">Noida, Uttar Pradesh, India</dd>
            </div>
            <div>
              <dt className={label}>Reply time</dt>
              <dd className="text-sm">Within one business day</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120} variant="right" className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-10">
            <div className="orb floaty absolute -right-4 -top-2 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, var(--orb-a), transparent 70%)" }} />
            <div className="orb floaty absolute -bottom-4 left-0 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, var(--orb-b), transparent 70%)", animationDelay: "-3s" }} />
          </div>
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass relative rounded-[32px] p-6 sm:p-10"
            aria-describedby={errList.length ? "form-errors" : undefined}
          >
            {errList.length > 0 && (
              <div
                id="form-errors"
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="mb-8 rounded-xl border-2 border-[color:var(--error)] p-4 text-sm"
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

            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className={label}>
                  Name <span aria-hidden>*</span>
                </label>
                <input id="f-name" name="name" autoComplete="name" required aria-required="true" placeholder="Your name"
                  aria-invalid={!!err("name")} aria-describedby={err("name") ? "e-name" : undefined} className={field} />
                {err("name") && <p id="e-name" className={errText}>{err("name")}</p>}
              </div>
              <div>
                <label htmlFor="f-email" className={label}>
                  Email <span aria-hidden>*</span>
                </label>
                <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required aria-required="true" placeholder="name@company.com"
                  aria-invalid={!!err("email")} aria-describedby={err("email") ? "e-email" : undefined} className={field} />
                {err("email") && <p id="e-email" className={errText}>{err("email")}</p>}
              </div>
              <div>
                <label htmlFor="f-phone" className={label}>
                  Phone / WhatsApp <span className="normal-case tracking-normal opacity-70">(optional)</span>
                </label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210"
                  aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "e-phone" : undefined} className={field} />
                {err("phone") && <p id="e-phone" className={errText}>{err("phone")}</p>}
              </div>
              <div>
                <label htmlFor="f-service" className={label}>
                  Service <span aria-hidden>*</span>
                </label>
                <div className="relative">
                  <select id="f-service" name="service" defaultValue="" required aria-required="true"
                  aria-invalid={!!err("service")} aria-describedby={err("service") ? "e-service" : undefined} className={`${field} cursor-pointer appearance-none pr-8`}>
                  <option value="" disabled>Select a service</option>
                  {services.map((sv) => (
                    <option key={sv.key} value={sv.title}>{sv.title}</option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                  <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted" />
                </div>
                {err("service") && <p id="e-service" className={errText}>{err("service")}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className={label}>
                  About your project <span aria-hidden>*</span>
                </label>
                <textarea id="f-message" name="message" rows={3} required aria-required="true" placeholder="Goals, timeline and rough budget help us prepare."
                  aria-invalid={!!err("message")} aria-describedby={err("message") ? "e-message" : undefined} className={`${field} resize-none`} />
                {err("message") && <p id="e-message" className={errText}>{err("message")}</p>}
              </div>
              {/* honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button type="submit" className="btn" disabled={status === "sending"}>
                <span className="dot" aria-hidden="true">
                  {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} strokeWidth={2.5} />}
                </span>
                {status === "sending" ? "Sending…" : "Your Next Move"}
              </button>
              <p className="text-sm text-muted">We never share your details.</p>
            </div>

            <div aria-live="polite" className="mt-6">
              {status === "sent" && (
                <p className="flex items-start gap-2 rounded-xl border border-[color:var(--line)] p-4 font-semibold">
                  <CheckCircle2 aria-hidden className="mt-0.5 shrink-0" /> Thank you! We have your message and will reply within one business day.
                </p>
              )}
              {status === "failed" && (
                <p role="alert" className="rounded-xl border-2 border-[color:var(--error)] p-4 font-semibold">
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
