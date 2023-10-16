import React, {useCallback, useEffect, useState} from 'react'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import DirectoryMerchantDetailsTableRow from './components/DirectoryMerchantDetailsTableRow'
import {setSelectedDirectoryTableCheckedRows, getSelectedDirectoryTableCheckedRows, setSelectedDirectoryTableCheckedRefs, resetSelectedDirectoryEntities} from 'features/directoryMerchantSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

type TableRowProps = DirectoryMerchantDetailsTableCell[]

type Props = {
  tableHeaders: DirectoryMerchantDetailsTableHeader[],
  tableRows: TableRowProps[],
  singleViewRequestHandler: (index: number) => void
  refArray: string[]
  sortingFn: (displayValue: string) => void
  fieldSortedBy: string
}

const DirectoryMerchantDetailsTable = ({tableHeaders, tableRows, sortingFn, fieldSortedBy, singleViewRequestHandler, refArray}: Props) => {
  const [copyRow, setCopyRow] = useState<number | null>(null)
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const [hasBeenSorted, setHasBeenSorted] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const selectedCheckedRows = useAppSelector(getSelectedDirectoryTableCheckedRows)
  useEffect(() => { // When component unmounts, clear out the current selected entities
    return () => {
      dispatch(resetSelectedDirectoryEntities())
    }
  }, [dispatch])

  useEffect(() => { // Update checked state when tableRows change
    if (selectedCheckedRows.length !== tableRows.length) {
      dispatch(setSelectedDirectoryTableCheckedRows(new Array(tableRows.length).fill(false)))
      setIsAllChecked(false)
      dispatch(setSelectedDirectoryTableCheckedRefs([]))
    }
  }, [dispatch, selectedCheckedRows, tableRows])

  const handleCheckboxChange = useCallback((rowIndex: number) => {
    const updatedCheckedRowState = selectedCheckedRows.map((item, index) => index === rowIndex ? !item : item)
    dispatch(setSelectedDirectoryTableCheckedRows(updatedCheckedRowState))
    setIsAllChecked(false)
    dispatch(setSelectedDirectoryTableCheckedRefs(refArray.filter((refElement, index) => updatedCheckedRowState[index] && refElement)))
  }, [dispatch, refArray, selectedCheckedRows])

  const handleAllCheckboxesChange = () => {
    dispatch(setSelectedDirectoryTableCheckedRefs(selectedCheckedRows.some(row => row === true && isAllChecked) ? [] : refArray))
    dispatch(setSelectedDirectoryTableCheckedRows(new Array(tableRows.length).fill(!isAllChecked)))
    isAllChecked ? setIsAllChecked(false) : setIsAllChecked(true)
  }

  const renderSortableHeading = (displayValue: string = '') => {
    const isCurrentSortDirectionAscending = tableHeaders.find(header => header.displayValue === displayValue)?.isCurrentSortDirectionAscending

    const handleSortButtonClick = () => {
      dispatch(setSelectedDirectoryTableCheckedRows([]))
      sortingFn(displayValue)
      setHasBeenSorted(true)
    }
    return (
      <button
        className={`flex items-center justify-center gap-2 duration-200 ${fieldSortedBy === displayValue && hasBeenSorted ? 'text-blue fill-blue' : 'hover:text-blue/75'}`}
        onClick={handleSortButtonClick}
        aria-label={`sort-by-${displayValue}`}
      >
        {displayValue} <ArrowDownSvg className={`w-[14px] h-[10px] duration-300 ${isCurrentSortDirectionAscending ? 'translate-y-[2px]' : 'rotate-180 -translate-y-[2px]'}`} />
      </button>
    )
  }

  const renderTableHeaders = () => (
    tableHeaders.map((header, index) => {
      const {additionalStyles, isPaymentIcon, displayValue, isSortable} = header
      if (isPaymentIcon) {
        return <th key={index} data-testid='table-header' aria-label='payment-scheme' className='px-[9px] w-[50px] h-[38px]' />
      }
      return <th key={index} data-testid='table-header' className={`mr-[11px] h-[38px] font-table-header ${additionalStyles}`}>{isSortable ? renderSortableHeading(displayValue) : displayValue}  </th>
    })
  )

  if (tableRows.length === 0) {
    return null
  }

  return (
    <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
      <thead className='text-left bg-grey-200'>
        <tr>
          <th data-testid='table-header' className='px-[9px] w-[40px] rounded-l-[10px]'>
            <div className='flex items-center justify-center'>
              <input type='checkbox' aria-label='group-checkbox' className='flex h-[16px] w-[16px]' onChange={handleAllCheckboxesChange} checked={isAllChecked}/>
            </div>
          </th>
          {renderTableHeaders()}
          <th key={'copy-header'} data-testid='table-header' aria-label='payment-scheme' className='w-[50px] rounded-r-[10px]' />
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <DirectoryMerchantDetailsTableRow
            key={index}
            index={index}
            refValue={refArray[index]}
            row={row}
            copyRow={copyRow}
            setCopyRow={setCopyRow}
            singleViewRequestHandler={singleViewRequestHandler}
            onCheckboxChange={handleCheckboxChange}/>
        ))}
      </tbody>

    </table>
  )
}

export default React.memo(DirectoryMerchantDetailsTable)
