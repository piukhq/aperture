import React, {useCallback, useEffect, useState} from 'react'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import DirectoryMerchantDetailsTableRow from './components/DirectoryMerchantDetailsTableRow'

type TableRowProps = DirectoryMerchantDetailsTableCell[]

type Props = {
  tableHeaders: DirectoryMerchantDetailsTableHeader[],
  tableRows: TableRowProps[],
  checkboxChangeHandler?: (childCheckedRefArray: string[]) => void
  singleViewRequestHandler: (index: number) => void
  refArray: string[]
}

const DirectoryMerchantDetailsTable = ({tableHeaders, tableRows, checkboxChangeHandler, singleViewRequestHandler, refArray}: Props) => {
  const [checkedRows, setCheckedRows] = useState(new Array(tableRows.length).fill(false))
  const [checkedRefArr, setCheckedRefArr] = useState([])
  const [copyRow, setCopyRow] = useState(null)
  const [isAllChecked, setIsAllChecked] = useState(false)

  useEffect(() => {
    // If actions are to occur in parent when checkboxes change, emit event to parent
    if (checkboxChangeHandler) {
      checkboxChangeHandler(checkedRefArr)
    }
  }, [checkboxChangeHandler, checkedRefArr])

  const handleCheckboxChange = useCallback((rowIndex: number) => {
    const updatedCheckedRowState = checkedRows.map((item, index) => index === rowIndex ? !item : item)
    setCheckedRows(updatedCheckedRowState)
    setIsAllChecked(false)

    const checkedRefArray = refArray.filter((refElement, index) => updatedCheckedRowState[index] && refElement)
    setCheckedRefArr(checkedRefArray)
  }, [checkedRows, refArray])

  const handleAllCheckboxesChange = () => {
    setCheckedRefArr(checkedRows.some(row => row === true && isAllChecked) ? [] : refArray)
    setCheckedRows(new Array(tableRows.length).fill(!isAllChecked))
    isAllChecked ? setIsAllChecked(false) : setIsAllChecked(true)
  }

  const renderTableHeaders = () => (
    tableHeaders.map((header, index) => {
      const {additionalStyles, isPaymentIcon, displayValue} = header
      if (isPaymentIcon) {
        return <th key={index} data-testid='table-header' aria-label='payment-scheme' className='px-[9px] w-[50px]' />
      }
      return <th key={index} data-testid='table-header' className={`px-[9px] font-table-header ${additionalStyles}`}>{displayValue}</th>
    })
  )

  return (
    <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
      <thead className='h-[38px] text-left bg-grey-200'>
        <tr>
          <th data-testid='table-header' aria-label='group-checkbox' className='px-[9px] w-[40px] rounded-l-[10px]'>
            <div className='flex items-center justify-center'>
              <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={handleAllCheckboxesChange} checked={isAllChecked}/>
            </div>
          </th>
          {renderTableHeaders()}
          { <th key={'copy-header'} data-testid='table-header' aria-label='payment-scheme' className=' w-[50px] rounded-r-[10px]' /> }
        </tr>
      </thead>

      <tbody>
        {tableRows.map((row, index) => <DirectoryMerchantDetailsTableRow key={index} index={index} refValue={refArray[index]} row={row} copyRow={copyRow} setCopyRow={setCopyRow} checked={checkedRows[index]} singleViewRequestHandler={singleViewRequestHandler} onCheckboxChange={handleCheckboxChange}/>)}
      </tbody>
    </table>
  )
}

export default React.memo(DirectoryMerchantDetailsTable)
