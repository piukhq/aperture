import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {LookupUserHistoryEntity} from 'types'
import {getCookie} from 'cookies-next'

const url = '/api/v1/customer_wallet/user_lookups'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_PORTAL_API_URL,
  prepareHeaders: async (headers) => {
    try {
      headers.set('authorization', `Bearer ${getCookie('authToken')}`)
      headers.set('accept', 'application/json;v=1.3')
      headers.set('user', 'mock_session_id')
      return headers
    } catch (error) {
      console.error(error)
      return null
    }
  },
})

export const customerWalletLookupHistoryApi = createApi({
  reducerPath: 'customerWalletLookupHistoryApi',
  baseQuery,
  tagTypes: ['LookupHistory'],
  endpoints: builder => ({
    getLookupHistory: builder.query<LookupUserHistoryEntity[], void>({
      query: () => ({
        url,
        method: 'GET',
      }),
      providesTags: ['LookupHistory'],
    }),
    putLookupHistory: builder.mutation<LookupUserHistoryEntity, LookupUserHistoryEntity>({
      query: ({...rest}) => ({
        url,
        method: 'PUT',
        body: {
          ...rest,
        },
      }),
      invalidatesTags: ['LookupHistory'],
    }),
  }),
})

export const {useGetLookupHistoryQuery, usePutLookupHistoryMutation} = customerWalletLookupHistoryApi
