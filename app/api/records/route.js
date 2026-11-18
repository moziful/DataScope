import { NextResponse } from "next/server";
import { getMasterRecords } from "@/lib/datasetGenerator";

export async function GET(request) {
  const startTime = performance.now();
  const { searchParams } = new URL(request.url);

  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const category = searchParams.get("category");
  const country = searchParams.get("country");
  const status = searchParams.get("status");
  const minRevenue = searchParams.get("minRevenue");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(10, parseInt(searchParams.get("limit") || "25", 10)));
  const sortBy = searchParams.get("sortBy") || "revenue";
  const sortDir = searchParams.get("sortDir") || "desc";

  const allRecords = getMasterRecords();

  // Server-side compound filtering
  const filtered = allRecords.filter((record) => {
    if (search) {
      const matchSearch =
        record.company.toLowerCase().includes(search) ||
        record.id.toLowerCase().includes(search) ||
        record.country.toLowerCase().includes(search);
      if (!matchSearch) return false;
    }

    if (category && category !== "All" && record.category !== category) {
      return false;
    }

    if (country && country !== "All" && record.country !== country) {
      return false;
    }

    if (status && status !== "All" && record.status !== status) {
      return false;
    }

    if (minRevenue) {
      const numMin = parseFloat(minRevenue);
      if (!isNaN(numMin) && record.revenue < numMin) {
        return false;
      }
    }

    return true;
  });

  // Server-side sorting
  filtered.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDir === "asc" ? valA - valB : valB - valA;
    }

    const strA = String(valA || "").toLowerCase();
    const strB = String(valB || "").toLowerCase();
    return sortDir === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
  });

  // Server-side pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  const executionTimeMs = Math.round(performance.now() - startTime);

  return NextResponse.json({
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    meta: {
      executionTimeMs,
      appliedFilters: {
        search,
        category,
        country,
        status,
        minRevenue,
        sortBy,
        sortDir,
      },
    },
  });
}
