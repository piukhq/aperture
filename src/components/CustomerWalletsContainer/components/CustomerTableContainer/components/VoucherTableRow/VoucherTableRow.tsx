import React from 'react'
import {LoyaltyVoucher} from 'types'
import {timeStampToDate} from 'utils/dateFormat'

const VoucherTableRow = ({voucher}: {voucher:LoyaltyVoucher}) => {
  const {burn, date_issued: dateIssued, expiry_date: expiryDate, state, code} = voucher
  const {prefix = '', suffix = '', type} = burn || {}

  if (state === 'inprogress') {
    return null
  }
  const renderVoucherState = () => { 74
    switch (state) {
      case 'redeemed': return <span className='text-blue dark:text-lightBlue'>Redeemed</span>
      case 'expired': return <span className='text-red'>Expired</span>
      case 'cancelled': return <span className='text-grey-700 dark:text-grey-500'>Cancelled</span>
      case 'issued': return <span className='text-green'>Issued</span>
      default: return null
    }
  }

  const voucherColumnArray = [
    `${prefix} ${suffix} ${type}`,
    code,
    dateIssued ? timeStampToDate(dateIssued, {isShortDate: true}) : '-',
    expiryDate ? timeStampToDate(expiryDate, {isShortDate: true}) : '-',
    renderVoucherState(),
  ]

  return (
    <tr data-testid='voucher-row' className='border-b-[20px] border-transparent'>
      {voucherColumnArray.map((column, index) => (
        <td key={index} className={`px-[9px] font-body-3 ${index === 0 && 'pl-[38px]'}`}>{column}</td>
      ))}
    </tr>
  )
}

export default VoucherTableRow
