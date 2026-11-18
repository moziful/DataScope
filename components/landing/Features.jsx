"use client";

import { 
  Database, 
  Search, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Share2, 
  SlidersHorizontal, 
  Zap, 
  BarChart2, 
  FileSpreadsheet, 
  Workflow, 
  ArrowRight 
} from "lucide-react";

export default function Features() {
  const pillars = [
    {
      icon: Search,
      title: "Sub-50ms Full-Text & Trigram Search",
      tag: "PostgreSQL GIN / GiST",
      description:
        "High-performance compound queries across millions of rows with PostgreSQL tsvector indexing and trigram matching, delivering instantaneous fuzzy and partial results without external overhead.",
      metric: "18ms avg query time",
      accent: "cyan"
    },
    {
      icon: Cpu,
      title: "RTK Query State & Deduplication",
      tag: "Zero Redundant Calls",
      description:
        "Normalized Redux Toolkit caching architecture prevents duplicate API requests, keeps client memory lean, and revalidates in the background seamlessly with optimistic cache updates.",
      metric: "94% cache hit rate",
      accent: "sky"
    },
    {
      icon: SlidersHorizontal,
      title: "Dynamic Compound Query Builder",
      tag: "Multi-Field Logic",
      description:
        "Construct complex nested queries across text, numeric ranges, date windows, and enum statuses. All parameters are synchronized bi-directionally with the URL for shareable state.",
      metric: "Unlimited nesting",
      accent: "indigo"
    },
    {
      icon: Database,
      title: "Virtualized Large-Scale Table",
      tag: "TanStack Virtualized",
      description:
        "Render 100,000+ records smoothly at 60 FPS using dynamic windowing, column resizing, multi-column sorting, and column visibility toggles without browser memory leaks.",
      metric: "60 FPS scroll",
      accent: "emerald"
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Role-Based Access (RBAC)",
      tag: "Administrator · Analyst · Viewer",
      description:
        "Granular security enforcing dataset-level permissions, audit logs, and row-level access controls so analysts and viewers only access authorized business collections.",
      metric: "Strict dataset guardrails",
      accent: "purple"
    },
    {
      icon: FileSpreadsheet,
      title: "Streaming Background CSV Exports",
      tag: "Memory-Safe Workers",
      description:
        "Stream large filtered datasets directly to CSV via server streams without overloading frontend memory, supporting background download notifications for large batch jobs.",
      metric: "100k rows in < 2s",
      accent: "amber"
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Capabilities</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Massive Scale & Real-Time Intelligence
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Every layer of DataScope is purpose-built to solve the real bottlenecks of enterprise big data: 
            query latency, state explosion, and frontend render degradation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 hover:bg-slate-900/80 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-950/30"
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Footer Metric */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{feature.metric}</span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-slate-300 flex items-center gap-1 transition-colors">
                    Details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Architecture Comparison Callout */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs uppercase font-semibold text-cyan-400 tracking-wider">
                Technical Benchmark
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                PostgreSQL vs Traditional Client-Side Processing
              </h3>
              <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                Rather than overloading client browser memory with 100,000+ objects, DataScope utilizes
                PostgreSQL composite indexes and server-side cursor pagination. Queries return in under
                30ms while client RAM stays under 45MB.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Client Memory Footprint:</span>
                <span className="text-xs font-mono font-bold text-emerald-400">42 MB (Fixed)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Indexed Lookup (100k rows):</span>
                <span className="text-xs font-mono font-bold text-cyan-400">&lt; 24 ms</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Data Synchronization:</span>
                <span className="text-xs font-mono font-bold text-indigo-400">RTK Invalidation</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
