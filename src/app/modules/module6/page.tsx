"use client";
import React, { useState } from "react";
import MetricsChart from "../../components/MetricsChart";

const Module6 = () => {
  const [referenceText, setReferenceText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [metrics, setMetrics] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async () => {
    if (!referenceText.trim() || !generatedText.trim()) return;
    setLoading(true);
    
    // Fallback if env variable is missing during dev
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${API_BASE}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference_text: referenceText,
          generated_text: generatedText,
        }),
      });

      if (!res.ok) throw new Error("Evaluation failed");
      
      const data = await res.json();
      setMetrics(
        Object.entries(data).map(([name, value]) => ({
          name,
          value: Number(value),
        }))
      );
    } catch (err) {
      console.error("Evaluation Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Evaluation Metrics Lab</h1>
          <p className="text-slate-400 text-lg">Compare generated outputs against ground truth data.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Reference (Ground Truth)</label>
            <textarea
              value={referenceText}
              onChange={(e) => setReferenceText(e.target.value)}
              rows={6}
              className="w-full p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl focus:border-indigo-500/50 outline-none transition-all resize-none text-slate-200"
              placeholder="Enter the gold-standard reference..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Generated Output</label>
            <textarea
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              rows={6}
              className="w-full p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl focus:border-indigo-500/50 outline-none transition-all resize-none text-slate-200"
              placeholder="Paste the model's output..."
            />
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <button
            onClick={handleEvaluate}
            disabled={loading}
            className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all duration-300 disabled:opacity-20 shadow-lg shadow-indigo-500/20"
          >
            {loading ? "Benchmarking..." : "Execute Evaluation"}
          </button>
        </div>

        {metrics.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <MetricsChart metrics={metrics} />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {metrics.map((m) => (
                <div key={m.name} className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/30">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{m.name}</p>
                  <p className="text-3xl font-black text-indigo-400">{(m.value * 100).toFixed(1)}%</p>
                  <div className="mt-4 h-1 w-full bg-slate-950 rounded-full overflow-hidden">
                     <div 
                      className="h-full bg-indigo-500 transition-all duration-1000" 
                      style={{ width: `${m.value * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module6;