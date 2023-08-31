import React from 'react'
import {LoyaltyVoucherApi2} from 'types'
import {timeStampToDate} from 'utils/dateFormat'
import TicketSvg from 'icons/svgs/ticket.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

type Props = {
  voucher : LoyaltyVoucherApi2
  onClickFn: VoidFunction
}
const Voucher = ({voucher, onClickFn}: Props) => {

  const renderDateDetails = (voucher: LoyaltyVoucherApi2) => {
    switch (voucher.state) {
      case 'issued':
        return <p>Expires: {timeStampToDate(Number(voucher.expiry_date), {isShortMonthYear: true})}</p>
      default: return <p></p>
    }
  }

  const {state, reward_text: rewardText} = voucher
  return (
    <button onClick={onClickFn} className='border-2 border-grey-300 rounded flex flex-col p-4 mx-6 mb-8'>
      <p className='bg-lloydsGreen text-white text-sm font-medium w-max px-2 py-1 rounded'>{state.toLocaleUpperCase()}</p>
      <div className='flex items-center gap-4 border-b border-dashed border-grey-300 py-4'>
        <div className='w-6 h-4'>
          <TicketSvg className='fill-lloydsGreen'/>
        </div>
        <span className='text-lloydsGreen text-lg'>{rewardText}</span>
      </div>
      <div className='w-full flex justify-between pt-4 text-sm items-center'>
        <span>{renderDateDetails(voucher)}</span>
        <ArrowDownSvg className='-rotate-90 fill-grey-500 mr-4' />
      </div>
    </button>
  )
}


export default Voucher

