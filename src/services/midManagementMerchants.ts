import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan, DirectoryMid, DirectoryMidMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type PostMerchantBody = {
  name: string,
  location_label: string,
  iconUrl: string | null,
  planRef: string,
}

type DeleteMerchantBody = {
  name: string,
  planRef: string,
  merchantRef: string,
}

type PostMerchantMidBody = {
  onboard: boolean,
  mid_metadata: DirectoryMidMetadata
  planRef: string,
  merchantRef: string,
}

type PatchMerchantMidBody = {
  planRef: string,
  merchantRef: string,
  midRef: string,
  visa_bin?: string | null,
  payment_enrolment_status?: string | null
}

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantsApi = createApi({
  reducerPath: 'midManagementMerchantsApi',
  baseQuery: getDynamicBaseQuery(),
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
  }),
})

export const {
  usePostMerchantMutation,
  useDeleteMerchantMutation,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
} = midManagementMerchantsApi
