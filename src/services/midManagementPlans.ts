import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPlanMetadata, DirectoryPlan, DirectoryPlanDetails} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type PlansEndpointRefs = {
  planRef: string,
}

type PutPlanBody = DirectoryPlanMetadata & PlansEndpointRefs

export const midManagementPlansApi = createApi({
  reducerPath: 'midManagementPlansApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['Plans', 'Plan'],
  endpoints: builder => ({
    getPlans: builder.query<DirectoryPlan[], void>({
      query: () => ({
        url: `${UrlEndpoint.PLANS}?n=1000`,
        method: 'GET',
      }),
      providesTags: ['Plans'],
    }),
    postPlan: builder.mutation<DirectoryPlan, DirectoryPlanMetadata>({
      query: ({name, plan_id, slug, icon_url}) => ({
        url: UrlEndpoint.PLANS,
        method: 'POST',
        body: {
          name,
          plan_id,
          slug,
          icon_url,
        },
      }),
      // Update the cache with the newly created plan
      async onQueryStarted (_, {dispatch, queryFulfilled}) {
        try {
          const {data: newPlan} = await queryFulfilled
          dispatch(midManagementPlansApi.util.updateQueryData('getPlans', undefined, (existingPlans) => {
            // Add new plan to existing cache of plans
            existingPlans.unshift(newPlan)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    getPlan: builder.query<DirectoryPlanDetails, PlansEndpointRefs>({
      query: ({planRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}`,
        method: 'GET',
      }),
      providesTags: ['Plan'],
    }),
    putPlan: builder.mutation<DirectoryPlan, PutPlanBody>({
      query: ({name, plan_id, slug, icon_url, planRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}`,
        method: 'PUT',
        body: {
          name,
          plan_id,
          slug,
          icon_url,
        },
      }),
      invalidatesTags: ['Plan'],
      async onQueryStarted ({planRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: updatedPlan} = await queryFulfilled
          dispatch(midManagementPlansApi.util.updateQueryData('getPlans', undefined, (existingPlans) => {
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
    deletePlan: builder.mutation<DirectoryPlan, PlansEndpointRefs>({
      query: ({planRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}`,
        method: 'DELETE',
      }),
      async onQueryStarted ({planRef}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementPlansApi.util.updateQueryData('getPlans', undefined, (existingPlans) => {
            const index = existingPlans.findIndex(plan => plan.plan_ref === planRef)
            index !== -1 && existingPlans.splice(index, 1)
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
  }),
})

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  usePostPlanMutation,
  usePutPlanMutation,
  useDeletePlanMutation,
} = midManagementPlansApi
