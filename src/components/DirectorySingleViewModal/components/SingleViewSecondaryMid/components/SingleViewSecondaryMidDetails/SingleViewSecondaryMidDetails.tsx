import {useState, useMemo} from 'react'
import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {PaymentSchemeCode, PaymentSchemeStartCaseName} from 'utils/enums'
import {DirectorySecondaryMid} from 'types'

type Props = {
  secondaryMid: DirectorySecondaryMid
}

const SingleViewSecondaryMidDetails = ({secondaryMid}: Props) => {
  const paymentSchemeStatusValues = useMemo(() => ['Enrolled', 'Enrolling', 'Not enrolled', 'Removed'], [])
  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState('Not enrolled')

  const {date_added: dateAdded, secondary_mid_metadata: secondaryMidMetadata, txm_status: txmStatus} = secondaryMid
  const {payment_scheme_code: paymentSchemeCode} = secondaryMidMetadata

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
        <h2 className='font-single-view-heading'>DATE ADDED</h2>
        <p className='font-single-view-data'>{dateAdded}</p>
      </div>
      <section className='mb-[34px] grid grid-cols-2 h-[50px]'>
        <div>
          <h2 className='font-single-view-heading'>PAYMENT SCHEME</h2>
          <p className='font-single-view-data'>{getPaymentScheme()}</p>
        </div>
        <div className='flex flex-col h-[50px] pl-[15px]'>
          <label className='font-single-view-heading'>PAYMENT SCHEME STATUS</label>
          <Dropdown displayValue={paymentSchemeStatus} displayValues={paymentSchemeStatusValues} onChangeDisplayValue={setPaymentSchemeStatus} />
        </div>
      </section>
      <section className=' h-[38px] flex justify-between mb-[34px] items-center'>
        <div>
          <h2 className='font-single-view-heading'>LOCATION </h2>
          <p className='font-single-view-data'>Unknown</p> {/* TODO: Set location...how exactly? */}
        </div>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
        >Add location
        </Button>
      </section>
      <section className='h-[38px] flex justify-between mb-[34px] items-center'>
        <div>
          <h2 className='font-single-view-heading'>HARMONIA STATUS</h2>
          <p className='font-single-view-data'>{txmStatus}</p>
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

export default SingleViewSecondaryMidDetails