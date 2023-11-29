/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '../../store';

import { UsersResponse } from './interface';

const baseUrl = process.env.REACT_APP_API_URL as string;

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),

  endpoints: (builder) => ({
    checkStatusUser: builder.query<{ isActiveStatus: boolean }, string>({
      query: (token) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },

        url: 'api/users/check_status',
      }),
    }),

    getUsers: builder.query<UsersResponse, void>({
      providesTags: ['Users'],
      query: () => 'api/users',
    }),
  }),

  reducerPath: 'usersApi',

  tagTypes: ['Users'],
});

export const { useCheckStatusUserQuery, useGetUsersQuery } = usersApi;
