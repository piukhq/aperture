import React from 'react'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import CheckSvg from 'icons/svgs/check.svg'
import CloseIcon from 'icons/svgs/close.svg'
import {DirectoryMerchantDetailsTableCell} from 'types'
import {ModalType, PaymentSchemeSlug} from 'utils/enums'
import {getSelectedDirectoryTableCheckedRows} from 'features/directoryMerchantSlice'
import {useAppSelector} from 'app/hooks'
import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import ShareSvg from 'icons/svgs/share.svg'

type TableRowProps = DirectoryMerchantDetailsTableCell[]

type Props = {
  index: number,
  row: TableRowProps,
  onCheckboxChange: (index: number) => void,
  singleViewRequestHandler: (index: number) => void,
  copyRow: number | null
  setCopyRow: (index: number | null) => void
  refValue: string
}

const DirectoryMerchantDetailsTableRow = ({index, row, onCheckboxChange, singleViewRequestHandler, copyRow, setCopyRow, refValue}: Props) => {
  const selectedCheckedRow = useAppSelector(getSelectedDirectoryTableCheckedRows)[index] || false

  const dispatch = useAppDispatch()
  const renderPaymentSchemeLogo = (paymentSchemeSlug: PaymentSchemeSlug) => {
    if (paymentSchemeSlug === PaymentSchemeSlug.VISA) {
      return <VisaSvg alt='Visa' />
    } else if (paymentSchemeSlug === PaymentSchemeSlug.MASTERCARD) {
      return <MastercardSvg alt='Mastercard' />
    } else if (paymentSchemeSlug === PaymentSchemeSlug.AMEX) {
      return <AmexSvg alt='Amex' />
    }
  }

  const handleRowClick = () => {
    singleViewRequestHandler(index)
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
    setCopyRow(null)
  }

  const handleCopyButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.href}&ref=${refValue}`)
    setCopyRow(index)
  }

  return (
    <tr
      className='hover:bg-yellow/20 dark:hover:bg-grey-800 box-border border-white dark:border-grey-825 dark:border-grey border-y-[10px] my-[-10px]'
      onClick={handleRowClick}
      role='button'
      aria-label='table-row'
      tabIndex={0}
    >
      {/* TODO: Determine better method of deciding row indentation */}
      <td className={`flex items-center h-[40px] ${row[0].icon ? 'justify-end' : 'justify-center'}`}>
        <input type='checkbox' className='flex h-[16px] w-[16px]' checked={selectedCheckedRow} onClick={(e) => e.stopPropagation()} onChange={() => onCheckboxChange(index)} />
      </td>
      {row.map((rowCell: DirectoryMerchantDetailsTableCell, index) => {
        const {paymentSchemeSlug, additionalStyles, displayValue, icon, physicalLocation} = rowCell
        if (paymentSchemeSlug) {
          return (
            <td key={index}>
              {renderPaymentSchemeLogo(paymentSchemeSlug)}
            </td>
          )
        } else if (physicalLocation) {
          return (
            <td key={index} className='px-[9px]'>
              {physicalLocation.isPhysicalLocation ? <CheckSvg className='w-[15px] h-[15px] fill-aquamarine' /> : <CloseIcon className='w-[15px] h-[15px] fill-red' />}
            </td>
          )
        }
        return (
          icon ? (
            <td key={index} className={'px-[9px]'}>
              <div className={`flex items-center gap-[9px] ${additionalStyles}`}>
                {icon}
                {displayValue}
              </div>
            </td>
          ) : (
            <td key={index} className={`px-[9px] ${additionalStyles}`}>
              {displayValue}
            </td>
          )
        )
      })}
      <td className='font-table-cell h-[40px] text-center'>
        {copyRow === index ? 'Copied' : (
          <button
            className='flex items-center justify-center h-full w-[50px]'
            onClick={(e) => handleCopyButtonClick(e)}
            aria-label='Copy URL'
          >
            <ShareSvg/>
          </button>
        )}
      </td>
    </tr>
  )
}

export default React.memo(DirectoryMerchantDetailsTableRow)
