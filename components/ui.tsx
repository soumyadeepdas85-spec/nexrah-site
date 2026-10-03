"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
  variant?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${variant !== "up" ? `reveal-${variant} ` : ""}${className}`}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

export function Logo({ tagline = false, className = "h-9 w-auto" }: { tagline?: boolean; className?: string }) {
  const light = tagline ? "/brand/logo-light-tagline.svg" : "/brand/logo-light.svg";
  const dark = tagline ? "/brand/logo-dark-tagline.svg" : "/brand/logo-dark.svg";
  const w = tagline ? 266 : 262;
  const h = tagline ? 67 : 64;
  return (
    <>
      <Image src={light} alt="NexRah" width={w} height={h} className={`logo-light-only ${className}`} priority />
      <Image src={dark} alt="" aria-hidden width={w} height={h} className={`logo-dark-only ${className}`} priority />
    </>
  );
}

/** Decorative brand X-mark (from the NexRah icon), inherits currentColor. */
export function XMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="2.3 2.8 10.9 9.9" className={className} fill="currentColor" aria-hidden="true">
      <polygon points="9.95 8.3 8.3 10.59 9.72 12.55 13.05 12.55 9.95 8.3" />
      <polygon points="12.76 2.98 9.43 2.98 8.27 4.58 9.94 6.85 12.76 2.98" />
      <polygon points="9.42 7.57 7.75 5.31 6.03 2.98 4.89 2.98 8.28 7.57 4.67 12.55 5.81 12.55 7.04 10.86 9.42 7.58" />
      <polygon points="3.83 2.98 2.7 2.98 6.09 7.57 2.48 12.55 3.61 12.55 7.22 7.57 3.83 2.98" />
    </svg>
  );
}

export function CtaLink({
  href,
  children,
  ghost = false,
}: {
  href: string;
  children: ReactNode;
  ghost?: boolean;
}) {
  return (
    <a href={href} className={`btn ${ghost ? "btn-ghost" : ""}`}>
      <span className="dot" aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={2.5} />
      </span>
      {children}
    </a>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
      <Reveal className="max-w-3xl">
        {eyebrow && (
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08]">
          <span className="line">{title}</span>
        </h2>
        {sub && <p className="mt-5 max-w-2xl text-sm text-muted">{sub}</p>}
      </Reveal>
      {action}
    </div>
  );
}
