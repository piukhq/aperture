import React from 'react'

const CustomerWallet = (paymentCards, loyaltyCards) => {

  return (
    <div className='bg-white min-h-[400px] min-w-[1000px] shadow-md rounded-[20px]'>
      { loyaltyCards.length}
      { paymentCards.length}
    </div>
  )
}

export default CustomerWallet


