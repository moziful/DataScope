"use client";

import Link from "next/link";
import { 
  Database, 
  Search, 
  Zap, 
  ShieldCheck, 
  SlidersHorizontal, 
  BarChart3, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  Sparkles,
  Server,
  Layers
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-slate-950">
      {/* Background Glows & Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs sm:text-sm font-medium shadow-inner shadow-cyan-500/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next-Gen Enterprise Data Discovery & Intelligence</span>
          </div>
        </div>

        {/* Hero Title & Subtext */}
        <div className="mt-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Discover, Explore & Analyze{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Business Data
            </span>{" "}
            at Enterprise Scale.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Centralized data discovery platform designed to help organizations explore large datasets, perform advanced searches, apply compound filters, and manage structured business intelligence.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all duration-200"
            >
              <span>Launch DataScope Platform</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#explorer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all duration-200 backdrop-blur-sm"
            >
              <Database className="w-5 h-5 text-cyan-400" />
              <span>Explore Data</span>
            </a>
          </div>
        </div>

        {/* Live UI Mockup / Explorer Preview Window */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-2 sm:p-4 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
            {/* Window title bar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  DataScope v1.0 — Enterprise Explorer [100,000 records live]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  RTK Cache: Active
                </span>
              </div>
            </div>

            {/* Filter Bar Simulation */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    readOnly
                    value="category = 'Enterprise' AND revenue > 10000 AND status = 'Active'"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-slate-200 font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-lg bg-slate-800/80 text-slate-300 font-medium flex items-center gap-1.5 border border-slate-700/60">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  4 Active Filters
                </span>
                <span className="px-3 py-2 rounded-lg bg-cyan-600/20 text-cyan-300 font-medium border border-cyan-500/40">
                  Match: 12,480 Records
                </span>
              </div>
            </div>

            {/* Realistic Table Snapshot */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800/80">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400 uppercase font-semibold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Record ID</th>
                    <th className="py-3 px-4">Entity Name</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Revenue</th>
                    <th className="py-3 px-4">Latency</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-4 text-cyan-400">#REC-98241</td>
                    <td className="py-2.5 px-4 font-sans font-medium text-white">Quantum Dynamics Ltd</td>
                    <td className="py-2.5 px-4 text-slate-300">Financial SaaS</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">Active</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-200">$48,200.00</td>
                    <td className="py-2.5 px-4 text-emerald-400">18ms (GIN Index)</td>
                    <td className="py-2.5 px-4 text-right font-sans">
                      <button className="text-cyan-400 hover:underline">Inspect</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-4 text-cyan-400">#REC-98242</td>
                    <td className="py-2.5 px-4 font-sans font-medium text-white">CyberShield Systems</td>
                    <td className="py-2.5 px-4 text-slate-300">Cybersecurity</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">Active</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-200">$124,500.00</td>
                    <td className="py-2.5 px-4 text-emerald-400">22ms (B-Tree)</td>
                    <td className="py-2.5 px-4 text-right font-sans">
                      <button className="text-cyan-400 hover:underline">Inspect</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-4 text-cyan-400">#REC-98243</td>
                    <td className="py-2.5 px-4 font-sans font-medium text-white">Helios Logistics Global</td>
                    <td className="py-2.5 px-4 text-slate-300">Supply Chain</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-400">Pending Review</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-200">$89,140.00</td>
                    <td className="py-2.5 px-4 text-emerald-400">19ms (GIN Index)</td>
                    <td className="py-2.5 px-4 text-right font-sans">
                      <button className="text-cyan-400 hover:underline">Inspect</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination & Status Footer */}
            <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>Showing 1-25 of 12,480 matching records (Total dataset: 100,000)</span>
              </div>
              <div className="font-mono text-[11px] text-cyan-400">
                Server query executed in 24ms
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
