import type {NextPage} from 'next'
import {PageLayout, CustomerWalletsContainer, CustomerWalletsHeader} from 'components'
import Head from 'next/head'
import {useAppSelector} from 'app/hooks'
import {getJwtToken} from 'features/customerWalletSlice'
import {useCustomerLookup} from 'hooks/useCustomerLookup'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const CustomerWalletsPage: NextPage = withPageAuthRequired(() => {
  const selectedJwtToken = useAppSelector(getJwtToken)
  const {hasErrorOccurred} = useCustomerLookup()

  return (
    <PageLayout>
      <Head>
        <title>Aperture - Customer Wallets</title>
        <meta property='og:title' content='Aperture Customer Wallets' key='title'/>
        <meta property='og:description' content='View a customers transactions, payment and loyalty cards' key='description' />
      </Head>
      <div className='flex flex-col gap-[30px]'>
        <CustomerWalletsHeader />
        {selectedJwtToken && !hasErrorOccurred && <CustomerWalletsContainer />}
      </div>
    </PageLayout>
  )
})

export default CustomerWalletsPage
