import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AuthParams, AuthResponse } from './interface';

const baseUrl = process.env.REACT_APP_API_URL;

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    check: builder.query<{ token: string }, string>({
      providesTags: ['Auth'],

      query: (token) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },

        url: 'api/auth/check',
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

export const { useCheckQuery, useLoginMutation, useSignupMutation } = authApi;
