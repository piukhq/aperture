import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryMerchantMid, DirectoryMids, DirectoryMid, DirectoryMerchantMidLocation, DirectoryMidMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantMidsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
}

type PostMerchantMidBody = MerchantMidsEndpointRefs & {
  onboard: boolean,
  mid_metadata: DirectoryMidMetadata
}

type PatchMerchantMidBody = MerchantMidsEndpointRefs & {
  visa_bin?: string | null,
  payment_enrolment_status?: string | null
}

type PutMerchantMidLocationBody = MerchantMidsEndpointRefs & {
  location_ref: string,
}

type DeleteMerchantMidRefs = MerchantMidsEndpointRefs & {
  midRefs?: Array<string>,
}

export const midManagementMerchantMidsApi = createApi({
  reducerPath: 'midManagementMerchantMidsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantMids', 'MerchantMid'],
  endpoints: builder => ({
    getMerchantMids: builder.query<DirectoryMids, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids?n=100`,
        method: 'GET',
      }),
      providesTags: ['MerchantMids'],
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
          dispatch(midManagementMerchantMidsApi.util.updateQueryData('getMerchantMids', ({planRef, merchantRef}), (existingMids) => {
            existingMids.push(newMid)
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
          dispatch(midManagementMerchantMidsApi.util.updateQueryData('getMerchantMids', ({planRef, merchantRef}), (existingMids) => {
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
          dispatch(midManagementMerchantMidsApi.util.updateQueryData('getMerchantMid', ({planRef, merchantRef, midRef}), (existingMid) => {
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
          dispatch(midManagementMerchantMidsApi.util.updateQueryData('getMerchantMid', ({planRef, merchantRef, midRef}), (existingMid) => {
            existingMid.location = null
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchantMid: builder.mutation<void, DeleteMerchantMidRefs>({
      query: ({planRef, merchantRef, midRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/deletion`,
        method: 'POST',
        body: [
          ...midRefs,
        ],
      }),
      // Update the cache with the removed MID
      async onQueryStarted ({planRef, merchantRef, midRefs}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementMerchantMidsApi.util.updateQueryData('getMerchantMids', ({planRef, merchantRef}), (existingMids) => {
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
    // TODO: IF there is a requirement to onboard multiple MIDs at once, this will need to be updated
    postMerchantMidOnboarding: builder.mutation<DirectoryMid, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/onboarding`,
        method: 'POST',
        body: [midRef],
      }),
      invalidatesTags: ['MerchantMids'],
      async onQueryStarted ({planRef, merchantRef, midRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: onboardingMidsArray} = await queryFulfilled
          dispatch(midManagementMerchantMidsApi.util.updateQueryData('getMerchantMid', ({planRef, merchantRef, midRef}), (existingMid) => {
            Object.assign(existingMid, {...existingMid, mid: onboardingMidsArray[0]})
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    // TODO: IF there is a requirement to offboard multiple MIDs at once, this will need to be updated
    postMerchantMidOffboarding: builder.mutation<DirectoryMid, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/offboarding`,
        method: 'POST',
        body: [midRef],
      }),
      invalidatesTags: ['MerchantMids'],
      async onQueryStarted ({planRef, merchantRef, midRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: offboardingMidsArray} = await queryFulfilled
          dispatch(midManagementMerchantMidsApi.util.updateQueryData('getMerchantMid', ({planRef, merchantRef, midRef}), (existingMid) => {
            Object.assign(existingMid, {...existingMid, mid: offboardingMidsArray[0]})
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
  useGetMerchantMidsQuery,
  useGetMerchantMidQuery,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
  useDeleteMerchantMidMutation,
  usePostMerchantMidOnboardingMutation,
  usePostMerchantMidOffboardingMutation,
} = midManagementMerchantMidsApi
