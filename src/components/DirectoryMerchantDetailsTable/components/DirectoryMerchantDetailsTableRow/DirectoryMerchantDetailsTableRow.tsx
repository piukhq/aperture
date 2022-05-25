import React from 'react'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import CheckSvg from 'icons/svgs/check.svg'
import CloseIcon from 'icons/svgs/close.svg'
import {DirectoryMerchantDetailsTableCell} from 'types'
import {PaymentSchemeCode} from 'utils/enums'

type TableRowProps = DirectoryMerchantDetailsTableCell[]

type Props = {
  index: number,
  row: TableRowProps,
  checked: boolean,
  onCheckboxChange: (index: number) => void,
  onRowClick?: (index: number) => void, // TODO: Optional prop until all tabs have the ability to pass in onRowClick
}

const DirectoryMerchantDetailsTableRow = ({index, row, checked, onCheckboxChange, onRowClick}: Props) => {
  const renderPaymentSchemeLogo = (paymentSchemeCode: number) => {
    if (paymentSchemeCode === PaymentSchemeCode.VISA) {
      return <VisaSvg alt='Visa' />
    } else if (paymentSchemeCode === PaymentSchemeCode.MASTERCARD) {
      return <MastercardSvg alt='Mastercard' />
    } else if (paymentSchemeCode === PaymentSchemeCode.AMEX) {
      return <AmexSvg alt='Amex' />
    }
  }

  const handleClick = () => {
    onRowClick && onRowClick(index) // TODO: Conditional until all Tabs have the ability to pass in onRowClick
  }

  return (
    <tr
      className='hover:bg-yellow/20 dark:hover:bg-grey-800 box-border border-white dark:border-grey-825 dark:border-grey border-y-[10px] h-[10px] my-[-10px]'
      onClick={handleClick}
      role='button'
      aria-label='table-row'
      tabIndex={0}
    >
      <td className='flex items-center justify-center h-[40px] rounded-l-[10px]'>
        <input type='checkbox' className='flex h-[16px] w-[16px]' checked={checked} onChange={() => onCheckboxChange(index)} />
      </td>
      {row.map((rowCell: DirectoryMerchantDetailsTableCell, index) => {
        const {paymentSchemeCode, additionalStyles, displayValue, physicalLocation} = rowCell
        if (paymentSchemeCode) {
          return (
            <td key={index}>
              {renderPaymentSchemeLogo(paymentSchemeCode)}
            </td>
          )
        } else if (physicalLocation) {
          return (
            <td key={index} className='px-[9px]'>
              {physicalLocation.isPhysicalLocation ? <CheckSvg className='w-[15px] h-[15px] fill-aquamarine' /> : <CloseIcon className='w-[15px] h-[15px] fill-red' />}
            </td>
          )
        }
        return <td key={index} className={`px-[9px] ${additionalStyles}`}>{displayValue}</td>
      })}
    </tr>
  )
}

export default React.memo(DirectoryMerchantDetailsTableRow)
