import {useState, useEffect} from 'react'
import Button from 'components/Button'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {mockLocationData} from 'utils/mockLocationData'
import {DirectoryLocations, DirectoryLocation} from 'types'
import CheckSvg from 'icons/svgs/check.svg'
import CloseIcon from 'icons/svgs/close.svg'

const DirectoryMerchantLocations = () => {
  const locationsData: DirectoryLocations = mockLocationData

  const [atLeastOneRowSelected, setAtLeastOneRowSelected] = useState(false)
  const [checkedRows, setCheckedRows] = useState(new Array(locationsData.length).fill(false))

  useEffect(() => {
    if (!checkedRows.find(row => row === true) && atLeastOneRowSelected) {
      setAtLeastOneRowSelected(false)
    } else if (checkedRows.find(row => row === true) && !atLeastOneRowSelected) {
      setAtLeastOneRowSelected(true)
    }
  }, [checkedRows, atLeastOneRowSelected])

  const handleCheckboxChange = (rowIndex: number) => {
    const updatedCheckedRowState = checkedRows.map((item, index) => index === rowIndex ? !item : item)
    setCheckedRows(updatedCheckedRowState)
  }

  const renderRow = (index, {
    metadata,
    date_added: dateAdded,
  }: DirectoryLocation) => {
    const {
      name,
      is_physical_location: isPhysicalLocation,
      address_line_1: addressLine,
      town_city: townCity,
      postcode,
      location_id: locationId,
      merchant_internal_id: internalId,
    } = metadata

    return (
      <tr className='h-[60px]' key={index}>
        <td className='flex items-center justify-center h-[60px]'>
          <input type='checkbox' className='flex h-[16px] w-[16px]' checked={checkedRows[index]} onChange={() => handleCheckboxChange(index)} />
        </td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{name}</td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{dateAdded}</td>{/* TODO: Will need formatting when coming from API */ }
        <td className='px-[9px]'>
          {isPhysicalLocation ? <CheckSvg className='w-[15px] h-[15px] fill-aquamarine' /> : <CloseIcon className='w-[15px] h-[15px] fill-red' />}
        </td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{addressLine}</td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{townCity}</td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{postcode}</td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{locationId}</td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{internalId}</td>
      </tr>
    )
  }

  const handleAllCheckboxesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(new Array(locationsData.length).fill(event.target.checked))
  }

  return (
    <div className='mx-[10px]'>
      <div className='flex justify-between h-[71px] items-center px-[9px]'>
        <div>
          {atLeastOneRowSelected && (
            <Button
              handleClick={() => console.log('Delete button clicked')}
              buttonSize={ButtonSize.SMALL}
              buttonWidth={ButtonWidth.MEDIUM}
              labelColour={LabelColour.RED}
              labelWeight={LabelWeight.SEMIBOLD}
              borderColour={BorderColour.RED}
            >Delete
            </Button>
          )}
        </div>

        <Button
          handleClick={() => console.log('Add store button clicked')}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
        >Add Store
        </Button>
      </div>

      <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
        <thead className='h-[38px] text-left bg-grey-200'>
          <tr>
            <th data-testid='table-header' aria-label='group-checkbox' className='px-[9px] w-[40px] rounded-l-[10px]'>
              <div className='flex items-center justify-center'>
                <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={handleAllCheckboxesChange}/>
              </div>
            </th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>NAME</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>DATE ADDED</th>
            <th data-testid='table-header' className='px-[9px] font-table-header w-[100px]'>PHYSICAL</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>ADDRESS</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>TOWN</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>POSTCODE</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>LOCATION ID</th>
            <th data-testid='table-header' className='px-[9px] font-table-header rounded-r-[10px]'>INTERNAL ID</th>
          </tr>
        </thead>
        <tbody>
          {locationsData.map((location, index) => renderRow(index, location))}
        </tbody>
      </table>
    </div>
  )
}

export default DirectoryMerchantLocations

