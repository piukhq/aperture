import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPlanMetadata, DirectoryPlan, DirectoryPlanDetails} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type PlansEndpointRefs = {
  planRef: string,
}

type UpdatePlan = DirectoryPlanMetadata & PlansEndpointRefs

export const midManagementPlansApi = createApi({
  reducerPath: 'midManagementPlansApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['Plans', 'Plan'],
  endpoints: builder => ({
    getPlans: builder.query<DirectoryPlan[], void>({
      query: () => ({
        url: UrlEndpoint.PLANS,
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
            existingPlans.push(newPlan)
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
    updatePlan: builder.mutation<DirectoryPlan, UpdatePlan>({
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
      // Update the cache with the newly created plan
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
      invalidatesTags: ['Plans'],
    }),
  }),
})

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  usePostPlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = midManagementPlansApi
