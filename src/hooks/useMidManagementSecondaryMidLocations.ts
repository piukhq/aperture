import {
  useGetMerchantSecondaryMidLinkedLocationsQuery,
  useDeleteMerchantSecondaryMidLocationLinkMutation,
} from 'services/midManagementMerchantSecondaryMids'

export const useMidManagementSecondaryMidLocations = ({planRef = '', merchantRef = '', secondaryMidRef = ''}) => {
  const {
    data: getMerchantSecondaryMidLinkedLocationsResponse,
    isLoading: getMerchantSecondaryMidLinkedLocationsIsLoading,
    error: getMerchantSecondaryMidLinkedLocationsError,
  } = useGetMerchantSecondaryMidLinkedLocationsQuery({planRef, merchantRef, secondaryMidRef})

  const [deleteMerchantSecondaryMidLocationLink, {
    isSuccess: deleteMerchantSecondaryMidLocationLinkIsSuccess,
    isLoading: deleteMerchantSecondaryMidLocationLinkIsLoading,
    error: deleteMerchantSecondaryMidLocationLinkError,
    reset: resetDeleteMerchantSecondaryMidLocationLinkResponse,
  }] = useDeleteMerchantSecondaryMidLocationLinkMutation({fixedCacheKey: 'deleteMerchantSecondaryMidLocationLink'})

  return {
    // GET Secondary MID Locations
    getMerchantSecondaryMidLinkedLocationsResponse,
    getMerchantSecondaryMidLinkedLocationsIsLoading,
    getMerchantSecondaryMidLinkedLocationsError,
    // DELETE Secondary MID Location Link
    deleteMerchantSecondaryMidLocationLink,
    deleteMerchantSecondaryMidLocationLinkIsSuccess,
    deleteMerchantSecondaryMidLocationLinkIsLoading,
    deleteMerchantSecondaryMidLocationLinkError,
    resetDeleteMerchantSecondaryMidLocationLinkResponse,
  }
}
