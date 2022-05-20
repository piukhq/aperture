import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {mockLocationData} from 'utils/mockLocationData'
import {DirectoryLocations, DirectoryLocation} from 'types'

const locationsTableHeaders = [
  {
    displayValue: 'NAME',
  },
  {
    displayValue: 'DATE ADDED',
  },
  {
    additionalStyles: 'w-[100px]',
    displayValue: 'PHYSICAL',
  },
  {
    displayValue: 'ADDRESS',
  },
  {
    displayValue: 'TOWN',
  },
  {
    displayValue: 'POSTCODE',
  },
  {
    displayValue: 'LOCATION ID',
  },
  {
    additionalStyles: 'rounded-r-[10px]',
    displayValue: 'INTERNAL ID',
  },
]

const DirectoryMerchantLocations = () => {
  const [shouldDisplayAuxiliaryButtons, setShouldDisplayAuxiliaryButtons] = useState(false)
  const locationsData: DirectoryLocations = mockLocationData

  // TODO: Would be good to have this in a hook once the data is retrieved from the api
  const hydrateLocationTableData = () => {
    return locationsData.map((locationObj: DirectoryLocation) => {
      const {date_added: dateAdded, metadata} = locationObj
      const {
        name,
        is_physical_location: isPhysicalLocation,
        address_line_1: addressLine,
        town_city: townCity,
        postcode,
        location_id: locationId,
        merchant_internal_id: internalId,
      } = metadata

      return [
        {
          displayValue: name,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: dateAdded,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          physicalLocation: {
            isPhysicalLocation,
          },
        },
        {
          displayValue: addressLine,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: townCity,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: postcode,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: locationId,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: internalId,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
      ]
    })
  }

  return (
    <>
      <div className='flex justify-between h-[71px] items-center px-[9px]'>
        <div>
          {shouldDisplayAuxiliaryButtons && (
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

      <DirectoryMerchantDetailsTable tableHeaders={locationsTableHeaders} tableRows={hydrateLocationTableData()} checkBoxChangeHandler={setShouldDisplayAuxiliaryButtons} />
    </>
  )
}

export default DirectoryMerchantLocations
