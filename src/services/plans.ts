import {createApi} from '@reduxjs/toolkit/query/react'
import {EnvironmentShortName, UrlEndpoint} from 'utils/enums'
import {Plan} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type PlansResponse = Plan[]

export const devPlansApi = createApi({
  reducerPath: 'devPlansApi',
  baseQuery: getDynamicBaseQuery({isLoyaltyApi: true, env: EnvironmentShortName.DEV}),
  endpoints: builder => ({
    getDevPlans: builder.mutation<PlansResponse, void>({
      query: () => ({
        url: `${UrlEndpoint.UBIQUITY}/membership_plans`,
        method: 'GET',
      }),
    }),
  }),
})

export const stagingPlansApi = createApi({
  reducerPath: 'stagingPlansApi',
  baseQuery: getDynamicBaseQuery({isLoyaltyApi: true, env: EnvironmentShortName.STAGING}),
  endpoints: builder => ({
    getStagingPlans: builder.mutation<PlansResponse, void>({
      query: () => ({
        url: `${UrlEndpoint.UBIQUITY}/membership_plans`,
        method: 'GET',
      }),
    }),
  }),
})

export const prodPlansApi = createApi({
  reducerPath: 'prodPlansApi',
  baseQuery: getDynamicBaseQuery({isLoyaltyApi: true, env: EnvironmentShortName.PROD}),
  endpoints: builder => ({
    getProdPlans: builder.mutation<PlansResponse, void>({
      query: () => ({
        url: `${UrlEndpoint.UBIQUITY}/membership_plans`,
        method: 'GET',
      }),
    }),
  }),
})


export const {useGetDevPlansMutation} = devPlansApi
export const {useGetStagingPlansMutation} = stagingPlansApi
export const {useGetProdPlansMutation} = prodPlansApi
