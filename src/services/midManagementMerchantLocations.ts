import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryLocations, DirectoryLocation} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantLocationsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
  locationRef?: string,
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
  tagTypes: ['MerchantLocations', 'MerchantLocation'],
  endpoints: builder => ({
    getMerchantLocations: builder.query<DirectoryLocations, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/locations`,
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
      invalidatesTags: ['MerchantLocations'],
    }),
  }),
})

export const {
  useGetMerchantLocationsQuery,
  useGetMerchantLocationQuery,
  usePutMerchantLocationMutation,
  useDeleteMerchantLocationMutation,
} = midManagementMerchantLocationsApi
