"use client";

import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true }).format(
    new Date(),
  );

function subscribe(cb: () => void) {
  const id = setInterval(cb, 15000);
  return () => clearInterval(id);
}

/** Live local time in Noida (IST). Renders nothing on the server to avoid a mismatch. */
export function NoidaClock() {
  const time = useSyncExternalStore(subscribe, fmt, () => "");
  return (
    <p className="flex items-center gap-2.5 text-[#f5f5f0]">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#cbdc3f] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#cbdc3f]" />
      </span>
      <span>
        Noida{time ? <> · <span className="tabular-nums">{time}</span> IST</> : null}
      </span>
    </p>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/25 text-[#f5f5f0] transition hover:border-[#cbdc3f] hover:bg-[#cbdc3f] hover:text-[#17171c]"
    >
      <ArrowUp size={20} aria-hidden className="transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
