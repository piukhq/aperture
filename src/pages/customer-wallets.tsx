import type {NextPage} from 'next'
import {PageLayout, CustomerLookup, CustomerLookupHistory, CustomerWalletsContainer} from 'components'
import {useAppSelector} from 'app/hooks'
import {getJwtToken} from 'features/customerWalletSlice'
import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {useCustomerLookup} from 'hooks/useCustomerLookup'

const CustomerWalletsPage: NextPage = () => {
  const selectedJwtToken = useAppSelector(getJwtToken)
  const {getCustomerLookupHistoryResponse} = useGetCustomerWalletLookupHistory()
  const {errorOccured} = useCustomerLookup()

  return (
    <PageLayout>
      <div className='flex flex-col gap-[30px]'>
        <section>
          <CustomerLookup />
        </section>

        {getCustomerLookupHistoryResponse && getCustomerLookupHistoryResponse.length > 0 && (
          <section>
            <CustomerLookupHistory lookupHistory={getCustomerLookupHistoryResponse} />
          </section>
        )}

        {selectedJwtToken && !errorOccured && <CustomerWalletsContainer />}
      </div>
    </PageLayout>
  )
}

export default CustomerWalletsPage
