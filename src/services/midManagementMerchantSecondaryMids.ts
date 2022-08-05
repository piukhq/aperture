import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectorySecondaryMids, DirectorySecondaryMid} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantSecondaryMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  secondaryMidRef?: string,
  locationRef?: string,
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
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids${locationRef && `?exclude_location=${locationRef}`}`,
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
      // Update the cache with the removed Secondary MID
      async onQueryStarted ({planRef, merchantRef, secondaryMidRefs}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementMerchantSecondaryMidsApi.util.updateQueryData('getMerchantSecondaryMids', ({planRef, merchantRef}), (existingSecondaryMids) => {
            // For each Secondary MID, remove from existing list of Secondary MIDs
            secondaryMidRefs.forEach(secondaryMidRef => {
              const index = existingSecondaryMids.findIndex(secondaryMid => secondaryMid.secondary_mid_ref === secondaryMidRef)
              index !== -1 && existingSecondaryMids.splice(index, 1)
            })
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      }}),
  }),
})

export const {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  useDeleteMerchantSecondaryMidMutation,
} = midManagementMerchantSecondaryMidsApi
