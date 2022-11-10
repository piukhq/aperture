import {
  useGetMerchantQuery,
  useGetMerchantCountsQuery,
  usePostMerchantMutation,
  usePutMerchantMutation,
  useDeleteMerchantMutation,
} from 'services/midManagementMerchants'

export const useMidManagementMerchants = ({skipGetMerchant = false, skipGetMerchantCounts = false, planRef = '', merchantRef = ''}) => {
  const {data: getMerchantResponse, isLoading: getMerchantIsLoading, error: getMerchantError} = useGetMerchantQuery({planRef, merchantRef}, {skip: skipGetMerchant})

  const {data: getMerchantCountsResponse, isLoading: getMerchantCountsIsLoading, error: getMerchantCountsError} = useGetMerchantCountsQuery({planRef, merchantRef}, {skip: skipGetMerchantCounts})

  const [postMerchant, {data: postMerchantResponse, isLoading: postMerchantIsLoading, error: postMerchantError, reset: resetPostMerchantResponse}] = usePostMerchantMutation({fixedCacheKey: 'postMerchant'})

  const [putMerchant, {data: putMerchantResponse, isLoading: putMerchantIsLoading, error: putMerchantError, reset: resetPutMerchantResponse}] = usePutMerchantMutation({fixedCacheKey: 'putMerchant'})

  const [deleteMerchant, {isSuccess: deleteMerchantIsSuccess, isLoading: deleteMerchantIsLoading, error: deleteMerchantError, reset: resetDeleteMerchantResponse}] = useDeleteMerchantMutation({fixedCacheKey: 'deleteMerchant'})

  return {
    // GET Merchant
    getMerchantResponse,
    getMerchantIsLoading,
    getMerchantError,
    // GET Merchant Counts
    getMerchantCountsResponse,
    getMerchantCountsIsLoading,
    getMerchantCountsError,
    // POST Merchant
    postMerchant,
    postMerchantResponse,
    postMerchantIsLoading,
    postMerchantError,
    resetPostMerchantResponse,
    // PUT Merchant
    putMerchant,
    putMerchantResponse,
    putMerchantIsLoading,
    putMerchantError,
    resetPutMerchantResponse,
    // DELETE Merchant
    deleteMerchant,
    deleteMerchantIsSuccess,
    deleteMerchantIsLoading,
    deleteMerchantError,
    resetDeleteMerchantResponse,
  }
}
