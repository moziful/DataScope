"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { 
  Database, 
  Search, 
  BarChart3, 
  BookmarkCheck, 
  ShieldCheck, 
  FolderKanban, 
  ArrowRight,
  TrendingUp,
  Clock,
  Layers
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { activeRole, user } = useSelector((state) => state.auth);

  const quickStats = [
    { label: "Active Datasets", value: "8 Collections", icon: FolderKanban, detail: "All enterprise partitions online" },
    { label: "Records Indexed", value: "100,000+", icon: Database, detail: "Sub-50ms full-text indexed" },
    { label: "Saved Query Views", value: "14 Views", icon: BookmarkCheck, detail: "Shared across team analysts" },
    { label: "System Health", value: "99.98%", icon: ShieldCheck, detail: "PostgreSQL connection pool healthy" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Role: {activeRole}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              DataScope Enterprise Intelligence Console. You have full access to search, filter, and inspect datasets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app/explorer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 shadow-md shadow-cyan-500/20 transition-all"
            >
              <Database className="w-4 h-4" />
              <span>Open Data Explorer</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{stat.label}</span>
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{stat.value}</div>
              <p className="mt-1 text-xs text-slate-400">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Main Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Modules Navigator */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Quick Workspace Navigation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/app/explorer"
              className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center justify-between">
                <Database className="w-5 h-5 text-cyan-400" />
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Data Explorer & Table
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Browse, sort, paginate, and inspect records with multi-column filtering.
              </p>
            </Link>

            <Link
              href="/app/search"
              className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center justify-between">
                <Search className="w-5 h-5 text-sky-400" />
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                Compound Query Builder
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Build nested condition groups with range filters and status matches.
              </p>
            </Link>

            <Link
              href="/app/saved-views"
              className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center justify-between">
                <BookmarkCheck className="w-5 h-5 text-indigo-400" />
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                Saved Views & Filters
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Access your bookmarked filter setups and share views with authorized teammates.
              </p>
            </Link>

            <Link
              href="/app/analytics"
              className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center justify-between">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                Dataset Analytics
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Inspect live category breakdowns and query execution benchmarks.
              </p>
            </Link>
          </div>
        </div>

        {/* Security & Role Capabilities summary */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Role Authorization
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Current role: <span className="font-semibold text-white">{activeRole}</span>
            </p>

            <div className="mt-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>View & Browse Datasets:</span>
                <span className="text-emerald-400 font-semibold">Granted</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>Export Streaming CSV:</span>
                <span className={activeRole !== "Viewer" ? "text-emerald-400 font-semibold" : "text-slate-500 font-semibold"}>
                  {activeRole !== "Viewer" ? "Granted" : "Restricted"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>Manage Permissions:</span>
                <span className={activeRole === "Administrator" ? "text-emerald-400 font-semibold" : "text-slate-500 font-semibold"}>
                  {activeRole === "Administrator" ? "Granted" : "Restricted"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            Switch your role at any time in the sidebar to test permissions.
          </div>
        </div>

      </div>
    </div>
  );
}
