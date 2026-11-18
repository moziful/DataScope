import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataScopeApi = createApi({
  reducerPath: "dataScopeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Datasets", "Records", "SavedViews", "Analytics"],
  endpoints: (builder) => ({
    getDatasets: builder.query({
      query: () => "/datasets",
      providesTags: ["Datasets"],
    }),
    getRecords: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.datasetId) searchParams.set("datasetId", params.datasetId);
        if (params.search) searchParams.set("search", params.search);
        if (params.country && params.country !== "All") searchParams.set("country", params.country);
        if (params.status && params.status !== "All") searchParams.set("status", params.status);
        if (params.category && params.category !== "All") searchParams.set("category", params.category);
        if (params.minRevenue) searchParams.set("minRevenue", params.minRevenue);
        if (params.page) searchParams.set("page", params.page);
        if (params.limit) searchParams.set("limit", params.limit);
        if (params.sortBy) searchParams.set("sortBy", params.sortBy);
        if (params.sortDir) searchParams.set("sortDir", params.sortDir);

        return `/records?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Records", id })),
              { type: "Records", id: "LIST" },
            ]
          : [{ type: "Records", id: "LIST" }],
    }),
    getRecordById: builder.query({
      query: (id) => `/records/${id}`,
      providesTags: (result, error, id) => [{ type: "Records", id }],
    }),
    getSavedViews: builder.query({
      query: () => "/saved-views",
      providesTags: ["SavedViews"],
    }),
    createSavedView: builder.mutation({
      query: (view) => ({
        url: "/saved-views",
        method: "POST",
        body: view,
      }),
      invalidatesTags: ["SavedViews"],
    }),
    deleteSavedView: builder.mutation({
      query: (id) => ({
        url: `/saved-views?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedViews"],
    }),
    getAnalyticsOverview: builder.query({
      query: () => "/analytics/overview",
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useGetDatasetsQuery,
  useGetRecordsQuery,
  useGetRecordByIdQuery,
  useGetSavedViewsQuery,
  useCreateSavedViewMutation,
  useDeleteSavedViewMutation,
  useGetAnalyticsOverviewQuery,
} = dataScopeApi;
