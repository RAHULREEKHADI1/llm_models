"use client";
import Link from "next/link";

export default function Home() {
  const modules = [
    { id: 1, title: "LLM Architecture Explorer" },
    { id: 2, title: "Decoder-Only vs Encoder-Decoder" },
    { id: 3, title: "Context Window & Long-Context" },
    { id: 4, title: "Sampling Parameters Lab" },
    { id: 5, title: "RLHF Simulation" },
    { id: 6, title: "LLM Evaluation Metrics" },
    { id: 7, title: "Open-Source vs Closed-Source" },
    { id: 8, title: "Fine-Tuning & LoRA" },
  ];

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-indigo-500/30">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <header className="max-w-6xl mx-auto mb-16 relative">
        <h1 className="text-5xl font-black text-white tracking-tighter mb-4 bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-500">
          LLM Lab Dashboard
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
          Explore the mechanics of Large Language Models through interactive research modules.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((m) => (
            <Link 
              key={m.id} 
              href={`/modules/module${m.id}`}
              className="group relative block p-8 bg-slate-900/50 border border-slate-800 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:bg-slate-800/80 hover:border-indigo-500/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_20px_-5px_rgba(79,70,229,0.4)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-950 text-indigo-400 font-bold border border-slate-800 group-hover:border-indigo-500/50 group-hover:text-indigo-300 transition-all duration-500 shadow-inner">
                  {String(m.id).padStart(2, '0')}
                </div>
                <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors leading-tight mb-4">
                {m.title}
              </h2>
              
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-slate-800 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-300">
                  Enter Lab
                </span>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}