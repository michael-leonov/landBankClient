/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Ad,
  AdParams,
  AddToFavoritiesAdsBodyType,
  AdsCountResponse,
  AdsResponse,
  ToggleAdCheckedBodyType,
} from './interface';

const baseUrl = process.env.REACT_APP_API_URL as string;

export const adsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    addAd: builder.mutation({
      invalidatesTags: ['Ads', 'Ads_count'],
      query: ({ data, token }) => ({
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'POST',
        url: '/api/announcements/add_one',
      }),
    }),

    addToFavoritiesAds: builder.mutation<
      { announcementId: number; userId: number },
      AddToFavoritiesAdsBodyType
    >({
      invalidatesTags: ['Ads_favorities'],
      query: ({ announcementId, token, userId }) => ({
        body: { announcementId, userId },
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'POST',
        url: '/api/announcements/favorities/add',
      }),
    }),

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
        dateRange,
        domain,
        isRent,
        keyword,
        landCategory,
        landUse,
        limit,
        page,
        priceFrom,
        priceTo,
        sorting,
      }) => ({
        params: {
          address: address ? encodeURIComponent(address.join(',')) : undefined,
          area_from: areaFrom,
          area_to: areaTo,
          areaUnit,
          date_range: dateRange,
          domain: domain ? encodeURIComponent(domain.join(',')) : undefined,
          is_rent: isRent,
          keyword: keyword ? encodeURIComponent(keyword) : undefined,
          land_category: landCategory ? encodeURIComponent(landCategory.join(',')) : undefined,
          land_use: landUse ? encodeURIComponent(landUse.join(',')) : undefined,
          limit,
          page,
          price_from: priceFrom,
          price_to: priceTo,
          sorting: JSON.stringify(sorting),
        },
        url: 'api/announcements',
      }),
    }),

    getAdsCount: builder.query<AdsCountResponse, void>({
      providesTags: ['Ads_count'],
      query: () => 'api/announcements/count',
    }),

    getFavoritiesAds: builder.query<AdsResponse, { userId: number; token: string }>({
      providesTags: ['Ads_favorities'],
      query: ({ token, userId }) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { userId },
        url: 'api/announcements/favorities',
      }),
    }),

    matchFavoriteAnnouncement: builder.query<
      { isFavorite: boolean },
      { userId: number; token: string; announcementId: number }
    >({
      providesTags: ['Ads_favorities'],
      query: ({ announcementId, token, userId }) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { announcementId, userId },
        url: 'api/announcements/favorities/match',
      }),
    }),

    removeFromFavoritiesAds: builder.mutation<
      { announcementId: number; userId: number },
      AddToFavoritiesAdsBodyType
    >({
      invalidatesTags: ['Ads_favorities'],
      query: ({ announcementId, token, userId }) => ({
        body: { announcementId, userId },
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
        url: '/api/announcements/favorities/remove',
      }),
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

  tagTypes: ['Ads', 'Ads_count', 'Ads_favorities'],
});

export const {
  useAddAdMutation,
  useAddToFavoritiesAdsMutation,
  useGetAdByIdQuery,
  useGetAdsCountQuery,
  useGetAdsQuery,
  useGetFavoritiesAdsQuery,
  useMatchFavoriteAnnouncementQuery,
  useRemoveFromFavoritiesAdsMutation,
  useToggleCheckedMutation,
} = adsApi;
