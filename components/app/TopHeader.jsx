"use client";

import { useSelector } from "react-redux";
import { Search, Bell, Database, Layers } from "lucide-react";

export default function TopHeader() {
  const { activeRole } = useSelector((state) => state.auth);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md px-6 flex items-center justify-between shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>Enterprise Platform</span>
          <span>/</span>
          <span className="text-white">Workspace</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Real-time sync badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Context: {activeRole}</span>
        </div>

        <button 
          title="Notifications"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
