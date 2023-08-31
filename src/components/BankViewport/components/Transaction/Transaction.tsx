import React from 'react'
import {LoyaltyTransactionApi2} from 'types'
import {timeStampToDate} from 'utils/dateFormat'

type Props = {
  transaction : LoyaltyTransactionApi2
}
const Transaction = ({transaction}:Props) => {
  const {timestamp, description, display_value: displayValue, id} = transaction
  return (
    <div key={id} className='flex justify-between items-center border-t border-t-grey-400'>
      <div className=' flex flex-col py-3'>
        <p className='text-lloydsGreen text-sm font-bold'>{timeStampToDate(timestamp, {isShortMonthYear: true})}</p>
        <p className='capitalize'>{description}</p>
      </div>
      <span className='text-sm font-bold'>{displayValue}</span>
    </div>
  )
}

export default Transaction
