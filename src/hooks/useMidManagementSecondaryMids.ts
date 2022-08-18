import {
  useGetMerchantSecondaryMidsQuery,
  useGetMerchantSecondaryMidQuery,
  useGetMerchantSecondaryMidLocationsQuery,
  useDeleteMerchantSecondaryMidMutation,
} from 'services/midManagementMerchantSecondaryMids'

export const useMidManagementSecondaryMids = ({skipGetSecondaryMids = false, skipGetSecondaryMid = false, skipGetSecondaryMidLocations = false, planRef = '', merchantRef = '', secondaryMidRef = '', locationRef = ''}) => {
  const {data: getMerchantSecondaryMidsResponse, isLoading: getMerchantSecondaryMidsIsLoading, error: getMerchantSecondaryMidsError} = useGetMerchantSecondaryMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetSecondaryMids})

  const {data: getMerchantSecondaryMidResponse, isLoading: getMerchantSecondaryMidIsLoading, error: getMerchantSecondaryMidError} = useGetMerchantSecondaryMidQuery({planRef, merchantRef, secondaryMidRef}, {skip: skipGetSecondaryMid})

  const {data: getMerchantSecondaryMidLocationsResponse, isLoading: getMerchantSecondaryMidLocationsIsLoading, error: getMerchantSecondaryMidLocationsError} = useGetMerchantSecondaryMidLocationsQuery({planRef, merchantRef, secondaryMidRef}, {skip: skipGetSecondaryMidLocations})

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
    // GET Secondary MID Locations
    getMerchantSecondaryMidLocationsResponse,
    getMerchantSecondaryMidLocationsIsLoading,
    getMerchantSecondaryMidLocationsError,
    // DELETE Secondary MID
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
  }
}
