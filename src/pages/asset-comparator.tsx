import {useCallback, useEffect, useState} from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import {areAnyVerificationTokensStored} from 'utils/storage'
import {AssetGrid, Button, ContentTile, PageLayout, PlansList} from 'components'
import SettingsSvg from 'icons/svgs/settings.svg'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {
  requestModal,
  selectModal,
} from 'features/modalSlice'
import {getSelectedPlanImages} from 'features/comparatorSlice'
import {SelectedPlanImages} from 'types'
import {ModalType} from 'utils/enums'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const AssetComparatorPage: NextPage = withPageAuthRequired(() => {
  const [isVerified, setIsVerified] = useState(false)
  const [shouldInitialCredentialsModalLaunchOccur, setShouldInitialCredentialsModalLaunchOccur] = useState(true)
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)
  const planAssets: SelectedPlanImages = useAppSelector(getSelectedPlanImages)

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
    if (isVerified) {
      return renderVerifiedLanding()
    } else {
      return renderUnverifiedLanding()
    }
  }

  const renderHeaderTools = () => (
    <>
      { isVerified && <PlansList/>}
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
      <h1 className='font-heading-4'>Welcome to the Bink Asset Comparator</h1>
      <p className='font-subheading-3'>Enter credentials above to compare assets across different environments</p>
    </div>
  )

  const renderVerifiedLanding = () => {
    const determineAssetGridStatus = () => (
      planAssets ? <AssetGrid planAssets={planAssets} /> : <p className='col-span-5 mt-[42px] font-subheading-3'>Select a plan above to compare assets</p>
    )

    return (
      <>
        <div className='grid grid-cols-4 w-full text-center'>
          <span className='col-span-4 grid grid-cols-4 rounded-t-[10px] h-[38px] bg-grey-300'>
            <span></span>
            {['DEVELOPMENT', 'STAGING', 'PRODUCTION'].map(header => (
              <h2 key={header} className='grid place-items-center font-table-header'>{header}</h2>
            ))}
          </span>
        </div>
        {determineAssetGridStatus()}
      </>
    )
  }

  return (
    <PageLayout>
      <Head>
        <title>Aperture - Asset Comparator</title>
        <meta property='og:title' content='Aperture Asset Comparator' key='title'/>
        <meta property='og:description' content='Compare the images for a given plan across environments' key='description' />
      </Head>
      <div data-testid='header' className='flex gap-[20px] h-[40px] justify-end'>
        { renderHeaderTools()}
      </div>

      <ContentTile>
        {determineContentToRender()}
      </ContentTile>
    </PageLayout>
  )
})

export default AssetComparatorPage
