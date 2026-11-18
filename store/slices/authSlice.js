import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeRole: "Administrator", // 'Administrator' | 'Data Analyst' | 'Viewer'
  user: {
    id: "usr-01",
    name: "Alex Vance",
    email: "alex.vance@datascope.internal",
    avatar: "AV",
  },
  availableRoles: ["Administrator", "Data Analyst", "Viewer"],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.activeRole = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;
