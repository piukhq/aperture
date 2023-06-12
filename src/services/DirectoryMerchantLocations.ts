import {createApi} from '@reduxjs/toolkit/query/react'
import {directoryPlansApi} from 'services/DirectoryPlans'
import {directoryMerchantsApi} from 'services/DirectoryMerchants'

import {
  DirectoryLocations,
  DirectoryLocation,
  DirectoryLocationMetadata,
  DirectoryMerchantLocationMid,
  DirectoryMerchantLocationAvailableMids,
  DirectoryMerchantLocationSecondaryMid,
  DirectorySubLocation,
} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'
import {directoryMerchantSecondaryMidsApi} from './DirectoryMerchantSecondaryMids'
import {directoryMerchantMidsApi} from './DirectoryMerchantMids'

type MerchantLocationsEndpointRefs = {
  planRef?: string,
  merchantRef?: string,
  midRef?: string,
  locationRef?: string,
  secondaryMidRef?: string,
  linkRef?: string,
  subLocationRef?: string,
  getAll?: boolean,
}

type PostMerchantLocationBody = MerchantLocationsEndpointRefs & {
  midRefs: string[],
}

type PutPostMerchantLocationBody = MerchantLocationsEndpointRefs & DirectoryLocationMetadata

type PatchMerchantLocationBody = MerchantLocationsEndpointRefs & {
  parentRef?: string,
  locationId?: string,
}

type DeleteMerchantLocationRefs = MerchantLocationsEndpointRefs & {
  locationRefs?: Array<string>,
}

type DirectoryPatchMerchantSubLocationResponse = {
  parent_ref: string,
  location_ref: string,
}

export const directoryMerchantLocationsApi = createApi({
  reducerPath: 'directoryMerchantLocationsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: [
    'MerchantLocations',
    'MerchantLocation',
    'MerchantLocationLinkedMids',
    'MerchantLocationLinkedSecondaryMids',
    'MerchantLocationAvailableMids',
    'MerchantLocationSubLocations',
    'MerchantLocationSubLocation',
  ],
  endpoints: builder => ({
    getMerchantLocations: builder.query<DirectoryLocations, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef, getAll}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations?${getAll ? 'n=1000&' : ''}${secondaryMidRef ? `exclude_secondary_mid=${secondaryMidRef}` : 'include_sub_locations=true'}`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocations'],
    }),
    getMerchantLocationsByPage: builder.query<DirectoryLocations, MerchantLocationsEndpointRefs & {page: string}>({
      query: ({planRef, merchantRef, secondaryMidRef, page}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations?p=${page}&${secondaryMidRef ? `exclude_secondary_mid=${secondaryMidRef}` : 'include_sub_locations=true'}`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocations'],
      // Update the cache with the additional Locations, the arguments must match whats in getMerchantLocations
      async onQueryStarted ({planRef, merchantRef, secondaryMidRef, getAll}, {dispatch, queryFulfilled}) {
        try {
          const {data: newLocations} = await queryFulfilled
          dispatch(directoryMerchantLocationsApi.util.updateQueryData('getMerchantLocations', ({planRef, merchantRef, secondaryMidRef, getAll}), (existingLocations) => {
            return existingLocations.concat(newLocations)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
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
      invalidatesTags: ['MerchantLocation', 'MerchantLocations'], // Optimistic update wont work due to differences in endpoint responses
    }),
    deleteMerchantLocation: builder.mutation<void, DeleteMerchantLocationRefs>({ // We are currently using this to also delete sub-locations
      query: ({planRef, merchantRef, locationRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/deletion`,
        method: 'POST',
        body: {location_refs: [...locationRefs]},
      }),
      // Update the cache with the removed Location
      invalidatesTags: ['MerchantLocation', 'MerchantLocations', 'MerchantLocationSubLocations'], // TODO: Figure out why optimistic update wont work here.
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(directoryMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
          dispatch(directoryMerchantSecondaryMidsApi.util.invalidateTags(['MerchantSecondaryMidLinkedLocations']))
          dispatch(directoryMerchantMidsApi.util.invalidateTags(['MerchantMid']))
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
      invalidatesTags: ['MerchantLocations'],
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
    postMerchantLocationSubLocation: builder.mutation<DirectoryLocation, PutPostMerchantLocationBody>({
      query: ({planRef, merchantRef, locationRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/sub_locations`,
        method: 'POST',
        body: {
          ...rest,
        },
      }),
      invalidatesTags: ['MerchantLocationSubLocations', 'MerchantLocations'],
      // Update the cache with the newly created sub location
      async onQueryStarted ({planRef, merchantRef, locationRef, secondaryMidRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newSubLocation} = await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(directoryMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
          dispatch(directoryMerchantLocationsApi.util.updateQueryData('getMerchantLocations', {planRef, merchantRef, secondaryMidRef}, (existingLocations) => {
            const index = existingLocations.findIndex((location) => location.location_ref === locationRef)
            const existingSubLocations = existingLocations[index].sub_locations
            existingLocations[index] = {
              ...existingLocations[index],
              sub_locations: existingSubLocations ? [...existingSubLocations, newSubLocation] : [newSubLocation],
            }
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    getMerchantLocationLinkedMids: builder.query<Array<DirectoryMerchantLocationMid>, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/mids?n=100`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationLinkedMids'],
    }),
    getMerchantLocationAvailableMids: builder.query<DirectoryMerchantLocationAvailableMids, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/available_mids?n=100`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationAvailableMids'],
    }),
    postMerchantLocationLinkedMids: builder.mutation<Array<DirectoryMerchantLocationMid>, PostMerchantLocationBody>({
      query: ({planRef, merchantRef, locationRef, midRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/mids`,
        method: 'POST',
        body: {mid_refs: midRefs},
      }),
      invalidatesTags: ['MerchantLocationAvailableMids'], // Optimistic update wont work due to differences in endpoint responses
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryMerchantMidsApi.util.invalidateTags(['MerchantMid']))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },


    }),
    deleteMerchantLocationMidLink: builder.mutation<void, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MerchantLocationLinkedMids', 'MerchantLocationAvailableMids'],
      async onQueryStarted ({planRef, merchantRef, locationRef, linkRef}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryMerchantMidsApi.util.invalidateTags(['MerchantMid']))
          dispatch(directoryMerchantLocationsApi.util.updateQueryData('getMerchantLocationLinkedSecondaryMids', ({planRef, merchantRef, locationRef}), (existingLinkedSecondaryMids) => {
            const index = existingLinkedSecondaryMids.findIndex(linkedSecondaryMid => linkedSecondaryMid.link_ref === linkRef)
            index !== -1 && existingLinkedSecondaryMids.splice(index, 1)
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    getMerchantLocationLinkedSecondaryMids: builder.query<Array<DirectoryMerchantLocationSecondaryMid>, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/secondary_mid_location_links?n=1000`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationLinkedSecondaryMids'],
    }),
    postMerchantLocationLinkedSecondaryMid: builder.mutation<DirectoryMerchantLocationSecondaryMid, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/secondary_mid_location_links`,
        method: 'POST',
        body: {secondary_mid_refs: [secondaryMidRef]},
      }),
      invalidatesTags: ['MerchantLocationLinkedSecondaryMids'],
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryMerchantSecondaryMidsApi.util.invalidateTags(['MerchantSecondaryMidLinkedLocations']))
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
          dispatch(directoryMerchantSecondaryMidsApi.util.invalidateTags(['MerchantSecondaryMidLinkedLocations']))
          dispatch(directoryMerchantLocationsApi.util.updateQueryData('getMerchantLocationLinkedSecondaryMids', ({planRef, merchantRef, locationRef}), (existingLinkedSecondaryMids) => {
            const index = existingLinkedSecondaryMids.findIndex(linkedSecondaryMid => linkedSecondaryMid.link_ref === linkRef)
            index !== -1 && existingLinkedSecondaryMids.splice(index, 1)
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    getMerchantLocationSubLocations: builder.query<DirectoryLocations, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/sub_locations?n=100`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationSubLocations'],
    }),
    getMerchantLocationSubLocation: builder.query<DirectorySubLocation, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef, subLocationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/sub_locations/${subLocationRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationSubLocation'],
    }),
    putMerchantLocationSubLocation: builder.mutation<DirectoryLocation, PutPostMerchantLocationBody>({
      query: ({planRef, merchantRef, locationRef, subLocationRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/sub_locations/${subLocationRef}`,
        method: 'PUT',
        body: {
          ...rest,
        },
      }),
      invalidatesTags: ['MerchantLocationSubLocation', 'MerchantLocationSubLocations', 'MerchantLocation', 'MerchantLocations'], // Lots of endpoints to invalidate optimistically
    }),
    patchMerchantLocationSubLocation: builder.mutation<DirectoryPatchMerchantSubLocationResponse, PatchMerchantLocationBody>({ // Responsible for setting the sub location's parent location
      query: ({planRef, merchantRef, locationRef, subLocationRef, parentRef, locationId}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/sub_locations/${subLocationRef}`,
        method: 'PATCH',
        body: {
          parent_ref: parentRef || null,
          location_id: locationId || null,
        },
      }),
      invalidatesTags: ['MerchantLocationSubLocation', 'MerchantLocationSubLocations', 'MerchantLocation', 'MerchantLocations'],
    }),
  }),
})

export const {
  useGetMerchantLocationsQuery,
  useGetMerchantLocationsByPageQuery,
  useGetMerchantLocationQuery,
  usePutMerchantLocationMutation,
  useDeleteMerchantLocationMutation,
  usePostMerchantLocationMutation,
  usePostMerchantLocationSubLocationMutation,
  useGetMerchantLocationLinkedMidsQuery,
  useGetMerchantLocationAvailableMidsQuery,
  usePostMerchantLocationLinkedMidsMutation,
  useDeleteMerchantLocationMidLinkMutation,
  useGetMerchantLocationLinkedSecondaryMidsQuery,
  usePostMerchantLocationLinkedSecondaryMidMutation,
  useDeleteMerchantLocationSecondaryMidLinkMutation,
  useGetMerchantLocationSubLocationsQuery,
  useGetMerchantLocationSubLocationQuery,
  usePutMerchantLocationSubLocationMutation,
  usePatchMerchantLocationSubLocationMutation,
} = directoryMerchantLocationsApi
