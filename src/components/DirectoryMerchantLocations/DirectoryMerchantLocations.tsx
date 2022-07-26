import {useState} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch} from 'app/hooks'
import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryLocations, DirectoryLocation, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'

const locationsTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
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
    displayValue: 'INTERNAL ID',
  },
]

const DirectoryMerchantLocations = () => {
  const router = useRouter()
  const {merchantId, planId} = router.query

  const dispatch = useAppDispatch()
  const [shouldDisplayAuxiliaryButtons, setShouldDisplayAuxiliaryButtons] = useState(false)

  const {getMerchantLocationsResponse} = useMidManagementLocations({
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const locationsData: DirectoryLocations = getMerchantLocationsResponse

  // TODO: Would be good to have this in a hook once the data is retrieved from the api
  const hydrateLocationTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return locationsData.map((locationObj: DirectoryLocation) => {
      const {date_added: dateAdded, location_metadata: locationMetadata} = locationObj
      const {
        name,
        is_physical_location: isPhysicalLocation,
        address_line_1: addressLine,
        town_city: townCity,
        postcode,
        location_id: locationId,
        merchant_internal_id: internalId,
      } = locationMetadata

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

  const refArray = locationsData?.map(location => location.location_ref)

  const requestLocationSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(locationsData[index]))
    router.push(`${router.asPath}&ref=${locationsData[index].location_ref}`)
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

      {locationsData && (
        <DirectoryMerchantDetailsTable tableHeaders={locationsTableHeaders} tableRows={hydrateLocationTableData()} checkboxChangeHandler={setShouldDisplayAuxiliaryButtons} singleViewRequestHandler={requestLocationSingleView} refArray={refArray} />
      )}
    </>
  )
}

export default DirectoryMerchantLocations
