import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan, DirectoryMerchantMid, DirectoryMid, DirectoryMidMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type PlansEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
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

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantsApi = createApi({
  reducerPath: 'midManagementMerchantsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantMid'],
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
  }),
})

export const {
  usePostMerchantMutation,
  useDeleteMerchantMutation,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  useGetMerchantMidQuery,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
} = midManagementMerchantsApi
