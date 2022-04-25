import Image from 'next/image'
import {useRouter} from 'next/router'
import {Button} from 'components'

import {ButtonType, ButtonBackground, ButtonWidth, ButtonSize, LabelColour, LabelWeight} from 'components/Button/styles'
import {OptionsMenuItems, PaymentScheme} from 'types'
import {OptionsMenuButton} from 'components'

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
  id: string,
  metadata: DirectoryTileMetadata
  counts: DirectoryTileCounts
  optionsMenuItems: OptionsMenuItems
}

const DirectoryTile = ({metadata, counts, id, optionsMenuItems}: Props) => {
  const router = useRouter()


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
      return merchants === 1 ? `${locations} Locations` : `${merchants} Merchants`
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

  return (
    <div className='relative w-[363px] h-[331px] rounded-[20px] bg-white dark:bg-grey-825 shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
      <div className='absolute top-[17px] right-[22px]'>
        <OptionsMenuButton optionsMenuItems={optionsMenuItems}/> {/* TODO: Add conditional to add Merchant menu options when implemented */}
      </div>

      <div className='flex flex-col items-center mt-[28px]'>
        <Image className='rounded-[30px]' src={iconUrl as string} height={93} width={93} alt='' data-testid='icon' />
        <p className='font-heading-5 mt-[5px]'>{name}</p>
        <p className='font-subheading-5 mt-[6px]'>{renderChildCount()}</p>

        <div className='flex mt-[16px] mb-[20px] w-[218px] justify-between'>
          {paymentSchemes.map(scheme => renderPaymentSchemeInfo(scheme))}
        </div>

        <Button
          handleClick={() => router.push(`${router?.asPath}/${id}`)}
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
