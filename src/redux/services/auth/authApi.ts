import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AuthParams, AuthResponse } from './interface';

const baseUrl = process.env.REACT_APP_API_URL;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    changePassword: builder.mutation<boolean, { password: string; token: string }>({
      query: ({ password, token }) => ({
        body: { password },
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        url: 'api/auth/changePassword',
      }),
    }),

    check: builder.query<{ token: string }, string>({
      query: (token) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },

        url: 'api/auth/check',
      }),
    }),

    forgotPassword: builder.mutation<{ status: string; message: string }, string>({
      query: (email) => ({
        body: { email },
        method: 'POST',
        url: 'api/auth/forgotPassword',
      }),
    }),

    login: builder.mutation<AuthResponse, AuthParams>({
      invalidatesTags: ['Auth'],
      query: ({ email, password }) => ({
        body: { email, password },
        method: 'POST',
        url: 'api/auth/login',
      }),
    }),

    signup: builder.mutation<AuthResponse, AuthParams>({
      invalidatesTags: ['Auth'],
      query: ({ email, password }) => ({
        body: { email, password },
        method: 'POST',
        url: 'api/auth/registration',
      }),
    }),
  }),

  reducerPath: 'authApi',

  tagTypes: ['Auth'],
});

export const {
  useChangePasswordMutation,
  useCheckQuery,
  useForgotPasswordMutation,
  useLoginMutation,
  useSignupMutation,
} = authApi;
