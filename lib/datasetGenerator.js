// High-performance deterministic in-memory generator representing 100k+ enterprise records
// Demonstrates server-side querying, compound filtering, sorting, and pagination

const CATEGORIES = [
  "Fintech & Banking",
  "Healthcare & Biotech",
  "Supply Chain & Logistics",
  "SaaS & Cloud Infra",
  "Cybersecurity & Defense",
  "Clean Energy & Utilities",
  "Telecommunications",
];

const COUNTRIES = [
  "Germany",
  "United States",
  "Japan",
  "United Kingdom",
  "Singapore",
  "Canada",
  "Australia",
  "Sweden",
  "France",
  "Switzerland",
];

const STATUSES = ["Active", "Pending", "Under Review", "Archived"];

const COMPANY_PREFIXES = [
  "Apex", "Nova", "Vanguard", "Helios", "Quantum", "CyberShield", "Starlight", 
  "Nordic", "Prism", "Omni", "Aero", "Pulse", "Stratum", "Zenith", "Catalyst"
];

const COMPANY_SUFFIXES = [
  "Dynamics Ltd", "Systems Corp", "Analytics", "Global Logistics", "Networks", 
  "Technologies", "Solutions", "Ventures", "Energy Hub", "BioLabs"
];

// Generates a deterministic record on the fly for any index up to 100,000+
export function generateRecord(index) {
  const prefix = COMPANY_PREFIXES[index % COMPANY_PREFIXES.length];
  const suffix = COMPANY_SUFFIXES[(index * 3) % COMPANY_SUFFIXES.length];
  const company = `${prefix} ${suffix} #${(index % 99) + 1}`;
  
  const category = CATEGORIES[index % CATEGORIES.length];
  const country = COUNTRIES[(index * 7) % COUNTRIES.length];
  const status = STATUSES[(index * 5) % STATUSES.length];
  
  // Deterministic revenue between $12,000 and $1,500,000
  const revenue = 12000 + ((index * 7919) % 1488000);
  
  // Deterministic date in the past 2 years
  const dayOffset = (index * 13) % 730;
  const baseDate = new Date(2026, 10, 18);
  baseDate.setDate(baseDate.getDate() - dayOffset);
  const createdDate = baseDate.toISOString().split("T")[0];

  return {
    id: `REC-${100000 + index}`,
    company,
    category,
    country,
    status,
    revenue,
    createdDate,
    latency: `${10 + (index % 25)}ms`,
    description: `Enterprise intelligence entity tracking ${category.toLowerCase()} operational activities in ${country}.`,
  };
}

// Generate the master benchmark collection (100,000 records) lazily in memory
let cachedRecords = null;
export function getMasterRecords() {
  if (!cachedRecords) {
    const total = 100000;
    cachedRecords = new Array(total);
    for (let i = 0; i < total; i++) {
      cachedRecords[i] = generateRecord(i);
    }
  }
  return cachedRecords;
}
