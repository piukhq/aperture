import {
  useGetMerchantIdentifierQuery,
} from 'services/midManagementMerchants'

export const useMidManagementIdentifiers = (skip, planRef = '', merchantRef = '', identifierRef = '') => {
  const {data: getMerchantIdentifierResponse, isLoading: getMerchantIdentifierIsLoading, error: getMerchantIdentifierError} = useGetMerchantIdentifierQuery({planRef, merchantRef, identifierRef}, {skip})

  return {
    getMerchantIdentifierResponse,
    getMerchantIdentifierIsLoading,
    getMerchantIdentifierError,
  }
}
