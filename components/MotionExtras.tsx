"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide micro-interactions that need a little JS:
 *  1. Magnetic buttons: pill buttons lean toward the cursor, then spring back.
 *  2. Ticker boost: the services ticker speeds up with scroll velocity, then eases back.
 * Both are skipped for reduced motion; magnetic is mouse-only (not touch).
 */
export default function MotionExtras() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ---- magnetic buttons (event delegation, no per-button listeners) ---- */
    let current: HTMLElement | null = null;
    const release = () => {
      if (!current) return;
      current.style.setProperty("--bx", "0px");
      current.style.setProperty("--by", "0px");
      current = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = (e.target as Element | null)?.closest<HTMLElement>(".btn");
      if (t !== current) release();
      if (!t || t.hasAttribute("disabled")) return;
      current = t;
      const r = t.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      t.style.setProperty("--bx", (dx * 7).toFixed(1) + "px");
      t.style.setProperty("--by", (dy * 5).toFixed(1) + "px");
    };
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", release);

    /* ---- ticker boost ---- */
    const track = document.querySelector<HTMLElement>(".ticker-track");
    const anim = track?.getAnimations()[0];
    let raf = 0;
    let rate = 1;
    let lastY = scrollY;
    let lastT = performance.now();
    let vel = 0;
    const tick = (t: number) => {
      const dt = Math.max(0.001, Math.min(0.05, (t - lastT) / 1000));
      lastT = t;
      const y = scrollY;
      const inst = Math.abs(y - lastY) / dt;
      lastY = y;
      vel += (inst - vel) * (1 - Math.exp(-dt * 8));
      const target = 1 + Math.min(vel / 500, 5);
      rate += (target - rate) * (1 - Math.exp(-dt * 5));
      if (anim) anim.playbackRate = rate;
      raf = requestAnimationFrame(tick);
    };
    if (anim) raf = requestAnimationFrame(tick);

    return () => {
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", release);
      cancelAnimationFrame(raf);
      if (anim) anim.playbackRate = 1;
    };
  }, [pathname]);
  return null;
}
