"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  useGetRecordsQuery,
  useGetRecordByIdQuery,
  useCreateSavedViewMutation 
} from "@/store/services/dataScopeApi";
import { 
  setSearch, 
  setCategory, 
  setCountry, 
  setStatus, 
  setMinRevenue, 
  setSorting, 
  setPage, 
  setLimit,
  toggleColumn,
  toggleSelectRow,
  selectAllRows,
  clearSelection,
  resetFilters 
} from "@/store/slices/searchConfigSlice";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Eye, 
  Save, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Columns, 
  Clock, 
  SlidersHorizontal,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  X,
  Sparkles
} from "lucide-react";

export default function DataExplorerPage() {
  const dispatch = useDispatch();
  const searchConfig = useSelector((state) => state.searchConfig);
  const { activeRole } = useSelector((state) => state.auth);

  // Local state for debounced search input
  const [localSearch, setLocalSearch] = useState(searchConfig.search);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [inspectRecordId, setInspectRecordId] = useState(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [viewTitle, setViewTitle] = useState("");

  const [createSavedView] = useCreateSavedViewMutation();

  // Debounce search input by 350ms to prevent expensive query storms
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearch(localSearch));
    }, 350);
    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  // RTK Query hook fetching real paginated data from the server
  const { data, isLoading, isFetching, error, refetch } = useGetRecordsQuery({
    search: searchConfig.search,
    category: searchConfig.category,
    country: searchConfig.country,
    status: searchConfig.status,
    minRevenue: searchConfig.minRevenue,
    page: searchConfig.page,
    limit: searchConfig.limit,
    sortBy: searchConfig.sortBy,
    sortDir: searchConfig.sortDir,
  });

  // Query for single record details when inspecting
  const { data: recordDetailData, isFetching: isFetchingDetail } = useGetRecordByIdQuery(
    inspectRecordId,
    { skip: !inspectRecordId }
  );

  const records = data?.data || [];
  const pagination = data?.pagination || { total: 0, totalPages: 1, page: 1, limit: 25 };
  const executionTimeMs = data?.meta?.executionTimeMs ?? 0;

  // Sorting handler
  const handleSort = (field) => {
    const isCurrent = searchConfig.sortBy === field;
    const nextDir = isCurrent && searchConfig.sortDir === "asc" ? "desc" : "asc";
    dispatch(setSorting({ sortBy: field, sortDir: nextDir }));
  };

  // CSV Export
  const handleExportCSV = () => {
    if (records.length === 0) return;
    const headers = ["ID", "Company", "Category", "Country", "Status", "Revenue", "CreatedDate"];
    const rows = records.map((r) => [
      r.id,
      `"${r.company}"`,
      `"${r.category}"`,
      `"${r.country}"`,
      r.status,
      r.revenue,
      r.createdDate,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `DataScope_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Save View
  const handleSaveViewSubmit = async (e) => {
    e.preventDefault();
    if (!viewTitle.trim()) return;

    await createSavedView({
      title: viewTitle,
      search: searchConfig.search,
      category: searchConfig.category,
      country: searchConfig.country,
      status: searchConfig.status,
      minRevenue: searchConfig.minRevenue,
      sortBy: searchConfig.sortBy,
      sortDir: searchConfig.sortDir,
      createdAt: new Date().toISOString(),
    });

    setViewTitle("");
    setSaveModalOpen(false);
    alert("View saved successfully to your Saved Views library!");
  };

  const allColumns = [
    { key: "id", label: "Record ID" },
    { key: "company", label: "Entity / Company" },
    { key: "category", label: "Category" },
    { key: "country", label: "Country" },
    { key: "status", label: "Status" },
    { key: "revenue", label: "Annual Revenue" },
    { key: "createdDate", label: "Created Date" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      
      {/* Top Header & Fast Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Data Explorer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Server-side filtered, sorted, and paginated with RTK Query caching.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{isFetching ? "Querying..." : `${executionTimeMs}ms execution`}</span>
          </div>

          <button
            onClick={() => setSaveModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>Save View</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={activeRole === "Viewer"}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title={activeRole === "Viewer" ? "Viewer role cannot export CSV" : "Export current page as CSV"}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Builder & Search Control Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Global Search Input (Debounced) */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by company, ID, country..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={searchConfig.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500/80 transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="Fintech & Banking">Fintech & Banking</option>
              <option value="Healthcare & Biotech">Healthcare & Biotech</option>
              <option value="Supply Chain & Logistics">Supply Chain & Logistics</option>
              <option value="SaaS & Cloud Infra">SaaS & Cloud Infra</option>
              <option value="Cybersecurity & Defense">Cybersecurity & Defense</option>
              <option value="Clean Energy & Utilities">Clean Energy & Utilities</option>
              <option value="Telecommunications">Telecommunications</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={searchConfig.status}
              onChange={(e) => dispatch(setStatus(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500/80 transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Min Revenue Input */}
          <div>
            <input
              type="number"
              placeholder="Min Revenue ($)"
              value={searchConfig.minRevenue}
              onChange={(e) => dispatch(setMinRevenue(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
          </div>
        </div>

        {/* Sub-bar: Column Toggle, Reset Filters, Active Filter Pills */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400">Total Filtered:</span>
            <span className="font-mono font-bold text-white">
              {pagination.total.toLocaleString()} records
            </span>

            {/* Reset Button */}
            <button
              onClick={() => {
                setLocalSearch("");
                dispatch(resetFilters());
              }}
              className="ml-2 text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Columns Customizer */}
            <div className="relative">
              <button
                onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs transition-colors"
              >
                <Columns className="w-3.5 h-3.5 text-cyan-400" />
                <span>Columns ({searchConfig.visibleColumns.length})</span>
              </button>

              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl z-30 space-y-1">
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Toggle Columns
                  </div>
                  {allColumns.map((col) => (
                    <label
                      key={col.key}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-900 cursor-pointer text-xs text-slate-200"
                    >
                      <input
                        type="checkbox"
                        checked={searchConfig.visibleColumns.includes(col.key)}
                        onChange={() => dispatch(toggleColumn(col.key))}
                        className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>{col.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Page Size Selector */}
            <select
              value={searchConfig.limit}
              onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enterprise Data Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto min-h-[380px] relative">
          
          {/* Subtle loading overlay */}
          {isFetching && (
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono shadow-xl">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Server Query...</span>
              </div>
            </div>
          )}

          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      searchConfig.selectedRecordIds.length === records.length && records.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch(selectAllRows(records.map((r) => r.id)));
                      } else {
                        dispatch(clearSelection());
                      }
                    }}
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                </th>

                {searchConfig.visibleColumns.includes("id") && (
                  <th 
                    className="py-3 px-4 font-mono cursor-pointer hover:text-white"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Record ID</span>
                      {searchConfig.sortBy === "id" ? (
                        searchConfig.sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-600" />
                      )}
                    </div>
                  </th>
                )}

                {searchConfig.visibleColumns.includes("company") && (
                  <th 
                    className="py-3 px-4 cursor-pointer hover:text-white"
                    onClick={() => handleSort("company")}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Entity / Company</span>
                      {searchConfig.sortBy === "company" ? (
                        searchConfig.sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-600" />
                      )}
                    </div>
                  </th>
                )}

                {searchConfig.visibleColumns.includes("category") && (
                  <th className="py-3 px-4">Category</th>
                )}

                {searchConfig.visibleColumns.includes("country") && (
                  <th className="py-3 px-4">Country</th>
                )}

                {searchConfig.visibleColumns.includes("status") && (
                  <th className="py-3 px-4">Status</th>
                )}

                {searchConfig.visibleColumns.includes("revenue") && (
                  <th 
                    className="py-3 px-4 cursor-pointer hover:text-white"
                    onClick={() => handleSort("revenue")}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Annual Revenue</span>
                      {searchConfig.sortBy === "revenue" ? (
                        searchConfig.sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-cyan-400" /> : <ArrowDown className="w-3 h-3 text-cyan-400" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-600" />
                      )}
                    </div>
                  </th>
                )}

                {searchConfig.visibleColumns.includes("createdDate") && (
                  <th className="py-3 px-4">Created Date</th>
                )}

                {searchConfig.visibleColumns.includes("actions") && (
                  <th className="py-3 px-4 text-right">Actions</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
              {records.length > 0 ? (
                records.map((record) => {
                  const isSelected = searchConfig.selectedRecordIds.includes(record.id);
                  return (
                    <tr
                      key={record.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? "bg-cyan-950/20" : ""
                      }`}
                    >
                      <td className="py-2.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => dispatch(toggleSelectRow(record.id))}
                          className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                        />
                      </td>

                      {searchConfig.visibleColumns.includes("id") && (
                        <td className="py-2.5 px-4 font-mono font-medium text-cyan-400">
                          {record.id}
                        </td>
                      )}

                      {searchConfig.visibleColumns.includes("company") && (
                        <td className="py-2.5 px-4 font-medium text-white">
                          {record.company}
                        </td>
                      )}

                      {searchConfig.visibleColumns.includes("category") && (
                        <td className="py-2.5 px-4 text-slate-400">
                          {record.category}
                        </td>
                      )}

                      {searchConfig.visibleColumns.includes("country") && (
                        <td className="py-2.5 px-4 text-slate-300">
                          {record.country}
                        </td>
                      )}

                      {searchConfig.visibleColumns.includes("status") && (
                        <td className="py-2.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
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
                      )}

                      {searchConfig.visibleColumns.includes("revenue") && (
                        <td className="py-2.5 px-4 font-mono font-medium text-slate-200">
                          ${record.revenue.toLocaleString()}
                        </td>
                      )}

                      {searchConfig.visibleColumns.includes("createdDate") && (
                        <td className="py-2.5 px-4 font-mono text-slate-400 text-[11px]">
                          {record.createdDate}
                        </td>
                      )}

                      {searchConfig.visibleColumns.includes("actions") && (
                        <td className="py-2.5 px-4 text-right">
                          <button
                            onClick={() => setInspectRecordId(record.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            Inspect
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-500">
                    No records match the active compound filter conditions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Server Pagination Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Showing {records.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
              {pagination.total.toLocaleString()} entries
            </span>
            {searchConfig.selectedRecordIds.length > 0 && (
              <span className="font-semibold text-cyan-400">
                ({searchConfig.selectedRecordIds.length} rows selected)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">
              Page {pagination.page} of {pagination.totalPages || 1}
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={!pagination.hasPrevPage || isFetching}
                onClick={() => dispatch(setPage(pagination.page - 1))}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                disabled={!pagination.hasNextPage || isFetching}
                onClick={() => dispatch(setPage(pagination.page + 1))}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Record Inspector Drawer / Modal */}
      {inspectRecordId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-cyan-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Record Detail Inspection</h3>
                  <p className="text-xs font-mono text-cyan-400">{inspectRecordId}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectRecordId(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isFetchingDetail ? (
              <div className="py-16 text-center text-xs text-slate-400">
                Loading complete record metadata and change history...
              </div>
            ) : recordDetailData?.data ? (
              <div className="mt-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Entity Name</span>
                    <span className="text-sm font-semibold text-white">
                      {recordDetailData.data.company}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Business Domain</span>
                    <span className="text-sm font-semibold text-cyan-300">
                      {recordDetailData.data.category}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Jurisdiction / Country</span>
                    <span className="text-sm font-semibold text-slate-200">
                      {recordDetailData.data.country}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Annual Revenue</span>
                    <span className="text-sm font-semibold font-mono text-emerald-400">
                      ${recordDetailData.data.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Audit & Historical Changes */}
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-slate-400 font-semibold block mb-2 uppercase text-[10px] tracking-wider">
                    Audit Log & Historical Changes
                  </span>
                  <div className="space-y-1.5 font-mono text-[11px] text-slate-400">
                    {recordDetailData.data.history?.map((h, i) => (
                      <div key={i}>
                        • [{h.timestamp}] {h.field} changed from {h.oldValue} to {h.newValue} by {h.changedBy}.
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Cluster Records */}
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-slate-400 font-semibold block mb-2 uppercase text-[10px] tracking-wider">
                    Related Entities ({recordDetailData.data.category})
                  </span>
                  <div className="space-y-1 text-xs">
                    {recordDetailData.data.relatedRecords?.map((rel) => (
                      <div key={rel.id} className="flex items-center justify-between text-slate-300">
                        <span>{rel.company}</span>
                        <span className="font-mono text-cyan-400 text-[11px]">{rel.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setInspectRecordId(null)}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save View Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveViewSubmit}
            className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Save className="w-4 h-4 text-cyan-400" />
              Save Current Search Configuration
            </h3>
            <p className="text-xs text-slate-400">
              Save these active filters, sorting preferences, and search queries to your workspace for instant 1-click access.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">View Name</label>
              <input
                type="text"
                required
                placeholder="e.g. High Revenue German Fintechs"
                value={viewTitle}
                onChange={(e) => setViewTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSaveModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Save Configuration
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
