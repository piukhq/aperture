import {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery, useGetPlansQuery} from 'services/customerWallet'

export const useCustomerWallet = () => {
  const {
    data: getLoyaltyCardsResponse,
    isSuccess: getLoyaltyCardsIsSuccess,
    isLoading: getLoyaltyCardsIsLoading,
    isError: getLoyaltyCardsIsError,
    refetch: getLoyaltyCardsRefresh,
  } = useGetLoyaltyCardsQuery()

  const {
    data: getPaymentCardsResponse,
    isSuccess: getPaymentCardsIsSuccess,
    isLoading: getPaymentCardsIsLoading,
    isError: getPaymentCardsIsError,
    refetch: getPaymentCardsRefresh,
  } = useGetPaymentCardsQuery()

  const {
    data: getPlansResponse,
    isSuccess: getPlansIsSuccess,
    isLoading: getPlansIsLoading,
    isError: getPlansIsError,
    refetch: getPlansRefresh,
  } = useGetPlansQuery()

  return {
    // Loyalty cards
    getLoyaltyCardsResponse,
    getLoyaltyCardsIsSuccess,
    getLoyaltyCardsRefresh,
    getLoyaltyCardsIsLoading,
    getLoyaltyCardsIsError,
    // Payment Cards
    getPaymentCardsResponse,
    getPaymentCardsIsSuccess,
    getPaymentCardsRefresh,
    getPaymentCardsIsLoading,
    getPaymentCardsIsError,
    // Plans
    getPlansResponse,
    getPlansIsSuccess,
    getPlansRefresh,
    getPlansIsLoading,
    getPlansIsError,
  }
}
