import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectorySecondaryMids, DirectorySecondaryMid, DirectoryMerchantMidLocation} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantSecondaryMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  secondaryMidRef?: string,
  locationRef?: string,
  linkRef?: string,
}

type DeleteMerchantSecondaryMidRefs = MerchantSecondaryMidsEndpointRefs & {
  secondaryMidRefs?: Array<string>,
}

export const midManagementMerchantSecondaryMidsApi = createApi({
  reducerPath: 'midManagementMerchantSecondaryMidsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantSecondaryMids', 'MerchantSecondaryMid', 'MerchantSecondaryMidLinkedLocations'],
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
    getMerchantSecondaryMidLinkedLocations: builder.query<Array<DirectoryMerchantMidLocation>, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/${secondaryMidRef}/secondary_mid_location_links`,
        method: 'GET',
      }),
      providesTags: ['MerchantSecondaryMidLinkedLocations'],
    }),
    deleteMerchantSecondaryMidLocationLink: builder.mutation<void, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, linkRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mid_location_links/${linkRef}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MerchantSecondaryMidLinkedLocations'],
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
    postMerchantSecondaryMidOnboarding: builder.mutation<DirectorySecondaryMid, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/onboarding`,
        method: 'POST',
        body: [secondaryMidRef],
      }),
      invalidatesTags: ['MerchantSecondaryMids'],
      async onQueryStarted ({planRef, merchantRef, secondaryMidRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: onboardingSecondaryMidsArray} = await queryFulfilled
          dispatch(midManagementMerchantSecondaryMidsApi.util.updateQueryData('getMerchantSecondaryMid', ({planRef, merchantRef, secondaryMidRef}), (existingSecondaryMid) => {
            Object.assign(existingSecondaryMid, onboardingSecondaryMidsArray[0])
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    postMerchantSecondaryMidOffboarding: builder.mutation<DirectorySecondaryMid, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/offboarding`,
        method: 'POST',
        body: [secondaryMidRef],
      }),
      invalidatesTags: ['MerchantSecondaryMids'],
      async onQueryStarted ({planRef, merchantRef, secondaryMidRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: offboardingSecondaryMidsArray} = await queryFulfilled
          dispatch(midManagementMerchantSecondaryMidsApi.util.updateQueryData('getMerchantSecondaryMid', ({planRef, merchantRef, secondaryMidRef}), (existingSecondaryMid) => {
            Object.assign(existingSecondaryMid, offboardingSecondaryMidsArray[0])
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
  }),
})

export const {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  useGetMerchantSecondaryMidLinkedLocationsQuery,
  useDeleteMerchantSecondaryMidLocationLinkMutation,
  useDeleteMerchantSecondaryMidMutation,
  usePostMerchantSecondaryMidOnboardingMutation,
  usePostMerchantSecondaryMidOffboardingMutation,
} = midManagementMerchantSecondaryMidsApi
