import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryMid} from 'types'
import {getSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useAppSelector} from 'app/hooks'
import {PaymentSchemeCode} from 'utils/enums'
import {useState} from 'react'

const SingleViewMidDetails = () => {
  const displayValues = ['Not enrolled']
  const [displayValue, setDisplayValue] = useState(displayValues[0])
  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const {date_added: dateAdded, mid_metadata: midMetadata, txm_status: txmStatus}: DirectoryMid = selectedEntity
  const {payment_scheme_code: paymentSchemeCode, visa_bin: visaBin} = midMetadata

  const getPaymentScheme = () => {
    if (paymentSchemeCode === PaymentSchemeCode.VISA) {
      return 'Visa'
    } else if (paymentSchemeCode === PaymentSchemeCode.MASTERCARD) {
      return 'Mastercard'
    } else if (paymentSchemeCode === PaymentSchemeCode.AMEX) {
      return 'Amex'
    }
  }

  return (
    <>
      <div className='mb-[34px]'>
        <h2 className='font-single-view-heading'>DATE ADDED</h2>
        <p className='font-single-view-data'>{dateAdded}</p>
      </div>
      <div className='mb-[34px] grid grid-cols-2 h-[50px]'>
        <div>
          <h2 className='font-single-view-heading'>PAYMENT SCHEME</h2>
          <p className='font-single-view-data'>{getPaymentScheme()}</p>
        </div>
        <section>
          <div className='flex flex-col'>
            <label className='font-single-view-heading pl-[15px]'>PAYMENT SCHEME STATUS</label>
            <Dropdown displayValue={displayValue} displayValues={displayValues} onChangeDisplayValue={setDisplayValue} />
          </div>
        </section>
      </div>
      <section className=' h-[38px] flex justify-between mb-[34px]'>
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
      { paymentSchemeCode === 1 && (
        <section className='h-[38px] flex justify-between mb-[34px]'>
          <div>
            <h2 className='font-single-view-heading'>BIN</h2>
            <p className='font-single-view-data'>{visaBin}</p>
          </div>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add BIN
          </Button>
        </section>
      )}
      <section className='h-[38px] flex justify-between mb-[34px]'>
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
export default SingleViewMidDetails


