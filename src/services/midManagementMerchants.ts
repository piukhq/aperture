import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan} from 'types'
import {ApiReflectorUrl} from 'utils/enums'

type PostMerchantBody = {
    name: string,
    location_label: string,
    iconUrl: string | null,
    planRef: string,
}

const endpointPrefix = '/api/v1/plans'

export const postMerchantApi = createApi({
  reducerPath: 'postMerchantApi',
  baseQuery: fetchBaseQuery({
    // TODO: Remove api reflector url when relevant api is deployed
    // baseUrl: process.env.NEXT_PUBLIC_API_KEY,
    baseUrl: ApiReflectorUrl.REFLECTOR_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization',
        `token ${process.env.NODE_ENV === 'development' ? 'MCVaMiGHRwKVhGTbZXRvOllRkM_cdTZ00o4ZI5O1lhI' : '7eDcxsAhXJbLeLde8v27tK2Kofw50pPW'}`
      )
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

export const {usePostMerchantMutation} = postMerchantApi
