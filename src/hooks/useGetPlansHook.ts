import {useEffect, useState, useMemo} from 'react'
import {useVerificationHook} from 'components/CredentialsModal/hooks/useVerificationHook'
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
    if (devPlans && stagingPlans) {
      const list = devPlans.concat(stagingPlans)
      const uniqueNameList = _uniqBy(list, 'account.plan_name').map(plan => plan.account.plan_name)
      uniqueNameList.sort((a, b) => a.localeCompare(b))
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
