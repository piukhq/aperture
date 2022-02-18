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
  const [verifyDevCredentials, {data: devToken, error: devError, isLoading: devIsLoading, isSuccess: devIsSuccess}] = useVerifyDevCredentialsMutation({fixedCacheKey: 'devVerification'})
  const [verifyStagingCredentials, {data: stagingToken, error: stagingError, isLoading: stagingIsLoading, isSuccess: stagingIsSuccess}] = useVerifyStagingCredentialsMutation({fixedCacheKey: 'stagingVerification'})

  // If new token is available and there is no current token in local storage, store in local storage
  useEffect(() => {
    if (devToken && !getDevVerificationToken()) {
      setDevVerificationToken(devToken.api_key)
    }
  }, [devToken])

  useEffect(() => {
    if (stagingToken && !getStagingVerificationToken()) {
      setStagingVerificationToken(stagingToken.api_key)
    }
  }, [stagingToken])

  return {
    verifyDevCredentials,
    verifyStagingCredentials,
    devToken,
    stagingToken,
    devError,
    stagingError,
    devIsLoading,
    stagingIsLoading,
    devIsSuccess,
    stagingIsSuccess,
  }
}
