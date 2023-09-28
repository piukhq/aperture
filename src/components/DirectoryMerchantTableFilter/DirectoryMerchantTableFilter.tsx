import TextInputGroup from 'components/TextInputGroup'
import {DirectoryLocation, DirectoryMid, DirectoryPsimi, DirectorySecondaryMid} from 'types'
import {InputColour, InputStyle, InputType, InputWidth} from 'components/TextInputGroup/styles'

type Props = {
  isActive: boolean,
  filterFn: (textFilterValue: string) => DirectoryPsimi[] | DirectoryMid[] | DirectorySecondaryMid[] | DirectoryLocation[],
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


  const handleFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilterValue(event.target.value)
    event.target.value.length <= 1 ? setFilteredList([]) : setFilteredList(filterFn(event.target.value))
  }

  return (
    <div className={`flex justify-end w-full overflow-hidden duration-300 gap-4 ${isActive ? 'h-12 my-2 ' : 'h-0'}`}>
      <div className='w-48'>
        <TextInputGroup
          name='Text Filter'
          label='Text Filter'
          placeholder='Filter by text..'
          value={textFilterValue}
          onChange={handleFilterInputChange}
          inputType={InputType.SEARCH}
          inputStyle={InputStyle.FULL_SMALL_LABEL_HIDDEN}
          inputWidth={InputWidth.FULL}
          inputColour={InputColour.GREY}
          isDisabled={!isActive}
        />
      </div>
      <div className='w-48'>
        <TextInputGroup
          name='From Date Filter'
          label='From Date Filter'
          placeholder='From Date:'
          value={''}
          onChange={handleFilterInputChange}
          inputType={InputType.SEARCH}
          inputStyle={InputStyle.FULL_SMALL_LABEL_HIDDEN}
          inputWidth={InputWidth.FULL}
          inputColour={InputColour.GREY}
          isDisabled={!isActive}
        />
      </div>
      <div className='w-48'>
        <TextInputGroup
          name='To Date Filter'
          label='To Date Filter'
          placeholder='To Date:'
          value={''}
          onChange={handleFilterInputChange}
          inputType={InputType.SEARCH}
          inputStyle={InputStyle.FULL_SMALL_LABEL_HIDDEN}
          inputWidth={InputWidth.FULL}
          inputColour={InputColour.GREY}
          isDisabled={!isActive}
        />
      </div>
    </div>
  )
}

export default DirectoryMerchantTableFilter
