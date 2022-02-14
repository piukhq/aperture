import {useEffect} from 'react'

import {
  useVerifyDevCredentialsMutation,
  useVerifyStagingCredentialsMutation,
} from 'services/users'
import {
  setDevVerificationToken,
  setStagingVerificationToken,
  getDevVerificationToken,
  getStagingVerificationToken,
} from 'utils/storage'

export const useVerificationHook = () => {
  const [verifyDevCredentials, {data: devData, error: devError, isLoading: devIsLoading, isSuccess: devIsSuccess}] = useVerifyDevCredentialsMutation()
  const [verifyStagingCredentials, {data: stagingData, error: stagingError, isLoading: stagingIsLoading, isSuccess: stagingIsSuccess}] = useVerifyStagingCredentialsMutation()

  // If new token is available and there is no current token in local storage, store in local storage
  useEffect(() => {
    if (devData && !getDevVerificationToken()) {
      console.log('dev')
      setDevVerificationToken(devData.api_key)
    }
  }, [devData])

  useEffect(() => {
    if (stagingData && !getStagingVerificationToken()) {
      setStagingVerificationToken(stagingData.api_key)
    }
  }, [stagingData])


  return {
    verifyDevCredentials,
    verifyStagingCredentials,
    devError,
    stagingError,
    devIsLoading,
    stagingIsLoading,
    devIsSuccess,
    stagingIsSuccess,
  }
}
