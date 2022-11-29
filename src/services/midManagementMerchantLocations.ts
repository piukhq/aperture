import {createApi} from '@reduxjs/toolkit/query/react'
import {
  DirectoryLocations,
  DirectoryLocation,
  DirectoryLocationMetadata,
  DirectoryMerchantLocationMid,
  DirectoryMerchantLocationAvailableMids,
  DirectoryMerchantLocationSecondaryMid,
} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantLocationsEndpointRefs = {
  planRef?: string,
  merchantRef?: string,
  midRef?: string,
  locationRef?: string,
  secondaryMidRef?: string,
  linkRef?: string,
}

type PostMerchantLocationBody = MerchantLocationsEndpointRefs & {
  midRefs: string[],
}

type PutPostMerchantLocationBody = MerchantLocationsEndpointRefs & DirectoryLocationMetadata

type DeleteMerchantLocationRefs = MerchantLocationsEndpointRefs & {
  locationRefs?: Array<string>,
}

export const midManagementMerchantLocationsApi = createApi({
  reducerPath: 'midManagementMerchantLocationsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantLocations', 'MerchantLocation', 'MerchantLocationLinkedMids', 'MerchantLocationLinkedSecondaryMids', 'MerchantLocationAvailableMids'],
  endpoints: builder => ({
    getMerchantLocations: builder.query<DirectoryLocations, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations${secondaryMidRef && `?exclude_secondary_mid=${secondaryMidRef}`}`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocations'],
    }),
    getMerchantLocation: builder.query<DirectoryLocation, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocation'],
    }),
    putMerchantLocation: builder.mutation<DirectoryLocation, PutPostMerchantLocationBody>({
      query: ({planRef, merchantRef, locationRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}`,
        method: 'PUT',
        body: {
          ...rest,
        },
      }),
      async onQueryStarted ({planRef, merchantRef, locationRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedLocation} = await queryFulfilled
          dispatch(midManagementMerchantLocationsApi.util.updateQueryData('getMerchantLocations', {planRef, merchantRef, locationRef}, (existingLocations) => {
            const index = existingLocations.findIndex((location) => location.location_ref === locationRef)
            existingLocations[index] = updatedLocation
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchantLocation: builder.mutation<void, DeleteMerchantLocationRefs>({
      query: ({planRef, merchantRef, locationRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/deletion`,
        method: 'POST',
        body: [
          ...locationRefs,
        ],
      }),
      // Update the cache with the removed Location
      async onQueryStarted ({planRef, merchantRef, locationRefs}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementMerchantLocationsApi.util.updateQueryData('getMerchantLocations', ({planRef, merchantRef}), (existingLocations) => {
            // For each Location, remove from existing list of Locations
            locationRefs.forEach(locationRef => {
              const index = existingLocations.findIndex(location => location.location_ref === locationRef)
              index !== -1 && existingLocations.splice(index, 1)
            })
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    postMerchantLocation: builder.mutation<DirectoryLocation, PutPostMerchantLocationBody>({
      query: ({planRef, merchantRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations`,
        method: 'POST',
        body: {
          ...rest,
        },
      }),
      // Update the cache with the newly created location
      async onQueryStarted ({planRef, merchantRef, secondaryMidRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newLocation} = await queryFulfilled
          dispatch(midManagementMerchantLocationsApi.util.updateQueryData('getMerchantLocations', {planRef, merchantRef, secondaryMidRef}, (existingLocations) => {
            existingLocations.push(newLocation)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    getMerchantLocationLinkedMids: builder.query<Array<DirectoryMerchantLocationMid>, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/mids`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationLinkedMids'],
    }),
    getMerchantLocationAvailableMids: builder.query<DirectoryMerchantLocationAvailableMids, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/available_mids`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationAvailableMids'],
    }),
    postMerchantLocationLinkedMids: builder.mutation<Array<DirectoryMerchantLocationMid>, PostMerchantLocationBody>({
      query: ({planRef, merchantRef, locationRef, midRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/mids`,
        method: 'POST',
        body: [
          ...midRefs,
        ],
      }),
      // Update the cache with the newly linked mids
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          const {data: newLinkedMids} = await queryFulfilled
          dispatch(midManagementMerchantLocationsApi.util.updateQueryData('getMerchantLocationLinkedMids', undefined, (existingLinkedMids) => {
            // Join new mids to existing cache of mids
            existingLinkedMids.concat(newLinkedMids)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
      invalidatesTags: ['MerchantLocationAvailableMids'],
    }),
    deleteMerchantLocationMidLink: builder.mutation<void, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'DELETE',
      }),
      // Update the cache with the removed linked mid
      async onQueryStarted ({planRef, merchantRef, locationRef, midRef}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementMerchantLocationsApi.util.updateQueryData('getMerchantLocationLinkedMids', ({planRef, merchantRef, locationRef}), (existingLinkedMids) => {
            const index = existingLinkedMids.findIndex(linkedMid => linkedMid.mid_ref === midRef)
            index !== -1 && existingLinkedMids.splice(index, 1)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    getMerchantLocationLinkedSecondaryMids: builder.query<Array<DirectoryMerchantLocationSecondaryMid>, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/secondary_mid_location_links`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationLinkedSecondaryMids'],
    }),
    postMerchantLocationLinkedSecondaryMid: builder.mutation<DirectoryMerchantLocationSecondaryMid, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/secondary_mid_location_links`,
        method: 'POST',
        body: secondaryMidRef,
      }),
      async onQueryStarted ({planRef, merchantRef, locationRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newLinkedSecondaryMid} = await queryFulfilled
          dispatch(midManagementMerchantLocationsApi.util.updateQueryData('getMerchantLocationLinkedSecondaryMids', ({planRef, merchantRef, locationRef}), (existingLinkedSecondaryMids) => {
            existingLinkedSecondaryMids.push(newLinkedSecondaryMid)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchantLocationSecondaryMidLink: builder.mutation<void, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, linkRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mid_location_links/${linkRef}`,
        method: 'DELETE',
      }),
      // Update the cache with the removed linked secondary mid
      async onQueryStarted ({planRef, merchantRef, locationRef, linkRef}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementMerchantLocationsApi.util.updateQueryData('getMerchantLocationLinkedSecondaryMids', ({planRef, merchantRef, locationRef}), (existingLinkedSecondaryMids) => {
            const index = existingLinkedSecondaryMids.findIndex(linkedSecondaryMid => linkedSecondaryMid.link_ref === linkRef)
            index !== -1 && existingLinkedSecondaryMids.splice(index, 1)
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
  useGetMerchantLocationsQuery,
  useGetMerchantLocationQuery,
  usePutMerchantLocationMutation,
  useDeleteMerchantLocationMutation,
  usePostMerchantLocationMutation,
  useGetMerchantLocationLinkedMidsQuery,
  useGetMerchantLocationAvailableMidsQuery,
  usePostMerchantLocationLinkedMidsMutation,
  useDeleteMerchantLocationMidLinkMutation,
  useGetMerchantLocationLinkedSecondaryMidsQuery,
  usePostMerchantLocationLinkedSecondaryMidMutation,
  useDeleteMerchantLocationSecondaryMidLinkMutation,
} = midManagementMerchantLocationsApi
