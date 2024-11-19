import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TeachersApi = createApi({
  reducerPath: "principalTeachers",
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
    getTeachers: builder.query({
      query: () => "/principal/teachers",
    }),

    getTeacher: builder.query({
      query: (id) => `/principal/teachers/${id}`,
    }),

    createTeacher: builder.mutation({
      query: (userData) => ({
        url: "/principal/teachers",
        method: "POST",
        body: userData,
      }),
    }),

    updateTeacher: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/principal/teachers/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),

    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/principal/teachers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = TeachersApi;
