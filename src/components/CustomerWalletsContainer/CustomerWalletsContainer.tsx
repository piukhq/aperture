import React from 'react'
import {useCustomerWalletUserPlans} from 'hooks/useCustomerWalletUserPlans'
import CustomerWallet from './components/CustomerWallet'
import CustomerTransactions from './components/CustomerTransactions'

const CustomerWalletsContainer = () => {
  const {
    userPlans,
  } = useCustomerWalletUserPlans()

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
