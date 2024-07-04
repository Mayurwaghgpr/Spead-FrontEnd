import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL, 
    credentials: 'include' 
    }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        fetchUserProfile: builder.query({
            query: (userId) => `/profile/:${userId}`,
            providesTags:['Profile']
        })
    })
})

export const{useFetchUserProfileQuery}=profileApi