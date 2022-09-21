import {useState} from 'react'
import Image from 'next/image'
import {Button} from 'components'

import {ButtonType, ButtonBackground, ButtonWidth, ButtonSize, LabelColour, LabelWeight} from 'components/Button/styles'
import {OptionsMenuItems, PaymentScheme} from 'types'
import {OptionsMenuButton} from 'components'
import {getCountWithCorrectNoun} from 'utils/stringFormat'

type DirectoryTileMetadata = {
  name: string,
  icon_url: string,
  slug?:string,
  plan_id?: number,
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
}

const DirectoryTile = ({metadata, counts, optionsMenuItems, viewClickFn}: Props) => {
  const [imageLoadError, setImageLoadError] = useState(false)

  const {
    name,
    icon_url: iconUrl,
    plan_id: planId,
    location_label: locationLabel,
  } = metadata

  const {
    merchants,
    locations,
    payment_schemes: paymentSchemes,
  } = counts

  const renderChildCount = () => {
    if (planId) { // Determines if this is a plan as opposed to a merchant
      return merchants === 1 ? getCountWithCorrectNoun(locations, 'Location') : `${merchants} Merchants`
    } else {
      return `${locations} ${locationLabel}`
    }
  }

  const renderPaymentSchemeInfo = (paymentScheme: PaymentScheme) => {
    const {label, count} = paymentScheme
    return (
      <div key={label} className='flex flex-col items-center'>
        <p className='font-subheading-4'>{label.toLocaleUpperCase()}</p>
        <p className='font-heading-5'>{count}</p>
      </div>
    )
  }

  const renderIcon = () => {
    if (iconUrl && !imageLoadError) {
      return <Image className='rounded-[30px]' src={iconUrl as string} height={93} width={93} alt='' data-testid='icon'
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
    <div className='relative w-[363px] h-[331px] rounded-[20px] bg-white dark:bg-grey-825 shadow-md'>
      {optionsMenuItems.length > 0 && (
        <div className='absolute top-[17px] right-[60px]'>
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
