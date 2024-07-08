import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL, 
    credentials: 'include' 
    }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        SignUp: builder.mutation({
            query: (SignUpData) => ({
                url: `/auth/SignUp`,
                method:'PUT',
                body:SignUpData
            })
        }),
        LogIn: builder.mutation({
            query: (Logindata) => ({
                url: `/auth/Login`,
                method:'POST',
                body:Logindata
            })
        }),

        refeshTokenQuery: builder.query({
            query: () => `/auth/refreshToken`,
            providesTags:['auth']
        })
    })
})

export const{useRefeshTokenQueryQuery,useSignUpMutation,useLogInMutation}=authApi