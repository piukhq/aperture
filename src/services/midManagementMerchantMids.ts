import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryMerchantMid, DirectoryMids, DirectoryMid, DirectoryMerchantMidLocation, DirectoryMidMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

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

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantMidsApi = createApi({
  reducerPath: 'midManagementMerchantMidsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantMids', 'MerchantMid'],
  endpoints: builder => ({
    getMerchantMids: builder.query<DirectoryMids, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids`,
        method: 'GET',
      }),
      providesTags: ['MerchantMids'],
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
    getMerchantMid: builder.query<DirectoryMerchantMid, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/${midRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantMid'],
    }),
    putMerchantMidLocation: builder.mutation<DirectoryMerchantMidLocation, PutMerchantMidLocationBody>({
      query: ({planRef, merchantRef, midRef, location_ref}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'PUT',
        body: {
          location_ref,
        },
      }),
      invalidatesTags: ['MerchantMid'],
    }),
    deleteMerchantMidLocation: builder.mutation<void, MerchantMidsEndpointRefs>({
      query: ({planRef, merchantRef, midRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/${midRef}/location_link`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MerchantMid'],
    }),
    deleteMerchantMid: builder.mutation<void, DeleteMerchantMidRefs>({
      query: ({planRef, merchantRef, midRefs}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}/mids/deletion`,
        method: 'POST',
        body: [
          ...midRefs,
        ],
      }),
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
} = midManagementMerchantMidsApi
