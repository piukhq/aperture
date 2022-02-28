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

  const [getDevPlans, {data: devPlans, reset: resetDevPlans}] = useGetDevPlansMutation({fixedCacheKey: 'devPlans'})
  const [getStagingPlans, {data: stagingPlans, reset: resetStagingPlans}] = useGetStagingPlansMutation({fixedCacheKey: 'stagingPlans'})

  useEffect(() => {
    if (getDevVerificationToken() || devToken) {
      getDevPlans()
    }
  }, [devToken, getDevPlans])

  useEffect(() => {
    if (getStagingVerificationToken() || stagingToken) {
      getStagingPlans()
    }
  }, [stagingToken, getStagingPlans])

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
  }
}
