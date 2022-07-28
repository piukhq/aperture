import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useService} from 'hooks/useService'
import {useCallback} from 'react'
import {decodeJwtToken} from 'utils/jwtToken'
import {useCustomerWallet} from 'hooks/useCustomerWallet'

export const useCustomerLookup = () => {
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()
  const {getServiceResponse} = useService()
  const {
    getLoyaltyCardsRefresh,
    getPaymentCardsRefresh,
    getPlansRefresh,
  } = useCustomerWallet()


  // TODO: Refresh actions will need to be handled different with additional lookup types
  const jwtCustomerLookup = useCallback((token:string, lookupType: string) => {
    const {bundle_id: channel, sub: userId, user_id: userEmail} = decodeJwtToken(token) || {}

    if (userEmail === getServiceResponse?.consent?.email) {
      getLoyaltyCardsRefresh()
      getPaymentCardsRefresh()
      getPlansRefresh()
      putLookHistoryEntry({
        user: {
          channel,
          user_id: userId,
          display_text: userEmail,
        },
        lookup: {
          type: lookupType,
          datetime: JSON.stringify(new Date()),
          criteria: token,
        },
      })
    }

  }, [getLoyaltyCardsRefresh, getPaymentCardsRefresh, getPlansRefresh, getServiceResponse?.consent?.email, putLookHistoryEntry])

  return {
    jwtCustomerLookup,
  }
}
