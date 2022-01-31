import type {NextPage} from 'next'
import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'
import {Body1Regular, Heading3} from 'components/elements/Text'
import Button from 'components/elements/Button'
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
          svgIcon={<SettingsSvg/>}
        > Credentials
        </Button>
      </div>

      <ContentTile>
        <div className='flex flex-col items-center gap-4'>
          <Heading3>Welcome to the Bink Asset Comparator</Heading3>
          <Body1Regular>Enter credentials above to compare assets across different environments</Body1Regular>
        </div>
      </ContentTile>
    </PageLayout>
  )
}

export default AssetComparatorPage
