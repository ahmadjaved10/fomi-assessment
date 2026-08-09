"use client";

import Image from "next/image";
import { HISTORY_SEEDS } from "@/lib/mockData";

export default function HistoryStrip({ onSelect }) {
  return (
    <div className="flex items-stretch gap-3 overflow-x-auto pb-1 px-1 -mx-1 scroll-smooth">
      <button className="flex flex-col items-center justify-center gap-1 shrink-0 w-20 h-20 rounded-2xl border border-dashed border-line text-muted hover:text-ink hover:border-accent transition-colors">
        <ClockIcon className="h-4 w-4" />
        <span className="text-[11px] font-medium">History</span>
      </button>

      {HISTORY_SEEDS.map((seed, i) => (
        <button
          key={seed}
          onClick={() => onSelect?.(seed)}
          className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-line hover:border-accent focus-visible:border-accent transition-all duration-200 hover:-translate-y-0.5"
          aria-label={`Open past generation ${i + 1}`}
        >
          <Image
            src={`https://picsum.photos/seed/${seed}/160/160`}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );
}

function ClockIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
