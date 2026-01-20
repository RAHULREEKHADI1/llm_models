"use client";
import React, { useState } from "react";
import ContextComparison from "../../components/ContextComparison";

export interface ContextResponse {
  model_type: "short" | "long";
  max_context_tokens: number;
  total_input_tokens: number;
  used_tokens: number;
  dropped_tokens: number;
  used_text: string;
  dropped_text: string;
}

const Module3Page: React.FC = () => {
  const [input, setInput] = useState("");
  const [modelType, setModelType] = useState<"short" | "long">("short");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ContextResponse | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

      const res = await fetch(`${API_BASE}/context/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_text: input,
          model_type: modelType,
        }),
      });

      if (!res.ok) throw new Error("API Error");

      const data: ContextResponse = await res.json();
      setResponse(data);
    } catch {
      setResponse({
        model_type: modelType,
        max_context_tokens: modelType === "short" ? 1024 : 16384,
        total_input_tokens: 0,
        used_tokens: 0,
        dropped_tokens: 0,
        used_text: "Inference Error",
        dropped_text: "Could not analyze context",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-white mb-2">
            Context Window & Long-Context
          </h1>
          <p className="text-slate-400 text-lg">
            Visualize how LLMs drop information beyond their context window.
          </p>
        </header>

        <section className="bg-slate-900 border border-slate-800 p-8 rounded-3xl mb-10">
          <label className="block text-[10px] font-black text-slate-500 uppercase mb-4">
            Source Payload
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl resize-none"
            placeholder="Paste long documents here..."
          />

          <div className="mt-6 flex justify-between gap-4 flex-wrap">
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value as "short" | "long")}
              className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-indigo-400"
            >
              <option value="short">DistilGPT2 (Short)</option>
              <option value="long">Long-T5 (Long)</option>
            </select>

            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className="px-10 py-3 bg-indigo-600 rounded-xl font-bold disabled:opacity-30"
            >
              {loading ? "Analyzing..." : "Analyze Context"}
            </button>
          </div>
        </section>

        {response && (
          <ContextComparison
            modelType={response.model_type}
            maxTokens={response.max_context_tokens}
            totalTokens={response.total_input_tokens}
            usedTokens={response.used_tokens}
            droppedTokens={response.dropped_tokens}
            usedText={response.used_text}
            droppedText={response.dropped_text}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Module3Page;
