"use client";
import React, { useEffect, useState } from "react";
import ArchitectureCard from "../../components/ArchitectureCard";

interface Architecture {
  model_name: string;
  architecture_type: string;
  generation_mechanism: string;
  pros: string[];
  cons: string[];
  context_window: string;
  primary_use_case: string;
}

const Module1: React.FC = () => {
  const [data, setData] = useState<Architecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
    fetch(`${API_BASE}/architectures`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium tracking-widest uppercase text-xs">Analyzing Architectures...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            LLM Architecture Explorer
          </h1>
          <p className="text-slate-400 text-lg">
            Investigating the structural foundations of modern language models.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {data.map((arch) => (
            <ArchitectureCard key={arch.model_name} {...arch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module1;