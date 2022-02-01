import type {NextPage} from 'next'
import Image from 'next/image'
import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'
// import Button from 'components/Button'
// import SettingsSvg from 'icons/svgs/settings.svg'
// import SearchSvg from 'icons/svgs/search.svg'
// import TextInputGroup from 'components/TextInputGroup'

const AssetComparatorPage: NextPage = () => {
  return (
    <PageLayout>
      <div className='flex gap-[20px] justify-end'>
        <select>
          <option>Hi</option>
        </select>
        {/* <Button
          handleClick={() => console.log('clicked')}
          buttonSize={Button.buttonSize.MEDIUM_ICON}
          buttonWidth={Button.buttonWidth.AUTO}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
          labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
          svgIcon={<SettingsSvg   height="15px"
          width="15px" viewBox="0  20 15" />}
        > Load Assets
        </Button>
        <Button
          handleClick={() => console.log('clicked')}
          buttonSize={Button.buttonSize.MEDIUM_ICON}
          buttonWidth={Button.buttonWidth.AUTO}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
          labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
        > <SettingsSvg/>Credentials
        </Button>
        <Button
          handleClick={() => console.log('clicked')}
          buttonSize={Button.buttonSize.MEDIUM_ICON}
          buttonWidth={Button.buttonWidth.AUTO}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
          labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
          svgIcon={<SettingsSvg/>}
        > Credentials
        </Button> */}
      </div>

      <ContentTile>
        <div className='grid grid-cols-5 w-full text-center'>
          <span className='grid place-items-center h-[46px] w-full bg-grey-200'></span>
          <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>DEVELOP</h2>
          <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>STAGING</h2>
          <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>SANDBOX</h2>
          <h2 className='grid place-items-center h-[46px] w-full bg-grey-200 font-table-header text-grey-800'>PRODUCTION</h2>
          <p className='col-span-5 mt-[42px] font-subheading-3'>Select a plan above to compare assets</p>
        </div>
        <Image src='/images/bear-m.jpg' width='500' height='500'/>
      </ContentTile>
    </PageLayout>
  )
}

export default AssetComparatorPage

{ /* <div className='flex flex-col items-center gap-4'>
    <h1 className='font-heading-3'>Welcome to the Bink Asset Comparator</h1>
    <p className='font-body-1'>Enter credentials above to compare assets across different environments</p>
  </div> */ }
