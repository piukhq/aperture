import {useEffect, useMemo} from 'react'
import {useVerificationHook} from './useVerificationHook'
import {useGetDevPlansMutation, useGetStagingPlansMutation} from 'services/plans'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
} from 'utils/storage'
import _uniqBy from 'lodash.uniqby'
import {HydratedPlan} from 'types'

export const useGetPlansHook = () => {
  const {devToken, stagingToken} = useVerificationHook()

  const [getDevPlans, {data: devPlans, reset: resetDevPlans, isLoading: devIsLoading}] = useGetDevPlansMutation({fixedCacheKey: 'devPlans'})
  const [getStagingPlans, {data: stagingPlans, reset: resetStagingPlans, isLoading: stagingIsLoading}] = useGetStagingPlansMutation({fixedCacheKey: 'stagingPlans'})

  useEffect(() => {
    if (!devIsLoading && !devPlans && (getDevVerificationToken() || devToken)) {
      getDevPlans()
    }
  }, [devIsLoading, devPlans, devToken, getDevPlans])

  useEffect(() => {
    if (!stagingIsLoading && !stagingPlans && (getStagingVerificationToken() || stagingToken)) {
      getStagingPlans()
    }
  }, [stagingIsLoading, stagingPlans, stagingToken, getStagingPlans])

  const uniquePlansList = useMemo(() => {
    if (devPlans || stagingPlans) {
      const list = (devPlans || []).concat(stagingPlans || [])

      const uniqueNameList = _uniqBy(list, 'slug').map(plan => {
        const devPlan = devPlans && devPlans.find(devPlan => devPlan.slug === plan.slug)
        const stagingPlan = stagingPlans && stagingPlans.find(stagingPlan => stagingPlan.slug === plan.slug)

        return {
          ...plan,
          isDev: devPlan ? true : false,
          isStaging: stagingPlan ? true : false,
          devImages: devPlan ? devPlan.images : [],
          stagingImages: stagingPlan ? stagingPlan.images : [],
        }
      })

      uniqueNameList.sort((a, b) => a.account.plan_name.localeCompare(b.account.plan_name))
      return uniqueNameList as HydratedPlan[]
    }
    return []
  }, [devPlans, stagingPlans])

  return {
    devPlans,
    stagingPlans,
    resetDevPlans,
    resetStagingPlans,
    uniquePlansList,
    devIsLoading,
    stagingIsLoading,
  }
}
