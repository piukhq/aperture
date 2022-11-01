import {createApi} from '@reduxjs/toolkit/query/react'
import {LookupUserHistoryEntity} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

export const customerWalletLookupHistoryApi = createApi({
  reducerPath: 'customerWalletLookupHistoryApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['LookupHistory'],
  endpoints: builder => ({
    getLookupHistory: builder.query<LookupUserHistoryEntity[], void>({
      query: () => ({
        url: `${UrlEndpoint.USER_LOOKUP}`,
        method: 'GET',
      }),
      providesTags: ['LookupHistory'],
    }),
    putLookupHistory: builder.mutation<LookupUserHistoryEntity, LookupUserHistoryEntity>({
      query: ({...rest}) => ({
        url: `${UrlEndpoint.USER_LOOKUP}`,
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
