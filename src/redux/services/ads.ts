/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL as string;

export const adsApi = createApi({
  reducerPath: 'adsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  tagTypes: ['Ads'],

  endpoints: (builder) => ({
    getAds: builder.query<any, { page?: number | string; limit?: number }>({
      query: ({ page, limit }) => ({
        url: 'api/announcements',
        params: { page, limit },
      }),
      providesTags: ['Ads'],
    }),

    getAdsForMap: builder.query<any, void>({
      query: () => 'api/announcements/map',
      providesTags: ['Ads'],
    }),

    getAdById: builder.query({
      query: (id) => `api/announcements/${id}`,
      providesTags: ['Ads'],
    }),
  }),
});

export const { useGetAdsQuery, useGetAdsForMapQuery, useGetAdByIdQuery } = adsApi;
