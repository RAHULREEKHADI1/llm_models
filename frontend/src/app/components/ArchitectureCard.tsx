"use client";
import React from "react";

interface Props {
  model_name: string;
  architecture_type: string;
  generation_mechanism: string;
  pros: string[];
  cons: string[];
  context_window: string;
  primary_use_case: string;
}

const ArchitectureCard: React.FC<Props> = ({
  model_name,
  architecture_type,
  generation_mechanism,
  pros,
  cons,
  context_window,
  primary_use_case,
}) => (
  <div className="group relative bg-slate-900 border border-slate-800 p-6 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:bg-slate-800/80 hover:border-indigo-500/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_20px_-5px_rgba(79,70,229,0.3)]">
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
        {model_name}
      </h2>
      <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
        Architecture
      </span>
    </div>

    <div className="space-y-4 text-sm text-slate-300">
      <p><strong className="text-slate-500 uppercase text-[10px] tracking-wider block mb-1">Use Case</strong> {primary_use_case}</p>
      
      <div className="grid grid-cols-2 gap-4 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
        <div>
          <strong className="text-slate-500 uppercase text-[10px] tracking-wider block mb-1">Type</strong>
          {architecture_type}
        </div>
        <div>
          <strong className="text-slate-500 uppercase text-[10px] tracking-wider block mb-1">Context</strong>
          {context_window}
        </div>
      </div>

      <p><strong className="text-slate-500 uppercase text-[10px] tracking-wider block mb-1">Mechanism</strong> {generation_mechanism}</p>
      
      <div className="space-y-3">
        <div>
          <strong className="text-emerald-500 uppercase text-[10px] tracking-wider block mb-1">Strengths</strong>
          <ul className="list-none space-y-1">
            {pros.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong className="text-rose-500 uppercase text-[10px] tracking-wider block mb-1">Limitations</strong>
          <ul className="list-none space-y-1">
            {cons.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    
    <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </div>
);

export default ArchitectureCard;