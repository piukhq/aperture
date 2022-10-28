import {
  useGetMerchantMidsQuery,
  useGetMerchantMidQuery,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
  useDeleteMerchantMidMutation,
  usePostMerchantMidOnboardingMutation,
  usePostMerchantMidOffboardingMutation,
} from 'services/midManagementMerchantMids'

export const useMidManagementMids = ({skipGetMids = false, skipGetMid = false, planRef = '', merchantRef = '', midRef = ''}) => {
  const {
    data: getMerchantMidsResponse,
    isLoading: getMerchantMidsIsLoading,
    error: getMerchantMidsError,
  } = useGetMerchantMidsQuery({planRef, merchantRef}, {skip: skipGetMids})

  const {
    data: getMerchantMidResponse,
    isLoading: getMerchantMidIsLoading,
    error: getMerchantMidError,
    refetch: getMerchantMidRefresh,
    isFetching: getMerchantMidIsFetching,
  } = useGetMerchantMidQuery({planRef, merchantRef, midRef}, {skip: skipGetMid})

  const [postMerchantMid, {
    data: postMerchantMidResponse,
    isLoading: postMerchantMidIsLoading,
    error: postMerchantMidError,
    reset: resetPostMerchantMidResponse,
  }] = usePostMerchantMidMutation({fixedCacheKey: 'postMerchantMid'})

  const [patchMerchantMid, {
    data: patchMerchantMidResponse,
    isLoading: patchMerchantMidIsLoading,
    error: patchMerchantMidError,
    reset: resetPatchMerchantMidResponse,
  }] = usePatchMerchantMidMutation({fixedCacheKey: 'patchMerchantMid'})

  const [putMerchantMidLocation, {
    data: putMerchantMidLocationResponse,
    isLoading: putMerchantMidLocationIsLoading,
    error: putMerchantMidLocationError,
    reset: resetPutMerchantMidLocationResponse,
  }] = usePutMerchantMidLocationMutation({fixedCacheKey: 'putMerchantMidLocation'})

  const [deleteMerchantMidLocation, {
    isSuccess: deleteMerchantMidLocationIsSuccess,
    isLoading: deleteMerchantMidLocationIsLoading,
    error: deleteMerchantMidLocationError,
    reset: resetDeleteMerchantMidLocationResponse,
  }] = useDeleteMerchantMidLocationMutation({fixedCacheKey: 'deleteMerchantMidLocation'})

  const [deleteMerchantMid, {
    isSuccess: deleteMerchantMidIsSuccess,
    isLoading: deleteMerchantMidIsLoading,
    error: deleteMerchantMidError,
    reset: resetDeleteMerchantMidResponse,
  }] = useDeleteMerchantMidMutation({fixedCacheKey: 'deleteMerchantMid'})


  const [postMerchantMidOnboarding, {
    data: postMerchantMidOnboardingResponse,
    isLoading: postMerchantMidOnboardingIsLoading,
    isSuccess: postMerchantMidOnboardingIsSuccess,
    error: postMerchantMidOnboardingError,
    reset: resetPostMerchantMidOnboardingResponse,
  }] = usePostMerchantMidOnboardingMutation({fixedCacheKey: 'postMerchantMidOnboarding'})

  const [postMerchantMidOffboarding, {
    data: postMerchantMidOffboardingResponse,
    isLoading: postMerchantMidOffboardingIsLoading,
    isSuccess: postMerchantMidOffboardingIsSuccess,
    error: postMerchantMidOffboardingError,
    reset: resetPostMerchantMidOffboardingResponse,
  }] = usePostMerchantMidOffboardingMutation({fixedCacheKey: 'postMerchantMidOffboarding'})

  return {
    // GET MIDs
    getMerchantMidsResponse,
    getMerchantMidsIsLoading,
    getMerchantMidsError,
    // GET MID
    getMerchantMidResponse,
    getMerchantMidIsLoading,
    getMerchantMidError,
    getMerchantMidRefresh,
    getMerchantMidIsFetching,
    // POST MID
    postMerchantMid,
    postMerchantMidResponse,
    postMerchantMidIsLoading,
    postMerchantMidError,
    resetPostMerchantMidResponse,
    // PATCH MID
    patchMerchantMid,
    patchMerchantMidResponse,
    patchMerchantMidIsLoading,
    patchMerchantMidError,
    resetPatchMerchantMidResponse,
    // PUT MID
    putMerchantMidLocation,
    putMerchantMidLocationResponse,
    putMerchantMidLocationIsLoading,
    putMerchantMidLocationError,
    resetPutMerchantMidLocationResponse,
    // DELETE MID Location
    deleteMerchantMidLocation,
    deleteMerchantMidLocationIsSuccess,
    deleteMerchantMidLocationIsLoading,
    deleteMerchantMidLocationError,
    resetDeleteMerchantMidLocationResponse,
    // DELETE MID
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
    // POST MID ONBOARDING
    postMerchantMidOnboarding,
    postMerchantMidOnboardingResponse,
    postMerchantMidOnboardingIsLoading,
    postMerchantMidOnboardingIsSuccess,
    postMerchantMidOnboardingError,
    resetPostMerchantMidOnboardingResponse,
    // POST MID OFFBOARDING
    postMerchantMidOffboarding,
    postMerchantMidOffboardingResponse,
    postMerchantMidOffboardingIsLoading,
    postMerchantMidOffboardingIsSuccess,
    postMerchantMidOffboardingError,
    resetPostMerchantMidOffboardingResponse,
  }
}
