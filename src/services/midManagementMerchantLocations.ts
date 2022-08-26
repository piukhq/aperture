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
  midRefs?: string[],
  locationRef?: string,
  secondaryMidRef?: string,
  linkRef?: string,
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
  tagTypes: ['MerchantLocations', 'MerchantLocation', 'MerchantLocationLinkedMids', 'MerchantLocationLinkedSecondaryMids'],
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
    }),
    postMerchantLocationLinkedMids: builder.mutation<Array<DirectoryMerchantLocationMid>, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef, midRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/mids`,
        method: 'POST',
        body: [
          ...midRefs,
        ],
      }),
      invalidatesTags: ['MerchantLocationLinkedMids'],
    }),
    deleteMerchantLocationMidLink: builder.mutation<void, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, linkRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/_mid_location_links/${linkRef}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MerchantLocationLinkedMids'],
    }),
    getMerchantLocationLinkedSecondaryMids: builder.query<Array<DirectoryMerchantLocationSecondaryMid>, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/secondary_mid_location_links`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocationLinkedSecondaryMids'],
    }),
    postMerchantLocationLinkedSecondaryMid: builder.mutation<Array<DirectoryMerchantLocationSecondaryMid>, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef, secondaryMidRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations/${locationRef}/secondary_mid_location_links`,
        method: 'POST',
        body: secondaryMidRef,
      }),
      invalidatesTags: ['MerchantLocationLinkedSecondaryMids'],
    }),
    deleteMerchantLocationSecondaryMidLink: builder.mutation<void, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, linkRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/secondary_mid_location_links/${linkRef}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MerchantLocationLinkedSecondaryMids'],
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
