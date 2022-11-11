import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan, DirectorySingleMerchant, DirectorySingleMerchantCounts} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
  psimiRef?: string,
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

export const midManagementMerchantsApi = createApi({
  reducerPath: 'midManagementMerchantsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['Merchants'],
  endpoints: builder => ({
    getMerchant: builder.query<DirectorySingleMerchant, MerchantsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}`,
        method: 'GET',
      }),
      providesTags: ['Merchants'],
    }),
    getMerchantCounts: builder.query<DirectorySingleMerchantCounts, MerchantsEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/counts`,
        method: 'GET',
      }),
    }),
    postMerchant: builder.mutation<DirectoryPlan, PostMerchantBody>({
      query: ({name, location_label, iconUrl, planRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants`,
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
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}`,
        method: 'DELETE',
        body: {
          name,
        },
      }),
      invalidatesTags: ['Merchants'],
    }),
  }),
})

export const {
  useGetMerchantQuery,
  useGetMerchantCountsQuery,
  usePostMerchantMutation,
  useDeleteMerchantMutation,
} = midManagementMerchantsApi
