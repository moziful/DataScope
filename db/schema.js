import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  integer, 
  timestamp, 
  boolean, 
  jsonb, 
  index, 
  customType 
} from "drizzle-orm/pg-core";

// Custom tsvector type for PostgreSQL native Full-Text Search
const tsvector = customType({
  dataType() {
    return "tsvector";
  },
});

// 1. Users Table (Authentication & RBAC)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("Viewer"), // 'Administrator' | 'Data Analyst' | 'Viewer'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Datasets Collections (Dataset Management & Partitions)
export const datasets = pgTable("datasets", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(),
  dataSource: varchar("data_source", { length: 255 }).notNull(),
  totalRecords: integer("total_records").notNull().default(0),
  accessPermissions: jsonb("access_permissions").notNull(), // ['Administrator', 'Data Analyst', 'Viewer']
  status: varchar("status", { length: 50 }).notNull().default("Online"),
  createdDate: varchar("created_date", { length: 20 }).notNull(),
  lastUpdatedDate: varchar("last_updated_date", { length: 20 }).notNull(),
});

// 3. Dataset Records (100k+ to millions of business records)
export const datasetRecords = pgTable(
  "dataset_records",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    datasetId: varchar("dataset_id", { length: 64 }).references(() => datasets.id),
    company: varchar("company", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    revenue: integer("revenue").notNull(),
    createdDate: varchar("created_date", { length: 20 }).notNull(),
    description: text("description"),
    tsv: tsvector("tsv"), // PostgreSQL tsvector for sub-30ms full-text search
    metadata: jsonb("metadata"),
  },
  (table) => [
    // Composite B-Tree index for compound multi-column filtering & sorting
    index("idx_records_country_category_status").on(table.country, table.category, table.status),
    index("idx_records_revenue_desc").on(table.revenue),
    index("idx_records_dataset_id").on(table.datasetId),
    // GIN Index on tsvector for Full-Text Search
    index("idx_records_tsv_gin").using("gin", table.tsv),
  ]
);

// 4. Saved Search Views & Shared Configurations
export const savedViews = pgTable("saved_views", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  search: text("search"),
  category: varchar("category", { length: 100 }),
  country: varchar("country", { length: 100 }),
  status: varchar("status", { length: 50 }),
  minRevenue: varchar("min_revenue", { length: 50 }),
  sortBy: varchar("sort_by", { length: 50 }).default("revenue"),
  sortDir: varchar("sort_dir", { length: 10 }).default("desc"),
  shared: boolean("shared").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Search History Audit Log
export const searchHistory = pgTable("search_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  queryText: text("query_text").notNull(),
  searchParams: jsonb("search_params").notNull(),
  matchedCount: integer("matched_count").notNull(),
  executionTimeMs: integer("execution_time_ms").notNull(),
  executedAt: timestamp("executed_at").defaultNow().notNull(),
});
