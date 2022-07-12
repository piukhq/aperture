import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan, DirectorySingleMerchant} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type MerchantsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
  identifierRef?: string,
  secondaryMidRef?: string,
}

type PostMerchantBody = MerchantsEndpointRefs & {
  name: string,
  location_label: string,
  iconUrl: string | null,
}

type DeleteMerchantBody = MerchantsEndpointRefs & {
  name: string,
}

const endpointPrefix = '/api/v1/plans'

export const midManagementMerchantsApi = createApi({
  reducerPath: 'midManagementMerchantsApi',
  baseQuery: getDynamicBaseQuery(),
  endpoints: builder => ({
    getMerchant: builder.query<DirectorySingleMerchant, MerchantsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${endpointPrefix}/${planRef}/merchants/${merchantRef}`,
        method: 'GET',
      }),
    }),
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
  }),
})

export const {
  useGetMerchantQuery,
  usePostMerchantMutation,
  useDeleteMerchantMutation,
} = midManagementMerchantsApi
