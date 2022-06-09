import {usePostMerchantMutation, useDeleteMerchantMutation, usePostMerchantMidMutation, usePatchMerchantMidMutation} from 'services/midManagementMerchants'

export const useMidManagementMerchants = () => {
  const [postMerchant, {data: postMerchantResponse, isLoading: postMerchantIsLoading, error: postMerchantError, reset: resetPostMerchantResponse}] = usePostMerchantMutation({fixedCacheKey: 'postMerchant'})
  const [deleteMerchant, {isSuccess: deleteMerchantIsSuccess, isLoading: deleteMerchantIsLoading, error: deleteMerchantError, reset: resetDeleteMerchantResponse}] = useDeleteMerchantMutation({fixedCacheKey: 'deleteMerchant'})
  const [postMerchantMid, {data: postMerchantMidResponse, isLoading: postMerchantMidIsLoading, error: postMerchantMidError, reset: resetPostMerchantMidResponse}] = usePostMerchantMidMutation({fixedCacheKey: 'postMerchantMid'})
  const [patchMerchantMid, {data: patchMerchantMidResponse, isLoading: patchMerchantMidIsLoading, error: patchMerchantMidError, reset: resetPatchMerchantMidResponse}] = usePatchMerchantMidMutation({fixedCacheKey: 'patchMerchantMid'})

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
    postMerchantMid,
    postMerchantMidResponse,
    postMerchantMidIsLoading,
    postMerchantMidError,
    resetPostMerchantMidResponse,
    patchMerchantMid,
    patchMerchantMidResponse,
    patchMerchantMidIsLoading,
    patchMerchantMidError,
    resetPatchMerchantMidResponse,
  }
}
