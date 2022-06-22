import type {NextPage} from 'next'
import {PageLayout, CustomerLookup, CustomerWalletsContainer} from 'components'
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

        <CustomerWalletsContainer />
      )}
    </PageLayout>
  )
}

export default CustomerWalletsPage
