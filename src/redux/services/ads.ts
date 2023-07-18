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
    getAds: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: 'api/announcements',
        params: { page, limit },
      }),

      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },

      // merge: (currentCache, newItems) => {
      //   currentCache.push(...newItems);
      // },

      // forceRefetch({ currentArg, previousArg }) {
      //   return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      // },

      providesTags: ['Ads'],
    }),

    getAdById: builder.query({
      query: (id) => `api/announcements/${id}`,
      providesTags: ['Ads'],
    }),

    // addCard: builder.mutation({
    //   query: ({ title, description, userId }) => ({
    //     url: 'api/card',
    //     method: 'POST',
    //     body: { title, description, userId },
    //   }),
    //   invalidatesTags: ['Cards'],
    // }),
  }),
});

export const { useGetAdsQuery, useGetAdByIdQuery } = adsApi;
