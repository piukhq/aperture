import {
  useGetMerchantSecondaryMidLinkedLocationsQuery,
  usePostMerchantSecondaryMidLocationLinkMutation,
  useDeleteMerchantSecondaryMidLocationLinkMutation,
} from 'services/midManagementMerchantSecondaryMids'

export const useMidManagementSecondaryMidLocations = ({planRef = '', merchantRef = '', secondaryMidRef = ''}) => {
  const {
    data: getMerchantSecondaryMidLinkedLocationsResponse,
    isLoading: getMerchantSecondaryMidLinkedLocationsIsLoading,
    error: getMerchantSecondaryMidLinkedLocationsError,
  } = useGetMerchantSecondaryMidLinkedLocationsQuery({planRef, merchantRef, secondaryMidRef})

  const [postMerchantSecondaryMidLocationLink, {
    isSuccess: postMerchantSecondaryMidLocationLinkIsSuccess,
    isLoading: postMerchantSecondaryMidLocationLinkIsLoading,
    error: postMerchantSecondaryMidLocationLinkError,
    reset: resetPostMerchantSecondaryMidLocationLinkResponse,
  }] = usePostMerchantSecondaryMidLocationLinkMutation({fixedCacheKey: 'postMerchantSecondaryMidLocationLink'})


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
    // POST Secondary MID Location Link
    postMerchantSecondaryMidLocationLink,
    postMerchantSecondaryMidLocationLinkIsSuccess,
    postMerchantSecondaryMidLocationLinkIsLoading,
    postMerchantSecondaryMidLocationLinkError,
    resetPostMerchantSecondaryMidLocationLinkResponse,
    // DELETE Secondary MID Location Link
    deleteMerchantSecondaryMidLocationLink,
    deleteMerchantSecondaryMidLocationLinkIsSuccess,
    deleteMerchantSecondaryMidLocationLinkIsLoading,
    deleteMerchantSecondaryMidLocationLinkError,
    resetDeleteMerchantSecondaryMidLocationLinkResponse,
  }
}
