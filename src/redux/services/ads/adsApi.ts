/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Ad,
  AdParams,
  AddToFavoritiesAdsBodyType,
  AdsCountResponse,
  AdsResponse,
  SetStatusBodyType,
  ToggleAdCheckedBodyType,
} from './interface';

const baseUrl = process.env.REACT_APP_API_URL as string;

export const adsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    addAd: builder.mutation<Ad, { data: FormData; token: string }>({
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

    editAd: builder.mutation<
      Ad,
      { data: FormData; id: number | undefined; isRemoveInitImages: boolean; token: string }
    >({
      invalidatesTags: ['Ads', 'Ads_count'],
      query: ({ data, id, isRemoveInitImages, token }) => ({
        body: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        params: {
          isRemoveInitImages,
        },
        url: `/api/announcements/${id}`,
      }),
    }),

    getAdById: builder.query<Ad, number | undefined>({
      providesTags: ['Ads'],
      query: (id) => `api/announcements/${id}`,
    }),

    getAds: builder.query<AdsResponse, AdParams>({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      providesTags: (result, error, { provideTag }): any => [provideTag], // TODO: типизировать
      query: ({
        address,
        areaFrom,
        areaTo,
        areaUnit,
        dateRange,
        domain,
        geoBounds,
        isRent,
        keyword,
        landCategory,
        landUse,
        limit,
        page,
        priceFrom,
        priceTo,
        provideTag,
        sorting,
        status,
        userId,
      }) => ({
        params: {
          address: address ? encodeURIComponent(address.join(',')) : undefined,
          area_from: areaFrom,
          area_to: areaTo,
          areaUnit,
          date_range: dateRange,
          domain: domain ? encodeURIComponent(domain.join(',')) : undefined,
          geoBounds,
          is_rent: isRent,
          keyword: keyword ? encodeURIComponent(keyword) : undefined,
          land_category: landCategory ? encodeURIComponent(landCategory.join(',')) : undefined,
          land_use: landUse ? encodeURIComponent(landUse.join(',')) : undefined,
          limit,
          page,
          price_from: priceFrom,
          price_to: priceTo,
          provideTag,
          sorting: JSON.stringify(sorting),
          status,
          userId,
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

    removeAd: builder.mutation({
      invalidatesTags: ['Ads', 'Ads_count'],
      query: ({ id, token }) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
        url: `/api/announcements/${id}`,
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

    setStatus: builder.mutation<{ id: number; status: boolean }, SetStatusBodyType>({
      invalidatesTags: ['Ads'],
      query: ({ id, status, token }) => ({
        body: { id, status },
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        url: `api/announcements/${id}/status`,
      }),
    }),

    toggleChecked: builder.mutation<{ id: number; is_checked: boolean }, ToggleAdCheckedBodyType>({
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

  tagTypes: ['Ads', 'Ads_map', 'Ads_count', 'Ads_favorities'],
});

export const {
  useAddAdMutation,
  useAddToFavoritiesAdsMutation,
  useEditAdMutation,
  useGetAdByIdQuery,
  useGetAdsCountQuery,
  useGetAdsQuery,
  useGetFavoritiesAdsQuery,
  useMatchFavoriteAnnouncementQuery,
  useRemoveAdMutation,
  useRemoveFromFavoritiesAdsMutation,
  useSetStatusMutation,
  useToggleCheckedMutation,
} = adsApi;
