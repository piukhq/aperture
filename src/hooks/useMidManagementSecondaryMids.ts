import {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  useDeleteMerchantSecondaryMidMutation,
} from 'services/midManagementMerchantSecondaryMids'

export const useMidManagementSecondaryMids = ({skipGetSecondaryMids = false, skipGetSecondaryMid = false, planRef = '', merchantRef = '', secondaryMidRef = '', locationRef = ''}) => {
  const {data: getMerchantSecondaryMidsResponse, isLoading: getMerchantSecondaryMidsIsLoading, error: getMerchantSecondaryMidsError} = useGetMerchantSecondaryMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetSecondaryMids})

  const {data: getMerchantSecondaryMidResponse, isLoading: getMerchantSecondaryMidIsLoading, error: getMerchantSecondaryMidError} = useGetMerchantSecondaryMidQuery({planRef, merchantRef, secondaryMidRef}, {skip: skipGetSecondaryMid})

  const [deleteMerchantSecondaryMid,
    {isSuccess: deleteMerchantSecondaryMidIsSuccess, isLoading: deleteMerchantSecondaryMidIsLoading, error: deleteMerchantSecondaryMidError, reset: resetDeleteMerchantSecondaryMidResponse},
  ] = useDeleteMerchantSecondaryMidMutation({fixedCacheKey: 'deleteMerchantSecondaryMid'})

  return {
    // GET Secondary MIDs
    getMerchantSecondaryMidsResponse,
    getMerchantSecondaryMidsIsLoading,
    getMerchantSecondaryMidsError,
    // GET Secondary MID
    getMerchantSecondaryMidResponse,
    getMerchantSecondaryMidIsLoading,
    getMerchantSecondaryMidError,
    // DELETE Secondary MID
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,

  }
}
