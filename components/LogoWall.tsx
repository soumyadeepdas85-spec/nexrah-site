"use client";

import { useRef } from "react";
import { XMark } from "./ui";

// PLACEHOLDER tiles: replace each with a real client logo (see components/Sections.tsx, Clients)
const tiles = Array.from({ length: 8 }, (_, i) => i + 1);

export default function LogoWall() {
  const ref = useRef<HTMLUListElement>(null);

  // A soft spotlight follows the pointer across the wall (CSS variables only, no re-render)
  const onMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <ul
      ref={ref}
      onPointerMove={onMove}
      className="logo-wall grid grid-cols-2 border-l border-t border-[color:var(--line)] sm:grid-cols-3 lg:grid-cols-4"
    >
      {tiles.map((n) => (
        <li
          key={n}
          className="group relative grid h-36 place-items-center border-b border-r border-[color:var(--line)] transition-colors duration-300 hover:bg-accent hover:text-on-accent sm:h-44"
        >
          <span className="flex flex-col items-center gap-3">
            <XMark className="h-6 w-6 opacity-35 transition-all duration-500 group-hover:rotate-[360deg] group-hover:opacity-100" />
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100">
              Client Logo {String(n).padStart(2, "0")}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
