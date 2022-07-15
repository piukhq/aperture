import {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery, useGetPlansQuery, useGetServiceQuery} from 'services/customerWallet'

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

  const {
    data: getServiceResponse,
    isLoading: getServiceIsLoading,
    error: getServiceIsError,
    refetch: getServiceRefresh,
  } = useGetServiceQuery()

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
    // Service
    getServiceResponse,
    getServiceRefresh,
    getServiceIsLoading,
    getServiceIsError,
  }
}
