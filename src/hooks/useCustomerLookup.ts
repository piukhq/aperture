import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useDispatch} from 'react-redux'
import {useService} from 'hooks/useService'
import {useCallback, useEffect, useState} from 'react'
import {decodeJwtToken} from 'utils/jwtToken'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useAppSelector} from 'app/hooks'
import {getJwtToken, setJwtToken, setActiveUserId} from 'features/customerWalletSlice'
import {serviceApi} from 'services/service'
import {customerWalletApi} from 'services/customerWallet'

export const useCustomerLookup = () => {
  const [lookupType, setLookupType] = useState(null)
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()
  const {getServiceResponse, getServiceRefresh, getServiceError} = useService()
  const {
    getLoyaltyCardsResponse,
    getLoyaltyCardsRefresh,
    getLoyaltyCardsIsError,
    getPaymentCardsResponse,
    getPaymentCardsRefresh,
    getPaymentCardsIsError,
    getPlansResponse,
    getPlansRefresh,
    getPlansIsError,
  } = useCustomerWallet()
  const dispatch = useDispatch()
  const jwtToken = useAppSelector(getJwtToken)

  const hasErrorOccured = getServiceError || getLoyaltyCardsIsError || getPaymentCardsIsError || getPlansIsError

  useEffect(() => {
    if (getLoyaltyCardsResponse && getPaymentCardsResponse && getPlansResponse) {
      // TODO: Incorporate other lookup types
      if (lookupType && jwtToken) {
        const {bundle_id: channel, sub, user_id: userEmail} = decodeJwtToken(jwtToken) || {}
        const userId = sub || userEmail // Barclays uses user_id, other channels use sub from the token

        dispatch(setActiveUserId(userId))

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
      }
    }
  }, [getLoyaltyCardsResponse, getPaymentCardsResponse, getPlansResponse, lookupType, jwtToken, putLookHistoryEntry, dispatch])

  // If any error occurs, remove active user ID
  useEffect(() => {
    if (hasErrorOccured) {
      dispatch(setActiveUserId(null))
    }
  }, [hasErrorOccured, dispatch])

  // TODO: Consider refactoring this to avoid using the useEffect hook
  useEffect(() => { // TODO: Make this lookup type agnostic when other lookups are implemented
    if (lookupType) {
      if (getServiceResponse && getServiceResponse?.consent) {
        getLoyaltyCardsRefresh()
        getPaymentCardsRefresh()
        getPlansRefresh()
      }
    }
  }, [getLoyaltyCardsRefresh, getPaymentCardsRefresh, getPlansRefresh, getServiceResponse, lookupType])

  const jwtCustomerLookup = useCallback((token: string, lookupType:string) => {
    dispatch(serviceApi.util.resetApiState()) // Reset the service api state to avoid stale service data from previous customer being used
    dispatch(customerWalletApi.util.resetApiState()) // Reset the customer wallet api state

    dispatch(setJwtToken(token))
    getServiceRefresh()
    setLookupType(lookupType)
  }, [dispatch, getServiceRefresh])

  return {jwtCustomerLookup, hasErrorOccured}
}
