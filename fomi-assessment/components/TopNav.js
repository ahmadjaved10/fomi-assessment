"use client";

import { useState } from "react";

const TOOLS = [
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "image", label: "Image", icon: ImageIcon },
  { key: "video", label: "Video", icon: VideoIcon },
  { key: "edit", label: "Edit", icon: EditIcon },
  { key: "upscale", label: "Upscale", icon: UpscaleIcon },
];

export default function TopNav({ active, onChange }) {
  const [progress] = useState(62); // demo "credits used" style progress bar

  return (
    <header className="w-full border-b border-line bg-canvas/90 backdrop-blur sticky top-0 z-30">
      {/* thin usage indicator, a subtle nod to the mockup's top progress bar */}
      <div className="h-[3px] w-full bg-line">
        <div
          className="h-full bg-accent transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-display text-2xl tracking-tight text-ink select-none">F</span>
          <span className="hidden sm:inline text-sm text-muted font-medium">omi</span>
        </div>

        <nav
          aria-label="Primary tools"
          className="hidden md:flex items-center gap-1 bg-panel border border-line rounded-full px-1.5 py-1.5 shadow-soft"
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = active === tool.key;
            return (
              <button
                key={tool.key}
                onClick={() => onChange(tool.key)}
                aria-pressed={isActive}
                aria-label={tool.label}
                title={tool.label}
                className={`relative flex items-center justify-center h-9 w-9 rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-ink text-canvas"
                    : "text-muted hover:text-ink hover:bg-line/60"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors px-3 py-2 rounded-full hover:bg-line/60">
            <GalleryIcon className="h-4 w-4" />
            Gallery
          </button>
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors px-3 py-2 rounded-full hover:bg-line/60">
            <SupportIcon className="h-4 w-4" />
            Support
          </button>
          <button
            aria-label="Notifications"
            className="h-9 w-9 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-line/60 transition-colors"
          >
            <BellIcon className="h-4 w-4" />
          </button>
          <button
            aria-label="Account menu"
            className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-accent-dark shadow-soft"
          />
        </div>
      </div>
    </header>
  );
}

/* --- inline icon set (no external icon dependency needed) --- */
function HomeIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ImageIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M20 16l-5-5-9 9" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function VideoIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5 21 7v10l-5-3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function EditIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M4 20l4.2-1.1L19 8.1a1.5 1.5 0 0 0 0-2.1l-1-1a1.5 1.5 0 0 0-2.1 0L5.1 15.8 4 20Z" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function UpscaleIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M9 4H4v5M15 20h5v-5M4 4l7 7M20 20l-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function GalleryIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>; }
function SupportIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.9.4-1.4 1-1.4 1.9M12 17h.01" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function BellIcon(p) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 17a2.5 2.5 0 0 0 5 0" strokeLinecap="round"/></svg>; }
