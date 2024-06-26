import {directoryMerchantLocationsApi} from 'services/DirectoryMerchantLocations'
import {directoryPlansApi} from 'services/DirectoryPlans'
import {directoryMerchantsApi} from './DirectoryMerchants'
import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectorySecondaryMids, DirectorySecondaryMid, DirectoryMerchantMidLocation, DirectorySecondaryMidMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantSecondaryMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  secondaryMidRef?: string,
  secondaryMidRefs?: Array<string>,
  locationRef?: string,
  linkRef?: string,
  getAll?: boolean,
}

type PostMerchantSecondaryMidBody = MerchantSecondaryMidsEndpointRefs & {
  onboard: boolean,
  secondary_mid_metadata: DirectorySecondaryMidMetadata,
}

type PatchMerchantSecondaryMidBody = MerchantSecondaryMidsEndpointRefs & {
  payment_enrolment_status?: string | null
}

type PatchMerchantSecondaryMidsBody = MerchantSecondaryMidsEndpointRefs & {
  payment_enrolment_status: string,
  secondary_mid_refs: Array<string>,
}

type DeleteMerchantSecondaryMidRefs = MerchantSecondaryMidsEndpointRefs & {
  secondaryMidRefs?: Array<string>,
}

export const directoryMerchantSecondaryMidsApi = createApi({
  reducerPath: 'directoryMerchantSecondaryMidsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantSecondaryMids', 'MerchantSecondaryMid', 'MerchantSecondaryMidLinkedLocations'],
  endpoints: builder => ({
    getMerchantSecondaryMids: builder.query<DirectorySecondaryMids, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef, getAll}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids?${getAll ? 'n=3000&' : ''}${locationRef ? `exclude_location=${locationRef}` : ''}`,
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
      invalidatesTags: ['MerchantSecondaryMids'],
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(directoryMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    postMerchantSecondaryMidLocationLink: builder.mutation<DirectoryMerchantMidLocation, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/${secondaryMidRef}/secondary_mid_location_links`,
        method: 'POST',
        body: {
          location_refs: [locationRef],
        },
      }),
      invalidatesTags: ['MerchantSecondaryMidLinkedLocations'],
    }),
    patchMerchantSecondaryMid: builder.mutation<DirectorySecondaryMid, PatchMerchantSecondaryMidBody>({
      query: ({planRef, merchantRef, secondaryMidRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/${secondaryMidRef}`,
        method: 'PATCH',
        body: {
          ...rest,
        },
      }),
      async onQueryStarted ({planRef, merchantRef, secondaryMidRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedSecondaryMid} = await queryFulfilled
          dispatch(directoryMerchantSecondaryMidsApi.util.updateQueryData('getMerchantSecondaryMids', ({planRef, merchantRef}), (existingSecondaryMids) => {
            const index = existingSecondaryMids.findIndex(secondaryMid => secondaryMid.secondary_mid_ref === secondaryMidRef)
            existingSecondaryMids[index] = updatedSecondaryMid
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    patchMerchantSecondaryMidsBulk: builder.mutation<DirectorySecondaryMid, PatchMerchantSecondaryMidsBody>({
      query: ({planRef, merchantRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids`,
        method: 'PATCH',
        body: {
          ...rest,
        },
      }),
      invalidatesTags: ['MerchantSecondaryMids'],
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
          dispatch(directoryMerchantLocationsApi.util.invalidateTags(['MerchantLocationLinkedSecondaryMids']))
          dispatch(directoryMerchantSecondaryMidsApi.util.updateQueryData('getMerchantSecondaryMidLinkedLocations', ({planRef, merchantRef, secondaryMidRef}), (existingLinkedLocations) => {
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
        body: {secondary_mid_refs: secondaryMidRefs ? [...secondaryMidRefs] : []},
      }),
      invalidatesTags: ['MerchantSecondaryMids'], // TODO: Optimistic update does not work though it does for mids deletion?
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(directoryMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
          dispatch(directoryMerchantLocationsApi.util.invalidateTags(['MerchantLocationLinkedSecondaryMids']))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    postMerchantSecondaryMidOnboarding: builder.mutation<DirectorySecondaryMid, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/onboarding`,
        method: 'POST',
        body: {secondary_mid_refs: secondaryMidRefs},
      }),
      // No invalidate tags as the result does not update syncronously

    }),
    postMerchantSecondaryMidOffboarding: builder.mutation<DirectorySecondaryMid, MerchantSecondaryMidsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mids/offboarding`,
        method: 'POST',
        body: {secondary_mid_refs: secondaryMidRefs},
      }),
      // No invalidate tags as the result does not update syncronously
    }),
  }),
})

export const {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  usePostMerchantSecondaryMidMutation,
  usePatchMerchantSecondaryMidMutation,
  usePatchMerchantSecondaryMidsBulkMutation,
  useGetMerchantSecondaryMidLinkedLocationsQuery,
  usePostMerchantSecondaryMidLocationLinkMutation,
  useDeleteMerchantSecondaryMidLocationLinkMutation,
  useDeleteMerchantSecondaryMidMutation,
  usePostMerchantSecondaryMidOnboardingMutation,
  usePostMerchantSecondaryMidOffboardingMutation,
} = directoryMerchantSecondaryMidsApi
