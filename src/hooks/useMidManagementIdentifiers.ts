import {
  useGetMerchantIdentifiersQuery,
  useGetMerchantIdentifierQuery,
  useDeleteMerchantIdentifierMutation,
} from 'services/midManagementMerchantIdentifiers'

export const useMidManagementIdentifiers = ({skipGetIdentifiers = false, skipGetIdentifier = false, planRef = '', merchantRef = '', identifierRef = ''}) => {
  const {data: getMerchantIdentifiersResponse, isLoading: getMerchantIdentifiersIsLoading, error: getMerchantIdentifiersError} = useGetMerchantIdentifiersQuery({planRef, merchantRef}, {skip: skipGetIdentifiers})

  const {data: getMerchantIdentifierResponse, isLoading: getMerchantIdentifierIsLoading, error: getMerchantIdentifierError} = useGetMerchantIdentifierQuery({planRef, merchantRef, identifierRef}, {skip: skipGetIdentifier})

  const [deleteMerchantIdentifier,
    {isSuccess: deleteMerchantIdentifierIsSuccess, isLoading: deleteMerchantIdentifierIsLoading, error: deleteMerchantIdentifierError, reset: resetDeleteMerchantIdentifierResponse},
  ] = useDeleteMerchantIdentifierMutation({fixedCacheKey: 'deleteMerchantIdentifier'})

  return {
    // GET Identifiers
    getMerchantIdentifiersResponse,
    getMerchantIdentifiersIsLoading,
    getMerchantIdentifiersError,
    // GET Identifier
    getMerchantIdentifierResponse,
    getMerchantIdentifierIsLoading,
    getMerchantIdentifierError,
    // DELETE Identifier
    deleteMerchantIdentifier,
    deleteMerchantIdentifierIsSuccess,
    deleteMerchantIdentifierIsLoading,
    deleteMerchantIdentifierError,
    resetDeleteMerchantIdentifierResponse,
  }
}
