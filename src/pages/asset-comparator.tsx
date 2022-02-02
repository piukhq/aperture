import {useState} from 'react'
import type {NextPage} from 'next'

import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'
import PlansList from 'components/PlansList'
import Button from 'components/Button'

import SettingsSvg from 'icons/svgs/settings.svg'
import RefreshSvg from 'icons/svgs/refresh.svg'
import CheckSvg from 'icons/svgs/check.svg'

const AssetComparatorPage: NextPage = () => { // Uses placeholder logic for determining if the user is validated or not.

  const [isValidated, setIsValidated] = useState(false)

  const renderValidatedLanding = () => (
    <div className='grid grid-cols-5 w-full text-center'>
      <span className='grid place-items-center h-[46px] w-full bg-grey-200'></span>
      <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>DEVELOP</h2>
      <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>STAGING</h2>
      <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>SANDBOX</h2>
      <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>PRODUCTION</h2>
      <p className='col-span-5 mt-[42px] font-subheading-3'>Select a plan above to compare assets</p>
    </div>
  )

  const renderNonValidatedLanding = () => (
    <div className='mt-[50px] flex flex-col items-center gap-4'>
      <h1 className='font-heading-4'>Welcome to the Bink Asset Comparator</h1>
      <p className='font-subheading-3'>Enter credentials above to compare assets across different environments</p>
    </div>
  )

  return (
    <PageLayout>
      <div className='flex gap-[20px] h-[60px] justify-end'>
        { isValidated &&
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
          handleClick={() => setIsValidated(!isValidated)} // Placeholder validation switch
          buttonSize={Button.buttonSize.MEDIUM_ICON}
          buttonWidth={Button.buttonWidth.AUTO}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
          labelWeight={Button.labelWeight.MEDIUM}
        > <SettingsSvg/>Credentials
        </Button>
      </div>

      <ContentTile>
        { isValidated ? renderValidatedLanding() : renderNonValidatedLanding()}
      </ContentTile>
    </PageLayout>
  )
}

export default AssetComparatorPage
