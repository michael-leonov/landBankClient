import { Cookies } from 'react-cookie';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginParams, LoginResponse } from './interface';

const baseUrl = process.env.REACT_APP_API_URL;

const token = new Cookies().get('token');

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    check: builder.query<{ token: string }, void>({
      providesTags: ['Auth'],
      query: () => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: 'api/auth/check',
      }),
    }),

    login: builder.mutation<LoginResponse, LoginParams>({
      invalidatesTags: ['Auth'],
      query: ({ email, password }) => ({
        body: { email, password },
        method: 'POST',
        url: 'api/auth/login',
      }),
    }),

    signup: builder.mutation<LoginResponse, LoginParams>({
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
