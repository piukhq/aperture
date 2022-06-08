import React, {useEffect, useState} from 'react'
import Image from 'next/image'

import {useCustomerWallet} from 'hooks/useCustomerWallet'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

const CustomerWallet = () => {
  const [customerPlans, setCustomerPlans] = useState(null)
  const {getLoyaltyCardsResponse, getPaymentCardsResponse, getPlansResponse} = useCustomerWallet()

  console.log
  useEffect(() => {
    if (getPlansResponse && getLoyaltyCardsResponse) {
      const loyaltyCardPlans = getLoyaltyCardsResponse.map((loyaltyCard) => loyaltyCard.membership_plan)
      setCustomerPlans(getPlansResponse.filter((plan) => loyaltyCardPlans.includes(plan.id)))
    }
  }, [getPlansResponse, getLoyaltyCardsResponse])

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
    <div className={`w-full grid grid-cols-${getPaymentCardsResponse?.length} gap-[15px]`}>
      {getPaymentCardsResponse?.map((paymentCard) => (
        <div key={paymentCard.id} className='h-[52px] max-w-[200px] min-w-[135px] shadow-md flex gap-1 p-[6px] rounded-[8px] items-center space-between'>
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
  )


  const getPlanName = (planId: number) => customerPlans?.find((plan) => plan.id === planId)?.account.plan_name

  const renderLoyaltyIcon = (images) => {
    const icon = images.find((image) => image.type === 3)
    return icon && <Image className='rounded-[5px]' src={icon.url} height={40} width={40} alt=''/>
  }

  const getCurrentVoucher = (vouchers) => {
    const currentVoucher = vouchers.find((voucher) => voucher.state === 'inprogress')
    return currentVoucher ? `${currentVoucher.earn.value} ${currentVoucher.earn.suffix}` : 'N/A'
  }


  const renderLoyaltyCardsRow = () => (
    <div>
      {getLoyaltyCardsResponse?.map((loyaltyCard) => {
        const {id, status, images, vouchers, membership_plan} = loyaltyCard
        return (
          <div key={id} className='h-[90px] mb-[15px]'>
            <div className='flex h-[90px] w-[180px] shadow-md rounded-[8px] items-center p-[6px]'>
              <div className='flex flex-col h-full space-between basis-4/5 font-body-4'>
                <p className='font-bold flex gap-[6px] items-center h-full leading-snug'>
                  {getPlanName(membership_plan)}
                  <span className={`flex items-center justify-center h-[6px] min-w-[6px] rounded-full bg-${getStatusColour(status.state)}`}/>
                </p>
                <div className='flex gap-[7px]'>
                  <div className='basis-1/4'>
                    {renderLoyaltyIcon(images)}
                  </div>
                  <div className='basis-3/4 leading-snug'>
                    <p>{id}</p>
                    <p>{vouchers ? getCurrentVoucher(vouchers) : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className='basis-1/5 flex justify-end'>
                <ArrowDownSvg className={'-rotate-90 scale-75'} />
              </div>
            </div>
          </div>
        )
      })}
    </div>

  )
  return (
    <div className={'bg-white min-h-[400px] min-w-[900px] shadow-md rounded-[20px] p-[20px]'}>
      <div className={'h-[92px] pl-[180px] w-full flex'}>
        {renderPaymentCards()}
      </div>
      {renderLoyaltyCardsRow()}
    </div>


  )
}

export default CustomerWallet


// 3. PLAN NAME?!
// status check.
// Linked elsewhere variants
// Responsive design
// Dark mode


