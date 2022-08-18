import {useGetMerchantSecondaryMidLocationsQuery} from 'services/midManagementMerchantSecondaryMids'

export const useMidManagementSecondaryMidLocations = ({planRef = '', merchantRef = '', secondaryMidRef = ''}) => {

  const {
    data: getMerchantSecondaryMidLocationsResponse,
    isLoading: getMerchantSecondaryMidLocationsIsLoading,
    error: getMerchantSecondaryMidLocationsError,
  } = useGetMerchantSecondaryMidLocationsQuery({planRef, merchantRef, secondaryMidRef})

  return {
    // GET Secondary MID Locations
    getMerchantSecondaryMidLocationsResponse,
    getMerchantSecondaryMidLocationsIsLoading,
    getMerchantSecondaryMidLocationsError,
  }
}
