"use client";

import { useEffect, useRef } from "react";

/**
 * Living gradient. No cursor "bulb": the gradient field itself responds.
 *  - ambient: blobs drift, breathe and slowly rotate on their own
 *  - cursor: each blob leans toward (or away from) the pointer on a spring, stronger when it is near
 *  - speed: fast pointer movement makes the field swell and brighten, then settle
 *  - scroll: blobs trail behind scroll velocity like they have weight
 *  - click/tap: a soft ripple spreads and the blobs get a springy shove
 * Everything is transform/opacity only. Disabled for reduced motion.
 */
type Cfg = {
  cx: number; // base centre, fraction of viewport
  cy: number;
  rot: number; // base rotation (deg)
  pull: number; // + attracted to pointer, - repelled
  sigma: number; // reach of the pointer influence (fraction of viewport)
  k: number; // spring stiffness
  c: number; // spring damping
  amp: number; // ambient drift (px)
  sp: number; // ambient speed
  ph: number; // phase
  breathe: number; // ambient scale amount
  swell: number; // scale added at full pointer energy
  scrollF: number; // how much scroll velocity moves it
};

const CFG: Cfg[] = [
  { cx: 0.12, cy: 0.1, rot: -18, pull: 0.36, sigma: 0.7, k: 22, c: 6.5, amp: 54, sp: 0.00021, ph: 0, breathe: 0.06, swell: 0.1, scrollF: 1 },
  { cx: 0.92, cy: 0.06, rot: 24, pull: -0.22, sigma: 0.65, k: 18, c: 6, amp: 60, sp: 0.00017, ph: 2, breathe: 0.05, swell: 0.08, scrollF: 0.7 },
  { cx: 0.5, cy: 1.0, rot: 0, pull: 0.2, sigma: 0.8, k: 14, c: 5.5, amp: 70, sp: 0.00014, ph: 4, breathe: 0.07, swell: 0.06, scrollF: 1.3 },
  { cx: 0.5, cy: 0.38, rot: 12, pull: 0.55, sigma: 0.55, k: 30, c: 8, amp: 36, sp: 0.00026, ph: 1, breathe: 0.1, swell: 0.18, scrollF: 0.5 },
];
const N = CFG.length;

export default function LiveBackground() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const blobs = Array.from(el.querySelectorAll<HTMLElement>("[data-blob]"));
    const ripples = Array.from(el.querySelectorAll<HTMLElement>("[data-ripple]"));
    let rippleIdx = 0;

    // state (plain arrays, mutated in place: no allocation inside the frame loop)
    const x = new Array<number>(N).fill(0);
    const y = new Array<number>(N).fill(0);
    const vx = new Array<number>(N).fill(0);
    const vy = new Array<number>(N).fill(0);
    const s = new Array<number>(N).fill(1);
    const vs = new Array<number>(N).fill(0);

    let W = innerWidth;
    let H = innerHeight;
    let M = Math.max(W, H);
    const ptr = { tx: W / 2, ty: H * 0.35, x: W / 2, y: H * 0.35 };
    let energy = 0;
    let lastScrollY = scrollY;
    let scrollVel = 0;
    let last = performance.now();
    let raf = 0;
    let running = true;

    const onResize = () => {
      W = innerWidth;
      H = innerHeight;
      M = Math.max(W, H);
    };

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - ptr.tx;
      const dy = e.clientY - ptr.ty;
      energy = Math.min(1, energy + Math.sqrt(dx * dx + dy * dy) / 700);
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
    };

    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest("a,button,input,textarea,select,summary,label")) return;
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
      const r = ripples[rippleIdx++ % ripples.length];
      if (r) {
        r.style.left = e.clientX + "px";
        r.style.top = e.clientY + "px";
        r.animate(
          [
            { transform: "translate(-50%,-50%) scale(0.08)", opacity: 0.7 },
            { transform: "translate(-50%,-50%) scale(1)", opacity: 0 },
          ],
          { duration: 1600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
      }
      // springy shove away from the click, wobbles back via the springs
      for (let i = 0; i < N; i++) {
        const bx = CFG[i].cx * W;
        const by = CFG[i].cy * H;
        const dx = bx - e.clientX;
        const dy = by - e.clientY;
        const d = Math.sqrt(dx * dx + dy * dy) + 1;
        const fall = Math.exp(-((d / M) * (d / M)) / 0.35);
        vx[i] += (dx / d) * 520 * fall;
        vy[i] += (dy / d) * 520 * fall;
        vs[i] += 0.9 * fall;
      }
      energy = Math.min(1, energy + 0.6);
    };

    const onVis = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = (t: number) => {
      if (!running) return;
      let dt = (t - last) / 1000;
      last = t;
      if (dt > 0.05) dt = 0.05;
      if (dt <= 0) dt = 0.016;

      // smooth the pointer, decay energy, measure scroll velocity
      const pk = 1 - Math.exp(-dt * 7);
      ptr.x += (ptr.tx - ptr.x) * pk;
      ptr.y += (ptr.ty - ptr.y) * pk;
      energy *= Math.exp(-dt * 1.5);
      const sy = scrollY;
      const inst = (sy - lastScrollY) / dt;
      lastScrollY = sy;
      scrollVel += (inst - scrollVel) * (1 - Math.exp(-dt * 9));
      let scrollOff = -scrollVel * 0.035;
      if (scrollOff > 110) scrollOff = 110;
      else if (scrollOff < -110) scrollOff = -110;

      for (let i = 0; i < N; i++) {
        const c = CFG[i];
        const bx = c.cx * W;
        const by = c.cy * H;
        const dx = ptr.x - bx;
        const dy = ptr.y - by;
        const d = Math.sqrt(dx * dx + dy * dy) / M;
        const fall = Math.exp(-(d * d) / (c.sigma * c.sigma));
        const k = c.pull * fall * (0.7 + energy * 0.8);

        const tx = dx * k + Math.sin(t * c.sp + c.ph) * c.amp;
        const ty = dy * k + Math.cos(t * c.sp * 0.9 + c.ph) * c.amp + scrollOff * c.scrollF;
        const ts = 1 + Math.sin(t * c.sp * 1.7 + c.ph) * c.breathe + energy * c.swell * (0.5 + fall);

        vx[i] += (c.k * (tx - x[i]) - c.c * vx[i]) * dt;
        vy[i] += (c.k * (ty - y[i]) - c.c * vy[i]) * dt;
        vs[i] += (36 * (ts - s[i]) - 8 * vs[i]) * dt;
        x[i] += vx[i] * dt;
        y[i] += vy[i] * dt;
        s[i] += vs[i] * dt;

        const rot = c.rot + Math.sin(t * c.sp * 0.6 + c.ph) * 9;
        const b = blobs[i];
        b.style.transform =
          "translate(-50%,-50%) translate3d(" + x[i].toFixed(1) + "px," + y[i].toFixed(1) + "px,0) rotate(" + rot.toFixed(2) + "deg) scale(" + s[i].toFixed(3) + ")";
        b.style.opacity = (0.86 + energy * 0.14 + fall * 0.04).toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });
    addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={root} className="live-bg grain" aria-hidden="true">
      {CFG.map((c, i) => (
        <div
          key={i}
          data-blob
          className={`blob blob-${"abcd"[i]}`}
          style={{ ["--cx" as string]: c.cx, ["--cy" as string]: c.cy }}
        />
      ))}
      <div data-ripple className="ripple" />
      <div data-ripple className="ripple" />
      <div data-ripple className="ripple" />
    </div>
  );
}
