import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {isAnyVerificationTokenStored} from 'utils/storage'

import {Button, ContentTile, CredentialsModal, PageLayout, PlansList} from 'components'

import SettingsSvg from 'icons/svgs/settings.svg'
import CheckSvg from 'icons/svgs/check.svg'

import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'

import {
  ModalType,
  requestModal,
  selectModal,
} from 'features/modalSlice'

const AssetComparatorPage: NextPage = () => {
  const [isVerified, setIsVerified] = useState(false)
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)

  useEffect(() => {
    setIsVerified(isAnyVerificationTokenStored) // TODO: How likely is a bad/fake/expired token? Should we be checking these tokens are actually valid via the API? If so, best to hide the extra UI that won't work and direct them to verify again.
  }, [modalRequested])

  const handleCredentialsButton = () => {
    dispatch(requestModal('ASSET_COMPARATOR_CREDENTIALS'))
  }

  const renderUnverifiedLanding = () => (
    <div className='mt-[115px] flex flex-col items-center gap-4'>
      <h1 className='font-heading-4'>Welcome to the Bink Asset Comparator</h1>
      <p className='font-subheading-3'>Enter credentials above to compare assets across different environments</p>
    </div>
  )

  const renderVerifiedLanding = () => (
    <div className='grid grid-cols-5 w-full text-center'>
      <span className='col-span-5 grid grid-cols-5 rounded-t-[10px] h-[38px] bg-grey-300'>
        <span></span>
        {['DEVELOP', 'STAGING', 'SANDBOX', 'PRODUCTION'].map(header => (
          <h2 key={header} className='grid place-items-center font-table-header text-grey-800'>{header}</h2>
        ))}
      </span>
      <p className='col-span-5 mt-[42px] font-subheading-3'>Select a plan above to compare assets</p>
    </div>
  )

  return (
    <>
      {modalRequested === 'ASSET_COMPARATOR_CREDENTIALS' && <CredentialsModal />}
      <PageLayout>
        <div className='flex gap-[20px] h-[60px] justify-end'>
          { isVerified &&
          <>
            <PlansList />
            <Button
              handleClick={() => console.log('clicked')}
              buttonSize={Button.buttonSize.MEDIUM_ICON}
              buttonWidth={Button.buttonWidth.AUTO}
              buttonBackground={Button.buttonBackground.BLUE}
              labelColour={Button.labelColour.WHITE}
              labelWeight={Button.labelWeight.MEDIUM}
            > <CheckSvg/>Load Assets
            </Button>
          </>
          }
          <Button
            handleClick={handleCredentialsButton}
            buttonSize={Button.buttonSize.MEDIUM_ICON}
            buttonWidth={Button.buttonWidth.AUTO}
            buttonBackground={Button.buttonBackground.BLUE}
            labelColour={Button.labelColour.WHITE}
            labelWeight={Button.labelWeight.MEDIUM}
          > <SettingsSvg/>Credentials
          </Button>
        </div>

        <ContentTile>
          { isVerified ? renderVerifiedLanding() : renderUnverifiedLanding()}
        </ContentTile>
      </PageLayout>
    </>
  )
}

export default AssetComparatorPage
