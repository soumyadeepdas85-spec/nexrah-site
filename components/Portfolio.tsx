"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolio, portfolioFilters } from "@/lib/content";
import { SectionHead, XMark } from "./ui";

export default function Portfolio() {
  const [active, setActive] = useState<string>("all");
  const items = active === "all" ? portfolio : portfolio.filter((p) => p.cat === active);

  return (
    <section id="work" className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <SectionHead
        eyebrow="Portfolio"
        title="Selected Work."
        sub="Placeholder tiles. Replace with real projects and images from your portfolio."
      />

      <div role="group" aria-label="Filter portfolio by service" className="mb-8 flex flex-wrap gap-2">
        {portfolioFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            aria-pressed={active === f.key}
            className={`min-h-11 cursor-pointer rounded-full px-5 text-sm font-bold transition ${
              active === f.key ? "bg-fg text-bg" : "bg-surface hover:bg-accent hover:text-on-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {items.map((p, i) => (
          <li key={p.id} className={i % 5 === 0 ? "lg:row-span-2" : ""}>
            <a
              href="#contact"
              className={`${p.grad} group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[26px] p-6 ${
                i % 5 === 0 ? "lg:min-h-[580px]" : ""
              }`}
              aria-label={`${p.title} (${p.tag}, placeholder project)`}
            >
              <XMark className="absolute -bottom-10 -right-10 h-64 w-64 opacity-[0.13] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
              <span className="relative w-fit rounded-full bg-black/15 px-3 py-1 text-xs font-bold">
                {p.tag} · placeholder
              </span>
              <div className="relative flex items-end justify-between gap-4">
                <h3 className="font-display text-2xl font-light leading-tight">{p.title}</h3>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#17171c] text-[#cbdc3f] transition group-hover:rotate-45">
                  <ArrowUpRight size={20} aria-hidden />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
