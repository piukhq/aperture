import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useService} from 'hooks/useService'
import {useCallback} from 'react'
import {decodeJwtToken} from 'utils/jwtToken'

export const useCustomerLookup = () => {
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()
  const {getServiceResponse} = useService()

  const jwtCustomerLookup = useCallback((token:string, lookupType: string) => {
    const {bundle_id: channel, sub: userId, user_id: userEmail} = decodeJwtToken(token) || {}

    if (userEmail === getServiceResponse?.consent?.email) {
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
  }, [getServiceResponse, putLookHistoryEntry])

  return {
    jwtCustomerLookup,
  }
}
