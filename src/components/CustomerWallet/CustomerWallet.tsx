import React, {useCallback} from 'react'
import Image from 'next/image'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import PaymentCard from './components/PaymentCard'
import LoyaltyCard from './components/LoyaltyCard'
import LinkStatus from './components/LinkStatus'
import ExternalCard from './components/ExternalCard'


const CustomerWallet = () => {
  const {
    getLoyaltyCardsResponse,
    getPaymentCardsResponse,
    getPlansResponse,
    getLoyaltyCardsIsError,
    getPaymentCardsIsError,
    getPlansIsError,
  } = useCustomerWallet()

  // const {data: externalLoyaltyCardResponse} = useGetLoyaltyCardQuery('243425')

  // console.log(externalLoyaltyCardResponse)


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'authorised':
      case 'active':
        return <Image width={8} height={8} src='/icons/svgs/green-check.svg' alt='Good status'/>
      case 'pending':
        return <div aria-label='Pending Status' role='img' className='h-[2px] w-[8px] mb-[2px] bg-yellow inline-block'/>
      default:
        return <Image width={8} height={8} src='/icons/svgs/red-close.svg' alt='Failed status'/>
    }
  }

  // Function to get any additional payment/loyalty cards that are found on the loyalty/payment (i.e opposite) card
  const getExternalCardIds = useCallback((sourceCards, comparatorCards, comparatorContainer) => {
    const ids = []
    const sourceIdArray = sourceCards.map(sourceCard => sourceCard.id)
    comparatorCards.forEach(comparatorCard => {
      comparatorCard[comparatorContainer].forEach(comparatorCardSourceCard => {
        !sourceIdArray.includes(comparatorCardSourceCard.id) && ids.push(comparatorCardSourceCard.id)
      })
    })
    return ids
  }, [])


  const renderPaymentCards = () => {
    const externalPaymentCardIds = getExternalCardIds(getPaymentCardsResponse, getLoyaltyCardsResponse, 'payment_cards')
    return (
      <div className={'h-[92px] pl-[180px] flex'}>
        <div className={`grid grid-cols-${getPaymentCardsResponse?.length + externalPaymentCardIds.length} gap-[15px]`}>
          {getPaymentCardsResponse?.map((paymentCard) => (
            <PaymentCard key={paymentCard.id} card={paymentCard} getStatusFn={getStatusIcon}/>
          ))}
          {externalPaymentCardIds.map((id) => (
            <ExternalCard key={id} id={id} isPaymentCard/>
          ))}
        </div>
      </div>
    )
  }

  const renderLoyaltyCardsRow = (loyaltyCard, isExternalCard) => {
    const plan = getPlansResponse?.find((plan) => plan.id === loyaltyCard.membership_plan)
    const {id, payment_cards: paymentCards} = loyaltyCard
    const allPaymentCardIds = getPaymentCardsResponse?.map((paymentCard) => paymentCard.id)
      .concat(getExternalCardIds(getPaymentCardsResponse, getLoyaltyCardsResponse, 'payment_cards'))

    return (
      <div key={id} className='flex space-between mb-[17px]'>
        {isExternalCard ? <ExternalCard key={id} id={loyaltyCard.id}/> : <LoyaltyCard card={loyaltyCard} getStatusFn={getStatusIcon} plan={plan} />}
        <div key={id} className={`grid grid-cols-${getPaymentCardsResponse?.length} gap-[15px]`}>
          {allPaymentCardIds?.map((_, index) => (
            <LinkStatus key={index} isPllCard={plan?.feature_set.card_type === 2} loyaltyCardPaymentCards={paymentCards} paymentCardIndex={index} />
          ))}
        </div>
      </div>
    )
  }

  const getExternalLoyaltyCards = () => {
    const externalLoyaltyCardIds = getExternalCardIds(getLoyaltyCardsResponse, getPaymentCardsResponse, 'membership_cards')
    return externalLoyaltyCardIds.map(id => {
      return [{id, membership_cards: [{id, membership_plan: '', payment_cards: []}]}]
    })
  }

  if (getLoyaltyCardsIsError || getPaymentCardsIsError || getPlansIsError) {
    return <p className='w-full text-center font-body-4'>Error loading wallet.</p>
  }

  return (
    <div className={'bg-white dark:bg-grey-850 min-h-[400px] min-w-[900px] shadow-md rounded-[20px] p-[20px] flex flex-col justify-center'}>
      { getLoyaltyCardsResponse && getPaymentCardsResponse && getPlansResponse ? (
        <>
          {renderPaymentCards()}
          <div>
            {getLoyaltyCardsResponse?.map((loyaltyCard) => renderLoyaltyCardsRow(loyaltyCard, false))}
            {getExternalLoyaltyCards().map((externalLoyaltyCard) => (
              renderLoyaltyCardsRow(externalLoyaltyCard, true)
            ))}
          </div>
        </>
      ) : <p className='w-full text-center font-body-4'>Loading wallet...</p>}
    </div>
  )
}

export default CustomerWallet

// // Linked elsewhere card variants
// select from for plans?
// unit tests-
