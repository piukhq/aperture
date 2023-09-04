import {useState} from 'react'
import Image from 'next/image'
import {Button} from 'components'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {ButtonType, ButtonBackground, ButtonWidth, ButtonSize, LabelColour, LabelWeight} from 'components/Button/styles'
import {OptionsMenuItems, PaymentScheme} from 'types'
import {OptionsMenuButton} from 'components'
import {getCountWithCorrectNoun} from 'utils/stringFormat'

type DirectoryTileMetadata = {
  name: string,
  icon_url: string | null,
  slug?:string,
  plan_id?: number | null,
  location_label?: string
}

type DirectoryTileCounts = {
  merchants?: number,
  locations: number,
  payment_schemes: Array<PaymentScheme>,
}

type Props = {
  metadata: DirectoryTileMetadata
  counts: DirectoryTileCounts
  optionsMenuItems: OptionsMenuItems
  viewClickFn: VoidFunction
  isMerchant?: boolean
}

const DirectoryTile = ({metadata, counts, optionsMenuItems, viewClickFn, isMerchant}: Props) => {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false)
  const isMobileViewport = useIsMobileViewportDimensions()

  const {
    name,
    icon_url: iconUrl,
    location_label: locationLabel,
  } = metadata

  const {
    merchants,
    locations,
    payment_schemes: paymentSchemes,
  } = counts

  const renderChildCount = () => {
    if (isMerchant) {
      return `${locations} ${locationLabel ? locationLabel : 'Locations'}`
    } else {
      return (
        <>
          <p className='font-subheading-5 w-full text-center'>{getCountWithCorrectNoun(merchants || 0, 'Merchant')}</p>
          <p className='font-subheading-5 w-full text-center'>{getCountWithCorrectNoun(locations, 'Location')}</p>
        </>
      )
    }
  }

  const renderPaymentSchemeInfo = (paymentScheme: PaymentScheme) => {
    // The data below can come from plan or merchant which provide this data slightly differently hence the weird logic
    const {slug, count, mids = 0, secondary_mids = 0, psimis = 0} = paymentScheme
    const countToRender = mids + secondary_mids + psimis || count || 0

    return (
      <div key={slug + name} className='flex flex-col items-center'>
        <p className='font-subheading-4'>{slug?.toLocaleUpperCase()}</p>
        <p className='font-heading-5'>{countToRender}</p>
      </div>
    )
  }

  const renderIcon = () => {
    if (iconUrl && !imageLoadError) {
      return <Image className='rounded-[30px]' src={iconUrl} height={93} width={93} alt='' data-testid='icon'
        onError={() => setImageLoadError(true)}
      />
    }
    return (
      <div data-testid='icon-placeholder' className='flex justify-center items-center rounded-[30px] h-[93px] w-[93px] bg-grey-200'>
        <h1 className='font-heading-1 text-black'>{name.charAt(0)}</h1>
      </div>
    )
  }

  return (
    <div className={`relative h-[350px] rounded-[20px] bg-white dark:bg-grey-825 shadow-md ${!isMobileViewport ? 'w-[330px]' : 'w-[270px]'}`}>
      {optionsMenuItems.length > 0 && (
        <div className='absolute top-[17px] right-[20px]'>
          <OptionsMenuButton optionsMenuItems={optionsMenuItems}/>
        </div>
      )}

      <div className='flex flex-col items-center mt-[28px]'>
        {renderIcon()}
        <p className='font-heading-5 mt-[5px]'>{name}</p>
        <p className='font-subheading-5 mt-[6px]'>{renderChildCount()}</p>

        <div className='flex mt-[16px] mb-[20px] w-[218px] justify-between'>
          {paymentSchemes.map(scheme => renderPaymentSchemeInfo(scheme))}
        </div>

        <Button
          handleClick={viewClickFn}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.LARGE}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
          ariaLabel='View'
        >View</Button>
      </div>
    </div>
  )
}

export default DirectoryTile
