/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Ad, AdParams, AdsResponse } from './interface';

const baseUrl = process.env.REACT_APP_API_URL as string;

export const adsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    getAdById: builder.query<Ad, number>({
      providesTags: ['Ads'],
      query: (id) => `api/announcements/${id}`,
    }),

    getAds: builder.query<AdsResponse, AdParams>({
      providesTags: ['Ads'],
      query: ({ areaFrom, areaTo, domain, limit, page, priceFrom, priceTo }) => ({
        params: {
          area_from: areaFrom,
          area_to: areaTo,
          domain,
          limit,
          page,
          price_from: priceFrom,
          price_to: priceTo,
        },
        url: 'api/announcements',
      }),
    }),

    getAdsForMap: builder.query<AdsResponse, void>({
      providesTags: ['Ads'],
      query: () => 'api/announcements/map',
    }),
  }),

  reducerPath: 'adsApi',

  tagTypes: ['Ads'],
});

export const { useGetAdByIdQuery, useGetAdsForMapQuery, useGetAdsQuery } = adsApi;
