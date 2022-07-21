import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {decodeJwtToken} from 'utils/jwtToken'

export const useCustomerLookup = () => {
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()

  const jwtCustomerLookup = (token:string, lookupType: string) => {
    const {bundle_id: channel, sub: userId, user_id: userEmail} = decodeJwtToken(token) || {}
    if (channel && userId && userEmail) {
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
  }

  return {
    jwtCustomerLookup,
  }
}
