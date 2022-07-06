import {
  useGetMerchantLocationQuery,
} from 'services/midManagementMerchants'

export const useMidManagementLocation = (skip, planRef = '', merchantRef = '', locationRef = '') => {
  const {data: getMerchantLocationResponse, isLoading: getMerchantLocationIsLoading, error: getMerchantLocationError} = useGetMerchantLocationQuery({planRef, merchantRef, locationRef}, {skip})

  return {
    getMerchantLocationResponse,
    getMerchantLocationIsLoading,
    getMerchantLocationError,
  }
}
