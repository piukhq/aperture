import VisaSvg from 'icons/svgs/add-visa.svg'
import MastercardSvg from 'icons/svgs/add-mastercard.svg'
import AmexSvg from 'icons/svgs/add-amex.svg'
import {PaymentSchemeSlug} from 'utils/enums'

type Props = {
  paymentSchemeSlug: PaymentSchemeSlug,
  paymentSchemeIconStyles?: string,
}

const defaultPaymentSchemeIconStyles = 'flex w-full h-full justify-center items-center rounded-[4px]'

const PaymentCardIcon = ({paymentSchemeSlug, paymentSchemeIconStyles = defaultPaymentSchemeIconStyles}: Props) => {
  const renderIcon = () => {
    switch (paymentSchemeSlug) {
      case PaymentSchemeSlug.VISA:
        return (
          <div className={`${paymentSchemeIconStyles} bg-visaBlue`}>
            <VisaSvg className='scale-[90%] mr-[1px] h-full w-full' alt='Visa' />
          </div>
        )
      case PaymentSchemeSlug.MASTERCARD:
        return (
          <div className={`${paymentSchemeIconStyles} bg-mastercardBlue`}>
            <MastercardSvg className='scale-[78%] h-full w-full' alt='Mastercard' />
          </div>
        )
      case PaymentSchemeSlug.AMEX:
        return (
          <div className={`${paymentSchemeIconStyles} bg-amexBlue`}>
            <AmexSvg className='scale-[85%] h-full w-full' alt='Amex' />
          </div>
        )
      default: return null
    }
  }

  return renderIcon()
}

export default PaymentCardIcon
