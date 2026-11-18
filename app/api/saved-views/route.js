import { NextResponse } from "next/server";

// In-memory persistent store for saved views (survives route requests)
let savedViews = [
  {
    id: "sv-01",
    title: "High Revenue German Fintechs",
    search: "",
    category: "Fintech & Banking",
    country: "Germany",
    status: "Active",
    minRevenue: "100000",
    sortBy: "revenue",
    sortDir: "desc",
    createdAt: "2026-11-14T08:30:00Z",
    creator: "Alex Vance (Admin)",
    shared: true,
  },
  {
    id: "sv-02",
    title: "US Clean Energy Under Review",
    search: "",
    category: "Clean Energy & Utilities",
    country: "United States",
    status: "Under Review",
    minRevenue: "25000",
    sortBy: "revenue",
    sortDir: "desc",
    createdAt: "2026-11-16T12:00:00Z",
    creator: "Sarah Chen (Data Analyst)",
    shared: true,
  },
  {
    id: "sv-03",
    title: "Global Supply Chain Audit",
    search: "Logistics",
    category: "Supply Chain & Logistics",
    country: "All",
    status: "All",
    minRevenue: "50000",
    sortBy: "revenue",
    sortDir: "desc",
    createdAt: "2026-11-17T15:45:00Z",
    creator: "Alex Vance (Admin)",
    shared: false,
  },
];

export async function GET() {
  return NextResponse.json({ data: savedViews });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newView = {
      id: `sv-${Date.now()}`,
      title: body.title || "Custom Saved View",
      search: body.search || "",
      category: body.category || "All",
      country: body.country || "All",
      status: body.status || "All",
      minRevenue: body.minRevenue || "",
      sortBy: body.sortBy || "revenue",
      sortDir: body.sortDir || "desc",
      createdAt: new Date().toISOString(),
      creator: "Alex Vance (Admin)",
      shared: true,
    };

    savedViews.unshift(newView);
    return NextResponse.json({ success: true, data: newView });
  } catch (err) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  savedViews = savedViews.filter((v) => v.id !== id);
  return NextResponse.json({ success: true });
}
