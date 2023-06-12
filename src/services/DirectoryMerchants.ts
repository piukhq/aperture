import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan, DirectorySingleMerchant, DirectorySingleMerchantCounts} from 'types'
import {directoryPlansApi} from 'services/DirectoryPlans'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantsEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  midRef?: string,
  psimiRef?: string,
  secondaryMidRef?: string,
}

type PostPutMerchantBody = MerchantsEndpointRefs & {
  name: string,
  location_label: string,
  iconUrl: string | null,
}

type DeleteMerchantBody = MerchantsEndpointRefs & {
  name: string,
}

export const directoryMerchantsApi = createApi({
  reducerPath: 'directoryMerchantsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['Merchants', 'MerchantCounts'],
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
      providesTags: ['MerchantCounts'],
    }),
    postMerchant: builder.mutation<DirectoryPlan, PostPutMerchantBody>({
      query: ({name, location_label, iconUrl, planRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants`,
        method: 'POST',
        body: {
          name,
          location_label,
          icon_url: iconUrl,
        },
      }),
      invalidatesTags: ['Merchants', 'MerchantCounts'],
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    putMerchant: builder.mutation<DirectoryPlan, PostPutMerchantBody>({
      query: ({name, location_label, iconUrl, planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}`,
        method: 'PUT',
        body: {
          name,
          location_label,
          icon_url: iconUrl,
        },
      }),
      invalidatesTags: ['Merchants'],
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchant: builder.mutation<DirectoryPlan, DeleteMerchantBody>({
      query: ({name, planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}`,
        method: 'DELETE',
        body: {
          name,
        },
      }),
      invalidatesTags: ['Merchants', 'MerchantCounts'],
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(directoryPlansApi.util.invalidateTags(['Plan', 'Plans']))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
  }),
})

export const {
  usePrefetch,
  useGetMerchantQuery,
  useGetMerchantCountsQuery,
  usePostMerchantMutation,
  usePutMerchantMutation,
  useDeleteMerchantMutation,
} = directoryMerchantsApi
