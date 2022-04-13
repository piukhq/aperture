import Image from 'next/image'
import {useRouter} from 'next/router'
import {Button} from 'components'
import DotsSvg from 'icons/svgs/dots.svg'
import {ButtonType, ButtonBackground, ButtonWidth, ButtonSize, BorderColour, LabelColour, LabelWeight} from 'components/Button/styles'
import {PaymentScheme} from 'types'

type Props = {
  id: string,
  metadata: Record<string, string | number>,
  counts: Record<string, Array<PaymentScheme> | number>
}

const DirectoryTile = ({metadata, counts, id}: Props) => {
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
    if (planId) { // Determines if plan or merchant
      return merchants === 1 ? `${locations} Locations` : `${merchants} Merchants`
    } else {
      return `${locations} ${locationLabel}s`
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
        <Button
          handleClick={() => console.log('More Options button clicked')}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.ICON_ONLY}
          borderColour={BorderColour.GREY}
          ariaLabel='Options'
        ><DotsSvg/></Button>
      </div>

      <div className='flex flex-col items-center mt-[28px]'>
        <Image className='rounded-[30px]' src={iconUrl as string} height={93} width={93} alt='' data-testid='icon' />
        <p className='font-heading-5 mt-[5px]'>{name}</p>
        <p className='font-subheading-5 mt-[6px]'>{renderChildCount()}</p>

        <div className='flex mt-[16px] mb-[20px] w-[218px] justify-between'>
          {paymentSchemes instanceof Array && paymentSchemes.map(scheme => renderPaymentSchemeInfo(scheme))}
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
