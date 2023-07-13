import {CustomerLookup, CustomerLookupHistory} from 'components'
import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useCustomerLookup} from 'hooks/useCustomerLookup'

const CustomerWalletsHeader = () => {
  const getCustomerLookupHistoryResponse = useGetCustomerWalletLookupHistory().getCustomerLookupHistoryResponse || []
  const {jwtCustomerLookup, hasErrorOccurred} = useCustomerLookup()

  return (
    <>
      <section>
        <CustomerLookup jwtCustomerLookup={jwtCustomerLookup} hasErrorOccurred={hasErrorOccurred} />
      </section>

      {getCustomerLookupHistoryResponse?.length > 0 && (
        <section>
          <CustomerLookupHistory jwtCustomerLookup={jwtCustomerLookup} lookupHistory={getCustomerLookupHistoryResponse} />
        </section>
      )}
    </>
  )
}

export default CustomerWalletsHeader
