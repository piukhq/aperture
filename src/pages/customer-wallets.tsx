import type {NextPage} from 'next'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {PageLayout, CustomerLookup, CustomerWallet, CustomerLookupHistory} from 'components'
import {useAppSelector} from 'app/hooks'
import {getJwtToken, setJwtToken} from 'features/customerWalletSlice'
import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'

const CustomerWalletsPage: NextPage = () => {
  const selectedJwtToken = useAppSelector(getJwtToken)
  const {getCustomerLookupHistoryResponse} = useGetCustomerWalletLookupHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    if (getCustomerLookupHistoryResponse && getCustomerLookupHistoryResponse.length > 0 && !selectedJwtToken) {
      const {lookup} = getCustomerLookupHistoryResponse[0]
      const {type, criteria} = lookup

      // TODO: Handle other types
      if (type === 'JWT') {
        dispatch(setJwtToken(criteria as string))
      }
    }
  }, [getCustomerLookupHistoryResponse, selectedJwtToken, dispatch])

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

        {selectedJwtToken && (
          <section>
            <h1 className='font-heading-4 mb-[10px]'>Wallet</h1>
            <CustomerWallet />
          </section>
          // TODO: Add CustomerTransactions component when required
        )}
      </div>
    </PageLayout>
  )
}

export default CustomerWalletsPage
