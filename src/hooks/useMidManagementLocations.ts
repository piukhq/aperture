import {
  useGetMerchantLocationsQuery,
} from 'services/midManagementMerchants'

export const useMidManagementLocations = (skip, planRef = '', merchantRef = '') => {
  const {data: getMerchantLocationsResponse, isLoading: getMerchantLocationsIsLoading, error: getMerchantLocationsError} = useGetMerchantLocationsQuery({planRef, merchantRef}, {skip})

  return {
    getMerchantLocationsResponse,
    getMerchantLocationsIsLoading,
    getMerchantLocationsError,
  }
}
