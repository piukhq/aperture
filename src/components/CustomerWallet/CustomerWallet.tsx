import React from 'react'
import Image from 'next/image'

import {useCustomerWallet} from 'hooks/useCustomerWallet'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import CheckSvg from 'icons/svgs/check.svg'
import CloseSvg from 'icons/svgs/close.svg'

const CustomerWallet = () => {
  const {
    getLoyaltyCardsResponse,
    getPaymentCardsResponse,
    getPlansResponse,
    getLoyaltyCardsIsError,
    getPaymentCardsIsError,
    getPlansIsError,
  } = useCustomerWallet()


  const renderPaymentSchemeLogo = (paymentSchemeName: string) => {
    if (paymentSchemeName === 'Visa') {
      return <VisaSvg alt='Visa' className='scale-125'/>
    } else if (paymentSchemeName === 'Mastercard') {
      return <MastercardSvg alt='Mastercard' className='scale-125'/>
    } else if (paymentSchemeName === 'American Express') {
      return <AmexSvg alt='Amex' className='scale-125'/>
    }
  }

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
          <div key={paymentCard.id} className='dark:bg-grey-825 h-[52px] w-[200px] shadow-md flex gap-1 p-[6px] rounded-[8px] items-center space-between'>
            <div className='basis-1/5'>
              {renderPaymentSchemeLogo(paymentCard.card.provider)}
            </div>
            <div className='basis-3/5 font-body-4 flex flex-col justify-center h-[44px] leading-snug'>
              <p className='font-bold flex items-center gap-[6px]'>
                .... {paymentCard.card.last_four_digits}
                <span className={`flex items-center justify-center h-[6px] w-[6px] rounded-full bg-${getStatusColour(paymentCard.status)}`}/>
              </p>
              <p>{paymentCard.id}</p>
            </div>
            <div className='basis-1/5 flex justify-end'>
              <ArrowDownSvg className={'-rotate-90 scale-75'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const getLinkStatus = (loyaltyCardPaymentCards, paymentCardIndex) => {
    const paymentCardId = getPaymentCardsResponse[paymentCardIndex].id
    const isPaymentCardLinkedToThisLoyaltyCard = loyaltyCardPaymentCards.some((loyaltyCardPaymentCard) => loyaltyCardPaymentCard.id === paymentCardId)
    return isPaymentCardLinkedToThisLoyaltyCard ? <CheckSvg fill='green' className='scale-125' /> : <CloseSvg fill='red' className={'h-[15px]'} />
  }
  const renderLoyaltyIcon = (images) => {
    const icon = images.find((image) => image.type === 3)
    return icon && <Image className='rounded-[5px]' src={icon.url} height={40} width={40} alt=''/>
  }

  const getBalanceString = (loyaltyCard, plan) => {
    if (plan.slug === 'iceland-bonus-card') {
      return `${loyaltyCard.balances[0].prefix}${loyaltyCard.balances[0].value} spent`
    }

    const currentVoucherEarn = loyaltyCard.vouchers?.find((voucher) => voucher.state === 'inprogress').earn

    if (currentVoucherEarn?.type === 'stamps') {
      return `${currentVoucherEarn.value} ${currentVoucherEarn.suffix}`
    } else if (currentVoucherEarn?.type === 'accumulator') {
      return `${currentVoucherEarn.value} / ${currentVoucherEarn.target_value} spent`
    }
    return 'N/A'
  }

  const renderLoyaltyCardsRow = () => (
    <div>
      {getLoyaltyCardsResponse?.map((loyaltyCard) => {
        const plan = getPlansResponse?.find((plan) => plan.id === loyaltyCard.membership_plan)
        const isPllCard = plan?.feature_set.card_type === 2
        const {id, status, images, payment_cards: paymentCards} = loyaltyCard

        return (
          <div key={id} className='flex space-between mb-[17px]'>
            <div className='dark:bg-grey-825 flex h-[90px] min-w-[180px] shadow-md rounded-[8px] items-center p-[6px]'>
              <div className='flex flex-col h-full space-between basis-4/5 font-body-4'>
                <p className='font-bold flex gap-[6px] items-center h-full leading-snug'>
                  {plan?.account.plan_name}
                  <span className={`flex items-center justify-center h-[6px] min-w-[6px] rounded-full bg-${getStatusColour(status.state)}`}/>
                </p>
                <div className='flex gap-[7px]'>
                  <div className='basis-1/4'>
                    {renderLoyaltyIcon(images)}
                  </div>
                  <div className='basis-3/4 leading-snug'>
                    <p>{id}</p>
                    <p>{isPllCard ? getBalanceString(loyaltyCard, plan) : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className='basis-1/5 flex justify-end'>
                <ArrowDownSvg className={'-rotate-90 scale-75'} />
              </div>
            </div>

            <div key={id} className={`grid grid-cols-${getPaymentCardsResponse?.length} gap-[15px]`}>
              {getPaymentCardsResponse?.map((paymentCard, index) => (
                <div key={paymentCard.id} className='w-[200px] flex items-center justify-center'>
                  { isPllCard ? getLinkStatus(paymentCards, index) : <div className='h-[3px] bg-grey-600 w-[20px]'/>}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>

  )
  return (
    <div className={'bg-white dark:bg-grey-850 min-h-[400px] min-w-[900px] shadow-md rounded-[20px] p-[20px] flex flex-col justify-center'}>
      { !getLoyaltyCardsIsError && !getPaymentCardsIsError && !getPlansIsError ? (
        <>
          {renderPaymentCards()}
          {renderLoyaltyCardsRow()}
        </>
      ) : <p className='w-full text-center body-text-4'>Error loading wallet</p>}
    </div>
  )
}

export default CustomerWallet


// squaremeal points
// Refactor into components
// // Linked elsewhere card variants Dark mode
// Wierd dot thing asnd into ticks
