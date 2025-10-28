import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      console.log(token);
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Service"], 
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (serviceFormData) => ({
        url: "/api/services/create/",
        method: "POST",
        body: serviceFormData,
      }),
      invalidatesTags: ["Service"], 
    }),
  }),
});

// Export the auto-generated hook
export const { useCreateServiceMutation } = apiSlice;