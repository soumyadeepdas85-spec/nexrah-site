import { ArrowUpRight, Sparkles, TrendingUp, MapPin } from "lucide-react";
import { pillars } from "@/lib/content";
import { CtaLink, Reveal, XMark } from "./ui";

function Chip({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={`mx-1 inline-grid h-[0.78em] w-[1.3em] translate-y-[0.06em] place-items-center rounded-[0.22em] align-baseline ${className}`}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-10 sm:px-6 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-bold">
            <MapPin size={16} aria-hidden /> Marketing &amp; creative agency · Noida, India
          </p>
          <h1 className="text-[clamp(2.1rem,6.4vw,4.8rem)] font-light leading-[1.06]">
            Bridging
            <Chip className="grad-lime">
              <XMark className="h-[70%] w-[70%]" />
            </Chip>
            beyond next
            <Chip className="grad-ink">
              <TrendingUp className="h-[55%] w-[55%] text-accent" strokeWidth={2.2} />
            </Chip>
            <br className="hidden sm:block" /> for ambitious brands
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-sm text-muted">
            One team for growth and creative: performance marketing, SEO and AI search, social, branding,
            packaging, events, real estate media and video.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href="#contact">Book a free strategy call</CtaLink>
            <CtaLink href="#work" ghost>
              See our work
            </CtaLink>
          </div>
        </div>

        {/* Pillar cards (staggered, as in reference) */}
        <ul className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3 md:items-start">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 120} className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-5" : ""}>
              <article
                className={`${p.grad} group relative min-h-[360px] overflow-hidden rounded-[28px] p-7 md:min-h-[440px] md:p-8`}
              >
                <XMark className="absolute -bottom-10 -right-8 h-72 w-72 opacity-[0.14] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />
                <p className="mb-3 flex items-start gap-2 text-xs font-bold uppercase leading-snug tracking-[0.12em] opacity-80">
                  <Sparkles size={14} aria-hidden className="mt-0.5 shrink-0" /> {p.services}
                </p>
                <h2 className="font-display text-4xl font-light md:text-5xl">{p.name}</h2>
                <p className="mt-3 max-w-[16rem] text-sm font-medium">{p.line}</p>
                <a
                  href="#services"
                  className={`absolute bottom-6 left-7 inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition hover:translate-x-1 md:left-8 ${
                    p.grad === "grad-ink" ? "bg-[#cbdc3f] text-[#17171c]" : "bg-[#17171c] text-[#f5f5f0]"
                  }`}
                >
                  Explore <ArrowUpRight size={16} aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
