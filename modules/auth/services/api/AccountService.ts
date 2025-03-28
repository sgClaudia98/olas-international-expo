import {
  BaseQueryApi,
  createApi,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/services/api/apiService";
import {
  IAccountCreateRequest,
  IAccountCreateResponse,
  IAccountPutRequest,
  IAccountResponse,
  IAuthRequest,
  IAuthResponse,
  IForgetPasswordRequest,
  IRefreshTokenRequest,
  IResetPasswordRequest,
  ISendVerificationCodeRequest,
  IVerifyRequest,
} from "../interfaces/account";
import { BASE_URL } from "@/constants";
import {
  logout,
  setAuthState,
  setUserDetails,
  User,
} from "../../slices/authSlice";
import { decodeToken } from "react-jwt";

export const accountService = createApi({
  reducerPath: "account",
  tagTypes: ["account"],
  baseQuery: (args: string | FetchArgs, api: BaseQueryApi, extraOptions) => {
    const baseUrl = BASE_URL + "/api/v1/client";
    return baseQueryWithReauth(args, api, extraOptions, baseUrl);
  },

  endpoints: (builder) => ({
    auth: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (body) => ({
        url: `/auth`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["account"],
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const decoded: any = decodeToken(data.accessToken);
          console.debug("decoded", decoded);
          dispatch(
            setAuthState({
              user: {
                name: decoded?.sub,
                username: decoded?.sub,
                userId: decoded?.sub,
                imageUrl: `https://storageaccountsocial.blob.core.windows.net/avatars/${decoded?.sub}.png`,
              } as User,
              token: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    getProfile: builder.query<IAccountResponse, void>({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: ["account"],
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserDetails(data.client));
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    profile: builder.mutation<IAccountResponse, IAccountPutRequest>({
      query: (body) => ({
        url: `/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["account"],
    }),
    refreshToken: builder.mutation<IAuthResponse, IRefreshTokenRequest>({
      query: (body) => ({
        url: `/refresh-token`,
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<IAccountCreateResponse, IAccountCreateRequest>({
      query: (body) => ({
        url: `/signup`,
        method: "POST",
        body,
      }),
    }),
    forgetPassword: builder.mutation<void, IForgetPasswordRequest>({
      query: (body) => ({
        url: `/forget-password`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<IAuthResponse, IResetPasswordRequest>({
      query: (body) => ({
        url: `/reset-password`,
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation<IAuthResponse, IAuthRequest>({
      query: (body) => ({
        url: `/change-password`,
        method: "POST",
        body,
      }),
    }),
    verify: builder.mutation<void, IVerifyRequest>({
      query: (body) => ({
        url: `/verify`,
        method: "POST",
        body,
      }),
    }),
    sendVerificationCode: builder.mutation<void, ISendVerificationCodeRequest>({
      query: (body) => ({
        url: `/send-verification-code`,
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useAuthMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useProfileMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useVerifyMutation,
  useSendVerificationCodeMutation,
} = accountService;

export const accountEndpoints = accountService.endpoints;
