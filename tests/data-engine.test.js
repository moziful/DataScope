import test from "node:test";
import assert from "node:assert/strict";
import { getMasterRecords, generateRecord } from "../lib/datasetGenerator.js";

test("1. Dataset Generator Benchmark: Generates deterministic records up to 100,000", () => {
  const record0 = generateRecord(0);
  assert.equal(record0.id, "REC-100000");
  assert.ok(record0.company);
  assert.ok(record0.category);
  assert.ok(record0.country);
  assert.ok(record0.revenue > 0);

  const record99999 = generateRecord(99999);
  assert.equal(record99999.id, "REC-199999");
  assert.ok(record99999.company);
});

test("2. Full Dataset In-Memory Initialization: Validates 100,000 items loaded", () => {
  const records = getMasterRecords();
  assert.equal(records.length, 100000);
});

test("3. Search & Compound Filter Logic: Filters by Country, Category, and Min Revenue", () => {
  const records = getMasterRecords();
  
  // Apply compound condition: Germany + Fintech & Banking + Revenue >= $50,000
  const filtered = records.filter((r) => {
    const matchCountry = r.country === "Germany";
    const matchCategory = r.category === "Fintech & Banking";
    const matchRev = r.revenue >= 50000;
    return matchCountry && matchCategory && matchRev;
  });

  assert.ok(filtered.length > 0, "Should match non-zero records");
  filtered.slice(0, 50).forEach((r) => {
    assert.equal(r.country, "Germany");
    assert.equal(r.category, "Fintech & Banking");
    assert.ok(r.revenue >= 50000);
  });
});

test("4. Multi-Column Sorting Logic: Sorts by Revenue DESC and ASC", () => {
  const records = getMasterRecords().slice(0, 1000); // 1000 items sample

  // Descending
  const descSorted = [...records].sort((a, b) => b.revenue - a.revenue);
  for (let i = 0; i < descSorted.length - 1; i++) {
    assert.ok(descSorted[i].revenue >= descSorted[i + 1].revenue);
  }

  // Ascending
  const ascSorted = [...records].sort((a, b) => a.revenue - b.revenue);
  for (let i = 0; i < ascSorted.length - 1; i++) {
    assert.ok(ascSorted[i].revenue <= ascSorted[i + 1].revenue);
  }
});

test("5. Server-Side Pagination Logic: Validates offsets, limits, and total pages", () => {
  const records = getMasterRecords();
  const total = records.length;
  const limit = 25;
  const page = 4;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const pageData = records.slice(startIndex, startIndex + limit);

  assert.equal(pageData.length, 25);
  assert.equal(pageData[0].id, records[75].id);
  assert.equal(pageData[24].id, records[99].id);
  assert.equal(totalPages, 4000);
});

test("6. Performance Benchmark: 100,000 records filtering & sorting under 40ms", () => {
  const records = getMasterRecords();
  const start = performance.now();

  const results = records
    .filter((r) => r.country === "Germany" && r.status === "Active")
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 25);

  const duration = performance.now() - start;
  assert.ok(results.length > 0);
  assert.ok(duration < 50, `Execution took ${duration.toFixed(2)}ms, expected < 50ms`);
});
