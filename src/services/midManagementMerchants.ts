import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan} from 'types'
import {ApiReflectorUrl} from 'utils/enums'

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

const endpointPrefix = '/api/v1/plans'
// Likely to change once the larger authentication method is integrated in
const authHeader = `token ${process.env.NODE_ENV === 'development' ? 'MCVaMiGHRwKVhGTbZXRvOllRkM_cdTZ00o4ZI5O1lhI' : '7eDcxsAhXJbLeLde8v27tK2Kofw50pPW'}`

export const postMerchantApi = createApi({
  reducerPath: 'postMerchantApi',
  baseQuery: fetchBaseQuery({
    // TODO: Remove api reflector url when relevant api is deployed
    // baseUrl: process.env.NEXT_PUBLIC_API_URL,
    baseUrl: ApiReflectorUrl.REFLECTOR_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', authHeader)
      headers.set('accept', 'application/json;v=1.3')
      return headers
    },
  }),
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
  }),
})

export const deleteMerchantApi = createApi({
  reducerPath: 'deleteMerchantApi',
  baseQuery: fetchBaseQuery({
    // TODO: Remove api reflector url when relevant api is deployed
    // baseUrl: process.env.NEXT_PUBLIC_API_URL,
    baseUrl: ApiReflectorUrl.REFLECTOR_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', authHeader)
      headers.set('accept', 'application/json;v=1.3')
      return headers
    },
  }),
  endpoints: builder => ({
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

export const {usePostMerchantMutation} = postMerchantApi
export const {useDeleteMerchantMutation} = deleteMerchantApi
