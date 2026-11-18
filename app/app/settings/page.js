"use client";

import { useSelector, useDispatch } from "react-redux";
import { setRole } from "@/store/slices/authSlice";
import { 
  Settings, 
  ShieldCheck, 
  User, 
  Database, 
  SlidersHorizontal, 
  Lock, 
  CheckCircle2,
  Server
} from "lucide-react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { activeRole, user, availableRoles } = useSelector((state) => state.auth);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          System Settings & Access Controls
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure RBAC roles, database query thresholds, and platform defaults.
        </p>
      </div>

      {/* Role Management Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Role-Based Access Control (RBAC) Switcher
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate enterprise privileges and verify page route guards.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-medium">
            Active: {activeRole}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {availableRoles.map((role) => (
            <button
              key={role}
              onClick={() => dispatch(setRole(role))}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeRole === role
                  ? "border-cyan-500 bg-cyan-950/30 text-white shadow-md shadow-cyan-500/10"
                  : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xs">{role}</span>
                {activeRole === role && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {role === "Administrator" && "Full management of datasets, system configs, analytics, and all views."}
                {role === "Data Analyst" && "Dataset exploration, compound search, view creation, and streaming exports."}
                {role === "Viewer" && "Read-only dataset browsing and basic search without export permissions."}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Performance & Query Thresholds */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          Data Fetching & Cache Controls
        </h2>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-semibold text-slate-200 block">Search Keystroke Debounce</span>
              <span className="text-slate-500 text-[11px]">Prevents rapid firing of expensive PostgreSQL full-text queries</span>
            </div>
            <span className="font-mono text-cyan-400 font-bold">350 ms</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-semibold text-slate-200 block">RTK Query Cache Retention (keepUnusedDataFor)</span>
              <span className="text-slate-500 text-[11px]">Duration cached search pages remain in memory before garbage collection</span>
            </div>
            <span className="font-mono text-cyan-400 font-bold">300 seconds</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-semibold text-slate-200 block">Max Page Size Limit</span>
              <span className="text-slate-500 text-[11px]">Hard boundary preventing client DOM node bloating</span>
            </div>
            <span className="font-mono text-cyan-400 font-bold">100 records/page</span>
          </div>
        </div>
      </div>

    </div>
  );
}
