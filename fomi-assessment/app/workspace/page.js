"use client";

/**
 * PART B — Product Thinking Challenge
 * Concept: "Studio" — a layered, non-destructive canvas workspace for
 * professional creators, built around a *version tree* instead of a flat
 * history grid, and an always-present AI co-pilot instead of a one-shot
 * prompt box. See PRODUCT_THINKING.md for the full rationale.
 *
 * Color signature: two accents map directly to authorship —
 *   amber = anything the creator controls directly (tools, layers, actions)
 *   cyan  = anything the AI originates (suggestions, co-pilot, inferred edits)
 * This isn't decorative: at a glance you can tell what you did from what
 * the model proposed, which matters across a multi-hour session.
 */

import { useMemo, useState } from "react";
import Image from "next/image";

const LAYERS_SEED = [
  { id: "l1", label: "Base — portrait render", seed: "studio-base" },
  { id: "l2", label: "Relight — golden hour", seed: "studio-relight" },
  { id: "l3", label: "Wardrobe swap — cream knit", seed: "studio-wardrobe" },
];

const BRANCHES = [
  { id: "v1", label: "v1", seed: "studio-base", note: "Initial generation" },
  { id: "v2", label: "v2", seed: "studio-relight", note: "Relit + warmer tone" },
  { id: "v3", label: "v3", seed: "studio-wardrobe", note: "Current — wardrobe swap", active: true },
];

export default function WorkspacePage() {
  const [activeLayer, setActiveLayer] = useState(LAYERS_SEED[2].id);
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: "ai", text: "This crop clips her hand at the wrist. Extend canvas left by 12% before upscaling?" },
  ]);
  const [draft, setDraft] = useState("");

  const activeSeed = useMemo(
    () => LAYERS_SEED.find((l) => l.id === activeLayer)?.seed ?? LAYERS_SEED[0].seed,
    [activeLayer]
  );

  function sendMessage() {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: draft },
      { role: "ai", text: "Got it — applying that to a new branch off v3 so your current version stays untouched." },
    ]);
    setDraft("");
  }

  const smartSuggestions = [
    "Extend the canvas to the left by 12%",
    "Warm the skin tone and reduce contrast",
    "Add a soft studio backdrop with subtle grain",
  ];

  const quickAdjustments = ["Face tune", "Skin retouch", "Background blur", "Accent lighting", "Cinematic crop"];

  const detailStats = [
    { label: "Depth", value: "18px" },
    { label: "Exposure", value: "+0.8EV" },
    { label: "Sharpen", value: "72%" },
  ];

  const toolTabs = ["Move", "Crop", "Retouch", "Relight", "Mask", "Compose"];

  const swatches = ["#F2C9A6", "#D98F5B", "#8A5A3C", "#EFE4D6", "#4A3527"];

  return (
    <div className="studio min-h-screen w-full overflow-x-hidden bg-studio-base text-studio-text">
      <header className="sticky top-0 z-20 border-b border-studio-line bg-studio-base/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-soft font-display text-lg text-amber ring-1 ring-studio-line">
              F
            </div>
            <div className="hidden items-center gap-2 text-studio-dim sm:flex">
              <span className="text-xs">/</span>
              <span className="font-display text-xs italic tracking-[0.14em] text-studio-dim">Studio</span>
            </div>
            <input
              defaultValue="Redhead portrait — editorial"
              className="min-w-0 w-full max-w-[260px] bg-transparent px-1.5 py-1 text-sm font-medium text-studio-text placeholder:text-studio-dim focus:outline-none sm:max-w-none"
              aria-label="Project name"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[10px] text-emerald-200 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Autosaved
            </div>
            <button className="rounded-full border border-studio-line bg-white/5 px-3 py-1.5 text-[10px] font-medium text-studio-text/80 transition hover:bg-white/10 sm:text-xs">
              Compare
            </button>
            <button className="rounded-full bg-amber px-3 py-1.5 text-[10px] font-semibold text-studio-base transition hover:bg-amber-dark hover:text-white sm:text-xs">
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1800px] px-3 py-4 sm:px-4 xl:px-5">
        <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          {/* LEFT — creator-controlled: layers, version tree, quick actions. Amber accent throughout. */}
          <aside className="rounded-[28px] border border-studio-line bg-studio-panel p-3 shadow-studio sm:p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-[11px] italic tracking-[0.1em] text-studio-dim">Layers</p>
              <button className="rounded-full border border-studio-line bg-white/5 px-2 py-1 text-[10px] text-studio-text/70 hover:bg-white/10">
                + Add
              </button>
            </div>

            <div className="space-y-2">
              {LAYERS_SEED.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-all ${
                    activeLayer === layer.id
                      ? "bg-amber-soft ring-1 ring-amber/40"
                      : "bg-transparent hover:bg-white/5"
                  }`}
                >
                  <span className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/10 ring-1 ring-studio-line">
                    <Image src={`https://picsum.photos/seed/${layer.seed}/80/80`} alt="" fill className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-xs font-medium text-studio-text">{layer.label}</span>
                    <span className="block font-mono-num text-[10px] text-studio-dim">{layer.seed}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-studio-line bg-black/25 p-3">
              <p className="font-display mb-3 text-[11px] italic tracking-[0.1em] text-studio-dim">Version tree</p>
              <div className="space-y-3">
                {BRANCHES.map((b, i) => (
                  <div key={b.id} className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          b.active ? "bg-amber shadow-[0_0_0_4px_rgba(224,149,74,0.18)]" : "bg-white/25"
                        }`}
                      />
                      {i < BRANCHES.length - 1 && <span className="mt-1 h-8 w-px bg-studio-line" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className={`font-mono-num text-xs font-medium ${b.active ? "text-amber" : "text-studio-text/70"}`}>
                        {b.label}
                      </p>
                      <p className="text-[11px] text-studio-dim">{b.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-display mb-3 text-[11px] italic tracking-[0.1em] text-studio-dim">Quick actions</p>
              <div className="flex flex-wrap gap-2">
                {quickAdjustments.map((item) => (
                  <button
                    key={item}
                    className="rounded-full border border-studio-line bg-white/5 px-2.5 py-1.5 text-[10px] text-studio-text/75 transition hover:border-amber/40 hover:bg-amber-soft hover:text-amber"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER — the canvas, full bleed, minimal chrome */}
          <main className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[30px] border border-studio-line bg-[#100E0B] shadow-studio">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-studio-line bg-black/15 px-3 py-3 sm:px-4">
              <div className="flex flex-wrap items-center gap-2">
                {toolTabs.map((tool) => (
                  <button
                    key={tool}
                    className={`rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-[0.1em] transition ${
                      tool === "Retouch"
                        ? "bg-amber text-studio-base font-semibold"
                        : "border border-studio-line bg-white/5 text-studio-text/70 hover:text-studio-text"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 font-mono-num text-[10px] text-studio-text/60">
                <span className="rounded-full border border-studio-line bg-white/5 px-2 py-1">4K</span>
                <span className="rounded-full border border-studio-line bg-white/5 px-2 py-1">Pro color</span>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(224,149,74,0.07),_transparent_45%)] p-3 sm:p-4 xl:p-6">
              <div className="absolute left-4 top-4 rounded-full border border-studio-line bg-black/40 px-2.5 py-1 text-[10px] text-studio-text/70 backdrop-blur-sm sm:left-5 sm:top-5">
                Layer: {LAYERS_SEED.find((l) => l.id === activeLayer)?.label}
              </div>

              <div className="relative h-[46vh] min-h-[300px] w-full max-w-[440px] overflow-hidden rounded-[28px] border border-studio-line bg-[#1C1917] shadow-studio sm:max-w-[520px] xl:h-[72%] xl:max-w-[660px]">
                <Image
                  key={activeSeed}
                  src={`https://picsum.photos/seed/${activeSeed}/900/1100`}
                  alt="Active canvas layer"
                  fill
                  sizes="(max-width: 1280px) 100vw, 700px"
                  className="object-cover animate-fadeUp"
                />
              </div>

              <div className="absolute bottom-4 left-1/2 flex w-[calc(100%-1.5rem)] max-w-[560px] -translate-x-1/2 flex-wrap items-center justify-center gap-1.5 rounded-full border border-studio-line bg-black/60 px-2 py-2 backdrop-blur-md sm:bottom-5">
                {["Select", "Inpaint", "Relight", "Extend", "Upscale", "Mask"].map((tool) => (
                  <button
                    key={tool}
                    className="rounded-full px-2.5 py-1.5 text-[10px] text-studio-text/75 transition hover:bg-amber-soft hover:text-amber sm:px-3 sm:text-xs"
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* Smart suggestions live in cyan — this is AI-originated, distinct from the amber tool row above it */}
            <div className="border-t border-studio-line bg-black/15 px-3 py-3 sm:px-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-cyan/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-glowPulse" />
                  Smart suggestions
                </div>
                <button className="rounded-full border border-studio-line bg-white/5 px-2.5 py-1.5 text-[10px] text-studio-text/70 hover:bg-white/10">
                  Run all
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {smartSuggestions.map((tip) => (
                  <button
                    key={tip}
                    className="rounded-full border border-cyan/25 bg-cyan-soft px-2.5 py-1.5 text-[10px] text-cyan"
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          </main>

          {/* RIGHT — Inspector (creator data, amber/mono) + Co-pilot (AI dialogue, cyan) */}
          <aside className="rounded-[28px] border border-studio-line bg-studio-panel p-3 shadow-studio sm:p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-[11px] italic tracking-[0.1em] text-studio-dim">Inspector</p>
              <button
                onClick={() => setCopilotOpen((v) => !v)}
                className="rounded-full border border-studio-line bg-white/5 px-2 py-1 text-[10px] text-studio-text/70 hover:bg-white/10"
              >
                {copilotOpen ? "Hide co-pilot" : "Open co-pilot"}
              </button>
            </div>

            <div className="rounded-2xl border border-studio-line bg-black/25 p-3">
              <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-studio-dim">
                <span>Color grade</span>
                <span className="text-amber">Warm</span>
              </div>
              <div className="flex items-center gap-2">
                {swatches.map((color) => (
                  <span
                    key={color}
                    className="h-8 w-8 rounded-full border border-studio-line"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {detailStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-studio-line bg-white/5 p-2 text-center">
                  <div className="text-[9px] uppercase tracking-[0.1em] text-studio-dim">{stat.label}</div>
                  <div className="mt-1 font-mono-num text-sm font-medium text-studio-text">{stat.value}</div>
                </div>
              ))}
            </div>

            {copilotOpen && (
              <>
                <div className="mt-4 space-y-3 rounded-2xl border border-cyan/20 bg-cyan-soft/40 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-cyan/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-glowPulse" />
                    Co-pilot
                  </div>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[92%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                        m.role === "ai" ? "bg-white/6 text-studio-text/85" : "ml-auto bg-amber text-studio-base font-medium"
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-studio-line bg-white/5 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-studio-dim">Prompt draft</p>
                    <span className="text-[10px] text-studio-dim">Ready</span>
                  </div>
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask the co-pilot for refinements…"
                    className="h-24 w-full resize-none rounded-xl border border-studio-line bg-black/25 px-3 py-2 text-xs text-studio-text/85 placeholder:text-studio-dim focus:outline-none focus:ring-1 focus:ring-cyan"
                  />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <button className="rounded-full border border-studio-line bg-white/5 px-2.5 py-1.5 text-[10px] text-studio-text/75 hover:bg-white/10">
                      Regenerate
                    </button>
                    <button
                      onClick={sendMessage}
                      className="rounded-full bg-cyan px-3 py-1.5 text-[10px] font-semibold text-studio-base transition hover:bg-cyan-dark hover:text-white"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
