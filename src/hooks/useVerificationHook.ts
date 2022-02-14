import {useEffect} from 'react'
import usePrevious from 'hooks/usePrevious'
import {
  useVerifyDevCredentialsMutation,
  useVerifyStagingCredentialsMutation,
} from 'services/users'
import {storeDevToken, storeStagingToken} from 'utils/storage'

export const useVerificationHook = () => {
  const [verifyDevCredentials, {data: devData, error: devError, isLoading: devIsLoading, isSuccess: devIsSuccess}] = useVerifyDevCredentialsMutation()
  const [verifyStagingCredentials, {data: stagingData, error: stagingError, isLoading: stagingIsLoading, isSuccess: stagingIsSuccess}] = useVerifyStagingCredentialsMutation()

  const prevDevData = usePrevious(devData)
  const prevStagingData = usePrevious(stagingData)

  // If new token is available, store in local storage
  useEffect(() => {
    if (devData && !prevDevData) {
      storeDevToken(devData.api_key)
    }
  }, [devData, prevDevData])

  useEffect(() => {
    if (stagingData && !prevStagingData) {
      storeStagingToken(stagingData.api_key)
    }
  }, [stagingData, prevStagingData])

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
