import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryLocations, DirectoryLocation, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, ModalType} from 'utils/enums'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {capitaliseFirstLetter} from 'utils/stringFormat'

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

type Props = {
  locationLabel: string
}

const DirectoryMerchantLocations = ({locationLabel}: Props) => {
  const router = useRouter()
  const {merchantId, planId} = router.query

  const dispatch = useAppDispatch()
  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

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

  const setSelectedLocations = () => {
    const checkedLocationsToEntity = locationsData.filter((location) => checkedRefArray.includes(location.location_ref)).map((location) => ({
      entityRef: location.location_ref,
      entityValue: location.location_metadata.name,
    }))
    dispatch(setSelectedDirectoryEntityCheckedSelection(checkedLocationsToEntity))
  }

  const requestLocationDeleteModal = ():void => {
    setSelectedLocations()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE))
  }

  const requestBulkCommentModal = () => {
    setSelectedLocations()
    dispatch(setModalHeader('Location Comment'))
    dispatch(setCommentsOwnerRef(planId as string))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.LOCATION))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  return (
    <>
      <div className='flex justify-between h-[71px] items-center px-[9px]'>
        <div>
          { checkedRefArray.length > 0 && (
            <div className='flex gap-[10px] h-[71px] items-center'>
              <Button
                handleClick={requestBulkCommentModal}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.AUTO}
                labelColour={LabelColour.GREY}
                borderColour={BorderColour.GREY}
              >Comments
              </Button>
              <Button
                handleClick={requestLocationDeleteModal}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                labelColour={LabelColour.RED}
                labelWeight={LabelWeight.SEMIBOLD}
                borderColour={BorderColour.RED}
              >Delete
              </Button>
            </div>
          )}
        </div>

        <Button
          handleClick={() => console.log('Add store button clicked')}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
        >{`Add ${capitaliseFirstLetter(locationLabel)}`}
        </Button>
      </div>

      {locationsData && (
        <DirectoryMerchantDetailsTable tableHeaders={locationsTableHeaders} tableRows={hydrateLocationTableData()} singleViewRequestHandler={requestLocationSingleView} refArray={refArray} />
      )}
    </>
  )
}

export default DirectoryMerchantLocations
