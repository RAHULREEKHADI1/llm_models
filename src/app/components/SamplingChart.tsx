"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  data: number[];
  labels: string[];
  topK: number;
}

export default function SamplingChart({ data, labels, topK }: Props) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Probability",
        data: data,
        backgroundColor: data.map((_, i) =>
          i < topK ? "rgba(99, 102, 241, 0.8)" : "rgba(51, 65, 85, 0.5)"
        ),
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: data.map((_, i) => (i < topK ? 1 : 0)),
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#94a3b8",
        bodyColor: "#f8fafc",
        displayColors: false,
      },
    },
    scales: {
      y: { display: false, grid: { display: false } },
      x: { 
        ticks: { color: "#64748b", font: { size: 9 } },
        grid: { display: false } 
      },
    },
  };

  return (
    <div className="h-24 w-full mt-6 pt-4 border-t border-slate-800">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
        Token Probability Distribution
      </p>
      <div className="h-16">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}