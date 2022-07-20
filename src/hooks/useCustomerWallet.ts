import {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery, useGetPlansQuery} from 'services/customerWallet'

export const useCustomerWallet = ({skipGetLoyaltyCards = false, skipGetPaymentCards = false, skipGetPlans = false}) => {
  const {
    data: getLoyaltyCardsResponse,
    isLoading: getLoyaltyCardsIsLoading,
    isError: getLoyaltyCardsIsError,
    refetch: getLoyaltyCardsRefresh,
  } = useGetLoyaltyCardsQuery(null, {skip: skipGetLoyaltyCards})

  const {
    data: getPaymentCardsResponse,
    isLoading: getPaymentCardsIsLoading,
    isError: getPaymentCardsIsError,
    refetch: getPaymentCardsRefresh,
  } = useGetPaymentCardsQuery(null, {skip: skipGetPaymentCards})

  const {
    data: getPlansResponse,
    isLoading: getPlansIsLoading,
    isError: getPlansIsError,
    refetch: getPlansRefresh,
  } = useGetPlansQuery(null, {skip: skipGetPlans})

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
