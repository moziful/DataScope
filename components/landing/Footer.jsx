"use client";

import Link from "next/link";
import { Database, Github, ShieldCheck, Cpu, ArrowUp, Layers } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Database className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                DataScope
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enterprise Data Discovery & Intelligence Platform designed to explore, search, and analyze millions of records with sub-50ms latency.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              100k Benchmark Certified
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Core Modules</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">PostgreSQL Search Architecture</a></li>
              <li><a href="#explorer" className="hover:text-cyan-400 transition-colors">Interactive Data Explorer</a></li>
              <li><a href="#analytics" className="hover:text-cyan-400 transition-colors">Aggregation Analytics</a></li>
              <li><a href="#docs" className="hover:text-cyan-400 transition-colors">8 Technical Decisions (ADR)</a></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Technology Stack</h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>Next.js 16 (App Router)</li>
              <li>Redux Toolkit & RTK Query</li>
              <li>PostgreSQL (tsvector & pg_trgm)</li>
              <li>Drizzle ORM</li>
              <li>Tailwind CSS & Lucide Icons</li>
            </ul>
          </div>

          {/* Security & Access */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Security & Compliance</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Multi-Tenant RBAC Enforced
              </li>
              <li>Dataset-Level Permissions</li>
              <li>Zero Client Data Memory Leak</li>
              <li>Streaming CSV Export Engine</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px]">
            &copy; 2026 DataScope Platform. Enterprise Data Discovery Assessment.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
