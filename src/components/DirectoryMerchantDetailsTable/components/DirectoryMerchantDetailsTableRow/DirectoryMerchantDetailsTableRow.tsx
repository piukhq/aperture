import React from 'react'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import CheckSvg from 'icons/svgs/check.svg'
import CloseIcon from 'icons/svgs/close.svg'
import {DirectoryMerchantDetailsTableCell} from 'types'
import {ModalType, PaymentSchemeCode} from 'utils/enums'
import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import ShareSvg from 'icons/svgs/share.svg'

type TableRowProps = DirectoryMerchantDetailsTableCell[]

type Props = {
  index: number,
  row: TableRowProps,
  checked: boolean,
  onCheckboxChange: (index: number) => void,
  singleViewRequestHandler: (index: number) => void,
  copyRow: number | null
  setCopyRow: (index: number | null) => void
  refValue: string
}

const DirectoryMerchantDetailsTableRow = ({index, row, checked, onCheckboxChange, singleViewRequestHandler, copyRow, setCopyRow, refValue}: Props) => {

  const dispatch = useAppDispatch()
  const renderPaymentSchemeLogo = (paymentSchemeCode: number) => {
    if (paymentSchemeCode === PaymentSchemeCode.VISA) {
      return <VisaSvg alt='Visa' />
    } else if (paymentSchemeCode === PaymentSchemeCode.MASTERCARD) {
      return <MastercardSvg alt='Mastercard' />
    } else if (paymentSchemeCode === PaymentSchemeCode.AMEX) {
      return <AmexSvg alt='Amex' />
    }
  }

  const handleRowClick = () => {
    singleViewRequestHandler(index)
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
  }

  const handleCopyButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.href}&ref=${refValue}`)
    setCopyRow(index)
  }

  return (
    <tr
      className='hover:bg-yellow/20 dark:hover:bg-grey-800 box-border border-white dark:border-grey-825 dark:border-grey border-y-[10px] h-[10px] my-[-10px]'
      onClick={handleRowClick}
      role='button'
      aria-label='table-row'
      tabIndex={0}
    >
      <td className='flex items-center justify-center h-[40px]'>
        <input type='checkbox' className='flex h-[16px] w-[16px]' checked={checked} onClick={(e) => e.stopPropagation()} onChange={() => onCheckboxChange(index)} />
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
      <td className='flex items-center justify-center'>
        {copyRow === index ? 'Copied' : (
          <button
            className='flex items-center justify-center font-table-cell h-[40px] w-[50px]'
            onClick={(e) => handleCopyButtonClick(e)}
            aria-label='Copy URL'
          >
            {copyRow === index ? 'Copied' : <ShareSvg />}
          </button>
        )}

      </td>
    </tr>
  )
}

export default React.memo(DirectoryMerchantDetailsTableRow)
