import { NextResponse } from "next/server";

let datasets = [
  {
    id: "ds-01",
    name: "Global Enterprise Core Index",
    description: "Primary enterprise master record partition covering multinational transactions, corporate registrations, and business intelligence.",
    category: "Enterprise Business",
    dataSource: "PostgreSQL Production Cluster (tsvector & B-Tree indexed)",
    totalRecords: 100000,
    createdDate: "2026-01-10",
    lastUpdatedDate: "2026-11-18",
    accessPermissions: ["Administrator", "Data Analyst", "Viewer"],
    status: "Online",
  },
  {
    id: "ds-02",
    name: "Fintech & Cross-Border Transactions",
    description: "Financial transactions, credit evaluations, and regulated payment gateway logs across EU and US jurisdictions.",
    category: "Financial Services",
    dataSource: "PostgreSQL Partition: shard_eu_fintech",
    totalRecords: 34200,
    createdDate: "2026-03-15",
    lastUpdatedDate: "2026-11-17",
    accessPermissions: ["Administrator", "Data Analyst"],
    status: "Online",
  },
  {
    id: "ds-03",
    name: "Cybersecurity Threat Telemetry",
    description: "Audited network breach attempts, firewall telemetry, and endpoint compliance registries.",
    category: "Security & Compliance",
    dataSource: "Elastic/PostgreSQL GiST Sync",
    totalRecords: 10000,
    createdDate: "2026-05-20",
    lastUpdatedDate: "2026-11-16",
    accessPermissions: ["Administrator"],
    status: "Restricted",
  },
  {
    id: "ds-04",
    name: "Supply Chain & Cargo Manifests",
    description: "Freight tracking, customs clearance declarations, and multi-modal container manifests across Asia and the Americas.",
    category: "Logistics",
    dataSource: "PostgreSQL Partition: shard_apac_logistics",
    totalRecords: 18400,
    createdDate: "2026-06-01",
    lastUpdatedDate: "2026-11-15",
    accessPermissions: ["Administrator", "Data Analyst", "Viewer"],
    status: "Online",
  },
];

export async function GET() {
  return NextResponse.json({ data: datasets });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newDataset = {
      id: `ds-0${datasets.length + 1}`,
      name: body.name || "Untitled Dataset",
      description: body.description || "Custom business intelligence dataset partition.",
      category: body.category || "General",
      dataSource: body.dataSource || "PostgreSQL Cluster",
      totalRecords: parseInt(body.totalRecords || "10000", 10),
      createdDate: new Date().toISOString().split("T")[0],
      lastUpdatedDate: new Date().toISOString().split("T")[0],
      accessPermissions: body.accessPermissions || ["Administrator", "Data Analyst"],
      status: "Online",
    };

    datasets.unshift(newDataset);
    return NextResponse.json({ success: true, data: newDataset });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create dataset" }, { status: 400 });
  }
}
