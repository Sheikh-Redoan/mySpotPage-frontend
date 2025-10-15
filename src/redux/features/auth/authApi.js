import { apiSlice } from "../../api/apiSlice";
import { setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/seller/signin/",
        method: "POST",
        body: data,
      }),
    }),

    // --- CORRECTED ENDPOINT ---
    // Switched to a query to use the GET method and updated the URL.
    getMe: builder.query({
      query: () => "/business-information/", // This is the correct endpoint to get user data.
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // The response from this endpoint will be stored as the user object.
          dispatch(setUser({ user: data }));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      },
    }),
  }),
});

// Export the correct hooks.
export const { useLoginMutation, useLazyGetMeQuery } = authApi;