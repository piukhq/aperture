import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Service} from 'types'
import type {RootState} from 'app/store'
import {BundleID, UrlEndpoint} from 'utils/enums'
import {decodeJwtToken} from 'utils/jwtToken'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_LOYALTY_API_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).customerWallet.jwtToken
    const bundleId = decodeJwtToken(token)?.bundle_id
    if (token) {
      headers.set('authorization', `${bundleId === BundleID.BARCLAYS_BUNDLE_ID ? 'Bearer' : 'Token'} ${token}`)
      headers.set('accept', 'application/json;v=1.3')
    }
    return headers
  },
})

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery,
  tagTypes: ['Service'],
  endpoints: builder => ({
    getService: builder.query<Service, void>({
      query: () => ({
        url: `${UrlEndpoint.UBIQUITY}/service`,
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
  }),
})

export const {useGetServiceQuery} = serviceApi
