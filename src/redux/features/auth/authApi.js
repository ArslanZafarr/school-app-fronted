// src/redux/features/auth/authApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "auth",
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
    userRegister: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    userLogin: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    userLogout: builder.mutation({
      query: (userData) => ({
        url: "api/logout",
        method: "POST",
        body: userData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
} = AuthApi;
