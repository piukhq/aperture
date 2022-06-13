import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import Image from 'next/image'
import {LoyaltyCard, Plan} from 'types'


type Props = {
  card: LoyaltyCard
  getStatusFn: (status: string) => string
  plan: Plan
}

const LoyaltyCard = ({getStatusFn, card, plan}:Props) => {

  const isPllCard = plan.feature_set.card_type === 2
  const {id, status, images} = card

  const renderLoyaltyIcon = (images) => {
    const icon = images.find((image) => image.type === 3)
    return icon && <Image className='rounded-[5px]' src={icon.url} height={40} width={40} alt=''/>
  }

  const getBalanceString = (loyaltyCard, plan) => {
    if (plan.slug === 'iceland-bonus-card') {
      return `${loyaltyCard.balances[0].prefix}${loyaltyCard.balances[0].value} spent`
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
    <div className='dark:bg-grey-825 flex h-[90px] min-w-[180px] shadow-md rounded-[8px] items-center p-[6px]'>
      <div className='flex flex-col h-full space-between basis-4/5 font-body-4'>
        <p className='font-bold flex gap-[6px] items-center h-full leading-snug'>
          {plan?.account.plan_name}
          <span className={`flex items-center justify-center h-[6px] min-w-[6px] rounded-full bg-${getStatusFn(status.state)}`}/>
        </p>
        <div className='flex gap-[7px]'>
          <div className='basis-1/4'>
            {renderLoyaltyIcon(images)}
          </div>
          <div className='basis-3/4 leading-snug'>
            <p>{id}</p>
            <p>{isPllCard ? getBalanceString(card, plan) : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className='basis-1/5 flex justify-end'>
        <ArrowDownSvg className={'-rotate-90 scale-75'} />
      </div>
    </div>
  )
}

export default LoyaltyCard
