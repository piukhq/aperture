import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useDispatch} from 'react-redux'
import {useService} from 'hooks/useService'
import {useCallback, useEffect, useState} from 'react'
import {decodeJwtToken} from 'utils/jwtToken'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useAppSelector} from 'app/hooks'
import {getJwtToken, setJwtToken} from 'features/customerWalletSlice'
import {serviceApi} from 'services/service'

export const useCustomerLookup = () => {
  const [lookupType, setLookupType] = useState(null)
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()
  const {getServiceResponse, getServiceRefresh} = useService()
  const {
    getLoyaltyCardsRefresh,
    getPaymentCardsRefresh,
    getPlansRefresh,
  } = useCustomerWallet()
  const dispatch = useDispatch()
  const jwtToken = useAppSelector(getJwtToken)

  // TODO: Consider refactoring this to avoid using the useEffect hook
  useEffect(() => { // TODO: Make this lookup type agnostic when other lookups are implemented
    if (lookupType && jwtToken && getServiceResponse) {
      const {bundle_id: channel, sub: userId, user_id: userEmail} = decodeJwtToken(jwtToken) || {}
      if (getServiceResponse?.consent) {
        getLoyaltyCardsRefresh()
        getPaymentCardsRefresh()
        getPlansRefresh()
        putLookHistoryEntry({
          user: {
            channel,
            user_id: userId || userEmail, // Barclays uses user_id, other channels use sub from the token
            display_text: userEmail,
          },
          lookup: {
            type: lookupType,
            datetime: JSON.stringify(new Date()),
            criteria: jwtToken,
          },
        })
      }
    }
  }, [getLoyaltyCardsRefresh, getPaymentCardsRefresh, getPlansRefresh, getServiceResponse, jwtToken, lookupType, putLookHistoryEntry])

  const jwtCustomerLookup = useCallback((token: string, lookupType:string) => {
    dispatch(serviceApi.util.resetApiState()) // Reset the service api state to avoid stale service data from previous customer being used
    dispatch(setJwtToken(token))
    getServiceRefresh()
    setLookupType(lookupType)
  }, [dispatch, getServiceRefresh])

  return {jwtCustomerLookup}

}
