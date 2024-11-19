// apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const schoolManagementApi = createApi({
  reducerPath: "adminpowerclass",
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
    allPowerClasses: builder.query({
      query: () => "/admin/power-classes/classes",
    }),
    schoolUser: builder.query({
      query: (id) => `/admin/schools/${id}`,
    }),
    createPowerClass: builder.mutation({
      query: (userData) => ({
        url: "/admin/power-classes/classes",
        method: "POST",
        body: userData,
      }),
    }),
    updateSchoolUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/admin/schools/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteSchoolUser: builder.mutation({
      query: (id) => ({
        url: `/admin/schools/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSchoolUsersQuery,
  useSchoolUserQuery,
  useCreateSchoolUserMutation,
  useUpdateSchoolUserMutation,
  useDeleteSchoolUserMutation,
} = schoolManagementApi;
