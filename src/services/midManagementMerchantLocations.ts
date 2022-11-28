import {createApi} from '@reduxjs/toolkit/query/react'
import {
  DirectoryLocations,
  DirectoryLocation,
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

type PutMerchantLocationBody = MerchantLocationsEndpointRefs & {
  name?: string,
  location_id: string,
  merchant_internal_id?: string,
  is_physical_location: boolean,
  address_line_1?: string,
  address_line_2?: string,
  town_city?: string,
  county?: string,
  country?: string,
  postcode?: string,
}

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
    putMerchantLocation: builder.mutation<DirectoryLocation, PutMerchantLocationBody>({
      query: ({planRef, merchantRef, locationRef, ...rest}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}`,
        method: 'PUT',
        body: {
          ...rest,
        },
      }),
      invalidatesTags: ['MerchantLocation'],
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
            console.log('existingLinkedSecondaryMids', existingLinkedSecondaryMids)
            console.log('newLinkedSecondaryMid', newLinkedSecondaryMid)

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
  useGetMerchantLocationLinkedMidsQuery,
  useGetMerchantLocationAvailableMidsQuery,
  usePostMerchantLocationLinkedMidsMutation,
  useDeleteMerchantLocationMidLinkMutation,
  useGetMerchantLocationLinkedSecondaryMidsQuery,
  usePostMerchantLocationLinkedSecondaryMidMutation,
  useDeleteMerchantLocationSecondaryMidLinkMutation,
} = midManagementMerchantLocationsApi
