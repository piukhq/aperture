import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {DirectoryPlan} from 'types'

type PlanBody = {
  name: string,
  planId: string | null,
  slug: string | null,
  iconUrl: string | null,
}

type UpdatePlan = PlanBody & {
  planRef: string,
}

const endpointPrefix = '/api/v1/plans'

export const portalPlansApi = createApi({
  reducerPath: 'portalPlansApi',
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
  tagTypes: ['Plans'],
  endpoints: builder => ({
    getPlans: builder.query<DirectoryPlan[], void>({
      query: () => ({
        url: endpointPrefix,
        method: 'GET',
      }),
      providesTags: ['Plans'],
    }),
    postPlan: builder.mutation<DirectoryPlan, PlanBody>({
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
      // Update the cache with the newly created plan
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          const {data: newPlan} = await queryFulfilled
          dispatch(portalPlansApi.util.updateQueryData('getPlans', undefined, (existingPlans) => {
            // Add new plan to existing cahce of plans
            existingPlans.push(newPlan)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    updatePlan: builder.mutation<DirectoryPlan, UpdatePlan>({
      query: ({name, planId, slug, iconUrl, planRef}) => ({
        url: `${endpointPrefix}/${planRef}`,
        method: 'PUT',
        body: {
          name,
          plan_id: planId,
          slug,
          icon_url: iconUrl,
        },
      }),
      // Update the cache with the newly created plan
      async onQueryStarted ({planRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedPlan} = await queryFulfilled
          dispatch(portalPlansApi.util.updateQueryData('getPlans', undefined, (existingPlans) => {
            // Update existing cached plan
            const index = existingPlans.findIndex(plan => plan.plan_ref === planRef)
            existingPlans[index] = updatedPlan
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
  }),
})

export const {useGetPlansQuery, usePostPlanMutation, useUpdatePlanMutation} = portalPlansApi
