import {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidsByPageQuery,
  useGetMerchantSecondaryMidQuery,
  usePostMerchantSecondaryMidMutation,
  usePatchMerchantSecondaryMidMutation,
  usePatchMerchantSecondaryMidsBulkMutation,
  useDeleteMerchantSecondaryMidMutation,
  usePostMerchantSecondaryMidOnboardingMutation,
  usePostMerchantSecondaryMidOffboardingMutation,
} from 'services/DirectoryMerchantSecondaryMids'

export const useDirectorySecondaryMids = ({
  skipGetSecondaryMids = false,
  skipGetSecondaryMid = false,
  skipGetSecondaryMidsByPage = false,
  planRef = '',
  merchantRef = '',
  secondaryMidRef = '',
  locationRef = '',
  page = '1',
  getAll = false}
) => {
  const {
    data: getMerchantSecondaryMidsResponse,
    isLoading: getMerchantSecondaryMidsIsLoading,
    error: getMerchantSecondaryMidsError,
    refetch: getMerchantSecondaryMidsRefresh,
  } = useGetMerchantSecondaryMidsQuery({planRef, merchantRef, locationRef, getAll}, {skip: skipGetSecondaryMids})

  const {
    data: getMerchantSecondaryMidsByPageResponse,
    isLoading: getMerchantSecondaryMidsByPageIsLoading,
    error: getMerchantSecondaryMidsByPageError,
  } = useGetMerchantSecondaryMidsByPageQuery({planRef, merchantRef, locationRef, page, getAll}, {skip: skipGetSecondaryMidsByPage})

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

  const [patchMerchantSecondaryMid, {
    data: patchMerchantSecondaryMidResponse,
    isLoading: patchMerchantSecondaryMidIsLoading,
    error: patchMerchantSecondaryMidError,
    reset: resetPatchMerchantSecondaryMidResponse,
  }] = usePatchMerchantSecondaryMidMutation({fixedCacheKey: 'patchMerchantSecondaryMid'})

  const [patchMerchantSecondaryMidsBulk, {
    data: patchMerchantSecondaryMidsBulkResponse,
    isSuccess: patchMerchantSecondaryMidsBulkIsSuccess,
    isLoading: patchMerchantSecondaryMidsBulkIsLoading,
    isError: patchMerchantSecondaryMidsBulkIsError,
    reset: resetPatchMerchantSecondaryMidsBulkResponse,
  }] = usePatchMerchantSecondaryMidsBulkMutation({fixedCacheKey: 'patchMerchantSecondaryMids'})

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
    getMerchantSecondaryMidsRefresh,
    // GET Secondary MIDs By Page
    getMerchantSecondaryMidsByPageResponse,
    getMerchantSecondaryMidsByPageIsLoading,
    getMerchantSecondaryMidsByPageError,
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
    // PATCH Secondary MID
    patchMerchantSecondaryMid,
    patchMerchantSecondaryMidResponse,
    patchMerchantSecondaryMidError,
    patchMerchantSecondaryMidIsLoading,
    resetPatchMerchantSecondaryMidResponse,
    // PATCH Secondary MIDs Bulk
    patchMerchantSecondaryMidsBulk,
    patchMerchantSecondaryMidsBulkResponse,
    patchMerchantSecondaryMidsBulkIsSuccess,
    patchMerchantSecondaryMidsBulkIsError,
    patchMerchantSecondaryMidsBulkIsLoading,
    resetPatchMerchantSecondaryMidsBulkResponse,
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
