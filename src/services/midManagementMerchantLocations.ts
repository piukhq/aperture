import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryLocations, DirectoryLocation} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type MerchantLocationsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
  locationRef?: string,
}

type DeleteMerchantLocationRefs = MerchantLocationsEndpointRefs & {
  locationRefs?: Array<string>,
}

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantLocationsApi = createApi({
  reducerPath: 'midManagementMerchantLocationsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantLocations', 'MerchantLocation'],
  endpoints: builder => ({
    getMerchantLocations: builder.query<DirectoryLocations, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/locations`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocations'],
    }),
    getMerchantLocation: builder.query<DirectoryLocation, MerchantLocationsEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/locations/${locationRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocation'],
    }),
    deleteMerchantLocation: builder.mutation<void, DeleteMerchantLocationRefs>({
      query: ({planRef, merchantRef, locationRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/locations/deletion`,
        method: 'POST',
        body: [
          ...locationRefs,
        ],
      }),
    }),
  }),
})

export const {
  useGetMerchantLocationsQuery,
  useGetMerchantLocationQuery,
  useDeleteMerchantLocationMutation,
} = midManagementMerchantLocationsApi
