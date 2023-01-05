import {useCallback, useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {areMultipleVerificationTokensStored} from 'utils/storage'
import {Button, ContentTile, PageLayout, PlanComparator, PlansList} from 'components'
import SettingsSvg from 'icons/svgs/settings.svg'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {
  requestModal,
  selectModal,
} from 'features/modalSlice'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {getSelectedPlans} from 'features/comparatorSlice'
import {SelectedPlans} from 'types'
import {ModalType} from 'utils/enums'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'

const PlanComparatorPage: NextPage = withPageAuthRequired(() => {
  const [isVerified, setIsVerified] = useState(false)
  const [shouldInitialCredentialsModalLaunchOccur, setShouldInitialCredentialsModalLaunchOccur] = useState(true)
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)
  const plans: SelectedPlans = useAppSelector(getSelectedPlans)

  const handleRequestCredentialsModal = useCallback(() => { dispatch(requestModal(ModalType.COMPARATOR_CREDENTIALS)) }, [dispatch])

  useEffect(() => {
    setIsVerified(areMultipleVerificationTokensStored)
  }, [modalRequested, plans])

  useEffect(() => {
    const hasMultipleTokens = areMultipleVerificationTokensStored()
    if (!hasMultipleTokens && shouldInitialCredentialsModalLaunchOccur) {
      handleRequestCredentialsModal()
    }
    setShouldInitialCredentialsModalLaunchOccur(false)
    setIsVerified(hasMultipleTokens)
  }, [modalRequested, handleRequestCredentialsModal, shouldInitialCredentialsModalLaunchOccur, plans])

  const determineContentToRender = () => {
    if (isVerified) {
      return renderVerifiedLanding()
    } else {
      return renderUnverifiedLanding()
    }
  }

  const renderHeaderTools = () => (
    <>
      { isVerified && <PlansList isUsedByPlanComparator/>}
      <Button
        handleClick={handleRequestCredentialsModal}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.MEDIUM}
      ><SettingsSvg/>Credentials
      </Button>
    </>
  )

  const renderUnverifiedLanding = () => (
    <div data-testid='unverified-landing-copy' className='mt-[115px] flex flex-col items-center text-center gap-4'>
      <h1 className='font-heading-4'>Welcome to the Bink Plan Comparator</h1>
      <p className='font-subheading-3'>Enter credentials above to log in to <strong>multiple environments</strong> to compare plans</p>
    </div>
  )


  const renderVerifiedLanding = () => (
    plans.dev || plans.staging || plans.prod ? <PlanComparator plans={plans} /> : <p className='col-span-5 mt-[42px] font-subheading-3'>Select a plan above to compare</p>
  )


  return (
    <>
      <PageLayout>
        <div data-testid='header' className='flex gap-[20px] h-[40px] justify-end'>
          {renderHeaderTools()}
        </div>
        <ContentTile>
          {determineContentToRender()}
        </ContentTile>
      </PageLayout>
    </>
  )
})

export default PlanComparatorPage
