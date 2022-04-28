import {useMemo} from 'react'
import {useGetDevPlansMutation, useGetStagingPlansMutation, useGetProdPlansMutation} from 'services/plans'
import _uniqBy from 'lodash.uniqby'
import {HydratedPlan} from 'types'

export const useFormattedPlansListHook = () => {
  const [, {data: devPlans, isLoading: devIsLoading}] = useGetDevPlansMutation({fixedCacheKey: 'devPlans'})
  const [, {data: stagingPlans, isLoading: stagingIsLoading}] = useGetStagingPlansMutation({fixedCacheKey: 'stagingPlans'})
  const [, {data: prodPlans, isLoading: prodIsLoading}] = useGetProdPlansMutation({fixedCacheKey: 'prodPlans'})

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
    uniquePlansList,
    devIsLoading,
    stagingIsLoading,
    prodIsLoading,
  }
}
