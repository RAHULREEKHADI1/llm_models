"use client";
import React from "react";

interface Props {
  modelType: string;
  maxTokens: number;
  totalTokens: number;
  usedTokens: number;
  droppedTokens: number;
  usedText: string;
  droppedText: string;
  loading: boolean;
}

const ContextComparison: React.FC<Props> = ({
  modelType,
  maxTokens,
  totalTokens,
  usedTokens,
  droppedTokens,
  usedText,
  droppedText,
  loading,
}) => {
  const usedPercent = Math.min((usedTokens / maxTokens) * 100, 100);

  const Card = ({
    title,
    content,
    color,
  }: {
    title: string;
    content: string;
    color: string;
  }) => (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
      <div className={`h-1.5 ${color}`} />
      <div className="p-8 flex-1">
        <h2 className="font-bold text-xl mb-4">{title}</h2>
        <div
          className={`p-5 rounded-2xl bg-slate-950 border border-slate-800 text-sm whitespace-pre-wrap ${
            loading ? "opacity-40 animate-pulse" : ""
          }`}
        >
          {content || "No data available"}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="col-span-full bg-slate-900 border border-slate-800 p-8 rounded-3xl">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-slate-400 uppercase">Model</p>
            <h3 className="text-xl font-bold">{modelType}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-indigo-400">
              {usedPercent.toFixed(0)}%
            </p>
            <p className="text-xs text-slate-500 uppercase">Utilization</p>
          </div>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all"
            style={{ width: `${usedPercent}%` }}
          />
        </div>

        <div className="flex justify-between mt-4 text-xs font-bold">
          <span className="text-blue-400">Used: {usedTokens}</span>
          <span className="text-slate-400">Total: {totalTokens}</span>
          <span className="text-rose-400">Dropped: {droppedTokens}</span>
        </div>
      </div>

      <Card title="Used Text (Within Window)" content={usedText} color="bg-blue-500" />
      <Card title="Dropped Text (Truncated)" content={droppedText} color="bg-rose-500" />
    </div>
  );
};

export default ContextComparison;
