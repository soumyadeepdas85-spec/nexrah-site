import { ArrowUpRight, Heart } from "lucide-react";
import { contactInfo, nav, services, socials } from "@/lib/content";
import { BackToTop, NoidaClock } from "./FooterBits";

const head = "mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#8f8f88]";
const link = "inline-flex items-center gap-2 text-[#f5f5f0] transition hover:text-[#cbdc3f]";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden" style={{ background: "var(--footer-bg)", color: "#f5f5f0" }}>
      {/* brand glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] -top-[25%] h-[70vw] max-h-[800px] w-[70vw] max-w-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(94,106,30,0.55) 0%, transparent 65%)", filter: "blur(30px)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[30%] -right-[12%] h-[65vw] max-h-[800px] w-[65vw] max-w-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(203,220,63,0.4) 0%, rgba(38,78,68,0.3) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto max-w-[1360px] px-5 pt-20 sm:px-8 lg:px-10 lg:pt-28">
        {/* Big call to action */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b4b4ac]">
              <span className="h-2 w-2 rounded-full bg-[#cbdc3f]" aria-hidden="true" /> Got a brand to build?
            </p>
            <h2 className="font-display text-[clamp(2.4rem,7.4vw,6.6rem)] font-bold leading-[1] tracking-[-0.04em]">
              Let&rsquo;s Build <span className="text-[#cbdc3f]">What&rsquo;s Next.</span>
            </h2>
            <a
              href={`mailto:${contactInfo.email}`}
              className="link-sweep group mt-8 inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.2rem,3.6vw,2.8rem)] font-medium tracking-[-0.02em]"
            >
              <span className="min-w-0 break-all">{contactInfo.email}</span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#cbdc3f] text-[#17171c] transition-transform duration-300 group-hover:rotate-45 sm:h-12 sm:w-12">
                <ArrowUpRight size={22} aria-hidden strokeWidth={2.5} />
              </span>
            </a>
          </div>
          <a
            href="#contact"
            className="btn shrink-0 self-start lg:self-end"
            style={{ background: "#cbdc3f", color: "#17171c" }}
          >
            <span className="dot" style={{ background: "#17171c", color: "#cbdc3f" }} aria-hidden="true">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
            Let&rsquo;s Talk Business
          </a>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 pb-8 pt-20 sm:px-8 lg:px-10 lg:pt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.1fr_1.5fr_0.8fr] lg:gap-10">
          <nav aria-label="Website">
            <h2 className={head}>Website</h2>
            <ul className="space-y-3.5">
              {[{ label: "Home", href: "#top" }, ...nav, { label: "Contact", href: "#contact" }].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className={head}>Services</h2>
            <ul className="space-y-3.5">
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
            <h2 className={head}>Visit &amp; Call</h2>
            <ul className="space-y-5">
              <li className="max-w-sm">{contactInfo.address}</li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="break-all transition hover:text-[#cbdc3f]">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="transition hover:text-[#cbdc3f]">
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </address>

          <nav aria-label="Social media">
            <h2 className={head}>Social</h2>
            <ul className="space-y-3.5">
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

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-white/12 pt-6 text-[#b4b4ac]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>© {new Date().getFullYear()} NexRah. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-[#f5f5f0]">
              Built with <Heart size={15} aria-label="love" className="heart-beat fill-[#ff6b6b] text-[#ff6b6b]" /> in India
            </p>
          </div>
          <NoidaClock />
          <div className="flex items-center gap-5">
            <p className="font-display text-[#f5f5f0]">Bridging Beyond Next</p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
