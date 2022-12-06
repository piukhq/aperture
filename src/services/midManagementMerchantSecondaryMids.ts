import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectorySecondaryMids, DirectorySecondaryMid, DirectoryMerchantMidLocation, DirectorySecondaryMidMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantSecondaryMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  secondaryMidRef?: string,
  locationRef?: string,
  linkRef?: string,
}

type PostMerchantSecondaryMidBody = MerchantSecondaryMidsEndpointRefs & {
  onboard: boolean,
  secondary_mid_metadata: DirectorySecondaryMidMetadata,
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
    postMerchantSecondaryMid: builder.mutation<DirectorySecondaryMid, PostMerchantSecondaryMidBody>({
      query: ({planRef, merchantRef, onboard = false, secondary_mid_metadata}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids`,
        method: 'POST',
        body: {
          onboard,
          secondary_mid_metadata,
        },
      }),
      async onQueryStarted ({planRef, merchantRef, locationRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newSecondaryMid} = await queryFulfilled
          dispatch(midManagementMerchantSecondaryMidsApi.util.updateQueryData('getMerchantSecondaryMids', ({planRef, merchantRef, locationRef}), (existingSecondaryMids) => {
            existingSecondaryMids.push(newSecondaryMid)
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchantSecondaryMidLocationLink: builder.mutation<void, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, linkRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mid_location_links/${linkRef}`,
        method: 'DELETE',
      }),
      // Update the cache with the removed linked location
      async onQueryStarted ({planRef, merchantRef, secondaryMidRef, linkRef}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementMerchantSecondaryMidsApi.util.updateQueryData('getMerchantSecondaryMidLinkedLocations', ({planRef, merchantRef, secondaryMidRef}), (existingLinkedLocations) => {
            const index = existingLinkedLocations.findIndex(linkedLocation => linkedLocation.link_ref === linkRef)
            index !== -1 && existingLinkedLocations.splice(index, 1)
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
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

    // TODO: IF there is a requirement to onboard multiple Secondary MIDs at once, this will need to be updated
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
    // TODO: IF there is a requirement to offboard multiple Secondary MIDs at once, this will need to be updated
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
  usePostMerchantSecondaryMidMutation,
  useGetMerchantSecondaryMidLinkedLocationsQuery,
  useDeleteMerchantSecondaryMidLocationLinkMutation,
  useDeleteMerchantSecondaryMidMutation,
  usePostMerchantSecondaryMidOnboardingMutation,
  usePostMerchantSecondaryMidOffboardingMutation,
} = midManagementMerchantSecondaryMidsApi
