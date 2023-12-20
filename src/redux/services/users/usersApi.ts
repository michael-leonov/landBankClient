import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '../../store';

import { AddLandUserRoleResponse, UserParams, UsersResponse } from './interface';

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
    addRole: builder.mutation<AddLandUserRoleResponse, number>({
      invalidatesTags: ['Users'],
      query: (userId) => ({
        body: { userId },
        method: 'POST',
        url: '/api/users/add_land_user_role',
      }),
    }),

    checkStatusUser: builder.query<{ isActiveStatus: boolean }, string>({
      query: (token) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },

        url: 'api/users/check_status',
      }),
    }),

    getUsers: builder.query<UsersResponse, UserParams>({
      providesTags: ['Users'],
      query: (params) => ({ params, url: 'api/users' }),
    }),
  }),

  reducerPath: 'usersApi',

  tagTypes: ['Users'],
});

export const { useAddRoleMutation, useCheckStatusUserQuery, useGetUsersQuery } = usersApi;
