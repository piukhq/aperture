import {useEffect, useState, useMemo} from 'react'
import {useVerificationHook} from './useVerificationHook'
import {useGetDevPlansQuery, useGetStagingPlansQuery} from 'services/plans'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
} from 'utils/storage'
import _uniqBy from 'lodash.uniqby'

export const useGetPlansHook = () => {
  const {devToken, stagingToken} = useVerificationHook()

  const [skipGetDevPlans, setSkipGetDevPlans] = useState(true)
  const [skipGetStagingPlans, setSkipGetStagingPlans] = useState(true)

  const {data: devPlans} = useGetDevPlansQuery(null, {
    skip: skipGetDevPlans,
  })

  const {data: stagingPlans} = useGetStagingPlansQuery(null, {
    skip: skipGetStagingPlans,
  })

  useEffect(() => {
    if (getDevVerificationToken() || devToken) {
      setSkipGetDevPlans(false)
    }
  }, [devToken])

  useEffect(() => {
    if (getStagingVerificationToken() || stagingToken) {
      setSkipGetStagingPlans(false)
    }
  }, [stagingToken])

  const getUniquePlansList = useMemo(() => {
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
      return uniqueNameList
    }
    return []
  }, [devPlans, stagingPlans])

  return {
    devPlans,
    stagingPlans,
    getUniquePlansList,
  }
}
