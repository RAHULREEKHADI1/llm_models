import React from "react";

interface Props {
  tokenCount: number;
  maxTokens: number;
}

const TokenMeter: React.FC<Props> = ({ tokenCount, maxTokens }) => {
  const percent = Math.min((tokenCount / maxTokens) * 100, 100);
  return (
    <div className="mb-4">
      <div className="bg-gray-300 w-full h-4 rounded">
        <div className="bg-blue-600 h-4 rounded" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-sm mt-1">{tokenCount}/{maxTokens} tokens</p>
    </div>
  );
};

export default TokenMeter;
