import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {PaymentSchemeCode, PaymentSchemeStartCaseName} from 'utils/enums'
import {DirectoryIdentifier} from 'types'
import {isoToDateTime} from 'utils/dateFormat'

type Props = {
  identifier: DirectoryIdentifier
}

const SingleViewIdentifierDetails = ({identifier}: Props) => {
  const {date_added: dateAdded, identifier_metadata: identifierMetadata, identifier_status: identifierStatus} = identifier
  const {payment_scheme_code: paymentSchemeCode} = identifierMetadata

  const getPaymentScheme = () => {
    if (paymentSchemeCode === PaymentSchemeCode.VISA) {
      return PaymentSchemeStartCaseName.VISA
    } else if (paymentSchemeCode === PaymentSchemeCode.MASTERCARD) {
      return PaymentSchemeStartCaseName.MASTERCARD
    } else if (paymentSchemeCode === PaymentSchemeCode.AMEX) {
      return PaymentSchemeStartCaseName.AMEX
    }
  }

  return (
    <>
      <div className='mb-[34px]'>
        <h2 className='font-modal-heading'>DATE ADDED</h2>
        <p className='font-modal-data'>{isoToDateTime(dateAdded)}</p>
      </div>
      <section className='mb-[34px] grid grid-cols-2 h-[50px]'>
        <div>
          <h2 className='font-modal-heading'>PAYMENT SCHEME</h2>
          <p className='font-modal-data'>{getPaymentScheme()}</p>
        </div>
      </section>
      <section className='h-[38px] flex justify-between mb-[34px] items-center'>
        <div>
          <h2 className='font-modal-heading'>HARMONIA STATUS</h2>
          <p className='font-modal-data'>{identifierStatus || 'Placeholder Status'}</p> {/* TODO: Add data from API, missing in mocked data */}
        </div>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
        >Edit
        </Button>
      </section>
    </>
  )
}
export default SingleViewIdentifierDetails
