"use client";
import React, { useState } from "react";
import RLHFCard from "../../components/RLHFCard";

const Module5 = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [ranking, setRanking] = useState<number[]>([]);
  const [biasedResponse, setBiasedResponse] = useState<string>("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleGenerate = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setStatus("Synthesizing candidates...");
    try {
      const res = await fetch(`${API_BASE}/rlhf/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }).then((r) => r.json());

      setResponses(res.responses);
      setRanking(new Array(res.responses.length).fill(0));
      setBiasedResponse("");
    } catch (err) {
      console.error(err);
    } finally {
      setStatus("");
      setLoading(false);
    }
  };

  const handleRankChange = (index: number, value: number) => {
    const updated = [...ranking];
    updated[index] = value;
    setRanking(updated);
  };

  const handleSubmitRanking = async () => {
    if (loading) return;
    setLoading(true);
    setStatus("Updating reward model...");
    try {
      await fetch(`${API_BASE}/rlhf/rank`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, responses, ranking }),
      });
      setStatus("Preferences integrated.");
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setStatus("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBiased = async () => {
    if (loading) return;
    setLoading(true);
    setStatus("Applying alignment policy...");
    try {
      const res = await fetch(`${API_BASE}/rlhf/generate_biased`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }).then((r) => r.json());

      setBiasedResponse(res.biased_response);
    } catch (err) {
      console.error(err);
    } finally {
      setStatus("");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">RLHF Simulation</h1>
            <p className="text-slate-400 text-lg">Align model behavior through iterative human preference ranking.</p>
          </div>
          <div className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-widest animate-pulse">
            {status || "Ready for Input"}
          </div>
        </header>

        <div className="flex gap-3 mb-12 bg-slate-900 p-2 rounded-3xl border border-slate-800 shadow-2xl focus-within:border-indigo-500/50 transition-all">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            placeholder="Type a sensitive or complex prompt to test alignment..."
            className="flex-1 px-6 py-4 bg-transparent outline-none text-slate-200 placeholder:text-slate-600 disabled:opacity-50"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Generate"}
          </button>
        </div>

        {responses.length > 0 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <RLHFCard 
              prompt={prompt} 
              responses={responses} 
              ranking={ranking} 
              onRankChange={handleRankChange} 
            />

            <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-800 pt-8">
              <button
                onClick={handleSubmitRanking}
                disabled={loading}
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Preference Ranking
              </button>
              
              <button
                onClick={handleGenerateBiased}
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Biased Response
              </button>
            </div>

            {biasedResponse && (
              <div className="bg-indigo-950/30 border border-indigo-500/30 p-8 rounded-3xl relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                  <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Optimized Reward Output</h3>
                </div>
                <p className="text-slate-200 text-lg leading-relaxed font-medium relative z-10">{biasedResponse}</p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module5;