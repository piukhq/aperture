import {useRouter} from 'next/router'
import {useMidManagementPsimis} from 'hooks/useMidManagementPsimis'
import {DirectoryPsimi} from 'types'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {isoToDateTime} from 'utils/dateFormat'
import HarmoniaStatus from '../../../HarmoniaStatus'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import {useCallback} from 'react'

type Props = {
  psimi: DirectoryPsimi
}

const SingleViewPsimiDetails = ({psimi}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const {date_added: dateAdded, psimi_metadata: psimiMetadata, txm_status: txmStatus} = psimi
  const {payment_scheme_slug: paymentSchemeSlug} = psimiMetadata

  const {
    getMerchantPsimiRefresh,
    getMerchantPsimiIsFetching: isRefreshing,
    postMerchantPsimiOnboarding: postOnboarding,
    postMerchantPsimiOnboardingIsLoading: isOnboardingLoading,
    postMerchantPsimiOnboardingIsSuccess: isOnboardingSuccess,
    resetPostMerchantPsimiOnboardingResponse: resetOnboardingResponse,
    postMerchantPsimiOffboarding: postOffboarding,
    postMerchantPsimiOffboardingIsLoading: isOffboardingLoading,
    postMerchantPsimiOffboardingIsSuccess: isOffboardingSuccess,
    resetPostMerchantPsimiOffboardingResponse: resetOffboardingResponse,
  } = useMidManagementPsimis({
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

  const handleRefreshButtonClick = useCallback(() => {
    getMerchantPsimiRefresh()
  }, [getMerchantPsimiRefresh])

  return (
    <>
      <div data-testid='psimi-refresh-button' className='flex justify-end'>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
          handleClick={handleRefreshButtonClick}
          ariaLabel='Refresh PSIMI details'
          isDisabled={isRefreshing}
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
      </section>
      <HarmoniaStatus
        txmStatus={txmStatus}
        isOnboardingLoading={isOnboardingLoading}
        isOnboardingSuccess={isOnboardingSuccess}
        isOffboardingLoading={isOffboardingLoading}
        isOffboardingSuccess={isOffboardingSuccess}
        offboardEntityFn={offboardPsimi}
        onboardEntityFn={onboardPsimi}
        isDisabled={isRefreshing}
      />
    </>
  )
}
export default SingleViewPsimiDetails
