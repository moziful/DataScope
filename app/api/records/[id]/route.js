import { NextResponse } from "next/server";
import { getMasterRecords } from "@/lib/datasetGenerator";

export async function GET(request, { params }) {
  const { id } = await params;
  const allRecords = getMasterRecords();
  const record = allRecords.find((r) => r.id === id);

  if (!record) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }

  // Generate deterministic related records & change history
  const relatedRecords = allRecords
    .filter((r) => r.category === record.category && r.id !== record.id)
    .slice(0, 3);

  const history = [
    { timestamp: "2026-11-14 10:22:15", field: "Revenue", oldValue: "$110,000", newValue: `$${record.revenue.toLocaleString()}`, changedBy: "Alex Vance (Admin)" },
    { timestamp: "2026-09-02 14:10:00", field: "Status", oldValue: "Pending", newValue: record.status, changedBy: "System Automation" },
  ];

  return NextResponse.json({
    data: {
      ...record,
      relatedRecords,
      history,
    },
  });
}
