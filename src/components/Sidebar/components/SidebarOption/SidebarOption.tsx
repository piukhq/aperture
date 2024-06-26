import Link from 'next/link'
import AssetComparatorIcon from 'icons/svgs/asset-comparator.svg'
import PlanComparatorIcon from 'icons/svgs/plan-comparator.svg'
import MidManagementIcon from 'icons/svgs/mid-management.svg'
import CustomerWalletsIcon from 'icons/svgs/customer-wallets.svg'
import BankViewportIcon from 'icons/svgs/bank-viewport.svg'
import StyleGuideIcon from 'icons/svgs/write.svg'
import {RouteDisplayNames} from 'utils/enums'

type Props = {
  option: string,
  selected: boolean
}

const SidebarOption = ({option, selected}: Props) => {
  let Icon
  if (option === 'asset-comparator') {
    Icon = AssetComparatorIcon
  } else if (option === 'plan-comparator') {
    Icon = PlanComparatorIcon
  } else if (option === 'mid-management') {
    Icon = MidManagementIcon
  } else if (option === 'customer-wallets') {
    Icon = CustomerWalletsIcon
  } else if (option === 'style-guide') {
    Icon = StyleGuideIcon
  } else if (option === 'bank-viewport') {
    Icon = BankViewportIcon
  }

  const displayName = RouteDisplayNames[option]

  // TODO Remove this when customer-wallets is ready
  if (option === 'customer-wallets') {
    return null
  }

  return (
    <div className='h-[52px] flex my-1'>
      <Link href={`/${option}`} passHref>
        <div className='flex w-full items-center'>
          <div className={`w-[3px] h-[32px] mr-[17px] rounded-tr-[100px] rounded-br-[100px] ${selected ? 'bg-blue' : ''}`} />
          <Icon className={`w-[25px] h-[25px] ${selected ? 'fill-blue' : 'fill-grey-900 dark:fill-grey-400'}`} />
          <p className={`font-heading-7 ml-[14px] ${selected ? 'text-blue' : 'text-grey-950 dark:text-grey-400 hover:text-grey-600 duration-200'}`}>{displayName?.toLocaleUpperCase() }</p>
        </div>
      </Link>
    </div>
  )
}


export default SidebarOption
