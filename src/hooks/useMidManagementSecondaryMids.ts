import {
  useGetMerchantSecondaryMidQuery,
} from 'services/midManagementMerchants'

export const useMidManagementSecondaryMids = (skip, planRef = '', merchantRef = '', secondaryMidRef = '') => {
  const {data: getMerchantSecondaryMidResponse, isLoading: getMerchantSecondaryMidIsLoading, error: getMerchantSecondaryMidError} = useGetMerchantSecondaryMidQuery({planRef, merchantRef, secondaryMidRef}, {skip})

  return {
    getMerchantSecondaryMidResponse,
    getMerchantSecondaryMidIsLoading,
    getMerchantSecondaryMidError,
  }
}
