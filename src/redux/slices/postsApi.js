import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL, 
    credentials: 'include' 
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: () => '/posts/posts',
      providesTags: ['Post'],
    }),
    fetchDataById: builder.query({
      query: (id) => `/posts/:${id}`,
       providesTags: ['Post'],
    }),
    fetchDataByTopic: builder.query({
      query: (topic) => `/posts?type=${topic}`,
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
    DeletPostApi: builder.query({
      query: (id) => ({
        url: `/posts/${id.trim()}`, 
        method:'DELETE'
      }),
       providesTags: ['Post'],
    })
  }),
});

export const { useFetchAllPostsQuery,useFetchDataByIdQuery, useFetchDataByTopicQuery, useAddNewPostMutation ,useDeletPostApiQuery } = postsApi;
