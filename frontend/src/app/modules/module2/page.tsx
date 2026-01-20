"use client";
import React, { useState } from "react";
import DecoderEncoderComparison from "../../components/DecoderEncoderComparison";

const Module2Page: React.FC = () => {
  const [input, setInput] = useState("");
  const [decoder, setDecoder] = useState("");
  const [encoder, setEncoder] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskType, setTaskType] = useState<"summarize" | "translate" | "qa">("summarize");

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const [decResponse, encResponse] = await Promise.all([
        fetch(`${API_BASE}/generate/decoder`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input_text: input, task_type: taskType }),
        }).then((r) => r.json()),
        fetch(`${API_BASE}/generate/encoder_decoder`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input_text: input, task_type: taskType }),
        }).then((r) => r.json()),
      ]);

      setDecoder(decResponse.output_text);
      setEncoder(encResponse.output_text);
    } catch (error) {
      setDecoder("Error generating output");
      setEncoder("Error generating output");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Decoder vs Encoder-Decoder
          </h1>
          <p className="text-slate-400 text-lg">
            Compare architectural behavior across sequence-to-sequence and autoregressive tasks.
          </p>
        </header>

        

        <section className="bg-slate-900 border border-slate-800 p-8 rounded-3xl mb-10 shadow-2xl">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Input Sequence
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-5 bg-slate-950 border border-slate-800 rounded-2xl focus:border-indigo-500/50 transition-all outline-none resize-none text-slate-200"
            placeholder="Enter source text for model processing..."
            rows={5}
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Objective:</span>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as any)}
                className="bg-transparent text-indigo-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="summarize">Summarization</option>
                <option value="translate">Translation</option>
                <option value="qa">Q&A</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="px-10 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-20 shadow-lg shadow-indigo-500/10"
            >
              {loading ? "Processing..." : "Run Comparison"}
            </button>
          </div>
        </section>

        <DecoderEncoderComparison
          decoderOutput={decoder}
          encoderOutput={encoder}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Module2Page;