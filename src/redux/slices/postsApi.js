import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL, 
    credentials: 'include' 
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    fetchAllPublicData: builder.mutation({
      query: (page) => `/posts/posts?limit=3&page=${page}`,
      providesTags: ['Post'],
    }),
    fetchDataById: builder.query({
      query: (id) => `/posts/:${id}`,
       providesTags: ['Post'],
    }),
    fetchDataByTopic: builder.mutation({
      query: (topic) => `/posts/topic?type=${topic}`,
      providesTags: ['Post'],
    }),
    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),
    DeletPostApi: builder.mutation({
      query: (id) => ({
        url: `/posts/${id.trim()}`, 
        method:'DELETE'
      }),
       providesTags: ['Post'],
    })
  }),
});

export const { useFetchAllPublicDataMutation,useFetchDataByIdQuery, useFetchDataByTopicMutation, useAddNewPostMutation ,useDeletPostApiMutation } = postsApi;
