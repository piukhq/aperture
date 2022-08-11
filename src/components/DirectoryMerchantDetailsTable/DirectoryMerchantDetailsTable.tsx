import React, {useCallback, useEffect, useState} from 'react'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import DirectoryMerchantDetailsTableRow from './components/DirectoryMerchantDetailsTableRow'
import {setSelectedDirectoryTableCheckedRows, getSelectedDirectoryTableCheckedRows} from 'features/directoryMerchantSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'

type TableRowProps = DirectoryMerchantDetailsTableCell[]

type Props = {
  tableHeaders: DirectoryMerchantDetailsTableHeader[],
  tableRows: TableRowProps[],
  checkboxChangeHandler?: (childCheckedRefArray: string[]) => void
  singleViewRequestHandler: (index: number) => void
  refArray: string[]
}

const DirectoryMerchantDetailsTable = ({tableHeaders, tableRows, checkboxChangeHandler, singleViewRequestHandler, refArray}: Props) => {
  const [checkedRefArr, setCheckedRefArr] = useState([])
  const [copyRow, setCopyRow] = useState(null)
  const [isAllChecked, setIsAllChecked] = useState(false)

  const dispatch = useAppDispatch()
  const selectedCheckedRows = useAppSelector(getSelectedDirectoryTableCheckedRows)

  useEffect(() => {
    // If actions are to occur in parent when checkboxes change, emit event to parent
    if (checkboxChangeHandler) {
      checkboxChangeHandler(checkedRefArr)
    }
  }, [checkboxChangeHandler, checkedRefArr])

  useEffect(() => { // This should trigger when entity is deleted to reset checked rows
    if (selectedCheckedRows.length === 0) {
      dispatch(setSelectedDirectoryTableCheckedRows(new Array(tableRows.length).fill(false)))
      setIsAllChecked(false)
      setCheckedRefArr([])
    }
  }, [dispatch, selectedCheckedRows, tableRows.length])

  const handleCheckboxChange = useCallback((rowIndex: number) => {
    const updatedCheckedRowState = selectedCheckedRows.map((item, index) => index === rowIndex ? !item : item)
    dispatch(setSelectedDirectoryTableCheckedRows(updatedCheckedRowState))
    setIsAllChecked(false)
    setCheckedRefArr(refArray.filter((refElement, index) => updatedCheckedRowState[index] && refElement))
  }, [dispatch, refArray, selectedCheckedRows])

  const handleAllCheckboxesChange = () => {
    setCheckedRefArr(selectedCheckedRows.some(row => row === true && isAllChecked) ? [] : refArray)
    dispatch(setSelectedDirectoryTableCheckedRows(new Array(tableRows.length).fill(!isAllChecked)))
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
        {tableRows.map((row, index) => <DirectoryMerchantDetailsTableRow key={index} index={index} refValue={refArray[index]} row={row} copyRow={copyRow} setCopyRow={setCopyRow} checked={selectedCheckedRows[index]} singleViewRequestHandler={singleViewRequestHandler} onCheckboxChange={handleCheckboxChange}/>)}
      </tbody>
    </table>
  )
}

export default React.memo(DirectoryMerchantDetailsTable)
