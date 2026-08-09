"use client";

import Image from "next/image";

export default function ResultsGrid({ job, isGenerating, count }) {
  if (isGenerating) {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="skeleton aspect-[4/5] rounded-2xl"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-20 border border-dashed border-line rounded-2xl">
        <div className="h-12 w-12 rounded-full bg-accent-soft flex items-center justify-center">
          <SparkleIcon className="h-5 w-5 text-accent-dark" />
        </div>
        <p className="text-sm text-muted max-w-xs">
          Nothing generated yet. Describe an idea on the left and press Generate to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {job.results.map((r, i) => (
        <figure
          key={r.id}
          className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-line/40 animate-fadeUp"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <Image
            src={r.url}
            alt={`Generated result ${i + 1} for: ${job.prompt.slice(0, 80)}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
            <IconButton label="Download">
              <DownloadIcon className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton label="Expand">
              <ExpandIcon className="h-3.5 w-3.5" />
            </IconButton>
          </div>
        </figure>
      ))}
    </div>
  );
}

function IconButton({ children, label }) {
  return (
    <button
      aria-label={label}
      className="h-7 w-7 flex items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white transition-colors"
    >
      {children}
    </button>
  );
}

function DownloadIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ExpandIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M9 4H4v5M15 20h5v-5M4 4l7 7M20 20l-7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SparkleIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
    </svg>
  );
}
