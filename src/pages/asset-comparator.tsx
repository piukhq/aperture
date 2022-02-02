import type {NextPage} from 'next'
import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'
import Button from 'components/Button'
import SettingsSvg from 'icons/svgs/settings.svg'

const AssetComparatorPage: NextPage = () => {
  return (
    <PageLayout>
      <div className='flex justify-end'>
        <Button
          handleClick={() => console.log('clicked')}
          buttonSize={Button.buttonSize.MEDIUM_ICON}
          buttonWidth={Button.buttonWidth.AUTO}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
          labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
        > <SettingsSvg/>Credentials
        </Button>
      </div>

      <ContentTile>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='font-heading-3'>Welcome to the Bink Asset Comparator</h1>
          <p className='font-body-1'>Enter credentials above to compare assets across different environments</p>
        </div>
      </ContentTile>
    </PageLayout>
  )
}

export default AssetComparatorPage
