"use client";
import React from "react";

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

const ModelComparisonCard: React.FC<{ model: ModelComparison }> = ({ model }) => {
  return (
    <div className="group relative bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/50">
      <div className="p-6 border-b border-slate-800 bg-slate-950/50">
        <h2 className="text-2xl font-black text-white capitalize tracking-tight group-hover:text-indigo-400 transition-colors">
          {model.model_type.replace("_", " ")}
        </h2>
      </div>

      <div className="p-8 space-y-8 grow">
        <div className="space-y-4">
          {[
            { label: "Cost Strategy", value: model.cost },
            { label: "Inference Latency", value: model.latency },
            { label: "Operational Control", value: model.control },
            { label: "Data Privacy", value: model.privacy },
            { label: "Architecture Customization", value: model.customization },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">{item.label}</span>
              <span className="text-slate-200 font-bold">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">Strategic Advantages</h3>
            <div className="flex flex-wrap gap-2">
              {model.best_for.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 text-[11px] font-bold rounded-xl border border-indigo-500/20">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4">Critical Risks</h3>
            <div className="flex flex-wrap gap-2">
              {model.risks.map((risk, i) => (
                <span key={i} className="px-3 py-1.5 bg-rose-500/10 text-rose-400 text-[11px] font-bold rounded-xl border border-rose-500/20">
                  {risk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default ModelComparisonCard;