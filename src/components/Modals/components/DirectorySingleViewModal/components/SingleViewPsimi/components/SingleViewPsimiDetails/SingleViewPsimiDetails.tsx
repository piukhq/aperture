import {useRouter} from 'next/router'
import {useMidManagementPsimis} from 'hooks/useMidManagementPsimis'
import {DirectoryPsimi} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import HarmoniaStatus from '../../../HarmoniaStatus'
import {capitaliseFirstLetter} from 'utils/stringFormat'

type Props = {
  psimi: DirectoryPsimi
}

const SingleViewPsimiDetails = ({psimi}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const {date_added: dateAdded, psimi_metadata: psimiMetadata, txm_status: txmStatus} = psimi
  const {payment_scheme_slug: paymentSchemeSlug} = psimiMetadata

  const {
    postMerchantPsimiOnboarding: postOnboarding,
    postMerchantPsimiOnboardingIsLoading: isOnboardingLoading,
    postMerchantPsimiOnboardingIsSuccess: isOnboardingSuccess,
    resetPostMerchantPsimiOnboardingResponse: resetOnboardingResponse,
    postMerchantPsimiOffboarding: postOffboarding,
    postMerchantPsimiOffboardingIsLoading: isOffboardingLoading,
    postMerchantPsimiOffboardingIsSuccess: isOffboardingSuccess,
    resetPostMerchantPsimiOffboardingResponse: resetOffboardingResponse,
  } = useMidManagementPsimis({
    skipGetPsimi: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    psimiRef: ref as string,
  })

  const offboardPsimi = () => {
    resetOffboardingResponse()
    postOffboarding({
      planRef: planId as string,
      merchantRef: merchantId as string,
      psimiRef: ref as string,
    })
  }
  const onboardPsimi = () => {
    resetOnboardingResponse()
    postOnboarding({
      planRef: planId as string,
      merchantRef: merchantId as string,
      psimiRef: ref as string,
    })
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
          <p className='font-modal-data'>{capitaliseFirstLetter(paymentSchemeSlug)}</p>
        </div>
      </section>
      <HarmoniaStatus
        txmStatus={txmStatus}
        isOnboardingLoading={isOnboardingLoading}
        isOnboardingSuccess={isOnboardingSuccess}
        isOffboardingLoading={isOffboardingLoading}
        isOffboardingSuccess={isOffboardingSuccess}
        offboardEntityFn={offboardPsimi}
        onboardEntityFn={onboardPsimi}
      />
    </>
  )
}
export default SingleViewPsimiDetails
