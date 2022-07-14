import {
  useGetMerchantQuery,
  usePostMerchantMutation,
  useDeleteMerchantMutation,
} from 'services/midManagementMerchants'

export const useMidManagementMerchants = ({skipGetMerchant = false, planRef = '', merchantRef = ''}) => {
  const {data: getMerchantResponse, isLoading: getMerchantIsLoading, error: getMerchantError} = useGetMerchantQuery({planRef, merchantRef}, {skip: skipGetMerchant})

  const [postMerchant, {data: postMerchantResponse, isLoading: postMerchantIsLoading, error: postMerchantError, reset: resetPostMerchantResponse}] = usePostMerchantMutation({fixedCacheKey: 'postMerchant'})

  const [deleteMerchant, {isSuccess: deleteMerchantIsSuccess, isLoading: deleteMerchantIsLoading, error: deleteMerchantError, reset: resetDeleteMerchantResponse}] = useDeleteMerchantMutation({fixedCacheKey: 'deleteMerchant'})

  return {
    // GET Merchant
    getMerchantResponse,
    getMerchantIsLoading,
    getMerchantError,
    // POST Merchant
    postMerchant,
    postMerchantResponse,
    postMerchantIsLoading,
    postMerchantError,
    resetPostMerchantResponse,
    // DELETE Merchant
    deleteMerchant,
    deleteMerchantIsSuccess,
    deleteMerchantIsLoading,
    deleteMerchantError,
    resetDeleteMerchantResponse,
  }
}
