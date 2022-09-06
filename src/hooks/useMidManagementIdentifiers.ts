import {
  useGetMerchantIdentifiersQuery,
  useGetMerchantIdentifierQuery,
  useDeleteMerchantIdentifierMutation,
  usePostMerchantIdentifierOnboardingMutation,
  usePostMerchantIdentifierOffboardingMutation,
} from 'services/midManagementMerchantIdentifiers'

export const useMidManagementIdentifiers = ({skipGetIdentifiers = false, skipGetIdentifier = false, planRef = '', merchantRef = '', identifierRef = ''}) => {
  const {
    data: getMerchantIdentifiersResponse,
    isLoading: getMerchantIdentifiersIsLoading,
    error: getMerchantIdentifiersError,
  } = useGetMerchantIdentifiersQuery({planRef, merchantRef}, {skip: skipGetIdentifiers})

  const {
    data: getMerchantIdentifierResponse,
    isLoading: getMerchantIdentifierIsLoading,
    error: getMerchantIdentifierError,
  } = useGetMerchantIdentifierQuery({planRef, merchantRef, identifierRef}, {skip: skipGetIdentifier})

  const [deleteMerchantIdentifier, {
    isSuccess: deleteMerchantIdentifierIsSuccess,
    isLoading: deleteMerchantIdentifierIsLoading,
    error: deleteMerchantIdentifierError,
    reset: resetDeleteMerchantIdentifierResponse,
  }] = useDeleteMerchantIdentifierMutation({fixedCacheKey: 'deleteMerchantIdentifier'})

  const [postMerchantIdentifierOnboarding, {
    data: postMerchantIdentifierOnboardingResponse,
    isLoading: postMerchantIdentifierOnboardingIsLoading,
    isSuccess: postMerchantIdentifierOnboardingIsSuccess,
    error: postMerchantIdentifierOnboardingError,
    reset: resetPostMerchantIdentifierOnboardingResponse,
  }] = usePostMerchantIdentifierOnboardingMutation({fixedCacheKey: 'postMerchantIdentifierOnboarding'})

  const [postMerchantIdentifierOffboarding, {
    data: postMerchantIdentifierOffboardingResponse,
    isLoading: postMerchantIdentifierOffboardingIsLoading,
    isSuccess: postMerchantIdentifierOffboardingIsSuccess,
    error: postMerchantIdentifierOffboardingError,
    reset: resetPostMerchantIdentifierOffboardingResponse,
  }] = usePostMerchantIdentifierOffboardingMutation({fixedCacheKey: 'postMerchantIdentifierOffboarding'})

  return {
    // GET Identifiers
    getMerchantIdentifiersResponse,
    getMerchantIdentifiersIsLoading,
    getMerchantIdentifiersError,
    // GET Identifier
    getMerchantIdentifierResponse,
    getMerchantIdentifierIsLoading,
    getMerchantIdentifierError,
    // DELETE Identifier
    deleteMerchantIdentifier,
    deleteMerchantIdentifierIsSuccess,
    deleteMerchantIdentifierIsLoading,
    deleteMerchantIdentifierError,
    resetDeleteMerchantIdentifierResponse,
    // POST Identifier Onboarding
    postMerchantIdentifierOnboarding,
    postMerchantIdentifierOnboardingResponse,
    postMerchantIdentifierOnboardingIsLoading,
    postMerchantIdentifierOnboardingIsSuccess,
    postMerchantIdentifierOnboardingError,
    resetPostMerchantIdentifierOnboardingResponse,
    // POST Identifier Offboarding
    postMerchantIdentifierOffboarding,
    postMerchantIdentifierOffboardingResponse,
    postMerchantIdentifierOffboardingIsLoading,
    postMerchantIdentifierOffboardingIsSuccess,
    postMerchantIdentifierOffboardingError,
    resetPostMerchantIdentifierOffboardingResponse,
  }
}
