import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

import {PaymentCard} from 'types'
import {ReactNode} from 'react'

type Props = {
  card: PaymentCard
  getStatusFn: (status: string) => ReactNode
}

const PaymentCard = ({getStatusFn, card}:Props) => {

  const renderPaymentSchemeLogo = (paymentSchemeName: string) => {
    if (paymentSchemeName === 'Visa') {
      return <VisaSvg alt='Visa' className='scale-125'/>
    } else if (paymentSchemeName === 'Mastercard') {
      return <MastercardSvg alt='Mastercard' className='scale-125'/>
    } else if (paymentSchemeName === 'American Express') {
      return <AmexSvg alt='Amex' className='scale-125'/>
    }
  }

  return (
    <button key={card.id} className='dark:bg-grey-825 h-[52px] w-[200px] shadow-md flex gap-1 p-[6px] rounded-[8px] text-left items-center space-between'>
      <div className='basis-1/5'>
        {renderPaymentSchemeLogo(card.card.provider)}
      </div>
      <div className='basis-3/5 font-body-4 flex flex-col justify-center h-[44px] leading-snug'>
        <span>
          <span className='font-bold gap-[6px] pr-[5px]'>
          .... {card.card.last_four_digits}
          </span>
          {getStatusFn(card.status)}
        </span>
        <p>{card.id}</p>
      </div>
      <div className='basis-1/5 flex justify-end'>
        <ArrowDownSvg className={'-rotate-90 scale-75 dark:fill-grey-400'} />
      </div>
    </button>
  )
}

export default PaymentCard
