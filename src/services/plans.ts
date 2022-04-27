import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Url} from 'utils/enums'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
  getProdVerificationToken,
} from 'utils/storage'
import {Plan} from 'types'

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
    getDevPlans: builder.mutation<PlansResponse, void>({
      query: () => ({
        url: `${endpointPrefix}/membership_plans`,
        method: 'GET',
      }),
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
    getStagingPlans: builder.mutation<PlansResponse, void>({
      query: () => ({
        url: `${endpointPrefix}/membership_plans`,
        method: 'GET',
      }),
    }),
  }),
})

export const prodPlansApi = createApi({
  reducerPath: 'prodPlansApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Url.PROD_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Token ${getProdVerificationToken()}`)
      headers.set('accept', 'application/json;v=1.3')
      return headers
    },
  }),
  endpoints: builder => ({
    getProdPlans: builder.mutation<PlansResponse, void>({
      query: () => ({
        url: `${endpointPrefix}/membership_plans`,
        method: 'GET',
      }),
    }),
  }),
})


export const {useGetDevPlansMutation} = devPlansApi
export const {useGetStagingPlansMutation} = stagingPlansApi
export const {useGetProdPlansMutation} = prodPlansApi
