"use client";
import React from "react";

interface Props {
  prompt: string;
  responses: string[];
  ranking: number[];
  onRankChange: (index: number, value: number) => void;
}

const RLHFCard: React.FC<Props> = ({ prompt, responses, ranking, onRankChange }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">System Prompt</h2>
        <p className="text-white text-lg font-semibold leading-relaxed">{prompt}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {responses.map((response, index) => (
          <div
            key={index}
            className={`group relative border-2 rounded-3xl p-6 transition-all duration-500 bg-slate-900 ${
              ranking[index] === 1 
                ? "border-indigo-500 shadow-[0_0_20px_-5px_rgba(79,70,229,0.4)]" 
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Candidate {index + 1}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Rank</span>
                <input
                  type="number"
                  min={1}
                  max={responses.length}
                  value={ranking[index] || ""}
                  onChange={(e) => onRankChange(index, Number(e.target.value))}
                  className="w-12 h-9 bg-slate-950 border border-slate-700 rounded-xl text-center font-bold text-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
            
            {ranking[index] === 1 && (
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RLHFCard;