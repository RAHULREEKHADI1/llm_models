"use client";
import React from "react";
import TuningCard from "../../components/TuningCard";

const Module8 = () => {
  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Adapter & Tuning Strategies
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl">
            Compare the behavioral shifts between soft prompt tuning, Low-Rank Adaptation (LoRA), and full weight fine-tuning.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TuningCard
            title="Prompt Tuning"
            endpoint="prompt"
            requiresTemplate
          />

          <TuningCard
            title="LoRA (Adapter)"
            endpoint="lora"
          />

          <TuningCard
            title="Full Fine-Tuning"
            endpoint="fine_tuned"
          />
        </div>
      </div>
    </div>
  );
};

export default Module8;