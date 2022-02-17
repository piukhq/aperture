import {useEffect, useState} from 'react'
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

  const [planListByUniqueName, setPlanListByUniqueName] = useState([])

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

  useEffect(() => {
    if (devPlans && stagingPlans) {
      // TODO: Needs to be something other than plan_name
      const list = _uniqBy(devPlans.concat(stagingPlans), 'account.plan_name')
      setPlanListByUniqueName(list)
    }
  }, [devPlans, stagingPlans])

  return {
    devPlans,
    stagingPlans,
    planListByUniqueName,
  }
}
