"use client";
import React, { useState } from "react";
import SamplingChart from "../../components/SamplingChart";

const Module4Page: React.FC = () => {
  const [prompt, setPrompt] = useState("The future of artificial intelligence is");
  const [temperature, setTemperature] = useState(0.7);
  const [topK, setTopK] = useState(50);
  const [topP, setTopP] = useState(0.9);
  const [numOutputs, setNumOutputs] = useState(3);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [tokens, setTokens] = useState<string[][]>([]);
  const [tokenProbs, setTokenProbs] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API_BASE}/sampling/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, temperature, top_k: topK, top_p: topP, num_outputs: numOutputs }),
      });
      const data = await res.json();
      setOutputs(data.outputs || []);
      setTokens(data.tokens || []);
      setTokenProbs(data.token_probs || []);
    } catch (err) {
      setOutputs(["Service unavailable. Check API configuration."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-100 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Sampling Parameters Lab</h1>
          <p className="text-slate-400 text-lg">Fine-tune token selection strategies to balance creativity and coherence.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Input Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:border-indigo-500/50 outline-none text-sm text-slate-200 resize-none"
                rows={3}
              />
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                  <span className="text-slate-500">Temperature</span>
                  <span className="text-indigo-400">{temperature}</span>
                </div>
                <input
                  type="range" min={0.1} max={2} step={0.05}
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Top-K</label>
                  <input
                    type="number" value={topK}
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-indigo-400 font-bold focus:border-indigo-500/50 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Top-P</label>
                  <input
                    type="number" step={0.05} value={topP}
                    onChange={(e) => setTopP(parseFloat(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-indigo-400 font-bold focus:border-indigo-500/50 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all duration-300 disabled:opacity-20 shadow-lg shadow-indigo-500/20"
              >
                {loading ? "Inference in progress..." : "Generate Variants"}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {outputs.length === 0 && !loading && (
              <div className="h-full min-h-100 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30 text-slate-600">
                <p className="font-medium tracking-widest uppercase text-xs">Awaiting Generation</p>
              </div>
            )}

            {outputs.map((text, i) => (
              <div key={i} className="group relative bg-slate-900 border border-slate-800 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Inference Output {i + 1}</span>
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-4">{text}</p>

                {tokenProbs[i] && tokens[i] && (
                  <SamplingChart data={tokenProbs[i]} labels={tokens[i]} topK={topK} />
                )}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module4Page;