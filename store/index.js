import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchConfigReducer from "./slices/searchConfigSlice";
import { dataScopeApi } from "./services/dataScopeApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    searchConfig: searchConfigReducer,
    [dataScopeApi.reducerPath]: dataScopeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataScopeApi.middleware),
});

export default store;
