import {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery, useGetPlansQuery} from 'services/customerWallet'

export const useCustomerWallet = () => {
  const {data: getLoyaltyCardsResponse, isLoading: getLoyaltyCardsIsLoading, error: getLoyaltyCardsError} = useGetLoyaltyCardsQuery()
  const {data: getPaymentCardsResponse, isLoading: getPaymentCardsIsLoading, error: getPaymentCardsError} = useGetPaymentCardsQuery()
  const {data: getPlansResponse, isLoading: getPlansIsLoading, error: getPlansError} = useGetPlansQuery()

  return {
    getLoyaltyCardsResponse,
    getLoyaltyCardsIsLoading,
    getLoyaltyCardsError,
    getPaymentCardsResponse,
    getPaymentCardsIsLoading,
    getPaymentCardsError,
    getPlansResponse,
    getPlansIsLoading,
    getPlansError,
  }
}
