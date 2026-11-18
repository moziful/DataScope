"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setRole } from "@/store/slices/authSlice";
import { 
  Database, 
  Search, 
  BarChart3, 
  BookmarkCheck, 
  History, 
  Settings, 
  ShieldCheck, 
  Layers, 
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  FolderKanban
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { activeRole, user, availableRoles } = useSelector((state) => state.auth);

  const navItems = [
    { name: "Overview Dashboard", href: "/app", icon: Layers, roles: ["Administrator", "Data Analyst", "Viewer"] },
    { name: "Dataset Library", href: "/app/datasets", icon: FolderKanban, roles: ["Administrator", "Data Analyst"] },
    { name: "Data Explorer", href: "/app/explorer", icon: Database, roles: ["Administrator", "Data Analyst", "Viewer"] },
    { name: "Advanced Search", href: "/app/search", icon: Search, roles: ["Administrator", "Data Analyst"] },
    { name: "Saved Views", href: "/app/saved-views", icon: BookmarkCheck, roles: ["Administrator", "Data Analyst", "Viewer"] },
    { name: "Search History", href: "/app/history", icon: History, roles: ["Administrator", "Data Analyst"] },
    { name: "Analytics & Trends", href: "/app/analytics", icon: BarChart3, roles: ["Administrator", "Data Analyst"] },
    { name: "System Settings", href: "/app/settings", icon: Settings, roles: ["Administrator"] },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/app" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-bold text-base text-white tracking-tight">
              DataScope
            </span>
          </Link>
        </div>

        {/* Role Switcher Pill */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/30">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Active RBAC Role
            </span>
          </div>
          <select
            value={activeRole}
            onChange={(e) => dispatch(setRole(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const hasAccess = item.roles.includes(activeRole);
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (!hasAccess) {
              return (
                <div
                  key={item.name}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-slate-600 flex items-center justify-between cursor-not-allowed"
                  title="Restricted by RBAC access"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-700" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1 rounded bg-slate-900 text-slate-600">
                    Locked
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Session Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-700 text-cyan-300 font-semibold text-xs flex items-center justify-center">
              {user.avatar}
            </div>
            <div>
              <div className="text-xs font-medium text-white leading-tight">{user.name}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{activeRole}</div>
            </div>
          </div>
          <Link
            href="/"
            title="Exit to Landing"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
