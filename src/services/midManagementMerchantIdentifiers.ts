import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryIdentifiers, DirectoryIdentifier} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type MerchantIdentifiersEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  identifierRef?: string,
}

type DeleteMerchantIdentifierRefs = MerchantIdentifiersEndpointRefs & {
  identifierRefs?: Array<string>,
}

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantIdentifiersApi = createApi({
  reducerPath: 'midManagementMerchantIdentifiersApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantIdentifiers', 'MerchantIdentifier'],
  endpoints: builder => ({
    getMerchantIdentifiers: builder.query<DirectoryIdentifiers, MerchantIdentifiersEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/identifiers`,
        method: 'GET',
      }),
      providesTags: ['MerchantIdentifiers'],
    }),
    getMerchantIdentifier: builder.query<DirectoryIdentifier, MerchantIdentifiersEndpointRefs>({
      query: ({planRef, merchantRef, identifierRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/identifiers/${identifierRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantIdentifier'],
    }),
    deleteMerchantIdentifier: builder.mutation<void, DeleteMerchantIdentifierRefs>({
      query: ({planRef, merchantRef, identifierRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/identifiers/deletion`,
        method: 'POST',
        body: [
          ...identifierRefs,
        ],
      }),
    }),
  }),
})

export const {
  useGetMerchantIdentifiersQuery,
  useGetMerchantIdentifierQuery,
  useDeleteMerchantIdentifierMutation,
} = midManagementMerchantIdentifiersApi
