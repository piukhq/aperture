import {timeStampToDate} from 'utils/date'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import {LoyaltyCardTransaction, Plan} from 'types'

type Props = {
  transactions: LoyaltyCardTransaction[],
  plan: Plan,
}

const TransactionsTable = ({transactions, plan}: Props) => {
  const isIceland = plan.slug === 'iceland-bonus-card'

  const renderTransactionRow = (transaction, transactionIndex) => { // TODO: Test accumulator transactions
    const {amounts, timestamp, description} = transaction
    const {value, currency} = amounts[0]

    const rewardCell = isIceland ? 'N/A' : `${value > 0 ? '+' : ''}${value} ${currency}`
    const detailsAmountCells = description.split('£')

    const getChangeCell = () => {
      if (value > 0) {
        return <ArrowDownSvg className={'rotate-180 fill-green'} />
      } else if (value < 0) {
        return <ArrowDownSvg className={'fill-red'}/>
      } else {
        return <ArrowDownSvg className={'rotate-90 fill-orange'}/>
      }
    }

    const getNullAmountCell = () => isIceland ? `£${Math.abs(value)}` : rewardCell

    const transactionRowArray = [
      rewardCell, // REWARD
      timeStampToDate(timestamp), //DATE
      detailsAmountCells[0], // DETAILS
      detailsAmountCells[1] ? `£${detailsAmountCells[1]}` : getNullAmountCell(), // AMOUNT
      getChangeCell(), // CHANGE
    ]

    return (
      <tr key={transactionIndex} className='border-b-[20px] border-transparent'>
        {transactionRowArray.map((row, index) => <td key={index} className={`px-[9px] font-body-3 ${index === 0 && 'pl-[38px]'}`}>{row}</td>)}
      </tr>
    ) }

  return (
    <tbody>
      { transactions.map((transaction, index) => renderTransactionRow(transaction, index))}
    </tbody>

  )
}

export default TransactionsTable
