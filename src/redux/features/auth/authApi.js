import { apiSlice } from "../../api/apiSlice";
import { setTokens, setUser } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Seller login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/seller/signin/",
        method: "POST",
        body: data,
      }),
    }),

    // Client sign-in (sends OTP)
    clientSignIn: builder.mutation({
      query: (data) => ({
        url: "/auth/signin/",
        method: "POST",
        body: data,
      }),
    }),

    // Verify OTP for client
    verifyClientOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("OTP verification response:", data);
          
          if (data.access_token && data.refresh_token) {
            dispatch(
              setTokens({
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
              })
            );
          }
          if (data.user) {
            dispatch(setUser({ user: data.user }));
          }
        } catch (error) {
          console.error("Failed to verify OTP:", error);
        }
      },
    }),

    // Resend OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp/",
        method: "POST",
        body: data,
      }),
    }),

    // Get user info
    getMe: builder.query({
      query: () => "/business-information/",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data }));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useClientSignInMutation,
  useVerifyClientOtpMutation,
  useResendOtpMutation,
  useLazyGetMeQuery,
} = authApi;