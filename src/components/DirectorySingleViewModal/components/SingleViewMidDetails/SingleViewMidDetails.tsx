import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppSelector} from 'app/hooks'
import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import SingleViewMidEditableField from './components/SingleViewMidEditableField'
import {DirectoryMid} from 'types'
import {getSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementMerchants} from 'hooks/useMidManagementMerchants'
import {PaymentSchemeCode, PaymentSchemeStartCaseName} from 'utils/enums'
import {isNumberOnlyString} from 'utils/validation'

type Props = {
  resetError: () => void
  setError: (errorMessage: string) => void
}

const SingleViewMidDetails = ({setError, resetError}: Props) => {
  const router = useRouter()
  const {planId, merchantId, ref} = router.query

  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity) as DirectoryMid
  const {date_added: dateAdded, mid_metadata: midMetadata, txm_status: txmStatus} = selectedEntity
  const {payment_scheme_code: paymentSchemeCode, visa_bin: visaBin} = midMetadata

  const {
    patchMerchantMid,
    patchMerchantMidResponse,
    patchMerchantMidError,
    patchMerchantMidIsLoading,
    resetPatchMerchantMidResponse,
  } = useMidManagementMerchants()

  const displayValues = ['Not enrolled']

  const [displayValue, setDisplayValue] = useState(displayValues[0])
  const [editableVisaBin, setEditableVisaBin] = useState(visaBin)

  const getPaymentScheme = () => {
    if (paymentSchemeCode === PaymentSchemeCode.VISA) {
      return PaymentSchemeStartCaseName.VISA
    } else if (paymentSchemeCode === PaymentSchemeCode.MASTERCARD) {
      return PaymentSchemeStartCaseName.MASTERCARD
    } else if (paymentSchemeCode === PaymentSchemeCode.AMEX) {
      return PaymentSchemeStartCaseName.AMEX
    }
  }

  useEffect(() => {
    if (patchMerchantMidResponse) {
      resetError()
      resetPatchMerchantMidResponse()
    }
  }, [patchMerchantMidResponse, resetError, resetPatchMerchantMidResponse])

  useEffect(() => {
    if (patchMerchantMidError) {
      setError('Failed to update BIN association')
      setEditableVisaBin(null)
    }
  }, [patchMerchantMidError, setError, visaBin])

  // Using currying here to keep the function generic
  const handleSave = (fieldValueObj: {visa_bin: string | null} | {payment_enrolment_status: string | null}) => () => {
    patchMerchantMid({planRef: planId as string, merchantRef: merchantId as string, midRef: ref as string, ...fieldValueObj})
  }

  const handleDelete = (fieldValueObj: {visa_bin: null} | {payment_enrolment_status: null}) => () => {
    setEditableVisaBin(null)
    handleSave(fieldValueObj)()
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
        <div className='flex flex-col h-[50px]'>
          <label className='font-single-view-heading pl-[15px]'>PAYMENT SCHEME STATUS</label>
          <Dropdown displayValue={displayValue} displayValues={displayValues} onChangeDisplayValue={setDisplayValue} />
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
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
        >Add location
        </Button>
      </section>

      { paymentSchemeCode === 1 && (
        <SingleViewMidEditableField
          label='BIN'
          value={editableVisaBin}
          isSaving={patchMerchantMidIsLoading}
          handleValueChange={setEditableVisaBin}
          handleCancel={() => setEditableVisaBin(visaBin)}
          handleSave={handleSave({visa_bin: editableVisaBin})}
          handleDelete={handleDelete({visa_bin: null})}
          successResponse={patchMerchantMidResponse}
          errorResponse={patchMerchantMidError}
          handleValidation={isNumberOnlyString}
          validationErrorMessage='Enter numeric value'
        />
      )}

      <section className='h-[38px] flex justify-between mb-[34px] items-center'>
        <div>
          <h2 className='font-single-view-heading'>HARMONIA STATUS</h2>
          <p className='font-single-view-data'>{txmStatus}</p>
        </div>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
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
