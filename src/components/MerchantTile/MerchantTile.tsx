import Image from 'next/image'
import {Button} from 'components'
import DotsSvg from 'icons/svgs/dots.svg'
import {ButtonType, ButtonBackground, ButtonWidth, ButtonSize, BorderColour, LabelColour, LabelWeight} from 'components/Button/styles'
import {Merchant, PaymentScheme} from 'types'
import {capitalizeFirstLetter} from 'utils/stringFormat'

type Props = {
  merchant: Merchant,
}

const MerchantTile = ({merchant}: Props) => {
  const {
    name,
    payment_schemes: paymentSchemes,
    icon_url: iconUrl,
    total_locations: totalLocation,
    location_label: locationLabel,
  } = merchant

  const pluralLocationsLabel = `${locationLabel}s`

  const renderPaymentSchemeInfo = (paymentScheme: PaymentScheme) => {
    const {label, count} = paymentScheme

    return (
      <div key={label} className='flex flex-col items-center'>
        <p className='font-subheading-4'>{label.toLocaleUpperCase()}</p>
        <p className='font-heading-5'>{count}</p>
      </div>
    ) }

  return (
    <div className='relative w-[310px] h-[331px] rounded-[20px] bg-white dark:bg-grey-825'>
      <div className='absolute top-[17px] right-[22px]'>
        <Button
          handleClick={() => console.log('Edit merchant button clicked')}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.ICON_ONLY}
          borderColour={BorderColour.GREY}
          ariaLabel='Edit Merchant'
        ><DotsSvg/></Button>
      </div>

      <div className='flex flex-col items-center mt-[28px]'>
        <Image className='rounded-[30px]' src={iconUrl} height={93} width={93} alt='' />
        <p className='font-heading-5 mt-[5px]'>{name}</p>
        <p className='font-subheading-5 mt-[6px]'>{totalLocation} {pluralLocationsLabel}</p>

        <div className='flex mt-[16px] mb-[20px] w-[218px] justify-between'>
          {paymentSchemes.map(scheme => renderPaymentSchemeInfo(scheme))}
        </div>

        <Button
          handleClick={() => console.log('View merchant stores button clicked')}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.LARGE}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
          ariaLabel={`View merchant ${pluralLocationsLabel}`}
        >View {capitalizeFirstLetter(pluralLocationsLabel)}</Button>
      </div>
    </div>
  )
}

export default MerchantTile
