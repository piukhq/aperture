import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useDispatch} from 'react-redux'
import {useService} from 'hooks/useService'
import {useCallback, useEffect, useState} from 'react'
import {decodeJwtToken} from 'utils/jwtToken'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useAppSelector} from 'app/hooks'
import {getJwtToken, setJwtToken} from 'features/customerWalletSlice'

export const useCustomerLookup = () => {
  const [lookupType, setLookupType] = useState(null)
  const [loadTrigger, setLoadTrigger] = useState(true) // enables the useEffect to reoccur with no other changes
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()
  const {getServiceResponse, getServiceRefresh} = useService()
  const {
    getLoyaltyCardsRefresh,
    getPaymentCardsRefresh,
    getPlansRefresh,
  } = useCustomerWallet()
  const dispatch = useDispatch()
  const jwtToken = useAppSelector(getJwtToken)

  useEffect(() => { // TODO: Make this lookup type agnostic when other lookups are implemented
    if (lookupType && jwtToken) {
      const {bundle_id: channel, sub: userId, user_id: userEmail} = decodeJwtToken(jwtToken) || {}
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
            criteria: jwtToken,
          },
        })
        setLoadTrigger(true)
      }
    }
  }, [getLoyaltyCardsRefresh, getPaymentCardsRefresh, getPlansRefresh, getServiceResponse, jwtToken, lookupType, putLookHistoryEntry, loadTrigger])

  const jwtCustomerLookup = useCallback((token: string) => {
    dispatch(setJwtToken(token))
    getServiceRefresh()
    setLookupType('JWT')
    setLoadTrigger(false)
  }, [dispatch, getServiceRefresh, setLoadTrigger])

  return {jwtCustomerLookup}

}
