import {
  useGetMerchantPsimisQuery,
  useGetMerchantPsimiQuery,
  usePostMerchantPsimiMutation,
  useDeleteMerchantPsimiMutation,
  usePostMerchantPsimiOnboardingMutation,
  usePostMerchantPsimiOffboardingMutation,
} from 'services/DirectoryMerchantPsimis'

export const useDirectoryPsimis = ({skipGetPsimis = false, skipGetPsimi = false, planRef = '', merchantRef = '', psimiRef = ''}) => {
  const {
    data: getMerchantPsimisResponse,
    refetch: getMerchantPsimisRefresh,
    isLoading: getMerchantPsimisIsLoading,
    error: getMerchantPsimisError,
  } = useGetMerchantPsimisQuery({planRef, merchantRef}, {skip: skipGetPsimis})

  const {
    data: getMerchantPsimiResponse,
    isLoading: getMerchantPsimiIsLoading,
    error: getMerchantPsimiError,
    refetch: getMerchantPsimiRefresh,
    isFetching: getMerchantPsimiIsFetching,
  } = useGetMerchantPsimiQuery({planRef, merchantRef, psimiRef}, {skip: skipGetPsimi})

  const [postMerchantPsimi, {
    data: postMerchantPsimiResponse,
    isLoading: postMerchantPsimiIsLoading,
    error: postMerchantPsimiError,
    reset: resetPostMerchantPsimiResponse,
  }] = usePostMerchantPsimiMutation({fixedCacheKey: 'postMerchantPsimi'})

  const [deleteMerchantPsimi, {
    isSuccess: deleteMerchantPsimiIsSuccess,
    isLoading: deleteMerchantPsimiIsLoading,
    error: deleteMerchantPsimiError,
    reset: resetDeleteMerchantPsimiResponse,
  }] = useDeleteMerchantPsimiMutation({fixedCacheKey: 'deleteMerchantPsimi'})

  const [postMerchantPsimiOnboarding, {
    data: postMerchantPsimiOnboardingResponse,
    isLoading: postMerchantPsimiOnboardingIsLoading,
    isSuccess: postMerchantPsimiOnboardingIsSuccess,
    error: postMerchantPsimiOnboardingError,
    reset: resetPostMerchantPsimiOnboardingResponse,
  }] = usePostMerchantPsimiOnboardingMutation({fixedCacheKey: 'postMerchantPsimiOnboarding'})

  const [postMerchantPsimiOffboarding, {
    data: postMerchantPsimiOffboardingResponse,
    isLoading: postMerchantPsimiOffboardingIsLoading,
    isSuccess: postMerchantPsimiOffboardingIsSuccess,
    error: postMerchantPsimiOffboardingError,
    reset: resetPostMerchantPsimiOffboardingResponse,
  }] = usePostMerchantPsimiOffboardingMutation({fixedCacheKey: 'postMerchantPsimiOffboarding'})

  return {
    // GET Psimis
    getMerchantPsimisResponse,
    getMerchantPsimisRefresh,
    getMerchantPsimisIsLoading,
    getMerchantPsimisError,
    // GET PSIMI
    getMerchantPsimiResponse,
    getMerchantPsimiIsLoading,
    getMerchantPsimiError,
    getMerchantPsimiRefresh,
    getMerchantPsimiIsFetching,
    // POST PSIMI
    postMerchantPsimi,
    postMerchantPsimiResponse,
    postMerchantPsimiIsLoading,
    postMerchantPsimiError,
    resetPostMerchantPsimiResponse,
    // DELETE PSIMI
    deleteMerchantPsimi,
    deleteMerchantPsimiIsSuccess,
    deleteMerchantPsimiIsLoading,
    deleteMerchantPsimiError,
    resetDeleteMerchantPsimiResponse,
    // POST PSIMI Onboarding
    postMerchantPsimiOnboarding,
    postMerchantPsimiOnboardingResponse,
    postMerchantPsimiOnboardingIsLoading,
    postMerchantPsimiOnboardingIsSuccess,
    postMerchantPsimiOnboardingError,
    resetPostMerchantPsimiOnboardingResponse,
    // POST PSIMI Offboarding
    postMerchantPsimiOffboarding,
    postMerchantPsimiOffboardingResponse,
    postMerchantPsimiOffboardingIsLoading,
    postMerchantPsimiOffboardingIsSuccess,
    postMerchantPsimiOffboardingError,
    resetPostMerchantPsimiOffboardingResponse,
  }
}
