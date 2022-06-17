import type {NextPage} from 'next'
import {PageLayout, CustomerLookup, CustomerWallet, CustomerTransactions} from 'components'
import {useAppSelector} from 'app/hooks'
import {getJwtToken} from 'features/customerWalletSlice'


const CustomerWalletsPage: NextPage = () => {
  const selectedJwtToken = useAppSelector(getJwtToken)

  return (
    <PageLayout>
      <section className='mb-[30px]'>
        <CustomerLookup />
      </section>

      {selectedJwtToken && (
        // TODO: Add CustomerLookupHistory component when required
        <>
          <section className='mb-[30px]'>
            <h1 className='font-heading-4 mb-[10px]'>Wallet</h1>
            <CustomerWallet />
          </section>
          <section>
            <h1 className='font-heading-4 mb-[10px]'>Transactions</h1>
            <CustomerTransactions />
          </section>
        </>
      )}
    </PageLayout>
  )
}

export default CustomerWalletsPage
