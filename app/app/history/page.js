"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { applySavedConfiguration } from "@/store/slices/searchConfigSlice";
import { 
  History, 
  Search, 
  Play, 
  Clock, 
  Trash2, 
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  Calendar
} from "lucide-react";

export default function SearchHistoryPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Realistic mock history items tracked across analyst sessions
  const [historyItems, setHistoryItems] = useState([
    {
      id: "hist-01",
      queryText: "category = 'Fintech & Banking' AND country = 'Germany' AND revenue > $50,000",
      search: "",
      category: "Fintech & Banking",
      country: "Germany",
      status: "Active",
      minRevenue: "50000",
      matchedCount: 3420,
      timestamp: "Today, 11:42 AM",
    },
    {
      id: "hist-02",
      queryText: "search = 'Quantum' AND status = 'Active'",
      search: "Quantum",
      category: "All",
      country: "All",
      status: "Active",
      minRevenue: "",
      matchedCount: 840,
      timestamp: "Today, 10:15 AM",
    },
    {
      id: "hist-03",
      queryText: "country = 'United States' AND minRevenue > $100,000",
      search: "",
      category: "All",
      country: "United States",
      status: "All",
      minRevenue: "100000",
      matchedCount: 12400,
      timestamp: "Yesterday, 04:30 PM",
    },
    {
      id: "hist-04",
      queryText: "category = 'Cybersecurity & Defense' AND status = 'Under Review'",
      search: "",
      category: "Cybersecurity & Defense",
      country: "All",
      status: "Under Review",
      minRevenue: "",
      matchedCount: 1950,
      timestamp: "Yesterday, 02:18 PM",
    },
    {
      id: "hist-05",
      queryText: "search = 'BioHealth' (Fuzzy Trigram Match)",
      search: "BioHealth",
      category: "All",
      country: "All",
      status: "All",
      minRevenue: "",
      matchedCount: 120,
      timestamp: "Nov 15, 2026",
    },
  ]);

  const handleRerun = (item) => {
    dispatch(
      applySavedConfiguration({
        search: item.search,
        category: item.category,
        country: item.country,
        status: item.status,
        minRevenue: item.minRevenue,
        page: 1,
      })
    );
    router.push("/app/explorer");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all search history?")) {
      setHistoryItems([]);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            Search History & Executed Queries
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit log of previously executed compound queries and search operations.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden">
        {historyItems.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-slate-800 text-cyan-400">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-mono text-xs font-medium text-white">
                      {item.queryText}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {item.timestamp}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.matchedCount.toLocaleString()} matching records
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRerun(item)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Re-Run Query</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-slate-500">
            Search history is empty. Executed queries will appear here automatically.
          </div>
        )}
      </div>

    </div>
  );
}
