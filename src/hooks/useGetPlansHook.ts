import {useEffect, useState} from 'react'
import {useVerificationHook} from 'components/CredentialsModal/hooks/useVerificationHook'
import {useGetDevPlansQuery, useGetStagingPlansQuery} from 'services/plans'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
} from 'utils/storage'

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

  return {
    devPlans,
    stagingPlans,
  }
}
