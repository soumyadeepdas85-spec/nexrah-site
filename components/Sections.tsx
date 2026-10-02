import { ArrowUpRight, Check, Plus } from "lucide-react";
import { caseStudies, faqs, insights, process, services } from "@/lib/content";
import { CtaLink, Reveal, SectionHead, XMark } from "./ui";
import { serviceIcons } from "./icons";

const wrap = "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8";

/* ───────── Diagonal services ticker (sits under the hero) ───────── */
export function ServiceTicker() {
  // Ticker-only extra on top of the eight services
  const items = [...services.map((s) => s.title), "AI Websites"];
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
    <section aria-label="Our services" className="overflow-hidden py-10 md:py-16">
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

/* ───────── Client logo marquee (PLACEHOLDER) ───────── */
export function Marquee() {
  const items = Array.from({ length: 8 }, (_, i) => `Client logo ${i + 1}`);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li
          key={t + hidden}
          className="flex h-16 w-44 items-center justify-center rounded-2xl border border-dashed border-line text-sm font-bold uppercase tracking-widest text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Clients (placeholder logos)" className="py-12">
      <p className="mb-6 text-center text-sm font-bold uppercase tracking-[0.16em] text-muted">
        Trusted by growing brands · placeholder logos
      </p>
      <div
        className="marquee overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
      >
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

/* ───────── Services ───────── */
export function Services() {
  return (
    <section id="services" className={`${wrap} py-20 md:py-28`}>
      <SectionHead
        eyebrow="What we do"
        title="Eight Services. One Team. Zero Hand-Offs."
        sub="Pick a single service or put the whole stack to work. Either way you get one accountable team."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.key];
          return (
            <Reveal as="li" key={s.key} delay={(i % 4) * 80}>
              <article className="group flex h-full flex-col rounded-[24px] bg-surface p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]">
                <span className={`${s.grad} mb-6 grid h-14 w-14 place-items-center rounded-2xl`}>
                  <Icon size={26} aria-hidden strokeWidth={1.8} />
                </span>
                <h3 className="text-xl font-normal leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-muted">{s.blurb}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm font-semibold">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check size={16} aria-hidden className="mt-0.5 shrink-0" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/* ───────── Case studies (PLACEHOLDER numbers) ───────── */
export function CaseStudies() {
  return (
    <section id="cases" className="overflow-hidden py-20 md:py-28" aria-labelledby="cases-title">
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
    <section id="process" className={`${wrap} py-20 md:py-28`}>
      <SectionHead
        eyebrow="How we work"
        title="From First Call to Compounding Results."
        sub="A simple five-step process, so you always know what happens next."
      />
      <ol className="grid gap-5 md:grid-cols-5">
        {process.map((p, i) => (
          <Reveal as="li" key={p.n} delay={i * 90}>
            <div className="flex h-full flex-col rounded-[24px] border border-line p-6 transition hover:bg-surface">
              <span className="mb-8 grid h-12 w-12 place-items-center rounded-full bg-accent font-display text-sm font-medium text-on-accent">
                {p.n}
              </span>
              <h3 className="text-xl font-normal">{p.title}</h3>
              <p className="mt-3 text-sm text-muted">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ───────── Insights (PLACEHOLDER articles) ───────── */
export function Insights() {
  return (
    <section id="insights" className={`${wrap} py-20 md:py-28`}>
      <SectionHead
        eyebrow="Impactful insights"
        title="Go Further."
        sub="Practical thinking on growth, search and creative. Sample articles shown as placeholders."
        action={<CtaLink href="#contact">Discuss Your Growth Plan</CtaLink>}
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {insights.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 100}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-surface">
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
    <section id="founder" className="py-20 md:py-28">
      <div className={wrap}>
        <div className="grid items-center gap-10 overflow-hidden rounded-[32px] bg-surface p-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:p-12">
          <Reveal>
            <div className="grad-ink relative aspect-[4/5] overflow-hidden rounded-[26px]">
              <XMark className="absolute inset-0 m-auto h-3/4 w-3/4 text-accent opacity-25" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-2xl font-light">[Founder name]</p>
                <p className="text-sm opacity-80">Founder, NexRah · photo placeholder</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              Founder story
            </p>
            <h2 className="text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.1]">
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
              <p className="rounded-2xl border border-dashed border-line p-4 text-sm">
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
    <section id="faq" className={`${wrap} py-20 md:py-28`}>
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
