import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {PageLayout, CustomerLookup, CustomerWallet} from 'components'
import {getJwtToken} from 'features/customerWalletSlice'
import {useAppSelector} from 'app/hooks'
import {useCustomerWallet} from 'hooks/useCustomerWallet'


const CustomerWalletsPage: NextPage = () => {

  const [loyaltyCards, setLoyaltyCards] = useState(null)
  const [paymentCards, setPaymentCards] = useState(null)
  const {getLoyaltyCardsResponse, getPaymentCardsResponse} = useCustomerWallet()

  useEffect(() => {
    setLoyaltyCards(getLoyaltyCardsResponse)
    setPaymentCards(getPaymentCardsResponse)
  }, [getLoyaltyCardsResponse, getPaymentCardsResponse])

  const selectedJwtToken = useAppSelector(getJwtToken)

  return (
    <PageLayout>
      <section className='mb-[30px]'>
        <CustomerLookup />
      </section>
      { selectedJwtToken && (
        <section>
          <h1 className='font-heading-4 mb-[10px]'>Wallet</h1>
          <CustomerWallet loyaltyCards={loyaltyCards} paymentCards={paymentCards} />
        </section>
      )}

    </PageLayout>
  )
}

export default CustomerWalletsPage
