import {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  usePostMerchantSecondaryMidMutation,
  useDeleteMerchantSecondaryMidMutation,
  usePostMerchantSecondaryMidOnboardingMutation,
  usePostMerchantSecondaryMidOffboardingMutation,
} from 'services/midManagementMerchantSecondaryMids'

export const useMidManagementSecondaryMids = ({skipGetSecondaryMids = false, skipGetSecondaryMid = false, planRef = '', merchantRef = '', secondaryMidRef = '', locationRef = ''}) => {
  const {
    data: getMerchantSecondaryMidsResponse,
    isLoading: getMerchantSecondaryMidsIsLoading,
    error: getMerchantSecondaryMidsError,
  } = useGetMerchantSecondaryMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetSecondaryMids})

  const {
    data: getMerchantSecondaryMidResponse,
    isLoading: getMerchantSecondaryMidIsLoading,
    error: getMerchantSecondaryMidError,
    refetch: getMerchantSecondaryMidRefresh,
    isFetching: getMerchantSecondaryMidIsFetching,
  } = useGetMerchantSecondaryMidQuery({planRef, merchantRef, secondaryMidRef}, {skip: skipGetSecondaryMid})

  const [postMerchantSecondaryMid, {
    data: postMerchantSecondaryMidResponse,
    isSuccess: postMerchantSecondaryMidIsSuccess,
    isLoading: postMerchantSecondaryMidIsLoading,
    error: postMerchantSecondaryMidError,
    reset: resetPostMerchantSecondaryMidResponse,
  }] = usePostMerchantSecondaryMidMutation({fixedCacheKey: 'postMerchantSecondaryMid'})

  const [deleteMerchantSecondaryMid, {
    isSuccess: deleteMerchantSecondaryMidIsSuccess,
    isLoading: deleteMerchantSecondaryMidIsLoading,
    error: deleteMerchantSecondaryMidError,
    reset: resetDeleteMerchantSecondaryMidResponse,
  }] = useDeleteMerchantSecondaryMidMutation({fixedCacheKey: 'deleteMerchantSecondaryMid'})

  const [postMerchantSecondaryMidOnboarding, {
    data: postMerchantSecondaryMidOnboardingResponse,
    isLoading: postMerchantSecondaryMidOnboardingIsLoading,
    isSuccess: postMerchantSecondaryMidOnboardingIsSuccess,
    error: postMerchantSecondaryMidOnboardingError,
    reset: resetPostMerchantSecondaryMidOnboardingResponse,
  }] = usePostMerchantSecondaryMidOnboardingMutation({fixedCacheKey: 'postMerchantSecondaryMidOnboarding'})

  const [postMerchantSecondaryMidOffboarding, {
    data: postMerchantSecondaryMidOffboardingResponse,
    isLoading: postMerchantSecondaryMidOffboardingIsLoading,
    isSuccess: postMerchantSecondaryMidOffboardingIsSuccess,
    error: postMerchantSecondaryMidOffboardingError,
    reset: resetPostMerchantSecondaryMidOffboardingResponse,
  }] = usePostMerchantSecondaryMidOffboardingMutation({fixedCacheKey: 'postMerchantSecondaryMidOffboarding'})

  return {
    // GET Secondary MIDs
    getMerchantSecondaryMidsResponse,
    getMerchantSecondaryMidsIsLoading,
    getMerchantSecondaryMidsError,
    // GET Secondary MID
    getMerchantSecondaryMidResponse,
    getMerchantSecondaryMidIsLoading,
    getMerchantSecondaryMidError,
    getMerchantSecondaryMidRefresh,
    getMerchantSecondaryMidIsFetching,
    // POST Secondary MID
    postMerchantSecondaryMid,
    postMerchantSecondaryMidResponse,
    postMerchantSecondaryMidIsSuccess,
    postMerchantSecondaryMidIsLoading,
    postMerchantSecondaryMidError,
    resetPostMerchantSecondaryMidResponse,
    // DELETE Secondary MID
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
    // POST Secondary MID Onboarding
    postMerchantSecondaryMidOnboarding,
    postMerchantSecondaryMidOnboardingResponse,
    postMerchantSecondaryMidOnboardingIsLoading,
    postMerchantSecondaryMidOnboardingIsSuccess,
    postMerchantSecondaryMidOnboardingError,
    resetPostMerchantSecondaryMidOnboardingResponse,
    // POST Secondary MID Offboarding
    postMerchantSecondaryMidOffboarding,
    postMerchantSecondaryMidOffboardingResponse,
    postMerchantSecondaryMidOffboardingIsLoading,
    postMerchantSecondaryMidOffboardingIsSuccess,
    postMerchantSecondaryMidOffboardingError,
    resetPostMerchantSecondaryMidOffboardingResponse,
  }
}
