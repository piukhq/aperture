import {useMemo} from 'react'
import {useGetLoyaltyCardsQuery, useGetPlansQuery} from 'services/customerWallet'

export const useCustomerWalletUserPlans = ({skipGetLoyaltyCards = false, skipGetPlansResponse = false}) => {
  const {data: getLoyaltyCardsResponse} = useGetLoyaltyCardsQuery(null, {skip: skipGetLoyaltyCards})
  const {data: getPlansResponse} = useGetPlansQuery(null, {skip: skipGetPlansResponse})

  const userPlans = useMemo(() => {
    if (getLoyaltyCardsResponse && getPlansResponse) {
      return getLoyaltyCardsResponse.map(loyaltyCard => getPlansResponse.find((plan) => plan.id === loyaltyCard.membership_plan)).filter(plan => plan)
    }
    return []
  }, [getLoyaltyCardsResponse, getPlansResponse])

  return {
    userPlans,
  }
}
