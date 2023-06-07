import React from 'react'
import {useCustomerWalletUserPlans} from 'hooks/useCustomerWalletUserPlans'
import CustomerWallet from './components/CustomerWallet'
import CustomerTableContainer from './components/CustomerTableContainer'

const CustomerWalletsContainer = () => {
  const {
    userPlans,
  } = useCustomerWalletUserPlans()

  return (
    <>
      <CustomerWallet userPlans={userPlans} />
      <CustomerTableContainer userPlans={userPlans} entity='transactions' tableHeaders={['REWARD', 'DATE', 'DETAILS', 'AMOUNT', 'CHANGE']} />
      <CustomerTableContainer userPlans={userPlans} entity='vouchers' tableHeaders={['TYPE', 'CODE', 'ISSUED', 'EXPIRES', 'STATE']} />
    </>
  )
}

export default CustomerWalletsContainer
