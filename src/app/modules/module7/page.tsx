"use client";
import React, { useEffect, useState } from "react";
import ModelComparisonCard from "../../components/ModelComparisonCard";

interface ModelComparison {
  model_type: string;
  cost: string;
  latency: string;
  control: string;
  privacy: string;
  customization: string;
  best_for: string[];
  risks: string[];
}

const Module7 = () => {
  const [models, setModels] = useState<ModelComparison[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(`${API_BASE}/comparison/models`)
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">
            Open-Source vs Closed-Source Lab
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Evaluating the strategic tradeoffs between proprietary model convenience and open-weights sovereignty.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-100 space-y-6">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">Accessing Comparison Matrix...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            {models.map((model) => (
              <ModelComparisonCard
                key={model.model_type}
                model={model}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module7;