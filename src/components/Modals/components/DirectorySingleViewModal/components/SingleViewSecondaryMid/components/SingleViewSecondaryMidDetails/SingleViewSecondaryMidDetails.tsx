import {useState, useMemo, useCallback} from 'react'
import {useRouter} from 'next/router'
import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'

import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {DirectorySecondaryMid} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import HarmoniaStatus from '../../../HarmoniaStatus'
import {capitaliseFirstLetter} from 'utils/stringFormat'

type Props = {
  secondaryMid: DirectorySecondaryMid
}

const SingleViewSecondaryMidDetails = ({secondaryMid}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const paymentSchemeStatusValues = useMemo(() => ['Enrolled', 'Enrolling', 'Not enrolled', 'Removed'], [])
  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState('Not enrolled')

  const {date_added: dateAdded, secondary_mid_metadata: secondaryMidMetadata, txm_status: txmStatus} = secondaryMid
  const {payment_scheme_slug: paymentSchemeSlug} = secondaryMidMetadata

  const {
    getMerchantSecondaryMidRefresh,
    getMerchantSecondaryMidIsFetching: isRefreshing,
    postMerchantSecondaryMidOnboarding: postOnboarding,
    postMerchantSecondaryMidOnboardingIsLoading: isOnboardingLoading,
    postMerchantSecondaryMidOnboardingIsSuccess: isOnboardingSuccess,
    resetPostMerchantSecondaryMidOnboardingResponse: resetOnboardingResponse,
    postMerchantSecondaryMidOffboarding: postOffboarding,
    postMerchantSecondaryMidOffboardingIsLoading: isOffboardingLoading,
    postMerchantSecondaryMidOffboardingIsSuccess: isOffboardingSuccess,
    resetPostMerchantSecondaryMidOffboardingResponse: resetOffboardingResponse,
  } = useMidManagementSecondaryMids({
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

  const handleRefreshButtonClick = useCallback(() => {
    getMerchantSecondaryMidRefresh()
  }, [getMerchantSecondaryMidRefresh])


  return (
    <>
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
              onChangeDisplayValue={setPaymentSchemeStatus}
              isDisabled={isRefreshing}
              selectedValueStyles='font-normal text-grey-600' />
          </div>
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
        isDisabled={isRefreshing}
      />
    </>
  )
}

export default SingleViewSecondaryMidDetails
