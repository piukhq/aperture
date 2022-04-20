import Image from 'next/image'
import {useRouter} from 'next/router'
import {Button} from 'components'

import {ButtonType, ButtonBackground, ButtonWidth, ButtonSize, LabelColour, LabelWeight} from 'components/Button/styles'
import {PaymentScheme} from 'types'
import {OptionsMenuButton, OptionsMenuItem} from 'components'
import AddSvg from 'icons/svgs/plus-filled.svg'
import EditSvg from 'icons/svgs/project.svg'
import OffboardSvg from 'icons/svgs/close-square.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'

import {setSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'


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
}

const DirectoryTile = ({metadata, counts, id}: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    name,
    icon_url,
    plan_id,
    slug,
    location_label: locationLabel,
  } = metadata

  const {
    merchants,
    locations,
    payment_schemes: paymentSchemes,
  } = counts

  const renderChildCount = () => {
    if (plan_id) { // Determines if this is a plan as opposed to a merchant
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

  const requestEditPlanModal = () => { // TEMP WITHOUT OPTIONS MENU
    dispatch(setSelectedDirectoryPlan({
      plan_ref: id,
      plan_metadata: {
        name,
        icon_url,
        plan_id,
        slug,
      },
      plan_counts: {
        merchants,
        locations,
        payment_schemes: counts.payment_schemes,
      },
    }))
    dispatch(requestModal('MID_MANAGEMENT_DIRECTORY_PLAN'))
  }

  return (
    <div className='relative w-[363px] h-[331px] rounded-[20px] bg-white dark:bg-grey-825 shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
      <div className='absolute top-[17px] right-[22px]'>
        <OptionsMenuButton> {/* TODO: Add conditional to add Merchant menu options when implemented */}
          <OptionsMenuItem handleClick={() => console.log('Add Merchant Menu Item clicked')} icon={<AddSvg/>} label='Add Merchant'/>
          <OptionsMenuItem handleClick={requestEditPlanModal} icon={<EditSvg/>} label='Edit'/>
          <OptionsMenuItem handleClick={() => console.log('Offboard from Harmonia Menu Item clicked')} icon={<OffboardSvg/>} label='Offboard from Harmonia'/>
          <OptionsMenuItem handleClick={() => console.log('Delete Menu Item clicked')} icon={<DeleteSvg/>} isRed label='Delete'/>
        </OptionsMenuButton>

      </div>

      <div className='flex flex-col items-center mt-[28px]'>
        <Image className='rounded-[30px]' src={icon_url as string} height={93} width={93} alt='' data-testid='icon' />
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
