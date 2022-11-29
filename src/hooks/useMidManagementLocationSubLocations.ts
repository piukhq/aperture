import {
  useGetMerchantLocationSubLocationsQuery,
} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationSubLocations = ({planRef = '', merchantRef = '', locationRef = ''}) => {
  const {
    data: getMerchantLocationSubLocationsResponse,
    isLoading: getMerchantLocationSubLocationsIsLoading,
    error: getMerchantLocationSubLocationsError,
  } = useGetMerchantLocationSubLocationsQuery({planRef, merchantRef, locationRef})

  return {
    // GET Location Linked Sub Locations
    getMerchantLocationSubLocationsResponse,
    getMerchantLocationSubLocationsIsLoading,
    getMerchantLocationSubLocationsError,
  }
}
