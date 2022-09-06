import {Button} from 'components'
import {useRouter} from 'next/router'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {PaymentSchemeCode, PaymentSchemeStartCaseName, DirectoryTxmStatus} from 'utils/enums'
import {useMidManagementIdentifiers} from 'hooks/useMidManagementIdentifiers'
import {DirectoryIdentifier} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import {useEffect, useState} from 'react'

type Props = {
  identifier: DirectoryIdentifier
}

const SingleViewIdentifierDetails = ({identifier}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const {date_added: dateAdded, identifier_metadata: identifierMetadata, txm_status: txmStatus} = identifier
  const {payment_scheme_code: paymentSchemeCode} = identifierMetadata
  const [harmoniaStatusButtonAction, setHarmoniaStatusButtonAction] = useState('')

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
    planRef: 'planRef',
    merchantRef: 'merchantRef',
    identifierRef: 'identifierRef',
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
    DirectoryTxmStatus[txmStatus] === DirectoryTxmStatus.onboarded ? offboardIdentifier() : onboardIdentifier()
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
export default SingleViewIdentifierDetails
