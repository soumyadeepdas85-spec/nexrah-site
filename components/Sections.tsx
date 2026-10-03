import { ArrowUpRight, Plus } from "lucide-react";
import { caseStudies, faqs, insights, process, services } from "@/lib/content";
import { CtaLink, Reveal, SectionHead, XMark } from "./ui";
import Image from "next/image";
import LogoWall from "./LogoWall";

const wrap = "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8";

/* ───────── Diagonal services ticker (sits under the hero) ───────── */
export function ServiceTicker() {
  const items = services.map((s) => s.title);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((title) => (
        <li key={title + hidden} className="flex items-center">
          <span className="whitespace-nowrap font-display text-[clamp(1.3rem,3vw,2.4rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[#f5f5f0]/90">
            {title}
          </span>
          <XMark className="mx-6 h-5 w-5 shrink-0 text-[#cbdc3f] sm:mx-9 sm:h-7 sm:w-7" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Our capabilities" className="overflow-hidden py-12 md:py-20">
      {/* Straight on phones, slightly diagonal from tablet up */}
      <div className="marquee ticker-band py-[1.4rem] md:-mx-[6%] md:w-[112%] md:-rotate-2 md:py-7">
        <div className="ticker-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

/* ───────── Clients: logo wall (PLACEHOLDER logos) ───────── */
export function Clients() {
  return (
    <section aria-label="Clients (placeholder logos)" className={`${wrap} py-24 md:py-36`}>
      <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-accent-text">( Trusted By )</p>
          <h2 className="mt-6 text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[1.04] tracking-[-0.035em]">
            <span className="block line">Trusted by</span>
            <span className="block line text-fg/55">Growing Brands.</span>
          </h2>
        </div>
        <p className="font-mono text-[12px] uppercase leading-relaxed tracking-[0.18em] text-muted md:text-right">
          Placeholder logos
          <br />
          Swap in real clients
        </p>
      </Reveal>

      <Reveal delay={120} variant="scale">
        <LogoWall />
      </Reveal>

      <Reveal delay={200} className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">Your brand could be next.</p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 font-display text-lg font-semibold underline decoration-accent decoration-2 underline-offset-8 transition hover:decoration-[3px]"
        >
          Your Next Move
          <ArrowUpRight size={20} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}

/* ───────── Capabilities: open list, hairlines, no heavy blocks ───────── */
export function Services() {
  return (
    <section id="services" className={`${wrap} py-24 md:py-36`}>
      <Reveal>
        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-accent-text">( What We Do )</p>
        <h2 className="mt-6 max-w-4xl text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[1.04] tracking-[-0.035em]">
          <span className="block line">Nine Capabilities.</span>
          <span className="block line text-fg/55">One Team. Zero Hand-Offs.</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm text-muted">
          Pick a single service or put the whole stack to work. Either way you get one accountable team.
        </p>
      </Reveal>

      <ul className="mt-14 border-t border-[color:var(--line)] lg:mt-20">
        {services.map((s, i) => (
          <Reveal as="li" key={s.key} delay={i * 40}>
            <article className="group grid gap-4 border-b border-[color:var(--line)] px-2 py-8 transition-colors duration-300 hover:bg-fg/[0.04] sm:px-4 lg:grid-cols-[4rem_1.15fr_1fr_3rem] lg:items-center lg:gap-10 lg:px-6 lg:py-10">
              <span className="font-mono text-[13px] font-medium tracking-[0.12em] text-accent-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(1.6rem,3vw,2.7rem)] leading-tight tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-2">
                {s.title}
              </h3>
              <div>
                <p className="text-sm text-muted">{s.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs font-semibold">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-11 w-11 -translate-x-2 place-items-center rounded-full border border-[color:var(--line)] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent group-hover:opacity-100 lg:grid"
              >
                <ArrowUpRight size={18} />
              </span>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ───────── Case studies (PLACEHOLDER numbers) ───────── */
export function CaseStudies() {
  return (
    <section id="cases" className="overflow-hidden py-24 md:py-36" aria-labelledby="cases-title">
      <div className={wrap}>
        <SectionHead
          eyebrow="Case studies"
          title={<span id="cases-title">Wins, in Numbers.</span>}
          sub="Sample layout with placeholder figures. Real results go here once you share them."
        />
      </div>
      <div
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-10 pt-6 sm:px-6 lg:px-[max(2rem,calc((100vw-1240px)/2+2rem))]"
        role="region"
        aria-label="Case studies, scrollable"
        tabIndex={0}
      >
        {caseStudies.map((c, i) => (
          <article
            key={i}
            className={`${c.grad} relative flex h-[380px] w-[280px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[26px] p-6 transition-transform duration-300 hover:!rotate-0 sm:w-[320px]`}
            style={{ transform: `rotate(${c.rot}deg)` }}
          >
            <XMark className="absolute -bottom-8 -right-8 h-52 w-52 opacity-[0.12]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-75">{c.sub}</p>
              <h3 className="mt-4 font-display text-xl font-normal leading-snug">{c.headline}</h3>
              <p className="mt-2 font-display text-5xl font-medium">{c.metric}</p>
            </div>
            <p className="relative text-sm font-bold">
              {c.client} <span className="ml-2 rounded-full bg-black/15 px-2 py-0.5 text-xs">Placeholder</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────── Process ───────── */
export function Process() {
  return (
    <section id="process" className={`${wrap} py-24 md:py-36`}>
      <Reveal>
        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-accent-text">( How We Work )</p>
        <h2 className="mt-6 max-w-4xl text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[1.04] tracking-[-0.035em]">
          <span className="block line">From First Call to</span>
          <span className="block line text-fg/55">Compounding Results.</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm text-muted">
          A simple five-step process, so you always know what happens next.
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
        {process.map((p, i) => (
          <Reveal as="li" key={p.n} delay={i * 110}>
            <div className="rule-draw" aria-hidden="true" />
            <p className="mt-8 font-mono text-[13px] font-medium tracking-[0.12em] text-accent-text">{p.n}</p>
            <h3 className="mt-6 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight tracking-[-0.02em]">{p.title}</h3>
            <p className="mt-4 max-w-[17rem] text-sm leading-relaxed text-muted">{p.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ───────── Insights (PLACEHOLDER articles) ───────── */
export function Insights() {
  return (
    <section id="insights" className={`${wrap} py-24 md:py-36`}>
      <SectionHead
        eyebrow="Impactful insights"
        title="Go Further."
        sub="Practical thinking on growth, search and creative. Sample articles shown as placeholders."
        action={<CtaLink href="#contact">Discuss Your Growth Plan</CtaLink>}
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {insights.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 100}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-surface transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]">
              <div className={`${a.grad} relative h-52 overflow-hidden`}>
                <XMark className="absolute -right-6 -top-6 h-56 w-56 opacity-[0.16] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
                <span className="absolute bottom-4 left-4 rounded-full bg-[#17171c] px-3 py-1 text-xs font-bold text-[#f5f5f0]">
                  Sample article
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <ul className="mb-4 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <li key={t} className="rounded-full bg-fg px-3 py-1 text-xs font-bold text-bg">
                      {t}
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-normal leading-snug">{a.title}</h3>
                <p className="mt-3 text-sm text-muted">{a.excerpt}</p>
                <p className="mt-auto pt-6 text-sm font-semibold text-muted">By NexRah Team · {a.read}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ───────── Founder story (PLACEHOLDER details) ───────── */
export function Founder() {
  return (
    <section id="founder" className="relative py-24 md:py-36">
      {/* colour glows behind the glass, so the blur has something to refract */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb floaty absolute left-[6%] top-[18%] h-72 w-72 rounded-full md:h-96 md:w-96" style={{ background: "radial-gradient(circle, var(--orb-a), transparent 70%)" }} />
        <div className="orb floaty absolute bottom-[8%] right-[4%] h-72 w-72 rounded-full md:h-[28rem] md:w-[28rem]" style={{ background: "radial-gradient(circle, var(--orb-b), transparent 70%)", animationDelay: "-3s" }} />
      </div>

      <div className={`${wrap} relative`}>
        <div className="glass grid items-center gap-10 overflow-hidden rounded-[36px] p-5 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:p-10">
          <Reveal variant="left">
            {/* frosted frame around the photo */}
            <div className="rounded-[30px] bg-white/10 p-2 ring-1 ring-inset ring-white/30">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#17171c]">
                <Image
                  src="/founder/founders.jpg"
                  alt="Portrait of the NexRah founders"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover object-[50%_40%]"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/25 bg-black/25 px-4 py-3 text-[#f5f5f0] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  <p className="font-display text-xl font-bold">Soumyadeep AKA Jiko</p>
                  <p className="text-sm opacity-85">Founder, NexRah</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} variant="right">
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-accent-text">
              ( Founder Story )
            </p>
            <h2 className="text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.1]">
              Built in Noida to Bridge What Brands Have and What They Could Become.
            </h2>
            <div className="mt-6 space-y-4 text-sm text-muted">
              <p>
                NexRah began with a simple frustration: growth teams and creative teams were working in
                separate rooms, and brands were paying for the gap between them.
              </p>
              <p>
                So we built an agency where strategy, media and production sit together. The name says it
                all: the &ldquo;Nex&rdquo; is what comes next, and &ldquo;Rah&rdquo; (राह) is the path that gets you there.
              </p>
              <p className="rounded-2xl border border-dashed border-[color:var(--line)] bg-fg/[0.04] p-4 text-sm">
                <strong className="text-fg">Placeholder:</strong> add the founder&rsquo;s real story here: background,
                why NexRah was started, and the first client or moment that shaped it.
              </p>
            </div>
            <div className="mt-8">
              <CtaLink href="#contact">Talk to the Founder</CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
export function Faq() {
  return (
    <section id="faq" className={`${wrap} py-24 md:py-36`}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHead eyebrow="FAQs" title="Questions, Answered." sub="Can’t find yours? Ask us on the strategy call." />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <details className="group rounded-2xl bg-surface px-6 py-1 open:bg-surface2">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 text-base font-semibold">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-transform group-open:rotate-45">
                    <Plus size={18} aria-hidden strokeWidth={2.5} />
                  </span>
                </summary>
                <p className="pb-5 pr-12 text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ArrowUpRight };
