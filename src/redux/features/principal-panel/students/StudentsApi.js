// apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StudentsApi = createApi({
  reducerPath: "principalStudents",
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
    getStudentByClassId: builder.query({
      query: (id) => `/principal/students/class/:class_id${id}`,
    }),
    getStudents: builder.query({
      query: () => "/principal/students",
    }),
    getStudent: builder.query({
      query: (id) => `/principal/students/:id${id}`,
    }),
    createStudent: builder.mutation({
      query: (userData) => ({
        url: "/principal/students",
        method: "POST",
        body: userData,
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/principal/students/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteDelete: builder.mutation({
      query: (id) => ({
        url: `/principal/students/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetStudentByClassIdQuery,
  useGetStudentQuery,
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteDeleteMutation,
} = StudentsApi;
