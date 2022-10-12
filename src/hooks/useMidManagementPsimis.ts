import {
  useGetMerchantPsimisQuery,
  useGetMerchantPsimiQuery,
  useDeleteMerchantPsimiMutation,
  usePostMerchantPsimiOnboardingMutation,
  usePostMerchantPsimiOffboardingMutation,
} from 'services/midManagementMerchantPsimis'

export const useMidManagementPsimis = ({skipGetPsimis = false, skipGetPsimi = false, planRef = '', merchantRef = '', psimiRef = ''}) => {
  const {
    data: getMerchantPsimisResponse,
    isLoading: getMerchantPsimisIsLoading,
    error: getMerchantPsimisError,
  } = useGetMerchantPsimisQuery({planRef, merchantRef}, {skip: skipGetPsimis})

  const {
    data: getMerchantPsimiResponse,
    isLoading: getMerchantPsimiIsLoading,
    error: getMerchantPsimiError,
  } = useGetMerchantPsimiQuery({planRef, merchantRef, psimiRef}, {skip: skipGetPsimi})

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
    getMerchantPsimisIsLoading,
    getMerchantPsimisError,
    // GET PSIMI
    getMerchantPsimiResponse,
    getMerchantPsimiIsLoading,
    getMerchantPsimiError,
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
