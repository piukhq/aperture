import {useMemo} from 'react'
import {useGetLoyaltyCardsQuery, useGetPlansQuery} from 'services/customerWallet'

export const useCustomerWalletUserPlans = () => {
  const {data: getLoyaltyCardsResponse} = useGetLoyaltyCardsQuery()
  const {data: getPlansResponse} = useGetPlansQuery()

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
