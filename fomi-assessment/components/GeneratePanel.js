"use client";

import { useState } from "react";
import { STYLES, MODELS, IMAGE_COUNTS, DEFAULT_PROMPT } from "@/lib/mockData";

export default function GeneratePanel({ onGenerate, isGenerating }) {
  const [mode, setMode] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(4);
  const [model, setModel] = useState(MODELS[0]);
  const [style, setStyle] = useState(null);
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (prompt.trim().length < 3) {
      setError("Describe what you want to create — a few words is enough.");
      return;
    }
    setError("");
    onGenerate({ prompt, count, model, style, mode });
  }

  return (
    <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-4">
      {/* Image / Video toggle */}
      <div
        role="tablist"
        aria-label="Generation mode"
        className="grid grid-cols-2 bg-line/50 rounded-full p-1"
      >
        {["image", "video"].map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`text-sm font-medium py-2 rounded-full capitalize transition-all duration-200 ${
              mode === m ? "bg-panel text-ink shadow-soft" : "text-muted hover:text-ink"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Prompt panel */}
      <div className="bg-panel border border-line rounded-2xl p-3 shadow-soft flex flex-col gap-3">
        <label htmlFor="prompt" className="sr-only">
          Describe your imagination to be converted into a piece of art
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            if (error) setError("");
          }}
          placeholder="Describe your imagination to be converted to a piece of art…"
          rows={5}
          className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          aria-invalid={!!error}
          aria-describedby={error ? "prompt-error" : undefined}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setPrompt(DEFAULT_PROMPT)}
            className="text-xs text-muted hover:text-accent-dark transition-colors"
          >
            Use example prompt
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-full transition-colors duration-200 active:scale-[0.98]"
        >
          {isGenerating ? (
            <>
              <Spinner className="h-4 w-4" />
              Generating…
            </>
          ) : (
            <>
              <PlusIcon className="h-4 w-4" />
              Generate
            </>
          )}
        </button>
        {error && (
          <p id="prompt-error" role="alert" className="text-xs text-accent-dark -mt-1">
            {error}
          </p>
        )}
      </div>

      {/* Count + model row */}
      <div className="grid grid-cols-2 gap-3">
        <Dropdown
          label="# Images"
          value={count}
          onChange={setCount}
          options={IMAGE_COUNTS.map((c) => ({ value: c, label: String(c) }))}
        />
        <Dropdown
          label="Model"
          value={model}
          onChange={setModel}
          options={MODELS.map((m) => ({ value: m, label: m }))}
        />
      </div>

      {/* Advance section */}
      <Accordion title="Advance" open={advanceOpen} onToggle={() => setAdvanceOpen((v) => !v)}>
        <div className="flex flex-col gap-3 text-sm text-muted">
          <SliderRow label="Guidance scale" defaultValue={7} min={1} max={15} />
          <SliderRow label="Steps" defaultValue={30} min={10} max={50} />
          <label className="flex items-center justify-between">
            <span>Seed (optional)</span>
            <input
              type="text"
              placeholder="Random"
              className="w-24 bg-canvas border border-line rounded-lg px-2 py-1 text-xs text-ink focus:outline-none focus:border-accent"
            />
          </label>
        </div>
      </Accordion>

      {/* Styles section */}
      <Accordion title="Styles" open={stylesOpen} onToggle={() => setStylesOpen((v) => !v)}>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(style === s ? null : s)}
              aria-pressed={style === s}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                style === s
                  ? "bg-ink text-canvas border-ink"
                  : "border-line text-muted hover:border-accent hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Accordion>
    </aside>
  );
}

function Dropdown({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 bg-panel border border-line rounded-xl px-3 py-2 shadow-soft">
      <span className="text-[11px] text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm text-ink font-medium focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Accordion({ title, open, onToggle, children }) {
  return (
    <div className="bg-panel border border-line rounded-2xl shadow-soft overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-ink"
      >
        {title}
        <ChevronIcon className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

function SliderRow({ label, defaultValue, min, max }) {
  const [val, setVal] = useState(defaultValue);
  return (
    <label className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="text-ink font-medium">{val}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </label>
  );
}

function ChevronIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...p}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function Spinner(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...p} className={`animate-spin ${p.className || ""}`}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
