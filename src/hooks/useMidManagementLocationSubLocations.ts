import {
  useGetMerchantLocationLinkedSubLocationsQuery,
} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationSubLocations = ({planRef = '', merchantRef = '', locationRef = ''}) => {
  const {
    data: getMerchantLocationLinkedSubLocationsResponse,
    isLoading: getMerchantLocationLinkedSubLocationsIsLoading,
    error: getMerchantLocationLinkedSubLocationsError,
  } = useGetMerchantLocationLinkedSubLocationsQuery({planRef, merchantRef, locationRef})

  return {
    // GET Location Linked Sub Locations
    getMerchantLocationLinkedSubLocationsResponse,
    getMerchantLocationLinkedSubLocationsIsLoading,
    getMerchantLocationLinkedSubLocationsError,
  }
}
