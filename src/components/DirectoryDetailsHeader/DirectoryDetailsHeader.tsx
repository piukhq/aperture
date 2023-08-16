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
  iconUrl?: string | null,
  slug?: string,
  locationLabel?:string,
  isMerchant?: boolean,
  newItemButtonHandler?: () => void
  optionsMenuItems: OptionsMenuItems,
}

const DirectoryDetailsHeader = ({planId, name, iconUrl, slug, isMerchant, locationLabel, newItemButtonHandler, optionsMenuItems}: Props) => {

  const isMobileViewport = useIsMobileViewportDimensions()

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
    <div className='ml-[10px]'>
      {/* Icon image div to provide top border shadow */}
      <div className={'flex justify-center rounded-[30px] items-center h-[180px] w-[180px] shadow-md translate-y-[50px]'} />
      {/* Icon image div container */}
      <div className={'z-20 flex justify-center rounded-[30px] items-center h-[180px] w-[180px] bg-grey-100 dark:bg-[#24242d] -translate-y-[130px]'}>
        {iconUrl ? <Image className='z-40 absolute rounded-[30px]' src={iconUrl} height={165} width={165} alt='' data-testid='icon-image' /> :
          <div data-testid='icon-placeholder' className='flex justify-center items-center rounded-[30px] h-[160px] w-[160px] bg-grey-200 dark:bg-grey-400'>
            <h1 className='font-heading-1 text-grey-900' aria-hidden>{name.charAt(0)}</h1>
          </div>
        }
      </div>
    </div>
  )

  const renderLocationLabel = () => (
    <>
      <p className='font-subheading-5 text-grey-600 dark:text-grey-500 max-w-[100px]'>Location Label</p>
      <p className='font-subheading-3'>{locationLabel}</p>
    </>
  )

  return (
    <div className={`${isMobileViewport ? 'min-w-[580px]' : 'min-w-[720px]'} sticky top-0 bg-grey-200 dark:bg-grey-900 pt-2 z-30`}>
      <div className={`${!isMobileViewport && 'ml-[225px]'}`}>
        <DirectoryBreadcrumb />
      </div>
      <div className=' flex rounded-[10px] items-center h-[152px] mt-[15px] px-[16px] bg-white dark:bg-grey-825 shadow-md'>
        {!isMobileViewport && renderIconImage()}
        <div className={`flex justify-between flex-1 pt-[20px] pb-[32px] ${!isMobileViewport && 'pl-[40px]'}`}>
          <div className='w-full'>
            <h3 className={'font-heading-4 mb-[8px] mr-4'}>{name}</h3>
            <div className='flex flex-row w-full gap-6'>
              <div className='flex flex-col'>
                <div className='flex'>
                  <p className='font-subheading-5 text-grey-600 dark:text-grey-500 w-[100px]'>Slug</p>
                  <p className='font-subheading-3 w-[120px]'>{slug}</p>
                </div>
                <div className='flex'>
                  <p className='font-subheading-5 text-grey-600 dark:text-grey-500 w-[100px]'>Scheme ID</p>
                  <p className='font-subheading-3 w-[120px]'>{planId}</p>
                </div>
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
    </div>
  )
}

export default DirectoryDetailsHeader
