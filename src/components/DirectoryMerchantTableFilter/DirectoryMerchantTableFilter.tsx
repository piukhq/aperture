// This component takes in a filter function and filters the list based the inputs set here. The logic of the filter function is handled in the parent component.
import TextInputGroup from 'components/TextInputGroup'
import {DirectoryLocation, DirectoryMid, DirectoryPsimi, DirectorySecondaryMid} from 'types'
import {InputColour, InputStyle, InputType, InputWidth} from 'components/TextInputGroup/styles'
import {useState} from 'react'

type Props = {
  isActive: boolean,
  filterFn: (textFilterValue: string, fromDateFilterValue?: string, toDateFilterValue?: string) => DirectoryPsimi[] | DirectoryMid[] | DirectorySecondaryMid[] | DirectoryLocation[],
  setFilteredList: (arg0:unknown) => void, // TODO: fix this type, typescript got mad at me
  textFilterValue: string,
  setTextFilterValue: (textFilterValue: string) => void,
}
const DirectoryMerchantTableFilter = ({
  isActive,
  filterFn,
  setFilteredList,
  textFilterValue,
  setTextFilterValue,
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
        <span className='font-body-3'>Date from:</span>
        <input
          onChange={handleFromDateFilterInputChange}
          className='border border-grey-500 h-[42px] rounded-[10px] text-grey-600 p-4 font-body-3'
          type='date' id='start' name='from-date' max={Date.now().toLocaleString()}
          value={fromDate}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <span className='font-body-3'>Date to:</span>
        <input
          onChange={handleToDateFilterInputChange}
          className='border border-grey-500 h-[42px] rounded-[10px] text-grey-600 p-4 font-body-3'
          type='date' id='end' name='to-date' max={Date.now().toLocaleString()}
          value={toDate}
        />
      </div>
    </div>
  )
}

export default DirectoryMerchantTableFilter
