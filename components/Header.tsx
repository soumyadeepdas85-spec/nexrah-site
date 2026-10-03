"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { nav } from "@/lib/content";
import { CtaLink, Logo } from "./ui";

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.getAttribute("data-theme") ?? "light",
    () => "light",
  );

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("nexrah-theme", next);
      } catch {}
    };
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    // The new theme spreads out from the toggle like a ripple
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = doc.startViewTransition(apply);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={toggle}
      className="theme-switch"
    >
      <Sun size={16} aria-hidden className="theme-switch-icon" />
      <Moon size={16} aria-hidden className="theme-switch-icon" />
      <span aria-hidden="true" className="theme-switch-knob">
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const bar = useRef<HTMLDivElement>(null);

  // which section is in view (for the nav underline)
  useEffect(() => {
    const ids = nav.map((n) => n.href.replace(/^\/?#/, ""));
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const inView = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) inView.add(en.target.id);
          else inView.delete(en.target.id);
        }
        // first section (in page order) that crosses the middle of the screen, or none
        setActive(ids.find((id) => inView.has(id)) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${scrolled || open ? "bg-bg/90 backdrop-blur-md" : ""}`}
      style={scrolled ? { boxShadow: "0 1px 0 var(--line)" } : undefined}
    >
      <div ref={bar} aria-hidden="true" className="scroll-bar" />
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#top" aria-label="NexRah home" className="shrink-0">
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-active={active === n.href.replace(/^\/?#/, "") || undefined}
              aria-current={active === n.href.replace(/^\/?#/, "") ? "location" : undefined}
              className="nav-link font-display text-[15px] font-medium"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <CtaLink href="/#contact">Your Next Move</CtaLink>
          </div>
          <button
            type="button"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-surface lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 font-display text-xl font-light"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6" onClick={() => setOpen(false)}>
            <CtaLink href="/#contact">Your Next Move</CtaLink>
          </div>
        </nav>
      )}
    </header>
  );
}
