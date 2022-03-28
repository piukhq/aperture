import Link from 'next/link'
import AssetComparatorIcon from 'icons/svgs/asset-comparator.svg'
import PlanComparatorIcon from 'icons/svgs/plan-comparator.svg'
import MidManagementIcon from 'icons/svgs/mid-management.svg'
import CustomerWalletsIcon from 'icons/svgs/customer-wallets.svg'
import StyleGuideIcon from 'icons/svgs/write.svg'

type Props = {
  option: string,
  selected: boolean
}

const SidebarOption = ({option, selected}: Props) => {
  let displayName, Icon

  if (option === 'asset-comparator') {
    displayName = 'Asset Comparator'
    Icon = AssetComparatorIcon
  } else if (option === 'plan-comparator') {
    displayName = 'Plan Comparator'
    Icon = PlanComparatorIcon
  } else if (option === 'mids') {
    displayName = 'MID Management'
    Icon = MidManagementIcon
  } else if (option === 'customer-wallets') {
    displayName = 'Customer Wallets'
    Icon = CustomerWalletsIcon
  } else if (option === 'style-guide') {
    displayName = 'Style Guide'
    Icon = StyleGuideIcon
  }

  return (
    <div className='h-[52px] flex'>
      <Link href={`/${option}`}>
        <a className='flex w-full items-center'>
          <div className={`w-[3px] h-[32px] mr-[17px] rounded-tr-[100px] rounded-br-[100px] ${selected ? 'bg-blue' : ''}`} />
          <Icon className={`w-[25px] h-[25px] ${selected ? 'fill-blue' : 'fill-grey-900 dark:fill-grey-400'}`} />
          <p className={`font-header ml-[24px] text-[14px] font-semibold ${selected ? 'text-blue' : 'text-grey-950 dark:text-grey-400'}`}>{displayName}</p>
        </a>
      </Link>
    </div>
  )
}


export default SidebarOption
