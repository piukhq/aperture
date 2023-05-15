import {midManagementPlansApi} from 'services/midManagementPlans'
import {midManagementMerchantsApi} from './midManagementMerchants'
import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryPsimis, DirectoryPsimi, DirectoryPsimiMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

type MerchantPsimisEndpointRefs = {
  planRef: string,
  merchantRef?: string,
  psimiRef?: string,
}

type PostMerchantPsimiBody = MerchantPsimisEndpointRefs & {
  onboard: boolean,
  psimi_metadata: DirectoryPsimiMetadata,
}

type DeleteMerchantPsimiRefs = MerchantPsimisEndpointRefs & {
  psimiRefs?: Array<string>,
}

export const midManagementMerchantPsimisApi = createApi({
  reducerPath: 'midManagementMerchantPsimisApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['MerchantPsimis', 'MerchantPsimi'],
  endpoints: builder => ({
    getMerchantPsimis: builder.query<DirectoryPsimis, MerchantPsimisEndpointRefs>({
      query: ({planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/psimis`,
        method: 'GET',
      }),
      providesTags: ['MerchantPsimis'],
    }),
    getMerchantPsimisByPage: builder.query<DirectoryPsimis, MerchantPsimisEndpointRefs & {page: string}>({
      query: ({planRef, merchantRef, page}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/psimis?p=${page}`,
        method: 'GET',
      }),
      providesTags: ['MerchantPsimis'],
      // Update the cache with the additional Psimis
      async onQueryStarted ({planRef, merchantRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newPsimis} = await queryFulfilled
          dispatch(midManagementMerchantPsimisApi.util.updateQueryData('getMerchantPsimis', ({planRef, merchantRef}), (existingPsimis) => {
            return existingPsimis.concat(newPsimis)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    getMerchantPsimi: builder.query<DirectoryPsimi, MerchantPsimisEndpointRefs>({
      query: ({planRef, merchantRef, psimiRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/psimis/${psimiRef}`,
        method: 'GET',
      }),
      providesTags: ['MerchantPsimi'],
    }),
    postMerchantPsimi: builder.mutation<DirectoryPsimi, PostMerchantPsimiBody>({
      query: ({onboard = false, psimi_metadata, planRef, merchantRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/psimis`,
        method: 'POST',
        body: {
          onboard,
          psimi_metadata,
        },
      }),
      async onQueryStarted ({planRef, merchantRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newPsimi} = await queryFulfilled
          dispatch(midManagementPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(midManagementMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
          dispatch(midManagementMerchantPsimisApi.util.updateQueryData('getMerchantPsimis', ({planRef, merchantRef}), (existingPsimis) => {
            existingPsimis.unshift(newPsimi)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    deleteMerchantPsimi: builder.mutation<void, DeleteMerchantPsimiRefs>({
      query: ({planRef, merchantRef, psimiRefs}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/psimis/deletion`,
        method: 'POST',
        body: {psimi_refs: [...psimiRefs]},
      }),
      // Update the cache with the removed PSIMI
      async onQueryStarted ({planRef, merchantRef, psimiRefs}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementPlansApi.util.invalidateTags(['Plan', 'Plans']))
          dispatch(midManagementMerchantsApi.util.invalidateTags(['Merchants', 'MerchantCounts']))
          dispatch(midManagementMerchantPsimisApi.util.updateQueryData('getMerchantPsimis', ({planRef, merchantRef}), (existingPsimis) => {
            // For each PSIMI, remove from existing list of Psimis
            psimiRefs.forEach(psimiRef => {
              const index = existingPsimis.findIndex(psimi => psimi.psimi_ref === psimiRef)
              index !== -1 && existingPsimis.splice(index, 1)
            })
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    // TODO: IF there is a requirement to onboard multiple Psimis at once, this will need to be updated
    postMerchantPsimiOnboarding: builder.mutation<DirectoryPsimi, MerchantPsimisEndpointRefs>({
      query: ({planRef, merchantRef, psimiRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/psimis/onboarding`,
        method: 'POST',
        body: [psimiRef],
      }),
      invalidatesTags: ['MerchantPsimis'],
      async onQueryStarted ({planRef, merchantRef, psimiRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: onboardingPsimisArray} = await queryFulfilled
          dispatch(midManagementMerchantPsimisApi.util.updateQueryData('getMerchantPsimi', ({planRef, merchantRef, psimiRef}), (existingPsimi) => {
            Object.assign(existingPsimi, onboardingPsimisArray[0])
          }))
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    // TODO: IF there is a requirement to offboard multiple Psimis at once, this will need to be updated
    postMerchantPsimiOffboarding: builder.mutation<DirectoryPsimi, MerchantPsimisEndpointRefs>({
      query: ({planRef, merchantRef, psimiRef}) => ({
        url: `${UrlEndpoint.PLANS}/${planRef}/merchants/${merchantRef}/psimis/offboarding`,
        method: 'POST',
        body: [psimiRef],
      }),
      invalidatesTags: ['MerchantPsimis'],
      async onQueryStarted ({planRef, merchantRef, psimiRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: offboardingPsimisArray} = await queryFulfilled
          dispatch(midManagementMerchantPsimisApi.util.updateQueryData('getMerchantPsimi', ({planRef, merchantRef, psimiRef}), (existingPsimi) => {
            Object.assign(existingPsimi, offboardingPsimisArray[0])
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
  useGetMerchantPsimisQuery,
  useGetMerchantPsimisByPageQuery,
  useGetMerchantPsimiQuery,
  usePostMerchantPsimiMutation,
  usePostMerchantPsimiOnboardingMutation,
  usePostMerchantPsimiOffboardingMutation,
  useDeleteMerchantPsimiMutation,
} = midManagementMerchantPsimisApi
