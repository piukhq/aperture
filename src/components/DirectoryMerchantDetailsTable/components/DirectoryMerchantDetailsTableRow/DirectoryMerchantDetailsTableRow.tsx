import React from 'react'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import CheckSvg from 'icons/svgs/check.svg'
import CloseIcon from 'icons/svgs/close.svg'
import {DirectoryMerchantDetailsTableCell} from 'types'

type TableRowProps = DirectoryMerchantDetailsTableCell[]

type Props = {
  index: number,
  row: TableRowProps,
  checked: boolean,
  onCheckboxChange: (index: number) => void,
}

const DirectoryMerchantDetailsTableRow = ({index, row, checked, onCheckboxChange}: Props) => {
  const renderPaymentSchemeLogo = (paymentSchemeCode: number) => {
    if (paymentSchemeCode === 1) {
      return <VisaSvg alt='Visa' />
    } else if (paymentSchemeCode === 2) {
      return <MastercardSvg alt='Mastercard' />
    } else if (paymentSchemeCode === 3) {
      return <AmexSvg alt='Amex' />
    }
  }

  return (
    <tr className='h-[60px]'>
      <td className='flex items-center justify-center h-[60px]'>
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
