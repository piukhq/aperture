import {useEffect} from 'react'

import {
  useVerifyDevCredentialsMutation,
  useVerifyStagingCredentialsMutation,
  useVerifyProdCredentialsMutation,
} from 'services/users'
import {
  setDevVerificationToken,
  setStagingVerificationToken,
  setProdVerificationToken,
  getDevVerificationToken,
  getStagingVerificationToken,
  getProdVerificationToken,
} from 'utils/storage'

export const useVerification = () => {
  const [verifyDevCredentials, {data: devToken, error: devError, isLoading: devIsLoading, isSuccess: devIsSuccess, reset: resetDevToken}] = useVerifyDevCredentialsMutation({fixedCacheKey: 'devVerification'})
  const [verifyStagingCredentials, {data: stagingToken, error: stagingError, isLoading: stagingIsLoading, isSuccess: stagingIsSuccess, reset: resetStagingToken}] = useVerifyStagingCredentialsMutation({fixedCacheKey: 'stagingVerification'})
  const [verifyProdCredentials, {data: prodToken, error: prodError, isLoading: prodIsLoading, isSuccess: prodIsSuccess, reset: resetProdToken}] = useVerifyProdCredentialsMutation({fixedCacheKey: 'prodVerification'})

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

  useEffect(() => {
    if (prodToken && !getProdVerificationToken()) {
      setProdVerificationToken(prodToken.api_key)
    }
  }, [prodToken])

  return {
    verifyDevCredentials,
    verifyStagingCredentials,
    verifyProdCredentials,
    devToken,
    stagingToken,
    prodToken,
    devError,
    stagingError,
    prodError,
    devIsLoading,
    stagingIsLoading,
    prodIsLoading,
    devIsSuccess,
    stagingIsSuccess,
    prodIsSuccess,
    resetDevToken,
    resetStagingToken,
    resetProdToken,
  }
}
