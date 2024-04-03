import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'

import {PaymentCard} from 'types'
import {ReactNode} from 'react'

type Props = {
  paymentCard: PaymentCard
  getStatusFn: (status: string) => ReactNode
}

const PaymentCard = ({getStatusFn, paymentCard}: Props) => {
  const {card, id, status} = paymentCard
  const {provider, last_four_digits} = card
  const isMobileViewport = useIsMobileViewportDimensions()

  const renderPaymentSchemeIcon = (paymentSchemeName: string) => {
    if (paymentSchemeName === 'Visa') {
      return <VisaSvg data-testid='visa-icon' alt='Visa' className='scale-125' />
    } else if (paymentSchemeName === 'Mastercard') {
      return <MastercardSvg alt='Mastercard' className='scale-125' />
    } else if (paymentSchemeName === 'American Express') {
      return <AmexSvg alt='Amex' className='scale-125' />
    }
  }

  return (
    <a
      href={`${process.env.NEXT_PUBLIC_LOYALTY_API_URL}/admin/payment_card/paymentcardaccount/${id}/change/`}
      target='blank'
      key={id}
      onClick={() => console.log('Payment Card clicked')}
      className={`dark:bg-grey-825 h-[70px] flex gap-1 p-[6px] rounded-[8px] text-left items-center shadow-sm hover:shadow-md dark:hover:bg-grey-800 duration-200 ${isMobileViewport ? 'w-[120px]' : 'w-[200px]'}`}
    >
      <div className='basis-1/5'>
        {!isMobileViewport && renderPaymentSchemeIcon(provider)}
      </div>
      <div className='basis-3/5 font-body-4 flex flex-col justify-center h-[44px] leading-snug'>
        <span>
          <span className='font-bold gap-[6px] pr-[5px]'>
            .... {last_four_digits}
          </span>
          {getStatusFn(status)}
          {isMobileViewport && provider}
        </span>
        <p>{id}</p>
      </div>
      <div className='basis-1/5 flex justify-end'>
        <ArrowDownSvg className={'-rotate-90 scale-75 dark:fill-grey-400'} />
      </div>
    </a>
  )
}

export default PaymentCard
