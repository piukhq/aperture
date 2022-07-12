import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectorySecondaryMids, DirectorySecondaryMid} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type MerchantSecondaryMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  secondaryMidRef?: string,
}

type DeleteMerchantSecondaryMidRefs = MerchantSecondaryMidsEndpointRefs & {
  secondaryMidRefs?: Array<string>,
}

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantSecondaryMidsApi = createApi({
  reducerPath: 'midManagementMerchantSecondaryMidsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantSecondaryMids', 'MerchantSecondaryMid'],
  endpoints: builder => ({
    getMerchantSecondaryMids: builder.query<DirectorySecondaryMids, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/secondary_mids`,
        method: 'GET',
      }),
      providesTags: ['MerchantSecondaryMids'],
    }),
    getMerchantSecondaryMid: builder.query<DirectorySecondaryMid, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/secondary_mids/${secondaryMidRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantSecondaryMid'],
    }),
    deleteMerchantSecondaryMid: builder.mutation<void, DeleteMerchantSecondaryMidRefs>({
      query: ({planRef, merchantRef, secondaryMidRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/secondary_mids/deletion`,
        method: 'POST',
        body: [
          ...secondaryMidRefs,
        ],
      }),
    }),
  }),
})

export const {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  useDeleteMerchantSecondaryMidMutation,
} = midManagementMerchantSecondaryMidsApi
