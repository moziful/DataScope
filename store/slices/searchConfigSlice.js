import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "All",
  country: "All",
  status: "All",
  minRevenue: "",
  sortBy: "revenue",
  sortDir: "desc",
  page: 1,
  limit: 25,
  visibleColumns: ["id", "company", "category", "country", "status", "revenue", "createdDate", "actions"],
  selectedRecordIds: [],
};

export const searchConfigSlice = createSlice({
  name: "searchConfig",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
      state.page = 1;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.page = 1;
    },
    setMinRevenue: (state, action) => {
      state.minRevenue = action.payload;
      state.page = 1;
    },
    setSorting: (state, action) => {
      const { sortBy, sortDir } = action.payload;
      state.sortBy = sortBy;
      state.sortDir = sortDir;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },
    toggleColumn: (state, action) => {
      const col = action.payload;
      if (state.visibleColumns.includes(col)) {
        state.visibleColumns = state.visibleColumns.filter((c) => c !== col);
      } else {
        state.visibleColumns.push(col);
      }
    },
    toggleSelectRow: (state, action) => {
      const id = action.payload;
      if (state.selectedRecordIds.includes(id)) {
        state.selectedRecordIds = state.selectedRecordIds.filter((item) => item !== id);
      } else {
        state.selectedRecordIds.push(id);
      }
    },
    selectAllRows: (state, action) => {
      state.selectedRecordIds = action.payload;
    },
    clearSelection: (state) => {
      state.selectedRecordIds = [];
    },
    resetFilters: (state) => {
      state.search = "";
      state.category = "All";
      state.country = "All";
      state.status = "All";
      state.minRevenue = "";
      state.page = 1;
      state.selectedRecordIds = [];
    },
    applySavedConfiguration: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
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
  resetFilters,
  applySavedConfiguration,
} = searchConfigSlice.actions;

export default searchConfigSlice.reducer;
