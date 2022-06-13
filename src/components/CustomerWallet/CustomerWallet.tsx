import React from 'react'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import PaymentCard from './components/PaymentCard'
import LoyaltyCard from './components/LoyaltyCard'
import LinkStatus from './components/LinkStatus'

const CustomerWallet = () => {
  const {
    getLoyaltyCardsResponse,
    getPaymentCardsResponse,
    getPlansResponse,
    getLoyaltyCardsIsError,
    getPaymentCardsIsError,
    getPlansIsError,
  } = useCustomerWallet()

  const getStatusColour = (status: string) => {
    switch (status) {
      case 'authorised':
      case 'active':
        return 'green'
      case 'pending':
        return 'yellow'
      default:
        return 'red'
    }
  }

  const renderPaymentCards = () => (
    <div className={'h-[92px] pl-[180px] flex'}>
      <div className={`grid grid-cols-${getPaymentCardsResponse?.length} gap-[15px]`}>
        {getPaymentCardsResponse?.map((paymentCard) => (
          <PaymentCard key={paymentCard.id} card={paymentCard} getStatusFn={getStatusColour}/>
        ))}
      </div>
    </div>
  )

  const renderLoyaltyCardsRow = (loyaltyCard) => {
    const plan = getPlansResponse?.find((plan) => plan.id === loyaltyCard.membership_plan)
    const {id, payment_cards: paymentCards} = loyaltyCard

    return (
      <div key={id} className='flex space-between mb-[17px]'>
        <LoyaltyCard card={loyaltyCard} getStatusFn={getStatusColour} plan={plan} />

        <div key={id} className={`grid grid-cols-${getPaymentCardsResponse?.length} gap-[15px]`}>
          {getPaymentCardsResponse?.map((paymentCard, index) => (
            <LinkStatus key={paymentCard.id} isPllCard={plan?.feature_set.card_type === 2} loyaltyCardPaymentCards={paymentCards} paymentCardIndex={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={'bg-white dark:bg-grey-850 min-h-[400px] min-w-[900px] shadow-md rounded-[20px] p-[20px] flex flex-col justify-center'}>
      { !getLoyaltyCardsIsError && !getPaymentCardsIsError && !getPlansIsError ? (
        <>
          {renderPaymentCards()}
          <div>
            {getLoyaltyCardsResponse?.map((loyaltyCard) => renderLoyaltyCardsRow(loyaltyCard))}
          </div>
        </>
      ) : <p className='w-full text-center body-text-4'>Error loading wallet</p>}
    </div>
  )
}

export default CustomerWallet


// squaremeal points
// // Linked elsewhere card variants
// Wierd dot thing asnd into ticks
