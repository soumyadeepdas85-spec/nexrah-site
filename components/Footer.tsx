import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo, nav, services, socials } from "@/lib/content";

const head = "mb-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#8f8f88]";
const link = "inline-flex items-center gap-2 text-[#f5f5f0] transition hover:text-[#cbdc3f]";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--footer-bg)", color: "#f5f5f0" }}>
      {/* brand glow, bottom right (Olive Dusk family) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[38%] -right-[12%] h-[75vw] max-h-[900px] w-[75vw] max-w-[900px] rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(203,220,63,0.55) 0%, rgba(120,138,34,0.4) 30%, rgba(38,78,68,0.28) 55%, transparent 72%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-5 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.1fr_1.4fr_0.8fr] lg:gap-10">
          <nav aria-label="Website">
            <h2 className={head}>Website</h2>
            <ul className="space-y-4">
              {[{ label: "Home", href: "#top" }, ...nav].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className={link}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className={head}>Services</h2>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.key}>
                  <a href="#services" className={link}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className={head}>Contact</h2>
            <ul className="space-y-5 text-[#f5f5f0]">
              <li className="flex items-start gap-3">
                <MapPin size={18} aria-hidden className="mt-0.5 shrink-0 text-[#cbdc3f]" />
                <span className="max-w-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} aria-hidden className="mt-0.5 shrink-0 text-[#cbdc3f]" />
                <a href={`mailto:${contactInfo.email}`} className="break-all transition hover:text-[#cbdc3f]">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} aria-hidden className="mt-0.5 shrink-0 text-[#cbdc3f]" />
                <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="transition hover:text-[#cbdc3f]">
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </address>

          <nav aria-label="Social media">
            <h2 className={head}>Social</h2>
            <ul className="space-y-4">
              {socials.map((s) => (
                <li key={s.key}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={link}>
                      {s.label} <ArrowUpRight size={16} aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[#f5f5f0]/40">
                      {s.label} <ArrowUpRight size={16} aria-hidden />
                      <span className="sr-only"> (link coming soon)</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[#f5f5f0] lg:mt-24">
          <p>© {new Date().getFullYear()} NexRah. All rights reserved.</p>
          <p className="text-[#b4b4ac]">Noida · Uttar Pradesh · India</p>
          <p className="font-display">Bridging Beyond Next</p>
        </div>

        {/* Oversized logo, cropped and faded at the bottom edge */}
        <div
          className="relative mt-10 overflow-hidden lg:mt-14"
          style={{
            height: "calc(min(88vw, 1100px) * 0.19)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 45%, transparent 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-dark.svg"
            alt="NexRah"
            width={282}
            height={62}
            className="block h-auto select-none"
            style={{ width: "min(88vw, 1100px)" }}
          />
        </div>
      </div>
    </footer>
  );
}
