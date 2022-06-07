import {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery} from 'services/customerWallet'

export const useCustomerWallet = () => {
  const {data: getLoyaltyCardsResponse, isLoading: getLoyaltyCardsIsLoading, error: getLoyaltyCardsError} = useGetLoyaltyCardsQuery()
  const {data: getPaymentCardsResponse, isLoading: getPaymentCardsIsLoading, error: getPaymentCardsError} = useGetPaymentCardsQuery()

  return {
    getLoyaltyCardsResponse,
    getLoyaltyCardsIsLoading,
    getLoyaltyCardsError,
    getPaymentCardsResponse,
    getPaymentCardsIsLoading,
    getPaymentCardsError,
  }
}
