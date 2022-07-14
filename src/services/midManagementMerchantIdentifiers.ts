import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryIdentifiers, DirectoryIdentifier} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantIdentifiersEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  identifierRef?: string,
}

type DeleteMerchantIdentifierRefs = MerchantIdentifiersEndpointRefs & {
  identifierRefs?: Array<string>,
}

export const midManagementMerchantIdentifiersApi = createApi({
  reducerPath: 'midManagementMerchantIdentifiersApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantIdentifiers', 'MerchantIdentifier'],
  endpoints: builder => ({
    getMerchantIdentifiers: builder.query<DirectoryIdentifiers, MerchantIdentifiersEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/identifiers`,
        method: 'GET',
      }),
      providesTags: ['MerchantIdentifiers'],
    }),
    getMerchantIdentifier: builder.query<DirectoryIdentifier, MerchantIdentifiersEndpointRefs>({
      query: ({planRef, merchantRef, identifierRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/identifiers/${identifierRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantIdentifier'],
    }),
    deleteMerchantIdentifier: builder.mutation<void, DeleteMerchantIdentifierRefs>({
      query: ({planRef, merchantRef, identifierRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/identifiers/deletion`,
        method: 'POST',
        body: [
          ...identifierRefs,
        ],
      }),
      invalidatesTags: ['MerchantIdentifiers'],
    }),
  }),
})

export const {
  useGetMerchantIdentifiersQuery,
  useGetMerchantIdentifierQuery,
  useDeleteMerchantIdentifierMutation,
} = midManagementMerchantIdentifiersApi
