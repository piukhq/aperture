import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan} from 'types'

type PostPlanBody = {
    name: string,
    planId: string | null,
    slug: string | null,
    iconUrl: string | null,
}

const endpointPrefix = '/api/v1/plans'

export const postPlanApi = createApi({
  reducerPath: 'postPlanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PORTAL_API_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization',
        `token ${process.env.NEXT_PUBLIC_PORTAL_API_KEY}`
      )
      headers.set('accept', 'application/json;v=1.3')
      return headers
    },
  }),
  endpoints: builder => ({
    postPlan: builder.mutation<DirectoryPlan, PostPlanBody>({
      query: ({name, planId, slug, iconUrl}) => ({
        url: endpointPrefix,
        method: 'POST',
        body: {
          name,
          plan_id: planId,
          slug,
          icon_url: iconUrl,
        },
      }),
    }),
  }),
})

export const {usePostPlanMutation} = postPlanApi
