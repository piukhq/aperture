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
      // Update the cache with the removed Identifier
      async onQueryStarted ({planRef, merchantRef, identifierRefs}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementMerchantIdentifiersApi.util.updateQueryData('getMerchantIdentifiers', ({planRef, merchantRef}), (existingIdentifiers) => {
            // For each Identifier, remove from existing list of Identifiers
            identifierRefs.forEach(identifierRef => {
              const index = existingIdentifiers.findIndex(identifier => identifier.identifier_ref === identifierRef)
              index !== -1 && existingIdentifiers.splice(index, 1)
            })
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    postMerchantIdentifierOnboarding: builder.mutation<DirectoryIdentifier, MerchantIdentifiersEndpointRefs>({
      query: ({planRef, merchantRef, identifierRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/identifiers/onboarding`,
        method: 'POST',
        body: [identifierRef],
      }),
      invalidatesTags: ['MerchantIdentifiers', 'MerchantIdentifier'],
    }),
    postMerchantIdentifierOffboarding: builder.mutation<DirectoryIdentifier, MerchantIdentifiersEndpointRefs>({
      query: ({planRef, merchantRef, identifierRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/identifiers/offboarding`,
        method: 'POST',
        body: [identifierRef],
      }),
      invalidatesTags: ['MerchantIdentifiers', 'MerchantIdentifier'],
    }),
  }),
})

export const {
  useGetMerchantIdentifiersQuery,
  useGetMerchantIdentifierQuery,
  usePostMerchantIdentifierOnboardingMutation,
  usePostMerchantIdentifierOffboardingMutation,
  useDeleteMerchantIdentifierMutation,
} = midManagementMerchantIdentifiersApi
