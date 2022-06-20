import {timeStampToDate} from 'utils/date'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

const TransactionsTable = ({transactions}) => {

  const renderTransactionRow = (transaction) => {
    const {amounts, timestamp, description} = transaction
    const {value, currency} = amounts[0]

    const rewardCell = `${value > 0 ? '+' : ''}${value} ${currency}`
    const detailsAmountCell = description.split('£')
    const changeCell = <ArrowDownSvg className={value > 0 ? 'rotate-180 fill-green' : 'rotate-90 fill-orange'} />

    const transactionRowArray = [
      rewardCell,
      timeStampToDate(timestamp),
      detailsAmountCell[0],
      `£${detailsAmountCell[1]}`,
      changeCell,
    ]

    return (
      <tr className='border-b-[20px] border-transparent'>
        {transactionRowArray.map((row, index) => <td key={index} className={'px-[9px] font-body-3'}>{row}</td>)}
      </tr>
    ) }

  return (
    <tbody>
      { transactions.length > 0 ? transactions.map(transaction => renderTransactionRow(transaction))
        : <p>No transactions to show</p>}
    </tbody>

  )
}

export default TransactionsTable
