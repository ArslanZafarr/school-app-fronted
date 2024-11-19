// apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ClassesApi = createApi({
  reducerPath: "principalClasses",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.brainlux.in/api",
    prepareHeaders: (headers, { getState }) => {
      const apiToken = getState().storeAuth.apiToken;
      if (apiToken) {
        headers.set("Authorization", `Bearer ${apiToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: (school_id) => `/principal/classes/${school_id}`,
    }),
    getClass: builder.query({
      query: (teachers_id) => `/principal/teachers/${teachers_id}`,
    }),
    createClass: builder.mutation({
      query: (userData) => ({
        url: "/principal/classes",
        method: "POST",
        body: userData,
      }),
    }),
    updateClass: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/admin/schools/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/admin/schools/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = ClassesApi;
