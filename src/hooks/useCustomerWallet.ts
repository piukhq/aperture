import {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery, useGetPlansQuery} from 'services/customerWallet'

export const useCustomerWallet = () => {
  const {
    data: getLoyaltyCardsResponse,
    isLoading: getLoyaltyCardsIsLoading,
    isError: getLoyaltyCardsIsError,
    refetch: getLoyaltyCardsRefresh,
  } = useGetLoyaltyCardsQuery()

  const {
    data: getPaymentCardsResponse,
    isLoading: getPaymentCardsIsLoading,
    isError: getPaymentCardsIsError,
    refetch: getPaymentCardsRefresh,
  } = useGetPaymentCardsQuery()

  const {
    data: getPlansResponse,
    isLoading: getPlansIsLoading,
    error: getPlansIsError,
    refetch: getPlansRefresh,
  } = useGetPlansQuery()

  return {
    getLoyaltyCardsResponse,
    getLoyaltyCardsRefresh,
    getLoyaltyCardsIsLoading,
    getLoyaltyCardsIsError,
    getPaymentCardsResponse,
    getPaymentCardsRefresh,
    getPaymentCardsIsLoading,
    getPaymentCardsIsError,
    getPlansResponse,
    getPlansRefresh,
    getPlansIsLoading,
    getPlansIsError,
  }
}
