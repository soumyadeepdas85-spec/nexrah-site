"use client";

import { useEffect, useRef } from "react";

// Parallax strength (px) per blob and ambient drift speed.
const BLOBS = [
  { f: 0.11, drift: 38, speed: 0.00021, phase: 0 },
  { f: -0.08, drift: 46, speed: 0.00017, phase: 2 },
  { f: 0.06, drift: 30, speed: 0.00025, phase: 4 },
];

export default function LiveBackground() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const blobs = Array.from(el.querySelectorAll<HTMLElement>("[data-blob]"));
    const glow = el.querySelector<HTMLElement>("[data-glow]");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // pointer target (-1..1 from centre) and eased current value
    const target = { x: 0, y: 0, px: innerWidth / 2, py: innerHeight / 3 };
    const cur = { x: 0, y: 0, px: target.px, py: target.py };
    let raf = 0;
    let running = true;

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / innerWidth) * 2 - 1;
      target.y = (e.clientY / innerHeight) * 2 - 1;
      target.px = e.clientX;
      target.py = e.clientY;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(tick);
    };

    const tick = (t: number) => {
      if (!running) return;
      cur.x += (target.x - cur.x) * 0.045;
      cur.y += (target.y - cur.y) * 0.045;
      cur.px += (target.px - cur.px) * 0.08;
      cur.py += (target.py - cur.py) * 0.08;

      blobs.forEach((b, i) => {
        const c = BLOBS[i];
        const dx = cur.x * c.f * innerWidth + Math.sin(t * c.speed + c.phase) * c.drift;
        const dy = cur.y * c.f * innerHeight + Math.cos(t * c.speed * 0.9 + c.phase) * c.drift;
        b.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
      if (glow) glow.style.transform = `translate3d(${cur.px.toFixed(1)}px, ${cur.py.toFixed(1)}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    if (!reduce) {
      addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={root} className="live-bg" aria-hidden="true">
      <div data-blob className="blob blob-a" />
      <div data-blob className="blob blob-b" />
      <div data-blob className="blob blob-c" />
      <div data-glow className="glow" />
    </div>
  );
}
