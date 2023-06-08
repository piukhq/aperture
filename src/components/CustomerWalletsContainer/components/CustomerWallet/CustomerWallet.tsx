import React, {useCallback, useMemo} from 'react'
import Image from 'next/image'
import PaymentCard from './components/PaymentCard'
import LoyaltyCard from './components/LoyaltyCard'
import LinkStatus from './components/LinkStatus'
import ExternalCard from './components/ExternalCard'
import {Plan, LoyaltyCard as LoyaltyCardType, PaymentCard as PaymentCardType} from 'types'

type Props = {
  userPlans: Plan[]
  loyaltyCards: LoyaltyCardType[]
  paymentCards: PaymentCardType[]
}

const CustomerWallet = ({userPlans, loyaltyCards, paymentCards}: Props) => {
  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'authorised':
      case 'active':
        return <Image width={8} height={8} src='/icons/svgs/green-check.svg' alt='Good status'/>
      case 'pending':
        return <div aria-label='Pending Status' role='img' className='h-[2px] w-[8px] mb-[2px] bg-yellow inline-block'/>
      default:
        return <Image width={8} height={8} src='/icons/svgs/red-close.svg' alt='Failed status'/>
    }
  }, [])

  // Get any additional payment/loyalty cards that are found on the loyalty/payment (i.e comparator) card
  const getExternalCardIds = useCallback((sourceCards = [], comparatorCards = [], comparatorContainer) => {
    const ids = []
    const sourceIdArray = sourceCards?.map(sourceCard => sourceCard.id)
    comparatorCards.forEach(comparatorCard => {
      comparatorCard[comparatorContainer].forEach(comparatorCardSourceCard => {
        !sourceIdArray.includes(comparatorCardSourceCard.id) && ids.push(comparatorCardSourceCard.id)
      })
    })
    return ids
  }, [])

  const externalPaymentCardIds = useMemo(() => getExternalCardIds(paymentCards, loyaltyCards, 'payment_cards'), [getExternalCardIds, loyaltyCards, paymentCards])
  const externalMembershipCardIds = useMemo(() => getExternalCardIds(loyaltyCards, paymentCards, 'membership_cards'), [getExternalCardIds, loyaltyCards, paymentCards])

  const renderPaymentCards = () => {
    return (
      <div className={'h-[92px] pl-[180px] flex'}>
        <div className={`grid grid-cols-${paymentCards.length + externalPaymentCardIds.length} gap-[15px]`}>
          {paymentCards?.map((paymentCard) => (
            <PaymentCard key={paymentCard.id} paymentCard={paymentCard} getStatusFn={getStatusIcon}/>
          ))}
          {externalPaymentCardIds.map((id, index) => (
            <ExternalCard key={index} id={id} isPaymentCard/>
          ))}
        </div>
      </div>
    )
  }

  const getAllPaymentCardIds = useCallback(() => {
    return paymentCards?.map((paymentCard) => paymentCard.id)
      .concat(externalPaymentCardIds)
  }, [externalPaymentCardIds, paymentCards])

  // Renders loyalty cards that are found directly on the user's account
  const renderLoyaltyCardsRow = (loyaltyCard) => {
    const plan = userPlans.find((plan) => plan.id === loyaltyCard.membership_plan)
    if (plan) {
      const {id, payment_cards: paymentCards} = loyaltyCard
      return (
        <div key={id} className='flex mb-[17px]'>
          <LoyaltyCard card={loyaltyCard} getStatusFn={getStatusIcon} plan={plan} />
          <div className={`grid grid-cols-${getAllPaymentCardIds().length} gap-[15px]`}>
            {getAllPaymentCardIds().map((_, index) => (
              <LinkStatus key={index} isPllCard={plan?.feature_set.card_type === 2} loyaltyCardPaymentCardIds={paymentCards.map(card => card.id)} paymentCardIndex={index} />
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  // Render the loyalty cards and status that were found on the payment cards for the user
  const renderExternalLoyaltyCardsRow = (loyaltyCardId: number) => {
    const sourcePaymentCardIds = paymentCards.map((paymentCard) => {
      const membershipCards = paymentCard.membership_cards.filter(card => card.id === loyaltyCardId)
      return membershipCards.length > 0 ? paymentCard.id : null
    })

    return (
      <div key={loyaltyCardId} className='flex space-between mb-[17px]'>
        <ExternalCard id={loyaltyCardId}/>
        <div className={`grid grid-cols-${getAllPaymentCardIds().length} gap-[15px]`}>
          {getAllPaymentCardIds().map((_, index) => (
            <LinkStatus key={index} isPllCard loyaltyCardPaymentCardIds={sourcePaymentCardIds} paymentCardIndex={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <section>
      <div className='bg-white dark:bg-grey-850 min-h-[400px] min-w-[600px] overflow-x-auto shadow-md rounded-[20px] p-[20px] flex flex-col'>
        <>
          {renderPaymentCards()}
          {loyaltyCards?.map((loyaltyCard) => renderLoyaltyCardsRow(loyaltyCard))}
          {externalMembershipCardIds?.map(id => renderExternalLoyaltyCardsRow(id))}
        </>
      </div>
    </section>
  )
}

export default React.memo(CustomerWallet)
