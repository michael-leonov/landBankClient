import { Cookies } from 'react-cookie';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IAddRequestAdBody,
  IGetRequestAdsParams,
  IGetRequestAdsResponse,
  IRequestAd,
} from './interface';
import { TEditRequestAdBody } from './types';

const baseUrl = process.env.REACT_APP_API_URL as string;
const token = new Cookies().get('token');

export const requestAdsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    addRequestAd: builder.mutation<IRequestAd, IAddRequestAdBody>({
      invalidatesTags: ['RequestAds'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'api/request_announcements',
      }),
    }),

    editRequestAd: builder.mutation<IRequestAd, { data: TEditRequestAdBody; id: number }>({
      invalidatesTags: ['RequestAds'],
      query: ({ data, id }) => ({
        body: data,
        method: 'PATCH',
        url: `api/request_announcements/${id}`,
      }),
    }),

    getRequestAds: builder.query<IGetRequestAdsResponse, IGetRequestAdsParams>({
      providesTags: ['RequestAds'],
      query: (params) => ({
        params,
        url: 'api/request_announcements',
      }),
    }),

    removeRequestAd: builder.mutation<IRequestAd, { id: number }>({
      invalidatesTags: ['RequestAds'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/api/request_announcements/${id}`,
      }),
    }),
  }),

  reducerPath: 'requestAdsApi',

  tagTypes: ['RequestAds'],
});

export const {
  useAddRequestAdMutation,
  useEditRequestAdMutation,
  useGetRequestAdsQuery,
  useRemoveRequestAdMutation,
} = requestAdsApi;
