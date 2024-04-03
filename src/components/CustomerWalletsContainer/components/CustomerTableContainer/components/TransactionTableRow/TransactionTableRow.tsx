import React from 'react'
import {LoyaltyTransaction} from 'types'
import {timeStampToDate} from 'utils/dateFormat'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

const TransactionTableRow = ({transaction, isIceland}: { transaction: LoyaltyTransaction, isIceland: boolean }) => {
  const {amounts, timestamp, description} = transaction
  const {value, currency} = amounts[0]

  const rewardCell = isIceland ? 'N/A' : `${value > 0 ? '+' : ''}${value} ${currency}`
  const detailsAmountCells = description.split('£')

  const getChangeCell = () => {
    if (value > 0) {
      return <ArrowDownSvg data-testid='positive-change' className={'rotate-180 fill-green'} />
    } else if (value < 0) {
      return <ArrowDownSvg data-testid='negative-change' className={'fill-red'} />
    } else {
      return <ArrowDownSvg data-testid='zero-change' className={'rotate-90 fill-orange'} />
    }
  }
  const getNullAmountCell = () => isIceland ? `£${Math.abs(value)}` : rewardCell

  const transactionRowArray = [
    rewardCell, // REWARD
    timeStampToDate(timestamp, {isShortDate: true}), //DATE
    detailsAmountCells[0], // DETAILS
    detailsAmountCells[1] ? `£${detailsAmountCells[1]}` : getNullAmountCell(), // AMOUNT
    getChangeCell(), // CHANGE
  ]

  return (
    <tr data-testid='transaction-row' className='border-b-[20px] border-transparent'>
      {transactionRowArray.map((row, index) => <td key={index} className={`px-[9px] font-body-3 ${index === 0 && 'pl-[38px]'}`}>{row}</td>)}
    </tr>
  )
}
export default TransactionTableRow
