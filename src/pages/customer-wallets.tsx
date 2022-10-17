import type {NextPage} from 'next'
import {PageLayout, CustomerWalletsContainer, CustomerWalletsHeader} from 'components'
import {useAppSelector} from 'app/hooks'
import {getJwtToken} from 'features/customerWalletSlice'
import {useCustomerLookup} from 'hooks/useCustomerLookup'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const CustomerWalletsPage: NextPage = withPageAuthRequired(() => {
  const selectedJwtToken = useAppSelector(getJwtToken)
  const {hasErrorOccurred} = useCustomerLookup()

  return (
    <PageLayout>
      <div className='flex flex-col gap-[30px]'>
        <CustomerWalletsHeader />

        {selectedJwtToken && !hasErrorOccurred && <CustomerWalletsContainer />}
      </div>
    </PageLayout>
  )
})

export default CustomerWalletsPage
