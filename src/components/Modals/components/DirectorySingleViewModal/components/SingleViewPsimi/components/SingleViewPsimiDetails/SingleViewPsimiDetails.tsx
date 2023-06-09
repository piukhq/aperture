import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import {DirectoryPsimi} from 'types'
import {Button, HeadMetadata} from 'components'
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
  const {merchantId, planId, ref} = useGetRouterQueryString()
  const {date_added: dateAdded, psimi_metadata: psimiMetadata, txm_status: txmStatus} = psimi
  const {payment_scheme_slug: paymentSchemeSlug, value: psimiValue} = psimiMetadata

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
  } = useDirectoryPsimis({
    planRef: planId,
    merchantRef: merchantId,
    psimiRef: ref,
    skipGetPsimisByPage: true,
  })

  const offboardPsimi = () => {
    resetOffboardingResponse()
    postOffboarding({
      planRef: planId,
      merchantRef: merchantId,
      psimiRef: ref,
    })
  }
  const onboardPsimi = () => {
    resetOnboardingResponse()
    postOnboarding({
      planRef: planId,
      merchantRef: merchantId,
      psimiRef: ref,
    })
  }

  const handleRefreshButtonClick = useCallback(() => {
    getMerchantPsimiRefresh()
  }, [getMerchantPsimiRefresh])

  return (
    <>
      <HeadMetadata pageTitle={`MID Directory - PSIMI: ${psimiValue}`} pageDescription={`View this ${paymentSchemeSlug} PSIMI in the MID Directory`} />
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
