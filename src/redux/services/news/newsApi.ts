import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INews, NewsResponse } from './interface';

const baseUrl = process.env.REACT_APP_API_URL as string;

export const newsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    addNews: builder.mutation<INews, { data: FormData; token: string }>({
      invalidatesTags: ['News'],
      query: ({ data, token }) => ({
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'POST',
        url: 'api/news/create',
      }),
    }),

    editNews: builder.mutation<INews, { id: number; data: FormData; token: string }>({
      invalidatesTags: ['News'],
      query: ({ data, id, token }) => ({
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        url: `api/news/${id}`,
      }),
    }),

    getNews: builder.query<NewsResponse, { section: string | undefined }>({
      providesTags: ['News'],
      query: ({ section }) => ({
        params: { section },
        url: 'api/news',
      }),
    }),

    getNewsById: builder.query<INews, number>({
      providesTags: ['News'],
      query: (id) => `api/news/${id}`,
    }),

    removeNews: builder.mutation<{ id: number }, { id: number; token: string }>({
      invalidatesTags: ['News'],
      query: ({ id, token }) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
        url: `api/news/${id}`,
      }),
    }),
  }),

  reducerPath: 'newsApi',

  tagTypes: ['News'],
});

export const {
  useAddNewsMutation,
  useEditNewsMutation,
  useGetNewsByIdQuery,
  useGetNewsQuery,
  useRemoveNewsMutation,
} = newsApi;
