import {useState, useEffect, useMemo, useCallback} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button, Dropdown, HeadMetadata} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import SingleViewEditableField from '../../../SingleViewEditableField'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {DirectoryMerchantMid, RTKQueryErrorResponse} from 'types'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import {useDirectoryLocations} from 'hooks/useDirectoryLocations'
import {PaymentSchemeSlug, PaymentSchemeStatusDisplayValue, UserPermissions} from 'utils/enums'
import {isNumberOnlyString} from 'utils/validation'
import {isoToDateTime} from 'utils/dateFormat'
import HarmoniaStatus from '../../../HarmoniaStatus'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import {getLocationList} from 'utils/locationStrings'
import {directoryMerchantMidsApi} from 'services/DirectoryMerchantMids'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getHasHarmoniaStatusUpdate, setHasHarmoniaStatusUpdate} from 'features/directoryMerchantSlice'

type Props = {
  resetError: () => void
  setError: (errorMessage: string) => void
  merchantMid: DirectoryMerchantMid
}

const SingleViewMidDetails = ({setError, resetError, merchantMid}: Props) => {
  const {planId = '', merchantId, ref} = useGetRouterQueryString()
  const [isInLocationEditMode, setIsInLocationEditMode] = useState<boolean>(false)
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState<string>('')
  const [editableVisaBin, setEditableVisaBin] = useState<string>('')
  const [associatedLocationRef, setAssociatedLocationRef] = useState<string>('')

  const {
    getMerchantMidRefresh,
    getMerchantMidIsFetching,
    patchMerchantMid,
    patchMerchantMidResponse,
    patchMerchantMidError,
    patchMerchantMidIsLoading,
    resetPatchMerchantMidResponse,
    putMerchantMidLocation,
    putMerchantMidLocationResponse,
    putMerchantMidLocationError,
    putMerchantMidLocationIsLoading,
    resetPutMerchantMidLocationResponse,
    deleteMerchantMidLocation,
    deleteMerchantMidLocationIsSuccess,
    deleteMerchantMidLocationError,
    resetDeleteMerchantMidLocationResponse,
    postMerchantMidOnboardingIsLoading: isOnboardingLoading,
    postMerchantMidOnboardingIsSuccess: isOnboardingSuccess,
    resetPostMerchantMidOnboardingResponse: resetOnboardingResponse,
    postMerchantMidOnboarding: postOnboarding,
    postMerchantMidOffboarding: postOffboarding,
    postMerchantMidOffboardingIsLoading: isOffboardingLoading,
    postMerchantMidOffboardingIsSuccess: isOffboardingSuccess,
    resetPostMerchantMidOffboardingResponse: resetOffboardingResponse,
  } = useDirectoryMids({
    skipGetMids: true,
    planRef: planId,
    merchantRef: merchantId,
    midRef: ref,
  })

  const {
    getMerchantLocationsResponse,
    getMerchantLocationsRefresh,
    getMerchantLocationsIsFetching,
  } = useDirectoryLocations({
    skipGetLocation: true,
    planRef: planId,
    merchantRef: merchantId,
    getAll: true,
  })

  const dispatch = useAppDispatch()
  const hasHarmoniaStatusUpdate = useAppSelector(getHasHarmoniaStatusUpdate)
  const {mid} = merchantMid
  const locationRef = merchantMid.location?.location_ref || ''
  const {date_added: dateAdded, mid_metadata: midMetadata, txm_status: txmStatus} = mid
  const {payment_scheme_slug: paymentSchemeSlug, visa_bin: visaBin, payment_enrolment_status: paymentEnrolmentStatus, mid: midValue} = midMetadata

  const locationsData = useMemo(() => getMerchantLocationsResponse || [], [getMerchantLocationsResponse])

  const paymentSchemeStatusValues: string[] = useMemo(() => [
    PaymentSchemeStatusDisplayValue['enrolled'],
    PaymentSchemeStatusDisplayValue['enrolling'],
    PaymentSchemeStatusDisplayValue['not_enrolled'],
    PaymentSchemeStatusDisplayValue['unenrolled'],
  ], [])

  const isRefreshing = getMerchantMidIsFetching || getMerchantLocationsIsFetching

  const locationStringsList = getLocationList(locationsData)

  useEffect(() => {
    locationRef && setAssociatedLocationRef(locationRef)
    paymentEnrolmentStatus && setPaymentSchemeStatus(PaymentSchemeStatusDisplayValue[paymentEnrolmentStatus])
    visaBin && setEditableVisaBin(visaBin)
  }, [locationRef, paymentEnrolmentStatus, visaBin])

  const handlePatchErrorResponse = useCallback(() => {
    const {data} = patchMerchantMidError as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      detail.forEach(err => {
        const {loc} = err
        const location = loc?.[1]
        if (location === 'visa_bin') {
          setError('Failed to update BIN association')
          setEditableVisaBin('')
        } else if (location === 'payment_enrolment_status') {
          setError('Failed to update Payment Scheme Status')
          setPaymentSchemeStatus(paymentEnrolmentStatus || '')
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
      setIsInLocationEditMode(false)
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
    patchMerchantMid({planRef: planId, merchantRef: merchantId, midRef: ref, ...fieldValueObj})
  }, [planId, merchantId, ref, patchMerchantMid])

  const handleBinDelete = useCallback((fieldValueObj: {visa_bin: null}) => () => {
    setEditableVisaBin('')
    handleBinOrPaymentStatusSave(fieldValueObj)()
  }, [handleBinOrPaymentStatusSave])

  const handlePaymentStatusChange = useCallback((selectedPaymentSchemeStatus: string) => {
    resetError()
    setPaymentSchemeStatus(selectedPaymentSchemeStatus)

    const indexOfPaymentSchemeKey = Object.values(PaymentSchemeStatusDisplayValue).indexOf(selectedPaymentSchemeStatus as PaymentSchemeStatusDisplayValue)
    const paymentSchemeKey = Object.keys(PaymentSchemeStatusDisplayValue)[indexOfPaymentSchemeKey]

    handleBinOrPaymentStatusSave({payment_enrolment_status: paymentSchemeKey})()
  }, [handleBinOrPaymentStatusSave, resetError])

  const handleLocationChange = useCallback((selectedLocationString: string) => {
    resetError()
    const location = locationStringsList.find(location => location.title === selectedLocationString)
    location?.location_ref && setAssociatedLocationRef(location?.location_ref)
  }, [resetError, locationStringsList])

  const handleLocationDelete = useCallback(() => {
    deleteMerchantMidLocation({planRef: planId, merchantRef: merchantId, midRef: ref})
  }, [planId, merchantId, ref, deleteMerchantMidLocation])

  const handleLocationSave = useCallback(() => {
    putMerchantMidLocation({planRef: planId, merchantRef: merchantId, midRef: ref, location_ref: associatedLocationRef})
  }, [planId, merchantId, ref, associatedLocationRef, putMerchantMidLocation])

  const offboardMid = () => {
    resetOffboardingResponse()
    ref && postOffboarding({
      planRef: planId,
      merchantRef: merchantId,
      midRefs: [ref],
    })
  }
  const onboardMid = () => {
    resetOnboardingResponse()
    ref && postOnboarding({
      planRef: planId,
      merchantRef: merchantId,
      midRefs: [ref],
    })
  }

  const handleRefreshButtonClick = useCallback(() => {
    getMerchantLocationsRefresh()
    setShouldRefresh(false)
    if (hasHarmoniaStatusUpdate) {
      dispatch(directoryMerchantMidsApi.util.invalidateTags(['MerchantMids']))
      dispatch(setHasHarmoniaStatusUpdate(false))
      resetOffboardingResponse()
      resetOnboardingResponse()
    }
    getMerchantMidRefresh()
  }, [getMerchantLocationsRefresh, hasHarmoniaStatusUpdate, getMerchantMidRefresh, dispatch, resetOffboardingResponse, resetOnboardingResponse])

  const getAssociatedLocationString = useCallback(() => {
    const location = locationsData.find(location => location.location_ref === associatedLocationRef)
    if (!location) { return '' }
    return location.location_metadata.name ? location.location_metadata.name : ''
  }, [locationsData, associatedLocationRef])

  const locationValues = useMemo(() => locationStringsList ? locationStringsList.map(location => location.title) : [], [locationStringsList])

  return (
    <>
      <HeadMetadata pageTitle={`MID Directory - MID: ${midValue}`} pageDescription={`View ${paymentSchemeStatus?.toLocaleLowerCase()} ${paymentSchemeSlug} MID in the MID Directory`} />
      <div data-testid='mid-refresh-button' className='flex justify-end'>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
          handleClick={handleRefreshButtonClick}
          ariaLabel='Refresh MID details'
          isDisabled={isRefreshing}
          additionalStyles={shouldRefresh ? 'animate-pulse scale-110 duration-300' : ''}
          noShadow
        ><RefreshSvg />{isRefreshing ? 'Refreshing' : 'Refresh'}
        </Button>
      </div>

      <div className='mb-[34px]'>
        <h2 className='font-modal-heading'>DATE ADDED</h2>
        <p className='font-modal-data'>{isoToDateTime(dateAdded)}</p>
      </div>
      <section className='mb-[34px] grid grid-cols-2 h-[50px]'>
        <div>
          <h2 className='font-modal-heading'>PAYMENT SCHEME</h2>
          <p className='font-modal-data'>{capitaliseFirstLetter(paymentSchemeSlug)}</p>
        </div>
        <div className='flex flex-col h-[50px] pl-[15px]'>
          <label className='font-modal-heading'>PAYMENT SCHEME STATUS</label>
          <div className='w-[180px] h-[28px]'>
            <Dropdown
              displayValue={paymentSchemeStatus}
              displayValues={paymentSchemeStatusValues}
              onChangeDisplayValue={handlePaymentStatusChange}
              isDisabled={isRefreshing}
              selectedValueStyles='font-normal text-grey-600'
              requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            />
          </div>
        </div>
      </section>

      <SingleViewEditableField
        dropdownValues={locationValues}
        header='LOCATION'
        label='location'
        actionVerb='unlink'
        link={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${locationRef}`}
        value={isInLocationEditMode ? getAssociatedLocationString() : merchantMid.location?.location_title}
        isSaving={putMerchantMidLocationIsLoading}
        isDisabled={isRefreshing}
        shouldUseCombobox
        handleValueChange={handleLocationChange}
        handleCancel={() => setAssociatedLocationRef(locationRef)}
        handleSave={handleLocationSave}
        handleDelete={handleLocationDelete}
        onEdit={() => {
          setIsInLocationEditMode(true)
          resetError()
          resetPutMerchantMidLocationResponse()
          resetDeleteMerchantMidLocationResponse()
        }}
        successResponse={putMerchantMidLocationResponse || deleteMerchantMidLocationIsSuccess}
        errorResponse={putMerchantMidLocationError || deleteMerchantMidLocationError}
      />

      { paymentSchemeSlug === PaymentSchemeSlug.VISA && (
        <SingleViewEditableField
          header='BIN'
          label='BIN'
          actionVerb='delete'
          value={editableVisaBin}
          isSaving={patchMerchantMidIsLoading}
          isDisabled={isRefreshing}
          handleValueChange={setEditableVisaBin}
          handleCancel={() => setEditableVisaBin(visaBin || '')}
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

      <HarmoniaStatus
        txmStatus={txmStatus}
        isOnboardingLoading={isOnboardingLoading}
        isOnboardingSuccess={isOnboardingSuccess}
        shouldRefresh={shouldRefresh}
        setShouldRefresh={setShouldRefresh}
        isOffboardingLoading={isOffboardingLoading}
        isOffboardingSuccess={isOffboardingSuccess}
        offboardEntityFn={offboardMid}
        onboardEntityFn={onboardMid}
        isDisabled={isRefreshing}
      />
    </>
  )
}

export default SingleViewMidDetails
