import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "adminProfile",
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
    userProfile: builder.query({
      query: () => ({
        url: `/admin/profile`,
        method: "GET",
      }),
    }),
    userAddProfile: builder.mutation({
      query: (userData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: userData,
        headers: {
          Accept: "application/json",
        },
      }),
    }),
    userProfileChangePassword: builder.mutation({
      query: (userData) => ({
        url: "/admin/profile/change-password",
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
  useUserProfileQuery,
  useUserAddProfileMutation,
  useUserProfileChangePasswordMutation,
} = ProfileApi;
