import {useGetLookupHistoryQuery, usePutLookupHistoryMutation} from 'services/customerWalletLookupHistory'

export const useGetCustomerWalletLookupHistory = () => {
  const {
    data: getCustomerLookupHistoryResponse,
    isLoading: getCustomerLookupHistoryIsLoading,
    isError: getCustomerLookupHistoryIsError,
  } = useGetLookupHistoryQuery()

  const [putLookHistoryEntry, {
    data: putCustomerLookupHistoryResponse,
    isLoading: putCustomerLookupHistoryIsLoading,
    isError: putCustomerLookupHistoryIsError,
    reset: resetPutCustomerLookupHistory,
  }] = usePutLookupHistoryMutation({fixedCacheKey: 'putCustomerLookupHistory'})

  return {
    getCustomerLookupHistoryResponse,
    getCustomerLookupHistoryIsLoading,
    getCustomerLookupHistoryIsError,
    putLookHistoryEntry,
    putCustomerLookupHistoryResponse,
    putCustomerLookupHistoryIsLoading,
    putCustomerLookupHistoryIsError,
    resetPutCustomerLookupHistory,
  }
}
