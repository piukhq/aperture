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
    isError: getPlansIsError,
    refetch: getPlansRefresh,
  } = useGetPlansQuery()

  return {
    // Loyalty cards
    getLoyaltyCardsResponse,
    getLoyaltyCardsRefresh,
    getLoyaltyCardsIsLoading,
    getLoyaltyCardsIsError,
    // Payment Cards
    getPaymentCardsResponse,
    getPaymentCardsRefresh,
    getPaymentCardsIsLoading,
    getPaymentCardsIsError,
    // Plans
    getPlansResponse,
    getPlansRefresh,
    getPlansIsLoading,
    getPlansIsError,
  }
}
