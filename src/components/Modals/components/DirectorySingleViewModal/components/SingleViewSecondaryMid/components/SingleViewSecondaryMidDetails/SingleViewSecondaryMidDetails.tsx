import {useState, useMemo, useCallback, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {directoryMerchantSecondaryMidsApi} from 'services/DirectoryMerchantSecondaryMids'
import {getHasHarmoniaStatusUpdate, setHasHarmoniaStatusUpdate} from 'features/directoryMerchantSlice'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button, Dropdown, HeadMetadata} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {DirectorySecondaryMid} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import HarmoniaStatus from '../../../HarmoniaStatus'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import {PaymentSchemeStatusDisplayValue, UserPermissions} from 'utils/enums'

type Props = {
  secondaryMid: DirectorySecondaryMid
}

const SingleViewSecondaryMidDetails = ({secondaryMid}: Props) => {
  const {merchantId, planId = '', ref} = useGetRouterQueryString()
  const dispatch = useAppDispatch()
  const hasHarmoniaStatusUpdate = useAppSelector(getHasHarmoniaStatusUpdate)

  const paymentSchemeStatusValues:string[] = useMemo(() => [
    PaymentSchemeStatusDisplayValue['enrolled'],
    PaymentSchemeStatusDisplayValue['enrolling'],
    PaymentSchemeStatusDisplayValue['not_enrolled'],
    PaymentSchemeStatusDisplayValue['unenrolled'],
  ], [])

  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState<string>('')
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)

  const {date_added: dateAdded, secondary_mid_metadata: secondaryMidMetadata, txm_status: txmStatus} = secondaryMid
  const {payment_scheme_slug: paymentSchemeSlug, payment_enrolment_status: paymentEnrolmentStatus, secondary_mid: secondaryMidValue} = secondaryMidMetadata

  const {
    getMerchantSecondaryMidRefresh,
    getMerchantSecondaryMidIsFetching: isRefreshing,
    patchMerchantSecondaryMid,
    patchMerchantSecondaryMidResponse,
    resetPatchMerchantSecondaryMidResponse,
    postMerchantSecondaryMidOnboarding: postOnboarding,
    postMerchantSecondaryMidOnboardingIsLoading: isOnboardingLoading,
    postMerchantSecondaryMidOnboardingIsSuccess: isOnboardingSuccess,
    resetPostMerchantSecondaryMidOnboardingResponse: resetOnboardingResponse,
    postMerchantSecondaryMidOffboarding: postOffboarding,
    postMerchantSecondaryMidOffboardingIsLoading: isOffboardingLoading,
    postMerchantSecondaryMidOffboardingIsSuccess: isOffboardingSuccess,
    resetPostMerchantSecondaryMidOffboardingResponse: resetOffboardingResponse,
  } = useDirectorySecondaryMids({
    skipGetSecondaryMids: !shouldRefresh,
    skipGetSecondaryMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    secondaryMidRef: ref,
  })

  useEffect(() => {
    paymentEnrolmentStatus && setPaymentSchemeStatus(PaymentSchemeStatusDisplayValue[paymentEnrolmentStatus])
  }, [paymentEnrolmentStatus])

  useEffect(() => {
    if (patchMerchantSecondaryMidResponse) {
      resetPatchMerchantSecondaryMidResponse()
    }
  }, [patchMerchantSecondaryMidResponse, resetPatchMerchantSecondaryMidResponse])

  const offboardSecondaryMid = () => {
    resetOffboardingResponse()
    ref && postOffboarding({
      planRef: planId,
      merchantRef: merchantId,
      secondaryMidRefs: [ref],
    })
  }
  const onboardSecondaryMid = () => {
    resetOnboardingResponse()
    ref && postOnboarding({
      planRef: planId,
      merchantRef: merchantId,
      secondaryMidRefs: [ref],
    })
  }

  const handlePaymentStatusChange = useCallback((selectedPaymentSchemeStatus: string) => {
    setPaymentSchemeStatus(selectedPaymentSchemeStatus)

    const indexOfPaymentSchemeKey = Object.values(PaymentSchemeStatusDisplayValue).indexOf(selectedPaymentSchemeStatus as PaymentSchemeStatusDisplayValue)
    const paymentSchemeKey = Object.keys(PaymentSchemeStatusDisplayValue)[indexOfPaymentSchemeKey]
    const {payment_scheme_store_name = ''} = secondaryMid.secondary_mid_metadata

    const updatedSecondaryMid = {
      payment_enrolment_status: paymentSchemeKey,
      payment_scheme_store_name,
    }

    patchMerchantSecondaryMid({planRef: planId, merchantRef: merchantId, secondaryMidRef: ref, ...updatedSecondaryMid})
  }, [merchantId, patchMerchantSecondaryMid, planId, ref, secondaryMid.secondary_mid_metadata])

  const handleRefreshButtonClick = useCallback(() => {
    setShouldRefresh(false)
    if (hasHarmoniaStatusUpdate) {
      dispatch(directoryMerchantSecondaryMidsApi.util.invalidateTags(['MerchantSecondaryMids']))
      dispatch(setHasHarmoniaStatusUpdate(false))
      resetOffboardingResponse()
      resetOnboardingResponse()
    }
    getMerchantSecondaryMidRefresh()
  }, [dispatch, getMerchantSecondaryMidRefresh, hasHarmoniaStatusUpdate, resetOffboardingResponse, resetOnboardingResponse])

  return (
    <>
      <HeadMetadata pageTitle={`MID Directory - Secondary MID: ${secondaryMidValue}`} pageDescription={`View this ${paymentSchemeStatus?.toLocaleLowerCase()} ${paymentSchemeSlug} secondary MID in the MID Directory`} />
      <div data-testid='secondary-mid-refresh-button' className='flex justify-end'>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
          handleClick={handleRefreshButtonClick}
          ariaLabel='Refresh Secondary MID details'
          isDisabled={isRefreshing}
          noShadow
          additionalStyles={shouldRefresh ? 'animate-pulse scale-110 duration-300' : ''}
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
      <HarmoniaStatus
        txmStatus={txmStatus}
        isOnboardingLoading={isOnboardingLoading}
        isOnboardingSuccess={isOnboardingSuccess}
        isOffboardingLoading={isOffboardingLoading}
        isOffboardingSuccess={isOffboardingSuccess}
        shouldRefresh={shouldRefresh}
        setShouldRefresh={setShouldRefresh}
        offboardEntityFn={offboardSecondaryMid}
        onboardEntityFn={onboardSecondaryMid}
        isDisabled={isRefreshing}
      />
    </>
  )
}

export default SingleViewSecondaryMidDetails
