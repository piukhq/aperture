import {useRouter} from 'next/router'
import {PaymentSchemeCode, PaymentSchemeStartCaseName} from 'utils/enums'
import {useMidManagementIdentifiers} from 'hooks/useMidManagementIdentifiers'
import {DirectoryIdentifier} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import HarmoniaStatus from '../../../HarmoniaStatus'

type Props = {
  identifier: DirectoryIdentifier
}

const SingleViewIdentifierDetails = ({identifier}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const {date_added: dateAdded, identifier_metadata: identifierMetadata, txm_status: txmStatus} = identifier
  const {payment_scheme_code: paymentSchemeCode} = identifierMetadata

  const {
    postMerchantIdentifierOnboarding: postOnboarding,
    postMerchantIdentifierOnboardingIsLoading: isOnboardingLoading,
    postMerchantIdentifierOnboardingIsSuccess: isOnboardingSuccess,
    resetPostMerchantIdentifierOnboardingResponse: resetOnboardingResponse,
    postMerchantIdentifierOffboarding: postOffboarding,
    postMerchantIdentifierOffboardingIsLoading: isOffboardingLoading,
    postMerchantIdentifierOffboardingIsSuccess: isOffboardingSuccess,
    resetPostMerchantIdentifierOffboardingResponse: resetOffboardingResponse,
  } = useMidManagementIdentifiers({
    skipGetIdentifier: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    identifierRef: ref as string,
  })

  const offboardIdentifier = () => {
    resetOffboardingResponse()
    postOffboarding({
      planRef: planId as string,
      merchantRef: merchantId as string,
      identifierRef: ref as string,
    })
  }
  const onboardIdentifier = () => {
    resetOnboardingResponse()
    postOnboarding({
      planRef: planId as string,
      merchantRef: merchantId as string,
      identifierRef: ref as string,
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
      </section>
      <HarmoniaStatus
        txmStatus={txmStatus}
        isOnboardingLoading={isOnboardingLoading}
        isOnboardingSuccess={isOnboardingSuccess}
        isOffboardingLoading={isOffboardingLoading}
        isOffboardingSuccess={isOffboardingSuccess}
        offboardEntityFn={offboardIdentifier}
        onboardEntityFn={onboardIdentifier}
      />
    </>
  )
}
export default SingleViewIdentifierDetails
