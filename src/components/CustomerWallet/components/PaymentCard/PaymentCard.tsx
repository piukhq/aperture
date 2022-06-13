import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

import {PaymentCard} from 'types'

type Props = {
  card: PaymentCard
  getStatusFn: (status: string) => string
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
    <div key={card.id} className='dark:bg-grey-825 h-[52px] w-[200px] shadow-md flex gap-1 p-[6px] rounded-[8px] items-center space-between'>
      <div className='basis-1/5'>
        {renderPaymentSchemeLogo(card.card.provider)}
      </div>
      <div className='basis-3/5 font-body-4 flex flex-col justify-center h-[44px] leading-snug'>
        <p className='font-bold flex items-center gap-[6px]'>
                .... {card.card.last_four_digits}
          <span className={`flex items-center justify-center h-[6px] w-[6px] rounded-full bg-${getStatusFn(card.status)}`}/>
        </p>
        <p>{card.id}</p>
      </div>
      <div className='basis-1/5 flex justify-end'>
        <ArrowDownSvg className={'-rotate-90 scale-75'} />
      </div>
    </div>
  )
}

export default PaymentCard
