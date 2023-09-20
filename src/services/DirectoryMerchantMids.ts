import {directoryMerchantLocationsApi} from './DirectoryMerchantLocations'
import {directoryPlansApi} from 'services/DirectoryPlans'
import {directoryMerchantsApi} from './DirectoryMerchants'
import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryMerchantMid, DirectoryMids, DirectoryMid, DirectoryMerchantMidLocation, DirectoryMidMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {PaymentSchemeStatus, UrlEndpoint} from 'utils/enums'

type MerchantMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
  midRefs?: Array<string>,
}

type PostMerchantMidBody = MerchantMidsEndpointRefs & {
  onboard: boolean,
  mid_metadata: DirectoryMidMetadata
}

type PatchMerchantMidBody = MerchantMidsEndpointRefs & {
  visa_bin?: string | null,
  payment_enrolment_status?: string | null
}
type PatchMerchantMidsBody = MerchantMidsEndpointRefs & {
  mid_refs: Array<string>,
  payment_enrolment_status: PaymentSchemeStatus
}

type PutMerchantMidLocationBody = MerchantMidsEndpointRefs & {
  location_ref: string,
}

type DeleteMerchantMidRefs = MerchantMidsEndpointRefs & {
  midRefs?: Array<string>,
}

export const directoryMerchantMidsApi = createApi({
  reducerPath: 'directoryMerchantMidsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantMids', 'MerchantMid'],
  endpoints: builder => ({
    getMerchantMids: builder.query<DirectoryMids, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids`,
        method: 'GET',
      }),
      providesTags: ['MerchantMids'],
    }),
    getMerchantMidsByPage: builder.query<DirectoryMids, MerchantMidsEndpointRefs & {page: string}>({
      query: ({planRef, merchantRef, page}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids?p=${page}`,
        method: 'GET',
      }),
      providesTags: ['MerchantMids'],
      // Update the cache with the additional Mids
      async onQueryStarted ({planRef, merchantRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newMids} = await queryFulfilled
          dispatch(directoryMerchantMidsApi.util.updateQueryData('getMerchantMids', ({planRef, merchantRef}), (existingMids) => {
            return existingMids.concat(newMids)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    postMerchantMid: builder.mutation<DirectoryMid, PostMerchantMidBody>({
      query: ({onboard = false, mid_metadata, planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids`,
        method: 'POST',
        body: {
          onboard,
          mid_metadata,
        },
      }),
      async onQueryStarted ({planRef, merchantRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newMid} = await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(directoryMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
          dispatch(directoryMerchantMidsApi.util.updateQueryData('getMerchantMids', ({planRef, merchantRef}), (existingMids) => {
            existingMids.unshift(newMid)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    patchMerchantMid: builder.mutation<DirectoryMid, PatchMerchantMidBody>({
      query: ({planRef, merchantRef, midRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/${midRef}`,
        method: 'PATCH',
        body: {
          ...rest,
        },
      }),
      async onQueryStarted ({planRef, merchantRef, midRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedMid} = await queryFulfilled
          dispatch(directoryMerchantMidsApi.util.updateQueryData('getMerchantMids', ({planRef, merchantRef}), (existingMids) => {
            const index = existingMids.findIndex(mid => mid.mid_ref === midRef)
            existingMids[index] = updatedMid
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    patchMerchantMidsBulk: builder.mutation<DirectoryMid, PatchMerchantMidsBody>({
      query: ({planRef, merchantRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids`,
        method: 'PATCH',
        body: {
          ...rest,
        },
      }),
      invalidatesTags: ['MerchantMids'],
    }),
    getMerchantMid: builder.query<DirectoryMerchantMid, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/${midRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantMid'],
    }),
    putMerchantMidLocation: builder.mutation<DirectoryMerchantMidLocation, PutMerchantMidLocationBody>({
      query: ({planRef, merchantRef, midRef, location_ref}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'PUT',
        body: {
          location_ref,
        },
      }),
      async onQueryStarted ({planRef, merchantRef, midRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedLocation} = await queryFulfilled
          dispatch(directoryMerchantMidsApi.util.updateQueryData('getMerchantMid', ({planRef, merchantRef, midRef}), (existingMid) => {
            existingMid.location = updatedLocation
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchantMidLocation: builder.mutation<void, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'DELETE',
      }),
      async onQueryStarted ({planRef, merchantRef, midRef}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryMerchantLocationsApi.util.invalidateTags(['MerchantLocationLinkedMids', 'MerchantLocationAvailableMids']))
          dispatch(directoryMerchantMidsApi.util.updateQueryData('getMerchantMid', ({planRef, merchantRef, midRef}), (existingMid) => {
            existingMid.location = null as unknown as DirectoryMerchantMidLocation
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchantMid: builder.mutation<void, DeleteMerchantMidRefs>({
      query: ({planRef, merchantRef, midRefs = []}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/deletion`,
        method: 'POST',
        body: {mid_refs: [...midRefs]},
      }),
      // Update the cache with the removed MID
      async onQueryStarted ({planRef, merchantRef, midRefs = []}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(directoryMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
          dispatch(directoryMerchantLocationsApi.util.invalidateTags(['MerchantLocationLinkedMids', 'MerchantLocationAvailableMids']))
          dispatch(directoryMerchantMidsApi.util.updateQueryData('getMerchantMids', ({planRef, merchantRef}), (existingMids) => {
            // For each MID, remove from existing list of MIDs
            midRefs.forEach(midRef => {
              const index = existingMids.findIndex(mid => mid.mid_ref === midRef)
              index !== -1 && existingMids.splice(index, 1)
            })
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    postMerchantMidOnboarding: builder.mutation<DirectoryMid, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/onboarding`,
        method: 'POST',
        body: {mid_refs: midRefs}, // type checked in component to be string[]
      }),
      // No invalidate tags as the result does not update syncronously
    }),
    // TODO: IF there is a requirement to offboard multiple MIDs at once, this will need to be updated
    postMerchantMidOffboarding: builder.mutation<DirectoryMid, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/offboarding`,
        method: 'POST',
        body: {mid_refs: midRefs}, // type checked in component to be string[]
      }),
      // No invalidate tags as the result does not update syncronously
    }),
  }),
})

export const {
  usePrefetch,
  useGetMerchantMidsQuery,
  useGetMerchantMidsByPageQuery,
  useGetMerchantMidQuery,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  usePatchMerchantMidsBulkMutation,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
  useDeleteMerchantMidMutation,
  usePostMerchantMidOnboardingMutation,
  usePostMerchantMidOffboardingMutation,
} = directoryMerchantMidsApi
