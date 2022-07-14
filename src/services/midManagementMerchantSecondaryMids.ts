import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectorySecondaryMids, DirectorySecondaryMid} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantSecondaryMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  secondaryMidRef?: string,
}

type DeleteMerchantSecondaryMidRefs = MerchantSecondaryMidsEndpointRefs & {
  secondaryMidRefs?: Array<string>,
}

export const midManagementMerchantSecondaryMidsApi = createApi({
  reducerPath: 'midManagementMerchantSecondaryMidsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantSecondaryMids', 'MerchantSecondaryMid'],
  endpoints: builder => ({
    getMerchantSecondaryMids: builder.query<DirectorySecondaryMids, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids`,
        method: 'GET',
      }),
      providesTags: ['MerchantSecondaryMids'],
    }),
    getMerchantSecondaryMid: builder.query<DirectorySecondaryMid, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/${secondaryMidRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantSecondaryMid'],
    }),
    deleteMerchantSecondaryMid: builder.mutation<void, DeleteMerchantSecondaryMidRefs>({
      query: ({planRef, merchantRef, secondaryMidRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/deletion`,
        method: 'POST',
        body: [
          ...secondaryMidRefs,
        ],
      }),
      invalidatesTags: ['MerchantSecondaryMids'],
    }),
  }),
})

export const {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  useDeleteMerchantSecondaryMidMutation,
} = midManagementMerchantSecondaryMidsApi
