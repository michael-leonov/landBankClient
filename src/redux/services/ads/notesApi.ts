import { Cookies } from 'react-cookie';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { NotesResponse } from './interface';

const baseUrl = process.env.REACT_APP_API_URL as string;

const token = new Cookies().get('token');

export const notesApi = createApi({
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
    addNote: builder.mutation({
      invalidatesTags: ['Notes'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: 'api/notes/add',
      }),
    }),

    editNote: builder.mutation({
      invalidatesTags: ['Notes'],
      query: ({ data, id }) => ({
        body: data,
        method: 'PATCH',
        url: `api/notes/${id}`,
      }),
    }),

    getNotes: builder.query<
      NotesResponse,
      { announcementId: number | undefined; userId: number | undefined }
    >({
      providesTags: ['Notes'],
      query: ({ announcementId, userId }) => ({
        params: { announcementId, userId },
        url: 'api/notes',
      }),
    }),

    removeNote: builder.mutation({
      invalidatesTags: ['Notes'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `api/notes/${id}`,
      }),
    }),
  }),

  reducerPath: 'notesApi',

  tagTypes: ['Notes'],
});

export const { useAddNoteMutation, useEditNoteMutation, useGetNotesQuery, useRemoveNoteMutation } =
  notesApi;