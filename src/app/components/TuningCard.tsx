"use client";
import React, { useState } from "react";

interface Props {
  title: string;
  endpoint: string;
  requiresTemplate?: boolean;
}

const TuningCard: React.FC<Props> = ({
  title,
  endpoint,
  requiresTemplate = false,
}) => {
  const [input, setInput] = useState("");
  const [template, setTemplate] = useState(
    "Answer the following clearly:\n{input}"
  );
  const [result, setResult] = useState<{
    final_prompt: string;
    output: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    const body = requiresTemplate
      ? { template, input_text: input }
      : { input_text: input };

    try {
      const res = await fetch(`${API_BASE}/tuning/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col shadow-2xl transition-all duration-500 hover:border-indigo-500/30">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
      </div>

      <div className="space-y-4 grow">
        {requiresTemplate && (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prompt Template</label>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-indigo-300 outline-none focus:border-indigo-500/50 transition-all resize-none font-mono"
              rows={3}
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Test Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-indigo-500/50 transition-all resize-none"
            rows={3}
            placeholder="Type content to test tuning..."
          />
        </div>

        <button
          onClick={handleRun}
          disabled={loading || !input.trim()}
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/10 disabled:opacity-20"
        >
          {loading ? "Processing..." : "Run Inference"}
        </button>

        {result && (
          <div className="space-y-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="space-y-2">
              <strong className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Final Constructed Prompt</strong>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 whitespace-pre-wrap leading-relaxed">
                {result.final_prompt}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block">Model Response</strong>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-100 whitespace-pre-wrap leading-relaxed shadow-inner">
                {result.output}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TuningCard;