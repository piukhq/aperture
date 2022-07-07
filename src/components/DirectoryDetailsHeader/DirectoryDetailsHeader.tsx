import Image from 'next/image'
import {Button, DirectoryBreadcrumb, OptionsMenuButton} from 'components'
import PlusSvg from 'icons/svgs/plus.svg'
import {ButtonBackground, ButtonWidth, ButtonSize, LabelColour, LabelWeight} from 'components/Button/styles'
import {OptionsMenuItems} from 'types'

type Props = {
  planId: number,
  name: string,
  iconUrl?: string,
  slug?: string,
  locationLabel?:string,
  isMerchant?: boolean,
  newItemButtonHandler?: () => void
  optionsMenuItems: OptionsMenuItems,
}

const DirectoryDetailsHeader = ({planId, name, iconUrl, slug, isMerchant, locationLabel, newItemButtonHandler, optionsMenuItems}: Props) => {

  const renderLocationLabel = () => (
    <>
      <div className='flex flex-col ml-[91px]'>
        <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Location Label</p>
      </div>
      <div className='flex flex-col ml-[91px]'>
        <p className='font-subheading-3'>{locationLabel}</p>
      </div>
    </>
  )

  const renderNewMerchantButton = () => (
    <Button
      handleClick={newItemButtonHandler}
      buttonSize={ButtonSize.MEDIUM_ICON}
      buttonWidth={ButtonWidth.AUTO}
      buttonBackground={ButtonBackground.BLUE}
      labelColour={LabelColour.WHITE}
      labelWeight={LabelWeight.MEDIUM}
    ><PlusSvg/>New Merchant
    </Button>
  )

  return (
    <>
      <div className='ml-[245px]'>
        <DirectoryBreadcrumb />
      </div>

      <div className='ml-[40px]'>
        {/* Icon image div to provide top border shadow */}
        <div className='absolute top-[50px] flex justify-center rounded-[30px] items-center h-[180px] w-[180px] shadow-md' />

        {/* Icon image div container */}
        <div className='absolute z-20 top-[50px] flex justify-center rounded-[30px] items-center h-[180px] w-[180px] bg-grey-100 dark:bg-[#24242d]'>
          <Image className='z-50 absolute rounded-[30px]' src={iconUrl} height={165} width={165} alt='' data-testid='icon-image' />
        </div>
      </div>

      <div className='relative flex rounded-[10px] pl-[250px] h-[152px] mt-[15px] pr-[16px] bg-white dark:bg-grey-825 shadow-md'>
        <div className='flex justify-between flex-1 pt-[20px] pb-[32px]'>
          <div>
            <h3 className='font-heading-3 mb-[8px]'>{name}</h3>
            <div className='flex flex-row'>
              <div className='flex flex-col min-w-[74px]'>
                <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Slug</p>
                <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Scheme ID</p>
              </div>
              <div className='flex flex-col ml-[91px]'>
                <p className='font-subheading-3'>{slug}</p>
                <p className='font-subheading-3'>{planId}</p>
              </div>
              { isMerchant && renderLocationLabel()}
            </div>
          </div>

          <div className='flex gap-[22px]'>
            {!isMerchant && renderNewMerchantButton()}
            <OptionsMenuButton optionsMenuItems={optionsMenuItems}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DirectoryDetailsHeader
