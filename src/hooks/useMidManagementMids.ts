import {
  useGetMerchantMidsQuery,
  useGetMerchantMidQuery,
  usePostMerchantMidMutation,
  usePatchMerchantMidMutation,
  usePutMerchantMidLocationMutation,
  useDeleteMerchantMidLocationMutation,
  useDeleteMerchantMidMutation,
} from 'services/midManagementMerchantMids'

export const useMidManagementMids = ({skipGetMids = false, skipGetMid = false, planRef = '', merchantRef = '', midRef = '', locationRef = ''}) => {
  const {data: getMerchantMidsResponse, isLoading: getMerchantMidsIsLoading, error: getMerchantMidsError} = useGetMerchantMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetMids})

  const {data: getMerchantMidResponse, isLoading: getMerchantMidIsLoading, error: getMerchantMidError} = useGetMerchantMidQuery({planRef, merchantRef, midRef}, {skip: skipGetMid})

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

  return {
    // GET MIDs
    getMerchantMidsResponse,
    getMerchantMidsIsLoading,
    getMerchantMidsError,
    // GET MID
    getMerchantMidResponse,
    getMerchantMidIsLoading,
    getMerchantMidError,
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
  }
}
