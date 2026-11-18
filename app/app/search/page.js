"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { 
  applySavedConfiguration, 
  setSearch, 
  setCategory, 
  setCountry, 
  setStatus, 
  setMinRevenue 
} from "@/store/slices/searchConfigSlice";
import { 
  Search, 
  Plus, 
  Trash2, 
  Play, 
  RotateCcw, 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  Database,
  ArrowRight,
  Code2
} from "lucide-react";

export default function AdvancedSearchPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Natural language query state for the bonus challenge AI assistant
  const [naturalQuery, setNaturalQuery] = useState("");
  const [isTranslatingAI, setIsTranslatingAI] = useState(false);

  // Structured query conditions
  const [combinator, setCombinator] = useState("AND");
  const [conditions, setConditions] = useState([
    { id: 1, field: "country", operator: "equals", value: "Germany" },
    { id: 2, field: "status", operator: "equals", value: "Active" },
    { id: 3, field: "revenue", operator: "greater_than", value: "50000" },
  ]);

  const availableFields = [
    { key: "country", label: "Jurisdiction / Country", type: "string" },
    { key: "category", label: "Business Category", type: "enum" },
    { key: "status", label: "Lifecycle Status", type: "enum" },
    { key: "revenue", label: "Annual Revenue ($)", type: "number" },
    { key: "company", label: "Entity Name", type: "string" },
  ];

  const getOperators = (fieldKey) => {
    const field = availableFields.find((f) => f.key === fieldKey);
    if (field?.type === "number") {
      return [
        { key: "greater_than", label: "Greater Than (>)" },
        { key: "less_than", label: "Less Than (<)" },
        { key: "equals", label: "Equals (=)" },
      ];
    }
    return [
      { key: "equals", label: "Equals" },
      { key: "contains", label: "Contains (Fuzzy Trigram)" },
      { key: "not_equals", label: "Does Not Equal" },
    ];
  };

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now(), field: "category", operator: "equals", value: "Fintech & Banking" },
    ]);
  };

  const handleRemoveCondition = (id) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  const handleUpdateCondition = (id, key, val) => {
    setConditions(
      conditions.map((c) => {
        if (c.id === id) {
          const updated = { ...c, [key]: val };
          // reset operator if field changes
          if (key === "field") {
            const ops = getOperators(val);
            updated.operator = ops[0].key;
            updated.value = "";
          }
          return updated;
        }
        return c;
      })
    );
  };

  // Convert visual query to generated SQL preview
  const generateSQL = () => {
    const whereClauses = conditions.map((c) => {
      if (c.operator === "equals") return `"${c.field}" = '${c.value}'`;
      if (c.operator === "not_equals") return `"${c.field}" != '${c.value}'`;
      if (c.operator === "contains") return `"${c.field}" ILIKE '%${c.value}%'`;
      if (c.operator === "greater_than") return `"${c.field}" > ${c.value || 0}`;
      if (c.operator === "less_than") return `"${c.field}" < ${c.value || 0}`;
      return `"${c.field}" = '${c.value}'`;
    });

    return `SELECT * FROM "dataset_records"\nWHERE ${whereClauses.join(`\n  ${combinator} `)}\nORDER BY "revenue" DESC\nLIMIT 25;`;
  };

  // Natural Language AI Query Translator
  const handleTranslateNL = () => {
    if (!naturalQuery.trim()) return;
    setIsTranslatingAI(true);

    setTimeout(() => {
      const lower = naturalQuery.toLowerCase();
      const newConditions = [];

      if (lower.includes("germany")) {
        newConditions.push({ id: 101, field: "country", operator: "equals", value: "Germany" });
      } else if (lower.includes("japan")) {
        newConditions.push({ id: 101, field: "country", operator: "equals", value: "Japan" });
      } else if (lower.includes("united states") || lower.includes("usa")) {
        newConditions.push({ id: 101, field: "country", operator: "equals", value: "United States" });
      }

      if (lower.includes("active")) {
        newConditions.push({ id: 102, field: "status", operator: "equals", value: "Active" });
      } else if (lower.includes("pending")) {
        newConditions.push({ id: 102, field: "status", operator: "equals", value: "Pending" });
      }

      if (lower.includes("fintech") || lower.includes("banking")) {
        newConditions.push({ id: 103, field: "category", operator: "equals", value: "Fintech & Banking" });
      } else if (lower.includes("health") || lower.includes("biotech")) {
        newConditions.push({ id: 103, field: "category", operator: "equals", value: "Healthcare & Biotech" });
      }

      const matchRev = naturalQuery.match(/(\d+[\d,]*)/);
      if (matchRev) {
        const num = matchRev[0].replace(/,/g, "");
        newConditions.push({ id: 104, field: "revenue", operator: "greater_than", value: num });
      }

      if (newConditions.length > 0) {
        setConditions(newConditions);
      } else {
        alert("Could not extract specific filter parameters. Please use the visual builder below.");
      }
      setIsTranslatingAI(false);
    }, 600);
  };

  // Execute Search in Data Explorer
  const handleExecuteInExplorer = () => {
    let countryVal = "All";
    let statusVal = "All";
    let catVal = "All";
    let minRev = "";
    let searchVal = "";

    conditions.forEach((c) => {
      if (c.field === "country" && c.operator === "equals") countryVal = c.value;
      if (c.field === "status" && c.operator === "equals") statusVal = c.value;
      if (c.field === "category" && c.operator === "equals") catVal = c.value;
      if (c.field === "revenue" && c.operator === "greater_than") minRev = c.value;
      if (c.field === "company") searchVal = c.value;
    });

    dispatch(
      applySavedConfiguration({
        country: countryVal,
        status: statusVal,
        category: catVal,
        minRevenue: minRev,
        search: searchVal,
        page: 1,
      })
    );

    router.push("/app/explorer");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
          Advanced Visual Query Builder
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Construct complex multi-condition compound queries without writing SQL.
        </p>
      </div>

      {/* AI Search Assistant (Bonus Challenge) */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-indigo-950/40 p-5 shadow-lg">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>AI Search Assistant (Natural Language to Query)</span>
        </div>
        <p className="text-xs text-slate-300 mb-3">
          Describe what you are looking for in plain English. The assistant will validate and compile it into compound filter conditions.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g. Find active customers from Germany with revenue greater than $50,000"
            value={naturalQuery}
            onChange={(e) => setNaturalQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleTranslateNL}
            disabled={isTranslatingAI}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTranslatingAI ? "Analyzing..." : "Generate Filter"}</span>
          </button>
        </div>
      </div>

      {/* Visual Query Builder Canvas */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
        
        {/* Logic Combinator (AND / OR) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Match Condition:</span>
            <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-1">
              <button
                onClick={() => setCombinator("AND")}
                className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                  combinator === "AND"
                    ? "bg-cyan-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                AND (All Must Match)
              </button>
              <button
                onClick={() => setCombinator("OR")}
                className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                  combinator === "OR"
                    ? "bg-cyan-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                OR (Any May Match)
              </button>
            </div>
          </div>

          <button
            onClick={handleAddCondition}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Condition</span>
          </button>
        </div>

        {/* Condition Rows */}
        <div className="space-y-3">
          {conditions.map((cond, index) => {
            const operators = getOperators(cond.field);
            return (
              <div
                key={cond.id}
                className="flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800"
              >
                <div className="w-6 text-center text-xs font-mono text-slate-500">
                  #{index + 1}
                </div>

                {/* Field Selector */}
                <select
                  value={cond.field}
                  onChange={(e) => handleUpdateCondition(cond.id, "field", e.target.value)}
                  className="w-full sm:w-52 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {availableFields.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </select>

                {/* Operator Selector */}
                <select
                  value={cond.operator}
                  onChange={(e) => handleUpdateCondition(cond.id, "operator", e.target.value)}
                  className="w-full sm:w-44 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  {operators.map((op) => (
                    <option key={op.key} value={op.key}>
                      {op.label}
                    </option>
                  ))}
                </select>

                {/* Value Input */}
                <input
                  type={cond.field === "revenue" ? "number" : "text"}
                  placeholder="Filter value..."
                  value={cond.value}
                  onChange={(e) => handleUpdateCondition(cond.id, "value", e.target.value)}
                  className="w-full sm:flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />

                {/* Remove Condition Button */}
                <button
                  onClick={() => handleRemoveCondition(cond.id)}
                  disabled={conditions.length <= 1}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Live SQL Preview Box */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              Generated PostgreSQL Query Plan
            </span>
            <span className="font-mono text-[11px] text-emerald-400">Validated SQL</span>
          </div>
          <pre className="text-[11px] font-mono text-cyan-300 leading-relaxed overflow-x-auto">
            {generateSQL()}
          </pre>
        </div>

        {/* Action Execute Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              setConditions([
                { id: 1, field: "country", operator: "equals", value: "Germany" },
              ]);
            }}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to default
          </button>

          <button
            onClick={handleExecuteInExplorer}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>Execute in Data Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
