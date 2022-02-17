import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Url} from 'utils/enums'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
} from 'utils/storage'

const endpointPrefix = '/ubiquity'

type PlansResponse = {
  id: number,
  account: Record<string, string | Array<unknown>>,
  feature_set: Record<string, string | number | boolean | Array<unknown>>,
  card: Record<string, string | number>,
  uid: string,
  status: string,
  balances: Array<Record<string, unknown>>
  images: Array<Record<string, unknown>>
}

export const devPlansApi = createApi({
  reducerPath: 'devPlansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Url.DEV_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Token ${getDevVerificationToken()}`)
      return headers
    },
  }),
  endpoints: builder => ({
    getDevPlans: builder.query<PlansResponse, void>({
      query: () => `${endpointPrefix}/membership_plans`,
    }),
  }),
})

export const stagingPlansApi = createApi({
  reducerPath: 'stagingPlansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Url.STAGING_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Token ${getStagingVerificationToken()}`)
      return headers
    },
  }),
  endpoints: builder => ({
    getStagingPlans: builder.query<PlansResponse, void>({
      query: () => `${endpointPrefix}/membership_plans`,
    }),
  }),
})


export const {useGetDevPlansQuery} = devPlansApi
export const {useGetStagingPlansQuery} = stagingPlansApi
