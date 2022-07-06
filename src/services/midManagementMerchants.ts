import {createApi} from '@reduxjs/toolkit/query/react'
import {
  DirectoryPlan,
  DirectoryMerchantMid,
  DirectoryLocations,
  DirectoryMid,
  DirectoryMidMetadata,
  DirectoryLocation,
  DirectoryIdentifier,
  DirectorySecondaryMid,
} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type PlansEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
  locationRef?: string,
  identifierRef?: string,
  secondaryMidRef?: string,
}

type PostMerchantBody = PlansEndpointRefs & {
  name: string,
  location_label: string,
  iconUrl: string | null,
}

type DeleteMerchantBody = PlansEndpointRefs & {
  name: string,
}

type PostMerchantMidBody = PlansEndpointRefs & {
  onboard: boolean,
  mid_metadata: DirectoryMidMetadata
}

type PatchMerchantMidBody = PlansEndpointRefs & {
  visa_bin?: string | null,
  payment_enrolment_status?: string | null
}

type PutMerchantMidLocationBody = PlansEndpointRefs & {
  location_ref: string,
}

type DeleteMerchantEntity = PlansEndpointRefs & {
  midRefs?: Array<string>,
  locationRefs?: Array<string>,
  identifierRefs?: Array<string>,
  secondaryMidRefs?: Array<string>,
}

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantsApi = createApi({
  reducerPath: 'midManagementMerchantsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: [
    'MerchantLocations',
    'MerchantMid',
    'MerchantLocation',
    'MerchantIdentifier',
    'MerchantSecondaryMid',
  ],
  endpoints: builder => ({
    postMerchant: builder.mutation<DirectoryPlan, PostMerchantBody>({
      query: ({name, location_label, iconUrl, planRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants`,
        method: 'POST',
        body: {
          name,
          location_label,
          icon_url: iconUrl,
        },
      }),
    }),
    deleteMerchant: builder.mutation<DirectoryPlan, DeleteMerchantBody>({
      query: ({name, planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}`,
        method: 'DELETE',
        body: {
          name,
        },
      }),
    }),
    getMerchantLocations: builder.query<DirectoryLocations, PlansEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/locations`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocations'],
    }),
    postMerchantMid: builder.mutation<DirectoryMid, PostMerchantMidBody>({
      query: ({onboard = false, mid_metadata, planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids`,
        method: 'POST',
        body: {
          onboard,
          mid_metadata,
        },
      }),
    }),
    patchMerchantMid: builder.mutation<DirectoryMid, PatchMerchantMidBody>({
      query: ({planRef, merchantRef, midRef, ...rest}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/${midRef}`,
        method: 'PATCH',
        body: {
          ...rest,
        },
      }),
    }),
    getMerchantMid: builder.query<DirectoryMerchantMid, PlansEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/${midRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantMid'],
    }),
    putMerchantMidLocation: builder.mutation<DirectoryMerchantMid, PutMerchantMidLocationBody>({
      query: ({planRef, merchantRef, midRef, location_ref}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'PUT',
        body: {
          location_ref,
        },
      }),
      invalidatesTags: ['MerchantMid'],
    }),
    deleteMerchantMidLocation: builder.mutation<DirectoryMerchantMid, PlansEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MerchantMid'],
    }),
    deleteMerchantMid: builder.mutation<void, DeleteMerchantEntity>({
      query: ({planRef, merchantRef, midRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/deletion`,
        method: 'POST',
        body: [
          ...midRefs,
        ],
      }),
    }),
    getMerchantLocation: builder.query<DirectoryLocation, PlansEndpointRefs>({
      query: ({planRef, merchantRef, locationRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/locations/${locationRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantLocation'],
    }),
    deleteMerchantLocation: builder.mutation<void, DeleteMerchantEntity>({
      query: ({planRef, merchantRef, locationRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/locations/deletion`,
        method: 'POST',
        body: [
          ...locationRefs,
        ],
      }),
    }),
    getMerchantSecondaryMid: builder.query<DirectorySecondaryMid, PlansEndpointRefs>({
      query: ({planRef, merchantRef, secondaryMidRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/secondary_mids/${secondaryMidRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantSecondaryMid'],
    }),
    deleteMerchantSecondaryMid: builder.mutation<void, DeleteMerchantEntity>({
      query: ({planRef, merchantRef, secondaryMidRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/secondary_mids/deletion`,
        method: 'POST',
        body: [
          ...secondaryMidRefs,
        ],
      }),
    }),
    getMerchantIdentifier: builder.query<DirectoryIdentifier, PlansEndpointRefs>({
      query: ({planRef, merchantRef, identifierRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/identifiers/${identifierRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantIdentifier'],
    }),
    deleteMerchantIdentifier: builder.mutation<void, DeleteMerchantEntity>({
      query: ({planRef, merchantRef, identifierRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/identifiers/deletion`,
        method: 'POST',
        body: [
          ...identifierRefs,
        ],
      }),
    }),
  }),
})

export const {
  useGetMerchantLocationsQuery,
  useGetMerchantMidQuery,
  useGetMerchantLocationQuery,
  useGetMerchantIdentifierQuery,
  useGetMerchantSecondaryMidQuery,
  usePostMerchantMutation,
  useDeleteMerchantMutation,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
  useDeleteMerchantMidMutation,
  useDeleteMerchantSecondaryMidMutation,
  useDeleteMerchantLocationMutation,
  useDeleteMerchantIdentifierMutation,
} = midManagementMerchantsApi
