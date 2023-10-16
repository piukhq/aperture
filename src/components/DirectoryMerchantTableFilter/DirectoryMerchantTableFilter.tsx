// This component takes in a filter function and filters the list based the inputs set here. The logic of the filter function is handled in the parent component.
import TextInputGroup from 'components/TextInputGroup'
import {DirectoryLocation, DirectoryMid, DirectoryPsimi, DirectorySecondaryMid} from 'types'
import {InputColour, InputStyle, InputType, InputWidth} from 'components/TextInputGroup/styles'
import {useState} from 'react'
import Button from 'components/Button'
import {ButtonBackground, ButtonSize, ButtonWidth, LabelColour, LabelWeight} from 'components/Button/styles'

type Props = {
  isActive: boolean,
  filterFn: (textFilterValue: string, fromDateFilterValue?: string, toDateFilterValue?: string) => DirectoryPsimi[] | DirectoryMid[] | DirectorySecondaryMid[] | DirectoryLocation[],
  setFilteredList: (arg0:unknown) => void, // TODO: fix this type, typescript got mad at me
  textFilterValue: string,
  setTextFilterValue: (textFilterValue: string) => void,
  setHasDateFilter: (hasDateFilter: boolean) => void,
  resetSortingFn: () => void,
}
const DirectoryMerchantTableFilter = ({
  isActive,
  filterFn,
  setFilteredList,
  textFilterValue,
  setTextFilterValue,
  setHasDateFilter,
  resetSortingFn,
}: Props) => {

  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  const handleTextFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilterValue(event.target.value)
    setFilteredList(filterFn(event.target.value, fromDate, toDate))
  }

  const handleFromDateFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value)
    setFilteredList(filterFn(textFilterValue, event.target.value, toDate))
  }

  const handleToDateFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value)
    setFilteredList(filterFn(textFilterValue, fromDate, event.target.value))
  }

  const handleClearFilterClick = () => {
    setHasDateFilter(false)
    setFromDate('')
    setToDate('')
    setTextFilterValue('')
    setFilteredList(filterFn('', '', ''))
    resetSortingFn() // Avoids list update issues when clearing filters after sorting
  }

  const minimumDate = '2023-01-01'
  const todaysDate = new Date().toISOString()
  const hasBeenFiltered = fromDate !== '' || toDate !== '' || textFilterValue !== ''

  return (
    <div className={`flex justify-end items-center w-full overflow-hidden duration-300 gap-4 ${isActive ? 'h-12 my-2 ' : 'h-0'}`}>
      <div className='w-48'>
        <TextInputGroup
          name='Text Filter'
          label='Text Filter'
          placeholder='Filter by text..'
          value={textFilterValue}
          onChange={handleTextFilterInputChange}
          inputType={InputType.SEARCH}
          inputStyle={InputStyle.FULL_SMALL_LABEL_HIDDEN}
          inputWidth={InputWidth.FULL}
          inputColour={InputColour.GREY}
          isDisabled={!isActive}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label id='date-from' className='font-body-3'>Date from:</label>
        <input
          aria-labelledby='date-from'
          onChange={handleFromDateFilterInputChange}
          className='border border-grey-500 h-[42px] rounded-[10px] text-grey-600 p-4 font-body-3 dark:[color-scheme:dark] dark:bg-transparent'
          type='date' id='start' name='from-date'
          min={minimumDate}
          max={todaysDate}
          value={fromDate}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <label id='date-to' className='font-body-3'>Date to:</label>
        <input
          aria-labelledby='date-to'
          onChange={handleToDateFilterInputChange}
          className='border border-grey-500 h-[42px] rounded-[10px] text-grey-600 p-4 font-body-3 dark:[color-scheme:dark] dark:bg-transparent'
          type='date' id='end' name='to-date'
          value={toDate}
          min={minimumDate}
          max={todaysDate}
        />
      </div>
      <Button
        handleClick={handleClearFilterClick}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.RED}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.MEDIUM}
        ariaLabel='Clear Filters'
        isDisabled={!isActive || !hasBeenFiltered}
        additionalStyles={hasBeenFiltered ? 'opacity-100' : 'opacity-50'}
      >
       Clear Filters
      </Button>
    </div>
  )
}

export default DirectoryMerchantTableFilter
