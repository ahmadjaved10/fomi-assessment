"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import HistoryStrip from "@/components/HistoryStrip";
import GeneratePanel from "@/components/GeneratePanel";
import ResultsGrid from "@/components/ResultsGrid";

export default function Page() {
  const [activeTool, setActiveTool] = useState("image");
  const [job, setJob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingCount, setPendingCount] = useState(4);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleGenerate({ prompt, count, model, style, mode }) {
    setIsGenerating(true);
    setPendingCount(Number(count));
    setErrorMsg("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, count: Number(count), model, style, mode }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Generation failed. Try again.");
      }
      const data = await res.json();
      setJob(data);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <TopNav active={activeTool} onChange={setActiveTool} />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-5 flex flex-col gap-5">
        <HistoryStrip />

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <GeneratePanel onGenerate={handleGenerate} isGenerating={isGenerating} />

          <section className="flex-1 w-full flex flex-col gap-4">
            {job && !isGenerating && (
              <div className="bg-panel border border-line rounded-2xl p-4 shadow-soft animate-fadeUp">
                <p className="text-xs uppercase tracking-wide text-muted mb-1.5">Prompt</p>
                <p className="text-sm text-ink leading-relaxed">{job.prompt}</p>
                <p className="text-xs text-muted mt-2">Model</p>
              </div>
            )}

            {errorMsg && (
              <div role="alert" className="text-sm text-accent-dark bg-accent-soft border border-accent/30 rounded-xl px-4 py-3">
                {errorMsg}
              </div>
            )}

            <ResultsGrid job={job} isGenerating={isGenerating} count={pendingCount} />
          </section>
        </div>
      </main>
    </div>
  );
}
