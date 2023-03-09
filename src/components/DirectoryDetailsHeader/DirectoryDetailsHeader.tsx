import Image from 'next/image'
import {Button, DirectoryBreadcrumb, OptionsMenuButton} from 'components'
import PlusSvg from 'icons/svgs/plus.svg'
import {ButtonBackground, ButtonWidth, ButtonSize, LabelColour, LabelWeight} from 'components/Button/styles'
import {OptionsMenuItems} from 'types'
import {UserPermissions} from 'utils/enums'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'

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

  const isMobileViewport = useIsMobileViewportDimensions()
  const renderLocationLabel = () => (
    <>
      <div className='flex flex-col ml-[15%]'>
        <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Location Label</p>
      </div>
      <div className='flex flex-col ml-[10%]'>
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
      requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
    ><PlusSvg/>New Merchant
    </Button>
  )

  const renderIconImage = () => (
    <div className={isMobileViewport ? 'ml-[10px]' : 'ml-[40px]'}>
      {/* Icon image div to provide top border shadow */}
      <div className={`flex justify-center rounded-[30px] items-center h-[180px] w-[180px] shadow-md ${isMobileViewport ? 'scale-75 -translate-y-[15px]' : '-translate-y-[50px]'} `} />
      {/* Icon image div container */}
      <div className={`z-20 flex justify-center rounded-[30px] items-center h-[180px] w-[180px] bg-grey-100 dark:bg-[#24242d] ${isMobileViewport ? 'scale-75 -translate-y-[195px]' : '-translate-y-[230px]'} `}>
        {iconUrl ? <Image className='z-40 absolute rounded-[30px]' src={iconUrl} height={165} width={165} alt='' data-testid='icon-image' /> :
          <div data-testid='icon-placeholder' className='flex justify-center items-center rounded-[30px] h-[160px] w-[160px] bg-grey-200 dark:bg-grey-400'>
            <h1 className='font-heading-1 text-grey-900' aria-hidden>{name.charAt(0)}</h1>
          </div>
        }
      </div>
    </div>
  )

  return (
    <>
      <div className={`${!isMobileViewport && 'ml-[245px]'}`}>
        <DirectoryBreadcrumb />
      </div>
      <div className=' flex rounded-[10px]  h-[152px] mt-[15px] pr-[16px] bg-white dark:bg-grey-825 shadow-md w-full'>
        {renderIconImage()}
        <div className='flex justify-between flex-1 pt-[20px] pl-[50px] pb-[32px]'>
          <div>
            <h3 className='font-heading-3 mb-[8px]'>{name}</h3>
            <div className='flex flex-row w-full'>
              <div className='flex flex-col min-w-[74px]'>
                <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Slug</p>
                <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Scheme ID</p>
              </div>
              <div className='flex flex-col ml-[10%]'>
                <p className='font-subheading-3'>{slug}</p>
                <p className='font-subheading-3'>{planId}</p>
              </div>
              { isMerchant && renderLocationLabel()}
            </div>
          </div>

          <div className='flex gap-[22px]'>
            {!isMerchant && renderNewMerchantButton()}
            <div className='w-[36px]'>
              <OptionsMenuButton optionsMenuItems={optionsMenuItems}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DirectoryDetailsHeader
