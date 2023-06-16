import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useDispatch} from 'react-redux'
import {useCallback, useEffect, useState} from 'react'
import {decodeJwtToken} from 'utils/jwtToken'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useAppSelector} from 'app/hooks'
import {getJwtToken, setJwtToken, setActiveUserId} from 'features/customerWalletSlice'
import {customerWalletApi} from 'services/customerWallet'

export const useCustomerLookup = () => {
  const [lookupType, setLookupType] = useState<string>('')
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()

  const {
    getLoyaltyCardsIsSuccess,
    getLoyaltyCardsIsLoading,
    getLoyaltyCardsIsError,
    getPaymentCardsIsSuccess,
    getPaymentCardsIsLoading,
    getPaymentCardsIsError,
    getPlansIsSuccess,
    getPlansIsLoading,
    getPlansIsError,
  } = useCustomerWallet()

  const dispatch = useDispatch()
  const jwtToken = useAppSelector(getJwtToken)

  const hasErrorOccurred = getLoyaltyCardsIsError || getPaymentCardsIsError || getPlansIsError

  useEffect(() => {
    if (
      (getLoyaltyCardsIsSuccess && !getLoyaltyCardsIsLoading) &&
      (getPaymentCardsIsSuccess && !getPaymentCardsIsLoading) &&
      (getPlansIsSuccess && !getPlansIsLoading)
    ) {
      // TODO: Incorporate other lookup types
      if (lookupType && jwtToken) {
        const {bundle_id: channel, sub, user_id: userEmail} = decodeJwtToken(jwtToken) || {}
        const userId = sub || userEmail // Barclays uses user_id, other channels use sub from the token

        dispatch(setActiveUserId(typeof(userId) === 'string' ? userId : JSON.stringify(userId)))

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
  }, [
    getLoyaltyCardsIsSuccess,
    getLoyaltyCardsIsLoading,
    getPaymentCardsIsSuccess,
    getPaymentCardsIsLoading,
    getPlansIsSuccess,
    getPlansIsLoading,
    lookupType,
    jwtToken,
    putLookHistoryEntry,
    dispatch,
  ])

  // If any error occurs, remove active user ID
  useEffect(() => {
    if (hasErrorOccurred) {
      dispatch(setActiveUserId(null))
    }
  }, [hasErrorOccurred, dispatch])

  const jwtCustomerLookup = useCallback((token: string, lookupType:string) => {
    setLookupType(lookupType)
    dispatch(setJwtToken(token))
    dispatch(customerWalletApi.util.resetApiState()) // Remove cached data and refetch
  }, [dispatch])

  return {jwtCustomerLookup, hasErrorOccurred}
}
