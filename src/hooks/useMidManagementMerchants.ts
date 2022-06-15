import {
  usePostMerchantMutation,
  useDeleteMerchantMutation,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  useGetMerchantMidQuery,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
} from 'services/midManagementMerchants'

export const useMidManagementMerchants = (planRef, merchantRef, midRef) => {
  const [postMerchant, {data: postMerchantResponse, isLoading: postMerchantIsLoading, error: postMerchantError, reset: resetPostMerchantResponse}] = usePostMerchantMutation({fixedCacheKey: 'postMerchant'})
  const [deleteMerchant, {isSuccess: deleteMerchantIsSuccess, isLoading: deleteMerchantIsLoading, error: deleteMerchantError, reset: resetDeleteMerchantResponse}] = useDeleteMerchantMutation({fixedCacheKey: 'deleteMerchant'})
  const [postMerchantMid, {data: postMerchantMidResponse, isLoading: postMerchantMidIsLoading, error: postMerchantMidError, reset: resetPostMerchantMidResponse}] = usePostMerchantMidMutation({fixedCacheKey: 'postMerchantMid'})
  const [patchMerchantMid, {data: patchMerchantMidResponse, isLoading: patchMerchantMidIsLoading, error: patchMerchantMidError, reset: resetPatchMerchantMidResponse}] = usePatchMerchantMidMutation({fixedCacheKey: 'patchMerchantMid'})
  const {data: getMerchantMidResponse, isLoading: getMerchantMidIsLoading, error: getMerchantMidError} = useGetMerchantMidQuery({planRef, merchantRef, midRef})
  const [putMerchantMidLocation, {data: putMerchantMidLocationResponse, isLoading: putMerchantMidLocationIsLoading, error: putMerchantMidLocationError, reset: resetPutMerchantMidLocationResponse}] = usePutMerchantMidLocationMutation({fixedCacheKey: 'putMerchantMidLocation'})
  const [deleteMerchantMidLocation, {isSuccess: deleteMerchantMidLocationIsSuccess, isLoading: deleteMerchantMidLocationIsLoading, error: deleteMerchantMidLocationError, reset: resetDeleteMerchantMidLocationResponse}] = useDeleteMerchantMidLocationMutation({fixedCacheKey: 'getMerchantMidLocation'})

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
    getMerchantMidResponse,
    getMerchantMidIsLoading,
    getMerchantMidError,
    putMerchantMidLocation,
    putMerchantMidLocationResponse,
    putMerchantMidLocationIsLoading,
    putMerchantMidLocationError,
    resetPutMerchantMidLocationResponse,
    deleteMerchantMidLocation,
    deleteMerchantMidLocationIsSuccess,
    deleteMerchantMidLocationIsLoading,
    deleteMerchantMidLocationError,
    resetDeleteMerchantMidLocationResponse,
  }
}
