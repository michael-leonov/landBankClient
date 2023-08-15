/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Ad, AdParams, AdsResponse, ToggleAdCheckedBodyType } from './interface';

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
      query: ({
        address,
        areaFrom,
        areaTo,
        areaUnit,
        domain,
        limit,
        page,
        priceFrom,
        priceTo,
      }) => ({
        params: {
          address: address ? encodeURIComponent(address) : undefined,
          area_from: areaFrom,
          area_to: areaTo,
          areaUnit,
          domain: domain ? encodeURIComponent(domain.join(',')) : undefined,
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

    toggleChecked: builder.mutation<{ id: number; isChecked: boolean }, ToggleAdCheckedBodyType>({
      invalidatesTags: ['Ads'],
      query: ({ id, isChecked, token }) => ({
        body: { id, isChecked },
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        url: `api/announcements/${id}/checked`,
      }),
    }),
  }),

  reducerPath: 'adsApi',

  tagTypes: ['Ads'],
});

export const { useGetAdByIdQuery, useGetAdsForMapQuery, useGetAdsQuery, useToggleCheckedMutation } =
  adsApi;
