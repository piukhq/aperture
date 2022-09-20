import VisaSvg from 'icons/svgs/add-visa.svg'
import MastercardSvg from 'icons/svgs/add-mastercard.svg'
import AmexSvg from 'icons/svgs/add-amex.svg'
import {PaymentSchemeCode} from 'utils/enums'

type Props = {
  paymentSchemeCode: number,
  paymentSchemeIconStyles?: string,
}

const defaultPaymentSchemeIconStyles = 'flex w-full h-full justify-center items-center rounded-[4px]'

const PaymentCardIcon = ({paymentSchemeCode, paymentSchemeIconStyles = defaultPaymentSchemeIconStyles}: Props) => {
  const renderIcon = () => {
    switch (paymentSchemeCode) {
      case PaymentSchemeCode.VISA:
        return (
          <div className={`${paymentSchemeIconStyles} bg-visaBlue`}>
            <VisaSvg className='scale-[90%] mr-[1px]' alt='Visa' />
          </div>
        )
      case PaymentSchemeCode.MASTERCARD:
        return (
          <div className={`${paymentSchemeIconStyles} bg-mastercardBlue`}>
            <MastercardSvg className='scale-[78%]' alt='Mastercard' />
          </div>
        )
      case PaymentSchemeCode.AMEX:
        return (
          <div className={`${paymentSchemeIconStyles} bg-amexBlue`}>
            <AmexSvg className='scale-[85%]' alt='Amex' />
          </div>
        )
      default: return null
    }
  }

  return renderIcon()
}

export default PaymentCardIcon
