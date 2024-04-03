import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import Image from 'next/image'
import {ReactNode} from 'react'
import {LoyaltyCard, Plan} from 'types'

type Props = {
  card: LoyaltyCard
  getStatusFn: (status: string) => ReactNode
  plan: Plan
}

const LoyaltyCard = ({getStatusFn, card, plan}: Props) => {
  const isPllCard = plan?.feature_set.card_type === 2
  const {id, status, images} = card

  const renderLoyaltyIcon = (images) => {
    const icon = images.find((image) => image.type === 3)
    return icon && <Image className='rounded-[5px]' src={icon.url} height={40} width={40} alt='Plan icon' />
  }

  const getBalanceString = (loyaltyCard: LoyaltyCard, plan: Plan) => {
    if (plan?.slug === 'iceland-bonus-card') {
      return `${loyaltyCard.balances[0].prefix}${loyaltyCard.balances[0].value} spent`
    }

    const currentVoucherEarn = loyaltyCard?.vouchers?.find((voucher) => voucher.state === 'inprogress')?.earn

    if (currentVoucherEarn) {
      const {value, type, prefix, suffix, target_value: targetValue} = currentVoucherEarn
      if (type === 'stamps') {
        return `${value} ${suffix}`
      } else if (type === 'accumulator') {
        return `${prefix}${value} / ${prefix}${targetValue} spent`
      }
    }
    if (plan?.feature_set.has_points && loyaltyCard.balances.length > 0) {
      return `${loyaltyCard.balances[0].value} ${loyaltyCard.balances[0].suffix}`
    }
    return 'N/A'
  }
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_LOYALTY_API_URL}/admin/scheme/schemeaccount/${id}/change/`}
      target='blank'
      onClick={() => console.log('Loyalty Card clicked')} // TODO: Placeholder for future functionality
      className='dark:bg-grey-825 flex h-[90px] w-[180px] rounded-[8px] text-left items-center p-[6px] shadow-sm hover:shadow-md dark:hover:bg-grey-800 duration-300'
    >
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
            <p>{isPllCard && status.state === 'authorised' ? getBalanceString(card, plan) : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className='basis-1/5 flex justify-end'>
        <ArrowDownSvg className={'-rotate-90 scale-75 dark:fill-grey-400'} />
      </div>
    </a>
  )
}

export default LoyaltyCard
