import {useState, useMemo} from 'react'
import {Dropdown} from 'components'
import {useRouter} from 'next/router'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {PaymentSchemeCode, PaymentSchemeStartCaseName} from 'utils/enums'
import {DirectorySecondaryMid} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import HarmoniaStatus from '../../../HarmoniaStatus'

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
    planRef: planId as string,
    merchantRef: merchantId as string,
    secondaryMidRef: ref as string,
  })

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
        <div className='flex flex-col h-[50px] pl-[15px]'>
          <label className='font-modal-heading'>PAYMENT SCHEME STATUS</label>
          <Dropdown displayValue={paymentSchemeStatus} displayValues={paymentSchemeStatusValues} onChangeDisplayValue={setPaymentSchemeStatus} />
        </div>
      </section>
      <HarmoniaStatus
        txmStatus={txmStatus}
        isOnboardingLoading={isOnboardingLoading}
        isOnboardingSuccess={isOnboardingSuccess}
        isOffboardingLoading={isOffboardingLoading}
        isOffboardingSuccess={isOffboardingSuccess}
        offboardEntityFn={offboardSecondaryMid}
        onboardEntityFn={onboardSecondaryMid}
      />
    </>
  )
}

export default SingleViewSecondaryMidDetails
