import React, {useEffect} from 'react'
import {useCustomerWalletUserPlans} from 'hooks/useCustomerWalletUserPlans'
import CustomerWallet from './components/CustomerWallet'
import CustomerTransactions from './components/CustomerTransactions'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useService} from 'hooks/useService'

const CustomerWalletsContainer = () => {
  const {
    userPlans,
  } = useCustomerWalletUserPlans()

  const {
    getLoyaltyCardsRefresh,
    getPaymentCardsRefresh,
    getPlansRefresh,
  } = useCustomerWallet()

  const {getServiceResponse, getServiceRefresh} = useService()

  useEffect(() => {
    if (getServiceResponse) {
      getLoyaltyCardsRefresh()
      getPaymentCardsRefresh()
      getPlansRefresh()
    }
  }, [getLoyaltyCardsRefresh, getPaymentCardsRefresh, getPlansRefresh, getServiceRefresh, getServiceResponse])

  return (
    <>
      <section className='mb-[30px]'>
        <CustomerWallet userPlans={userPlans} />
      </section>
      <section>
        <CustomerTransactions userPlans={userPlans} />
      </section>
    </>
  )
}

export default CustomerWalletsContainer
