import VisaSvg from 'icons/svgs/add-visa.svg'
import MastercardSvg from 'icons/svgs/add-mastercard.svg'
import AmexSvg from 'icons/svgs/add-amex.svg'
import {PaymentSchemeCode} from 'utils/enums'

type Props = {
  paymentSchemeCode: number
}

const PaymentCardIcon = ({paymentSchemeCode}: Props) => {

  const paymentSchemeIconStyles = 'flex w-full h-full justify-center items-center rounded-[4px]'

  const renderIcon = () => {
    switch (paymentSchemeCode) {
      case PaymentSchemeCode.VISA:
        return (
          <div className={`${paymentSchemeIconStyles} bg-visaBlue`}>
            <VisaSvg data-testid='visa-icon' className='scale-[90%] mr-[1px]' alt='Visa' />
          </div>
        )
      case PaymentSchemeCode.MASTERCARD:
        return (
          <div className={`${paymentSchemeIconStyles} bg-mastercardBlue`}>
            <MastercardSvg data-testid='mastercard-icon' className='scale-[78%] mb-[1px]' alt='Mastercard' />
          </div>
        )
      case PaymentSchemeCode.AMEX:
        return (
          <div className={`${paymentSchemeIconStyles} bg-amexBlue`}>
            <AmexSvg data-testid='amex-icon' className='scale-[85%]' alt='Amex' />
          </div>
        )
    }
  }

  return renderIcon()
}

export default PaymentCardIcon
