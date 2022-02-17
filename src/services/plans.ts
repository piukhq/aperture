import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Url} from 'utils/enums'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
} from 'utils/storage'
import {Plan} from 'types/planType'

const endpointPrefix = '/ubiquity'

type PlansResponse = Plan[]

export const devPlansApi = createApi({
  reducerPath: 'devPlansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Url.DEV_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Token ${getDevVerificationToken()}`)
      headers.set('accept', 'application/json;v=1.3')
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
      headers.set('accept', 'application/json;v=1.3')
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
