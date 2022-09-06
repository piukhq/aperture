import {useState, useMemo, useEffect} from 'react'
import {Button, Dropdown} from 'components'
import {useRouter} from 'next/router'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryTxmStatus, PaymentSchemeCode, PaymentSchemeStartCaseName} from 'utils/enums'
import {DirectorySecondaryMid} from 'types'
import {isoToDateTime} from 'utils/dateFormat'

type Props = {
  secondaryMid: DirectorySecondaryMid
}

const SingleViewSecondaryMidDetails = ({secondaryMid}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const paymentSchemeStatusValues = useMemo(() => ['Enrolled', 'Enrolling', 'Not enrolled', 'Removed'], [])
  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState('Not enrolled')

  const {date_added: dateAdded, secondary_mid_metadata: secondaryMidMetadata, txm_status: txmStatus} = secondaryMid
  const {payment_scheme_code: paymentSchemeCode} = secondaryMidMetadata
  const [harmoniaStatusButtonAction, setHarmoniaStatusButtonAction] = useState('')

  const {
    postMerchantSecondaryMidOnboarding: postOnboarding,
    postMerchantSecondaryMidOnboardingIsLoading: isOnboardingLoading,
    postMerchantSecondaryMidOnboardingIsSuccess: isOnboardingSuccess,
    resetPostMerchantSecondaryMidOnboardingResponse: resetOnboardingResponse,
    postMerchantSecondaryMidOffboarding: postOffboarding,
    postMerchantSecondaryMidOffboardingIsLoading: isOffboardingLoading,
    postMerchantSecondaryMidOffboardingIsSuccess: isOffboardingSuccess,
    resetPostMerchantSecondaryMidOffboardingResponse: resetOffboardingResponse,
  } = useMidManagementSecondaryMids({
    skipGetSecondaryMid: true,
    planRef: 'planRef',
    merchantRef: 'merchantRef',
    secondaryMidRef: 'secondaryMidRef',
  })

  useEffect(() => {
    if (DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.offboarding || isOffboardingLoading) {
      setHarmoniaStatusButtonAction('Offboarding')
    } else if (DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.onboarding || isOnboardingLoading) {
      setHarmoniaStatusButtonAction('Onboarding')
    } else if (DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.onboarded) {
      setHarmoniaStatusButtonAction('Offboard')
    } else if (DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.not_onboarded) {
      setHarmoniaStatusButtonAction('Onboard')
    }
  }, [isOffboardingLoading, isOffboardingSuccess, isOnboardingLoading, isOnboardingSuccess, resetOffboardingResponse, resetOnboardingResponse, txmStatus])

  const getPaymentScheme = () => {
    if (paymentSchemeCode === PaymentSchemeCode.VISA) {
      return PaymentSchemeStartCaseName.VISA
    } else if (paymentSchemeCode === PaymentSchemeCode.MASTERCARD) {
      return PaymentSchemeStartCaseName.MASTERCARD
    } else if (paymentSchemeCode === PaymentSchemeCode.AMEX) {
      return PaymentSchemeStartCaseName.AMEX
    }
  }

  const handleHarmoniaStatusButtonClick = () => {
    const offboardSecondaryMid = () => {
      resetOffboardingResponse()
      postOffboarding({
        planRef: planId as string,
        merchantRef: merchantId as string,
        secondaryMidRef: ref as string,
      })
    }
    const onboardSecondaryMid = () => {
      resetOnboardingResponse()
      postOnboarding({
        planRef: planId as string,
        merchantRef: merchantId as string,
        secondaryMidRef: ref as string,
      })
    }
    DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.onboarded ? offboardSecondaryMid() : onboardSecondaryMid()
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
        <div className='flex flex-col h-[50px] pl-[15px]'>
          <label className='font-modal-heading'>PAYMENT SCHEME STATUS</label>
          <Dropdown displayValue={paymentSchemeStatus} displayValues={paymentSchemeStatusValues} onChangeDisplayValue={setPaymentSchemeStatus} />
        </div>
      </section>
      <section className='h-[38px] flex justify-between mb-[34px] items-center'>
        <div>
          <h2 className='font-modal-heading'>HARMONIA STATUS</h2>
          <p className='font-modal-data' data-testid='harmonia-status'>{DirectoryTxmStatus[txmStatus]}</p>
        </div>
        <Button
          handleClick={handleHarmoniaStatusButtonClick}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
          isDisabled={isOnboardingLoading || isOffboardingLoading || (DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.onboarding || DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.offboarding)}
        > {harmoniaStatusButtonAction}
        </Button>
      </section>
    </>
  )
}

export default SingleViewSecondaryMidDetails
