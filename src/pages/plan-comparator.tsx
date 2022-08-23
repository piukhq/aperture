import {useCallback, useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {areAnyVerificationTokensStored} from 'utils/storage'
import {useIsDesktopViewportDimensions} from 'utils/windowDimensions'
import {AssetModal, Button, ContentTile, CredentialsModal, PageLayout, PlanComparator, PlansList} from 'components'
import {useGetPlans} from 'hooks/useGetPlans'
import SettingsSvg from 'icons/svgs/settings.svg'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {
  requestModal,
  selectModal,
} from 'features/modalSlice'
import {getSelectedPlans} from 'features/comparatorSlice'
import {SelectedPlans} from 'types'
import {ModalType} from 'utils/enums'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'

const AssetComparatorPage: NextPage = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [shouldInitialCredentialsModalLaunchOccur, setShouldInitialCredentialsModalLaunchOccur] = useState(true)
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)
  const plans: SelectedPlans = useAppSelector(getSelectedPlans)
  const isDesktopViewportDimensions = useIsDesktopViewportDimensions()

  const {resetDevPlans, resetStagingPlans, resetProdPlans} = useGetPlans()

  const handleRequestCredentialsModal = useCallback(() => { dispatch(requestModal(ModalType.ASSET_COMPARATOR_CREDENTIALS)) }, [dispatch])

  useEffect(() => {
    setIsVerified(areAnyVerificationTokensStored)
  }, [modalRequested])

  useEffect(() => {
    const hasTokens = areAnyVerificationTokensStored()
    if (!hasTokens && shouldInitialCredentialsModalLaunchOccur) {
      handleRequestCredentialsModal()
    }
    setShouldInitialCredentialsModalLaunchOccur(false)
    setIsVerified(hasTokens)
  }, [modalRequested, handleRequestCredentialsModal, shouldInitialCredentialsModalLaunchOccur])

  const determineContentToRender = () => {
    if (!isDesktopViewportDimensions) {
      return renderSmallViewportCopy()
    } else if (isVerified) {
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

  const renderSmallViewportCopy = () => (
    <div data-testid='small-viewport-copy' className='mt-[75px] flex flex-col items-center gap-6 text-left w-3/5'>
      <h1 className='font-heading-4 w-full'>Viewport too small</h1>
      <p className='font-subheading-3 w-full'>To use the Plan comparator your browser window must be a minimum width of 1000px.</p>
      <p className='font-subheading-3 w-full'>Increase the size of your browser window to continue</p>
    </div>
  )

  const renderUnverifiedLanding = () => (
    <div data-testid='unverified-landing-copy' className='mt-[115px] flex flex-col items-center text-center gap-4'>
      <h1 className='font-heading-4'>Welcome to the Bink Plan Comparator</h1>
      <p className='font-subheading-3'>Enter credentials above to compare assets across different environments</p>
    </div>
  )

  const renderVerifiedLanding = () => (
    plans ? <PlanComparator plans={plans} /> : <p className='col-span-5 mt-[42px] font-subheading-3'>Select a plan above to compare</p>
  )

  const handleTokenRemoval = (envKey: string) => {
    if (envKey === 'DEV') {
      resetDevPlans()
    } else if (envKey === 'STAGING') {
      resetStagingPlans()
    } else if (envKey === 'PROD') {
      resetProdPlans()
    }
  }

  return (
    <>
      {modalRequested === ModalType.ASSET_COMPARATOR_CREDENTIALS && <CredentialsModal removeTokenHandler={handleTokenRemoval} />}
      {modalRequested === ModalType.ASSET_COMPARATOR_ASSET && <AssetModal />}
      <PageLayout>
        <div data-testid='header' className='flex gap-[20px] h-[40px] justify-end'>
          { isDesktopViewportDimensions && renderHeaderTools()}
        </div>
        <ContentTile>
          {determineContentToRender()}
        </ContentTile>
      </PageLayout>
    </>
  )
}

export default AssetComparatorPage
