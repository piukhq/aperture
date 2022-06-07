import React, {useEffect, useState} from 'react'
import {useCustomerWallet} from 'hooks/useCustomerWallet'

const CustomerWallet = () => {
  const [loyaltyCards, setLoyaltyCards] = useState(null)
  const [paymentCards, setPaymentCards] = useState(null)
  const {getLoyaltyCardsResponse, getPaymentCardsResponse} = useCustomerWallet()

  useEffect(() => {
    setLoyaltyCards(getLoyaltyCardsResponse)
    setPaymentCards(getPaymentCardsResponse)
  }, [getLoyaltyCardsResponse, getPaymentCardsResponse])


  console.log(loyaltyCards)
  console.log(paymentCards)
  return (
    <div>
      <h1> Customer Wallet</h1>
    </div>
  )
}

export default CustomerWallet


