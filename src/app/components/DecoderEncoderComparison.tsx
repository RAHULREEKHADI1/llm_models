"use client";
import React from "react";

interface Props {
  decoderOutput: string;
  encoderOutput: string;
  loading: boolean;
}

const DecoderEncoderComparison: React.FC<Props> = ({ decoderOutput, encoderOutput, loading }) => {
  const Card = ({ title, content, label, color }: { title: string; content: string; label: string; color: string }) => (
    <div className="group relative flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/50 overflow-hidden">
      <div className={`h-1.5 w-full ${color}`} />
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors">{title}</h2>
          <span className="text-[10px] font-black px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400 uppercase tracking-widest">
            {label}
          </span>
        </div>
        <div className={`flex-1 p-5 rounded-2xl bg-slate-950/50 border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap min-h-75 transition-all ${loading ? 'opacity-40 animate-pulse' : 'opacity-100'}`}>
          {content || "Awaiting model inference..."}
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card title="Decoder-Only" label="GPT Style" content={decoderOutput} color="bg-blue-500" />
      <Card title="Encoder-Decoder" label="T5 Style" content={encoderOutput} color="bg-indigo-500" />
    </div>
  );
};

export default DecoderEncoderComparison;