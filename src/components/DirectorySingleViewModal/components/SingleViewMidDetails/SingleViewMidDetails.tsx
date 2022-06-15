import {useState, useEffect, useMemo, useCallback} from 'react'
import {useRouter} from 'next/router'
import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import SingleViewMidEditableField from './components/SingleViewMidEditableField'
import {DirectoryLocations, RTKQueryErrorResponse} from 'types'
import {mockLocationData} from 'utils/mockLocationData'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {PaymentSchemeCode, PaymentSchemeStartCaseName} from 'utils/enums'
import {isNumberOnlyString} from 'utils/validation'

type Props = {
  resetError: () => void
  setError: (errorMessage: string) => void
}

const defaultMidDetails = {
  location: {
    location_ref: '',
    location_title: '',
  },
  mid: {
    date_added: '',
    txm_status: '',
    mid_metadata: {
      payment_scheme_code: '',
      visa_bin: '',
      payment_enrolment_status: '',
    },
  },
}

const constructMidLocationString = ({address_line_1: addressLine1, town_city: townCity, postcode}) => `${addressLine1}, ${townCity}, ${postcode}`

const SingleViewMidDetails = ({setError, resetError}: Props) => {
  const router = useRouter()
  const {planId, merchantId, ref} = router.query

  const {
    patchMerchantMid,
    patchMerchantMidResponse,
    patchMerchantMidError,
    patchMerchantMidIsLoading,
    resetPatchMerchantMidResponse,
    getMerchantMidResponse,
    putMerchantMidLocation,
    putMerchantMidLocationResponse,
    putMerchantMidLocationError,
    resetPutMerchantMidLocationResponse,
    deleteMerchantMidLocation,
    deleteMerchantMidLocationIsSuccess,
    deleteMerchantMidLocationError,
    resetDeleteMerchantMidLocationResponse,
  } = useMidManagementMids(false, planId as string, merchantId as string, ref as string)

  const midDetails = getMerchantMidResponse || defaultMidDetails
  const {location = {location_ref: '', location_title: ''}, mid} = midDetails
  const {location_ref: locationRef} = location
  const {date_added: dateAdded, mid_metadata: midMetadata, txm_status: txmStatus} = mid
  const {payment_scheme_code: paymentSchemeCode, visa_bin: visaBin, payment_enrolment_status: paymentEnrolmentStatus} = midMetadata

  // TODO: Check if location data exists in redux, else retrieve from api
  const locationsData: DirectoryLocations = mockLocationData

  const paymentSchemeStatusValues = useMemo(() => ['Enrolled', 'Enrolling', 'Not enrolled', 'Removed'], [])
  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState('')
  const [editableVisaBin, setEditableVisaBin] = useState('')
  const [associatedLocationRef, setAssociatedLocationRef] = useState('')

  // Creates a list of locations titles and refs for the dropdown component to consume
  const locationStringsList = useMemo(() => locationsData.map(locationObj => {
    const {location_ref, location_metadata} = locationObj
    return {
      title: constructMidLocationString(location_metadata),
      location_ref,
    }
  }), [locationsData])

  useEffect(() => {
    locationRef && setAssociatedLocationRef(locationRef)
    paymentEnrolmentStatus && setPaymentSchemeStatus(paymentEnrolmentStatus)
    visaBin && setEditableVisaBin(visaBin)
  }, [locationRef, paymentEnrolmentStatus, visaBin])

  const getPaymentScheme = () => {
    if (paymentSchemeCode === PaymentSchemeCode.VISA) {
      return PaymentSchemeStartCaseName.VISA
    } else if (paymentSchemeCode === PaymentSchemeCode.MASTERCARD) {
      return PaymentSchemeStartCaseName.MASTERCARD
    } else if (paymentSchemeCode === PaymentSchemeCode.AMEX) {
      return PaymentSchemeStartCaseName.AMEX
    }
  }

  const handlePatchErrorResponse = useCallback(() => {
    const {data} = patchMerchantMidError as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      detail.map(err => {
        const {loc} = err
        const location = loc[1]
        if (location === 'visa_bin') {
          setError('Failed to update BIN association')
          setEditableVisaBin(null)
        } else if (location === 'payment_enrolment_status') {
          setError('Failed to update Payment Scheme Status')
          setPaymentSchemeStatus(paymentEnrolmentStatus)
        }
      })
    }
  }, [patchMerchantMidError, paymentEnrolmentStatus, setError])

  // Handle visa bin and payment scheme status PATCH api responses
  useEffect(() => {
    if (patchMerchantMidError) {
      handlePatchErrorResponse()
    } else if (patchMerchantMidResponse) {
      resetError()
      resetPatchMerchantMidResponse()
    }
  }, [patchMerchantMidResponse, patchMerchantMidError, resetError, resetPatchMerchantMidResponse, handlePatchErrorResponse])

  // Handle location PUT and DELETE responses
  useEffect(() => {
    if (putMerchantMidLocationError || deleteMerchantMidLocationError) {
      setError(putMerchantMidLocationError ? 'Add location failed' : 'Delete location failed')
      setAssociatedLocationRef(locationRef)
    } else if (putMerchantMidLocationResponse || deleteMerchantMidLocationIsSuccess) {
      resetError()
      putMerchantMidLocationResponse ? resetPutMerchantMidLocationResponse() : resetDeleteMerchantMidLocationResponse()
    }
  }, [
    putMerchantMidLocationError,
    putMerchantMidLocationResponse,
    setError,
    locationRef,
    resetError,
    resetPutMerchantMidLocationResponse,
    deleteMerchantMidLocationError,
    resetDeleteMerchantMidLocationResponse,
    deleteMerchantMidLocationIsSuccess,
  ])

  // Using currying here to keep the function generic
  const handleBinOrPaymentStatusSave = useCallback((fieldValueObj: {visa_bin: string | null} | {payment_enrolment_status: string | null}) => () => {
    patchMerchantMid({planRef: planId as string, merchantRef: merchantId as string, midRef: ref as string, ...fieldValueObj})
  }, [planId, merchantId, ref, patchMerchantMid])

  const handleBinDelete = useCallback((fieldValueObj: {visa_bin: null}) => () => {
    setEditableVisaBin(null)
    handleBinOrPaymentStatusSave(fieldValueObj)()
  }, [handleBinOrPaymentStatusSave])

  const handlePaymentStatusChange = useCallback((selectedPaymentSchemeStatus: string) => {
    resetError()
    setPaymentSchemeStatus(selectedPaymentSchemeStatus)
    handleBinOrPaymentStatusSave({payment_enrolment_status: selectedPaymentSchemeStatus})()
  }, [handleBinOrPaymentStatusSave, resetError])

  const handleLocationChange = useCallback((selectedLocationString: string) => {
    resetError()
    const location = locationStringsList.find(location => location.title === selectedLocationString)
    setAssociatedLocationRef(location.location_ref)
  }, [resetError, locationStringsList])

  const handleLocationDelete = useCallback(() => {
    deleteMerchantMidLocation({planRef: planId as string, merchantRef: merchantId as string, midRef: ref as string})
  }, [planId, merchantId, ref, deleteMerchantMidLocation])

  const handleLocationSave = useCallback(() => {
    putMerchantMidLocation({planRef: planId as string, merchantRef: merchantId as string, midRef: ref as string, location_ref: associatedLocationRef})
  }, [planId, merchantId, ref, associatedLocationRef, putMerchantMidLocation])

  const getAssociatedLocationString = useCallback(() => {
    const location = locationsData.find(location => location.location_ref === associatedLocationRef)
    return location ? constructMidLocationString(location.location_metadata) : ''
  }, [locationsData, associatedLocationRef])

  const locationValues = useMemo(() => locationStringsList ? locationStringsList.map(location => location.title) : [], [locationStringsList])

  if (getMerchantMidResponse) {
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
            <Dropdown displayValue={paymentSchemeStatus} displayValues={paymentSchemeStatusValues} onChangeDisplayValue={handlePaymentStatusChange} />
          </div>
        </section>

        <SingleViewMidEditableField
          dropdownValues={locationValues}
          header='LOCATION'
          label='location'
          value={getAssociatedLocationString()}
          isSaving={patchMerchantMidIsLoading}
          handleValueChange={handleLocationChange}
          handleCancel={() => setAssociatedLocationRef(locationRef)}
          handleSave={handleLocationSave}
          handleDelete={handleLocationDelete}
          onEdit={() => {
            resetError()
            resetPutMerchantMidLocationResponse()
            resetDeleteMerchantMidLocationResponse()
          }}
          successResponse={putMerchantMidLocationResponse || deleteMerchantMidLocationIsSuccess}
          errorResponse={putMerchantMidLocationError || deleteMerchantMidLocationError}
        />

        { paymentSchemeCode === 1 && (
          <SingleViewMidEditableField
            header='BIN'
            label='BIN'
            value={editableVisaBin}
            isSaving={patchMerchantMidIsLoading}
            handleValueChange={setEditableVisaBin}
            handleCancel={() => setEditableVisaBin(visaBin)}
            handleSave={handleBinOrPaymentStatusSave({visa_bin: editableVisaBin})}
            handleDelete={handleBinDelete({visa_bin: null})}
            onEdit={() => {
              resetError()
              resetPatchMerchantMidResponse()
            }}
            successResponse={patchMerchantMidResponse}
            errorResponse={patchMerchantMidError}
            handleValidation={isNumberOnlyString}
            validationErrorMessage='Enter numeric value'
          />
        )}

        <section className='h-[38px] flex mb-[34px] flex-col'>
          <p className='font-single-view-heading m-0'>HARMONIA STATUS</p>
          <div className='flex justify-between items-center'>
            <p className='font-single-view-data'>{txmStatus}</p>
            <Button
              buttonType={ButtonType.SUBMIT}
              buttonSize={ButtonSize.MEDIUM}
              buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
              buttonBackground={ButtonBackground.LIGHT_GREY}
              labelColour={LabelColour.GREY}
              labelWeight={LabelWeight.SEMIBOLD}
            >Edit
            </Button>
          </div>
        </section>
      </>
    )
  }

  return null
}
export default SingleViewMidDetails
