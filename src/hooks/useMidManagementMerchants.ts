import {usePostMerchantMutation, useDeleteMerchantMutation} from 'services/midManagementMerchants'

export const useMidManagementMerchants = () => {
  const [postMerchant, {data: postMerchantResponse, isLoading: postMerchantIsLoading, error: postMerchantError, reset: resetPostMerchantResponse}] = usePostMerchantMutation({fixedCacheKey: 'postMerchant'})
  const [deleteMerchant, {isSuccess: deleteMerchantIsSuccess, isLoading: deleteMerchantIsLoading, error: deleteMerchantError, reset: resetDeleteMerchantResponse}] = useDeleteMerchantMutation({fixedCacheKey: 'deleteMerchant'})

  return {
    postMerchant,
    postMerchantResponse,
    postMerchantIsLoading,
    postMerchantError,
    resetPostMerchantResponse,
    deleteMerchant,
    deleteMerchantIsSuccess,
    deleteMerchantIsLoading,
    deleteMerchantError,
    resetDeleteMerchantResponse,
  }
}
