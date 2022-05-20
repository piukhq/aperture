import {useEffect, useState} from 'react'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'
import CheckSvg from 'icons/svgs/check.svg'
import CloseIcon from 'icons/svgs/close.svg'

type TableHeaderProps = {
  additionalStyles?: string,
  isPaymentIcon?: boolean,
  displayValue?: string
}

type TableRowProps = TableRowCellProps[]

type TableRowCellProps = {
  paymentSchemeCode?: number,
  physicalLocation?: {
    isPhysicalLocation: boolean
  },
  additionalStyles?: string,
  displayValue?: string
}

type Props = {
  tableHeaders: TableHeaderProps[],
  tableRows: TableRowProps[],
  checkBoxChangeHandler?: (shouldDisplayButtons: boolean) => void
}

const DirectoryMerchantDetailsTable = ({tableHeaders, tableRows, checkBoxChangeHandler}: Props) => {
  const [checkedRows, setCheckedRows] = useState(new Array(tableRows.length).fill(false))

  useEffect(() => {
    // If actions are to occur in parent when checkboxes change, emit event to parent
    if (checkBoxChangeHandler) {
      checkBoxChangeHandler(checkedRows.some(row => row === true))
    }
  }, [checkBoxChangeHandler, checkedRows])

  const handleCheckboxChange = (rowIndex: number) => {
    const updatedCheckedRowState = checkedRows.map((item, index) => index === rowIndex ? !item : item)
    setCheckedRows(updatedCheckedRowState)
  }

  const handleAllCheckboxesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(new Array(tableRows.length).fill(event.target.checked))
  }

  const renderPaymentSchemeLogo = (paymentSchemeCode: number) => {
    if (paymentSchemeCode === 1) {
      return <VisaSvg alt='Visa' />
    } else if (paymentSchemeCode === 2) {
      return <MastercardSvg alt='Mastercard' />
    } else if (paymentSchemeCode === 3) {
      return <AmexSvg alt='Amex' />
    }
  }

  const renderRow = (row: TableRowProps, index: number) => {
    return (
      <tr className='h-[60px]' key={index}>
        <td className='flex items-center justify-center h-[60px]'>
          <input type='checkbox' className='flex h-[16px] w-[16px]' checked={checkedRows[index]} onChange={() => handleCheckboxChange(index)} />
        </td>
        {row.map((rowCell: TableRowCellProps, index) => {
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

  return (
    <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
      <thead className='h-[38px] text-left bg-grey-200'>
        <tr>
          <th data-testid='table-header' aria-label='group-checkbox' className='px-[9px] w-[40px] rounded-l-[10px]'>
            <div className='flex items-center justify-center'>
              <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={handleAllCheckboxesChange} />
            </div>
          </th>

          {tableHeaders.map((header, index) => {
            const {additionalStyles, isPaymentIcon, displayValue} = header
            if (isPaymentIcon) {
              return <th key={index} data-testid='table-header' aria-label='payment-scheme' className='px-[9px] w-[50px]' />
            }
            return <th key={index} data-testid='table-header' className={`px-[9px] font-table-header ${additionalStyles}`}>{displayValue}</th>
          })}
        </tr>
      </thead>

      <tbody>
        {tableRows.map((row, index) => renderRow(row, index))}
      </tbody>
    </table>
  )
}

export default DirectoryMerchantDetailsTable

