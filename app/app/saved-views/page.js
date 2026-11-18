"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { 
  useGetSavedViewsQuery, 
  useDeleteSavedViewMutation 
} from "@/store/services/dataScopeApi";
import { applySavedConfiguration } from "@/store/slices/searchConfigSlice";
import { 
  BookmarkCheck, 
  Trash2, 
  Play, 
  Share2, 
  Plus, 
  Database, 
  Clock, 
  User, 
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";

export default function SavedViewsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { activeRole } = useSelector((state) => state.auth);

  const { data, isLoading, isFetching } = useGetSavedViewsQuery();
  const [deleteSavedView] = useDeleteSavedViewMutation();

  const savedViews = data?.data || [];

  const handleApplyView = (view) => {
    dispatch(
      applySavedConfiguration({
        search: view.search,
        category: view.category,
        country: view.country,
        status: view.status,
        minRevenue: view.minRevenue,
        sortBy: view.sortBy,
        sortDir: view.sortDir,
        page: 1,
      })
    );
    router.push("/app/explorer");
  };

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteSavedView(id);
    }
  };

  const handleShare = (view) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/app/explorer?category=${encodeURIComponent(view.category)}&country=${encodeURIComponent(view.country)}&status=${encodeURIComponent(view.status)}&minRevenue=${view.minRevenue}`
    );
    alert("Shareable URL copied to clipboard! Authorized team members can open this filtered state directly.");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-indigo-400" />
            Saved Views & Filter Configurations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store, reuse, and share frequently executed compound queries with your team.
          </p>
        </div>

        <button
          onClick={() => router.push("/app/explorer")}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New View in Explorer</span>
        </button>
      </div>

      {/* Saved Views List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-full py-16 text-center text-xs text-slate-500">
            Loading saved views...
          </div>
        ) : savedViews.length > 0 ? (
          savedViews.map((view) => (
            <div
              key={view.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-800 text-indigo-400">
                      <SlidersHorizontal className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{view.id}</span>
                  </div>

                  {view.shared && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
                      Shared
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-3 text-base font-bold text-white">
                  {view.title}
                </h3>

                {/* Conditions Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
                    Country: {view.country}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
                    Status: {view.status}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
                    Category: {view.category}
                  </span>
                  {view.minRevenue && (
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[11px] text-cyan-300 font-mono">
                      Min: ${Number(view.minRevenue).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Creator & Timestamp */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Created by: {view.creator}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{new Date(view.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleApplyView(view)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Launch View</span>
                </button>

                <button
                  onClick={() => handleShare(view)}
                  title="Share View Link"
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                {activeRole === "Administrator" && (
                  <button
                    onClick={() => handleDelete(view.id, view.title)}
                    title="Delete View"
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-xs text-slate-500">
            No saved views yet. Save any filtered query directly from the Data Explorer.
          </div>
        )}
      </div>

    </div>
  );
}
