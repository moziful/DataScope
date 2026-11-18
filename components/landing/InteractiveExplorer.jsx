"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Download, 
  Eye, 
  Save, 
  Share2, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Layers,
  Database
} from "lucide-react";

// Mock dynamic sample records representing enterprise transactions
const mockRecords = [
  { id: "REC-10492", company: "Apex Financial Core", category: "Fintech", status: "Active", country: "Germany", revenue: 145000, latency: "14ms", date: "2026-11-14" },
  { id: "REC-10493", company: "BioHealth Diagnostics", category: "Healthcare", status: "Active", country: "Germany", revenue: 88400, latency: "18ms", date: "2026-11-12" },
  { id: "REC-10494", company: "Vanguard Cloud Logistics", category: "Supply Chain", status: "Pending", country: "United States", revenue: 231000, latency: "21ms", date: "2026-11-10" },
  { id: "REC-10495", company: "Nova Robotics AI", category: "Artificial Intelligence", status: "Active", country: "Japan", revenue: 512000, latency: "16ms", date: "2026-11-09" },
  { id: "REC-10496", company: "Nordic Green Energy", category: "Clean Energy", status: "Archived", country: "Sweden", revenue: 64200, latency: "25ms", date: "2026-11-04" },
  { id: "REC-10497", company: "Starlight Telecommunications", category: "Telecom", status: "Active", country: "Germany", revenue: 320000, latency: "19ms", date: "2026-11-02" },
  { id: "REC-10498", company: "Prism Cyber Security", category: "Cybersecurity", status: "Active", country: "Germany", revenue: 195000, latency: "12ms", date: "2026-10-28" },
  { id: "REC-10499", company: "Omni Logistics International", category: "Supply Chain", status: "Under Review", country: "Singapore", revenue: 94800, latency: "22ms", date: "2026-10-25" },
];

export default function InteractiveExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [minRevenue, setMinRevenue] = useState("");
  const [sortField, setSortField] = useState("revenue");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [inspectRecord, setInspectRecord] = useState(null);

  // Client-simulated filtering of live preview data
  const filteredRecords = mockRecords.filter((record) => {
    const matchesSearch =
      searchTerm === "" ||
      record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "All" || record.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || record.status === selectedStatus;
    const matchesCountry = selectedCountry === "All" || record.country === selectedCountry;
    const matchesRevenue = minRevenue === "" || record.revenue >= Number(minRevenue);

    return matchesSearch && matchesCategory && matchesStatus && matchesCountry && matchesRevenue;
  }).sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredRecords.map((r) => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rId) => rId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <section id="explorer" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>Interactive Data Explorer</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test Real-Time Compound Querying
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Experience the fast search filtering architecture. Try searching, filtering by country or revenue, 
              sorting columns, and inspecting complete entity detail records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Sample View (100k Benchmark Dataset)
            </span>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSelectedCountry("All");
                setMinRevenue("");
                setSelectedRows([]);
              }}
              className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Global Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by company name, ID (#REC)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
              />
            </div>

            {/* Country Selector */}
            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/80 transition-colors"
              >
                <option value="All">All Countries</option>
                <option value="Germany">Germany</option>
                <option value="United States">United States</option>
                <option value="Japan">Japan</option>
                <option value="Sweden">Sweden</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/80 transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Minimum Revenue Threshold */}
            <div>
              <input
                type="number"
                placeholder="Min Revenue ($)"
                value={minRevenue}
                onChange={(e) => setMinRevenue(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
              />
            </div>
          </div>

          {/* Quick Active Conditions Summary & Actions */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-medium">Applied Filter Logic:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Country: {selectedCountry}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Status: {selectedStatus}
              </span>
              {minRevenue && (
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
                  Revenue &ge; ${Number(minRevenue).toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("Search view saved to your profile!")}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                Save View
              </button>
              <button 
                onClick={() => alert("CSV Export stream started. Check downloads.")}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV ({filteredRecords.length})
              </button>
            </div>
          </div>
        </div>

        {/* The Data Table */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredRecords.length && filteredRecords.length > 0}
                      onChange={handleSelectAll}
                      className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                    />
                  </th>
                  <th className="py-3.5 px-4 font-mono cursor-pointer hover:text-white" onClick={() => handleSort("id")}>
                    <div className="flex items-center gap-1.5">
                      <span>Record ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort("company")}>
                    <div className="flex items-center gap-1.5">
                      <span>Entity / Company</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 cursor-pointer hover:text-white" onClick={() => handleSort("revenue")}>
                    <div className="flex items-center gap-1.5">
                      <span>Annual Revenue</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Latency</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => {
                    const isSelected = selectedRows.includes(record.id);
                    return (
                      <tr
                        key={record.id}
                        className={`hover:bg-slate-800/40 transition-colors ${
                          isSelected ? "bg-cyan-950/20" : ""
                        }`}
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(record.id)}
                            className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                          />
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-cyan-400">
                          {record.id}
                        </td>
                        <td className="py-3 px-4 font-medium text-white">
                          {record.company}
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {record.category}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {record.country}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                              record.status === "Active"
                                ? "bg-emerald-950/60 border-emerald-800 text-emerald-400"
                                : record.status === "Pending"
                                ? "bg-amber-950/60 border-amber-800 text-amber-400"
                                : record.status === "Under Review"
                                ? "bg-sky-950/60 border-sky-800 text-sky-400"
                                : "bg-slate-800 border-slate-700 text-slate-400"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-200">
                          ${record.revenue.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-emerald-400">
                          {record.latency}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setInspectRecord(record)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500">
                      No records match the active compound filter conditions.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination Controls */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>Showing 1 to {filteredRecords.length} of {filteredRecords.length} entries</span>
              {selectedRows.length > 0 && (
                <span className="font-semibold text-cyan-400">
                  ({selectedRows.length} rows selected)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-500">
                PostgreSQL Index: B-TREE (id, revenue)
              </span>
              <div className="flex items-center gap-1">
                <button disabled className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-xs">
                  1
                </span>
                <button disabled className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Record Detail Modal / Drawer Inspector */}
        {inspectRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-cyan-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Record Detail Inspection</h3>
                    <p className="text-xs font-mono text-cyan-400">{inspectRecord.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setInspectRecord(null)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs font-medium"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Entity Name</span>
                  <span className="text-sm font-semibold text-white">{inspectRecord.company}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Business Domain</span>
                  <span className="text-sm font-semibold text-cyan-300">{inspectRecord.category}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Jurisdiction / Country</span>
                  <span className="text-sm font-semibold text-slate-200">{inspectRecord.country}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Annual Revenue</span>
                  <span className="text-sm font-semibold font-mono text-emerald-400">${inspectRecord.revenue.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Current Lifecycle Status</span>
                  <span className="text-sm font-semibold text-amber-300">{inspectRecord.status}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Audit Index Latency</span>
                  <span className="text-sm font-semibold font-mono text-cyan-400">{inspectRecord.latency}</span>
                </div>
              </div>

              {/* Simulated Historical Changes & Relationship */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Audit History & Relationships</h4>
                <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
                  <p>• [2026-11-14 09:12] Revenue updated from $120k to ${inspectRecord.revenue.toLocaleString()} by Admin.</p>
                  <p>• [2026-10-01 14:33] Associated with parent cluster entity #CLUSTER-DE-04.</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setInspectRecord(null)}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
