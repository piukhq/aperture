import {useState} from 'react'
import type {NextPage} from 'next'

import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'
import PlansList from 'components/PlansList'
import Button from 'components/Button'

import SettingsSvg from 'icons/svgs/settings.svg'
import RefreshSvg from 'icons/svgs/refresh.svg'
import CheckSvg from 'icons/svgs/check.svg'

const AssetComparatorPage: NextPage = () => { // TODO: Uses placeholder logic for determining if the user is verified or not. Update when verified and possibly componentise

  const [isVerified, setIsVerified] = useState(false)

  const renderUnverifiedLanding = () => (
    <div className='mt-[50px] flex flex-col items-center gap-4'>
      <h1 className='font-heading-4'>Welcome to the Bink Asset Comparator</h1>
      <p className='font-subheading-3'>Enter credentials above to compare assets across different environments</p>
    </div>
  )

  const renderVerifiedLanding = () => {
    const tableHeadingClasses = 'grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'
    return (
      <div className='grid grid-cols-5 w-full text-center'>
        <span className='grid place-items-center h-[46px] w-full bg-grey-200'></span>
        <h2 className={tableHeadingClasses}>DEVELOP</h2>
        <h2 className={tableHeadingClasses}>STAGING</h2>
        <h2 className={tableHeadingClasses}>SANDBOX</h2>
        <h2 className={tableHeadingClasses}>PRODUCTION</h2>
        <p className='col-span-5 mt-[42px] font-subheading-3'>Select a plan above to compare assets</p>
      </div>
    )
  }

  return (
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
            <Button
              handleClick={() => console.log('clicked')}
              buttonSize={Button.buttonSize.MEDIUM_ICON}
              buttonWidth={Button.buttonWidth.AUTO}
              buttonBackground={Button.buttonBackground.BLUE}
              labelColour={Button.labelColour.WHITE}
              labelWeight={Button.labelWeight.MEDIUM}
            > <RefreshSvg/>Refresh
            </Button>
          </>
        }
        <Button
          handleClick={() => setIsVerified(!isVerified)} // Placeholder validation switch
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
  )
}

export default AssetComparatorPage
