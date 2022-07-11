import {
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  useGetMerchantMidQuery,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
  useDeleteMerchantMidMutation,
  useDeleteMerchantSecondaryMidMutation,
  useDeleteMerchantIdentifierMutation,
} from 'services/midManagementMerchants'

export const useMidManagementMids = (skip, planRef = '', merchantRef = '', midRef = '') => {
  const {data: getMerchantMidResponse, isLoading: getMerchantMidIsLoading, error: getMerchantMidError} = useGetMerchantMidQuery({planRef, merchantRef, midRef}, {skip})

  const [postMerchantMid,
    {data: postMerchantMidResponse, isLoading: postMerchantMidIsLoading, error: postMerchantMidError, reset: resetPostMerchantMidResponse},
  ] = usePostMerchantMidMutation({fixedCacheKey: 'postMerchantMid'})

  const [patchMerchantMid,
    {data: patchMerchantMidResponse, isLoading: patchMerchantMidIsLoading, error: patchMerchantMidError, reset: resetPatchMerchantMidResponse},
  ] = usePatchMerchantMidMutation({fixedCacheKey: 'patchMerchantMid'})

  const [putMerchantMidLocation,
    {data: putMerchantMidLocationResponse, isLoading: putMerchantMidLocationIsLoading, error: putMerchantMidLocationError, reset: resetPutMerchantMidLocationResponse},
  ] = usePutMerchantMidLocationMutation({fixedCacheKey: 'putMerchantMidLocation'})

  const [deleteMerchantMidLocation,
    {isSuccess: deleteMerchantMidLocationIsSuccess, isLoading: deleteMerchantMidLocationIsLoading, error: deleteMerchantMidLocationError, reset: resetDeleteMerchantMidLocationResponse},
  ] = useDeleteMerchantMidLocationMutation({fixedCacheKey: 'deleteMerchantMidLocation'})

  const [deleteMerchantMid,
    {isSuccess: deleteMerchantMidIsSuccess, isLoading: deleteMerchantMidIsLoading, error: deleteMerchantMidError, reset: resetDeleteMerchantMidResponse},
  ] = useDeleteMerchantMidMutation({fixedCacheKey: 'deleteMerchantMid'})

  const [deleteMerchantSecondaryMid,
    {isSuccess: deleteMerchantSecondaryMidIsSuccess, isLoading: deleteMerchantSecondaryMidIsLoading, error: deleteMerchantSecondaryMidError, reset: resetDeleteMerchantSecondaryMidResponse},
  ] = useDeleteMerchantSecondaryMidMutation({fixedCacheKey: 'deleteMerchantSecondaryMid'})

  const [deleteMerchantIdentifier,
    {isSuccess: deleteMerchantIdentifierIsSuccess, isLoading: deleteMerchantIdentifierIsLoading, error: deleteMerchantIdentifierError, reset: resetDeleteMerchantIdentifierResponse},
  ] = useDeleteMerchantIdentifierMutation({fixedCacheKey: 'deleteMerchantIdentifier'})

  return {
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
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
    deleteMerchantIdentifier,
    deleteMerchantIdentifierIsSuccess,
    deleteMerchantIdentifierIsLoading,
    deleteMerchantIdentifierError,
    resetDeleteMerchantIdentifierResponse,
  }
}
