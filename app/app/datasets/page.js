"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetDatasetsQuery } from "@/store/services/dataScopeApi";
import { 
  FolderKanban, 
  Plus, 
  Database, 
  ShieldCheck, 
  Calendar, 
  Server, 
  ArrowRight, 
  Lock, 
  CheckCircle2,
  X,
  Search
} from "lucide-react";

export default function DatasetLibraryPage() {
  const router = useRouter();
  const { activeRole } = useSelector((state) => state.auth);
  const { data, isLoading, refetch } = useGetDatasetsQuery();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDataset, setNewDataset] = useState({
    name: "",
    description: "",
    category: "Financial Services",
    dataSource: "PostgreSQL Partition",
    totalRecords: "25000",
  });

  const datasets = data?.data || [];

  const filteredDatasets = datasets.filter((ds) => {
    return (
      ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/datasets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDataset),
      });
      if (res.ok) {
        setCreateModalOpen(false);
        setNewDataset({
          name: "",
          description: "",
          category: "Financial Services",
          dataSource: "PostgreSQL Partition",
          totalRecords: "25000",
        });
        refetch();
        alert("Dataset collection created successfully!");
      }
    } catch (err) {
      alert("Failed to create dataset.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-cyan-400" />
            Dataset Management & Collections
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse, partition, and configure access permissions across enterprise dataset collections.
          </p>
        </div>

        {activeRole === "Administrator" ? (
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Dataset</span>
          </button>
        ) : (
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>Dataset creation restricted to Administrator</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter datasets by name, category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Dataset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading ? (
          <div className="col-span-full py-16 text-center text-xs text-slate-500">
            Loading dataset library...
          </div>
        ) : filteredDatasets.length > 0 ? (
          filteredDatasets.map((ds) => {
            const hasAccess = ds.accessPermissions.includes(activeRole);
            return (
              <div
                key={ds.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  hasAccess
                    ? "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                    : "border-slate-850 bg-slate-950/60 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                        <Database className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-mono text-slate-400">{ds.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {ds.category}
                      </span>
                      {hasAccess ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Authorized" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-rose-400" title="Access Restricted" />
                      )}
                    </div>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white">
                    {ds.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {ds.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Total Records</span>
                      <span className="font-mono font-bold text-white text-sm">
                        {ds.totalRecords.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Data Source</span>
                      <span className="text-slate-300 truncate block text-xs">
                        {ds.dataSource}
                      </span>
                    </div>
                  </div>

                  {/* Access Permissions Pill */}
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Authorized Roles:</span>
                    <div className="flex flex-wrap gap-1">
                      {ds.accessPermissions.map((role) => (
                        <span
                          key={role}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Updated: {ds.lastUpdatedDate}
                  </span>

                  {hasAccess ? (
                    <button
                      onClick={() => router.push("/app/explorer")}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Records</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs text-rose-400 flex items-center gap-1 font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      Restricted to {ds.accessPermissions.join(", ")}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center text-xs text-slate-500">
            No datasets match your search query.
          </div>
        )}
      </div>

      {/* Create Dataset Modal (Administrator only) */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleCreateSubmit}
            className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-cyan-400" />
                Register New Enterprise Dataset
              </h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Dataset Name</label>
              <input
                type="text"
                required
                placeholder="e.g. APAC Supply Chain Shard"
                value={newDataset.name}
                onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                required
                placeholder="Business domain purpose and partition details..."
                value={newDataset.description}
                onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newDataset.category}
                  onChange={(e) => setNewDataset({ ...newDataset, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Financial Services">Financial Services</option>
                  <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                  <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
                  <option value="Security & Compliance">Security & Compliance</option>
                  <option value="SaaS & Cloud Infra">SaaS & Cloud Infra</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Total Records</label>
                <input
                  type="number"
                  value={newDataset.totalRecords}
                  onChange={(e) => setNewDataset({ ...newDataset, totalRecords: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Register Dataset
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
