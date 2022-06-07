import type {NextPage} from 'next'
import {PageLayout, CustomerLookup, CustomerWallet} from 'components'
import {getJwtToken} from 'features/customerWalletSlice'
import {useAppSelector} from 'app/hooks'


const CustomerWalletsPage: NextPage = () => {

  const selectedJwtToken = useAppSelector(getJwtToken)

  return (
    <PageLayout>
      <CustomerLookup />
      { selectedJwtToken && <CustomerWallet />}
    </PageLayout>
  )
}

export default CustomerWalletsPage
