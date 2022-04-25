import {useEffect, useMemo} from 'react'
import {useVerificationHook} from './useVerificationHook'
import {useGetDevPlansMutation, useGetStagingPlansMutation, useGetProdPlansMutation} from 'services/plans'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
  getProdVerificationToken,
} from 'utils/storage'
import _uniqBy from 'lodash.uniqby'
import {HydratedPlan} from 'types'

export const useGetPlansHook = () => {
  const {devToken, stagingToken, prodToken} = useVerificationHook()

  const [getDevPlans, {data: devPlans, reset: resetDevPlans, isLoading: devIsLoading}] = useGetDevPlansMutation({fixedCacheKey: 'devPlans'})
  const [getStagingPlans, {data: stagingPlans, reset: resetStagingPlans, isLoading: stagingIsLoading}] = useGetStagingPlansMutation({fixedCacheKey: 'stagingPlans'})
  const [getProdPlans, {data: prodPlans, reset: resetProdPlans, isLoading: prodIsLoading}] = useGetProdPlansMutation({fixedCacheKey: 'prodPlans'})

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

  useEffect(() => {
    if (!prodIsLoading && !prodPlans && (getProdVerificationToken() || prodToken)) {
      getProdPlans()
    }
  }, [prodIsLoading, prodPlans, prodToken, getProdPlans])

  const uniquePlansList = useMemo(() => {
    if (devPlans || stagingPlans || prodPlans) {
      const list = (devPlans || []).concat(stagingPlans || []).concat(prodPlans || [])

      const uniqueNameList = _uniqBy(list, 'slug').map(plan => {
        const devPlan = devPlans && devPlans.find(devPlan => devPlan.slug === plan.slug)
        const stagingPlan = stagingPlans && stagingPlans.find(stagingPlan => stagingPlan.slug === plan.slug)
        const prodPlan = prodPlans && prodPlans.find(prodPlan => prodPlan.slug === plan.slug)

        return {
          ...plan,
          isDev: devPlan ? true : false,
          isStaging: stagingPlan ? true : false,
          isProd: prodPlan ? true : false,
          devImages: devPlan ? devPlan.images : [],
          stagingImages: stagingPlan ? stagingPlan.images : [],
          prodImages: prodPlan ? prodPlan.images : [],
        }
      })

      uniqueNameList.sort((a, b) => a.account.plan_name.localeCompare(b.account.plan_name))
      return uniqueNameList as HydratedPlan[]
    }
    return []
  }, [devPlans, stagingPlans, prodPlans])

  return {
    devPlans,
    stagingPlans,
    prodPlans,
    resetDevPlans,
    resetStagingPlans,
    resetProdPlans,
    uniquePlansList,
    devIsLoading,
    stagingIsLoading,
    prodIsLoading,
  }
}
