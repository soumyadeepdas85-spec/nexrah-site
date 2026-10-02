import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowUpRight, ImageIcon, Sparkles } from "lucide-react";
import { pillars } from "@/lib/content";
import { CtaLink, Reveal, XMark } from "./ui";

// Set to true to show the Grow / Create / Experience cards under the headline.
const SHOW_PILLARS = false;

function chipSrc(name: string) {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (existsSync(join(process.cwd(), "public", "hero", `${name}.${ext}`))) return `/hero/${name}.${ext}`;
  }
  return null;
}

/** Image slot sitting inline in the headline. Shows a placeholder until public/hero/<name>.jpg exists. */
function Chip({ name }: { name: string }) {
  const src = chipSrc(name);
  return (
    <span
      aria-hidden="true"
      className="relative hidden h-[0.8em] w-[1.5em] sm:inline-block shrink-0 overflow-hidden rounded-[0.22em] bg-surface2 ring-1 ring-inset ring-[color:var(--line)]"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="grid h-full w-full place-items-center bg-[repeating-linear-gradient(135deg,transparent_0_10px,var(--line)_10px_11px)] text-muted">
          <ImageIcon className="h-[40%] w-[40%]" strokeWidth={1.6} />
        </span>
      )}
    </span>
  );
}

export default function Hero() {
  const row = "flex flex-nowrap items-center justify-center gap-x-[0.16em] whitespace-nowrap";
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-4 pb-10 pt-20 sm:px-6 md:pt-32 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-[8.6vw] sm:text-[clamp(2.4rem,7.4vw,7.4rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            <span className={row}>
              <span className="whitespace-nowrap">Brands Built</span>
              <Chip name="chip-1" />
              <span className="whitespace-nowrap">Beyond</span>
            </span>
            <span className={row}>
              <span className="whitespace-nowrap">
                What&rsquo;s <span className="hl">Next</span>
              </span>
              <Chip name="chip-2" />
            </span>
          </h1>
          <Reveal delay={150} className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-6 md:mt-14">
            <p className="font-display text-[clamp(1.35rem,3.2vw,2.4rem)] font-medium leading-tight tracking-[-0.02em]">
              Digital Narratives{" "}
              <span className="relative inline-block whitespace-nowrap">
                That Sell.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="tag-draw absolute -bottom-[0.32em] left-0 h-[0.34em] w-full"
                  fill="none"
                >
                  <path d="M2 9 C 38 2, 84 13, 128 6 S 188 4, 198 8" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </p>

            <div className="flex w-full items-center gap-4 sm:gap-6">
              <span aria-hidden="true" className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--line))" }} />
              <p className="flex items-center gap-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.2em] sm:gap-5 sm:text-base">
                <span className="tag-word" style={{ ["--i" as string]: 0 }}>Strategy</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="tag-word" style={{ ["--i" as string]: 1 }}>Story</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="tag-word" style={{ ["--i" as string]: 2 }}>Execution</span>
              </p>
              <span aria-hidden="true" className="h-px flex-1" style={{ background: "linear-gradient(270deg, transparent, var(--line))" }} />
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href="#contact">Let’s Talk Business</CtaLink>
            <CtaLink href="#work" ghost>
              See Our Work
            </CtaLink>
          </div>
        </div>

        {SHOW_PILLARS && (
          <>
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
                  className={`font-display absolute bottom-6 left-7 inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition hover:translate-x-1 md:left-8 ${
                    p.grad === "grad-ink" ? "bg-[#cbdc3f] text-[#17171c]" : "bg-[#17171c] text-[#f5f5f0]"
                  }`}
                >
                  Explore <ArrowUpRight size={16} aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
          </>
        )}
      </div>
    </section>
  );
}
