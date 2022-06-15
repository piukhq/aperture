import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import Image from 'next/image'
import {ReactNode} from 'react'
import {LoyaltyCard, Plan} from 'types'

type Props = {
  card: LoyaltyCard
  getStatusFn: (status: string) => ReactNode
  plan: Plan
}

const LoyaltyCard = ({getStatusFn, card, plan}:Props) => {

  const isPllCard = plan.feature_set.card_type === 2
  const {id, status, images} = card

  const renderLoyaltyIcon = (images) => {
    const icon = images.find((image) => image.type === 3)
    return icon && <Image className='rounded-[5px]' src={icon.url} height={40} width={40} alt='Plan icon'/>
  }

  const getBalanceString = (loyaltyCard, plan) => {
    if (plan.slug === 'iceland-bonus-card') {
      return `${loyaltyCard.balances[0].prefix} ${loyaltyCard.balances[0].value} spent`
    }

    if (plan.feature_set.has_points && loyaltyCard.balances.length > 0) {
      return `${loyaltyCard.balances[0].value} ${loyaltyCard.balances[0].suffix}`
    }

    const currentVoucherEarn = loyaltyCard.vouchers?.find((voucher) => voucher.state === 'inprogress').earn

    if (currentVoucherEarn?.type === 'stamps') {
      return `${currentVoucherEarn.value} ${currentVoucherEarn.suffix}`
    } else if (currentVoucherEarn?.type === 'accumulator') {
      return `${currentVoucherEarn.value} / ${currentVoucherEarn.target_value} spent`
    }
    return 'N/A'
  }
  return (
    <button className='dark:bg-grey-825 flex h-[90px] w-[180px]  shadow-md rounded-[8px] text-left items-center p-[6px]'>
      <div className='flex flex-col h-full space-between basis-4/5 font-body-4'>
        <div className='font-bold h-full leading-snug flex items-center'>
          <span><span className='mr-[5px]'>{plan?.account.plan_name}</span>{getStatusFn(status.state)}</span>
        </div>

        <div className='flex gap-[7px]'>
          <div className='basis-1/4'>
            {renderLoyaltyIcon(images)}
          </div>
          <div className='basis-3/4 leading-snug inline'>
            <p>{id}</p>
            <p>{isPllCard ? getBalanceString(card, plan) : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className='basis-1/5 flex justify-end'>
        <ArrowDownSvg className={'-rotate-90 scale-75 dark:fill-grey-400'} />
      </div>
    </button>
  )
}

export default LoyaltyCard
