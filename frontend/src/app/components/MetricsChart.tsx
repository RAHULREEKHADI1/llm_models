"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Tooltip, 
  Legend,
  ChartOptions
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  metrics: { name: string; value: number }[];
}

const MetricsChart: React.FC<Props> = ({ metrics }) => {
  const data = {
    labels: metrics.map((m) => m.name.toUpperCase()),
    datasets: [
      {
        label: "Score",
        data: metrics.map((m) => m.value),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 8,
        hoverBackgroundColor: "rgba(129, 140, 248, 1)",
        barThickness: 40 as const, // Fixed type for bar thickness
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#94a3b8",
        bodyColor: "#f8fafc",
        borderColor: "rgba(99, 102, 241, 0.2)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        max: 1, 
        grid: { color: "rgba(30, 41, 59, 0.5)" },
        ticks: { color: "#64748b" }
      },
      x: { 
        grid: { display: false },
        ticks: { color: "#94a3b8" }
      },
    },
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl transition-all duration-500 hover:border-indigo-500/30">
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Performance Distribution</h3>
      <div className="h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MetricsChart;