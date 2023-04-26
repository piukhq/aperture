import {useCallback, useState} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {Button, DirectoryMerchantDetailsTable, DirectoryMerchantPaginationButton} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryLocations, DirectoryLocation, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, ModalType, UserPermissions} from 'utils/enums'
import {timeStampToDate} from 'utils/dateFormat'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {setLocationLabel} from 'features/directoryLocationSlice'
import PathSvg from 'icons/svgs/path.svg'

type LocationRowObject = {
  ref: string,
  isSubLocation?: boolean,
  row: DirectoryMerchantDetailsTableCell[]
}

type Props = {
  locationLabel: string
}

const DirectoryMerchantLocations = ({locationLabel}: Props) => {
  const router = useRouter()
  const {merchantId, planId} = router.query
  const isMobileViewport = useIsMobileViewportDimensions()
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldSkipGetLocationsByPage, setShouldSkipGetLocationsByPage] = useState(true)

  const dispatch = useAppDispatch()
  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantLocationsResponse} = useMidManagementLocations({
    skipGetLocation: true,
    skipGetLocationsByPage: shouldSkipGetLocationsByPage,
    planRef: planId as string,
    merchantRef: merchantId as string,
    page: currentPage.toString(),
  })

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
      additionalStyles: isMobileViewport && 'hidden',
    },
    {
      displayValue: 'POSTCODE',
      additionalStyles: isMobileViewport && 'hidden',
    },
    {
      displayValue: 'LOCATION ID',
    },
    {
      displayValue: 'INTERNAL ID',
    },
  ]

  const locationsData: DirectoryLocations = getMerchantLocationsResponse

  const getLocationTableRowObjects = useCallback((): Array<LocationRowObject> => {
    const hydrateLocationTableRow = (locationObj: DirectoryLocation, isSubLocation = false): Array<DirectoryMerchantDetailsTableCell> => {
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

      const textStyles = `${isSubLocation ? 'font-subheading-4 font-medium' : 'font-heading-8 font-regular'} truncate`

      const standardFields = [
        {
          displayValue: name,
          additionalStyles: textStyles,
          icon: isSubLocation ? <PathSvg /> : null,
        },
        {
          displayValue: timeStampToDate(dateAdded, isMobileViewport),
          additionalStyles: textStyles,
        },
        {
          physicalLocation: {
            isPhysicalLocation,
          },
        },
        {
          displayValue: addressLine,
          additionalStyles: textStyles,
        },
      ]

      const extraFields = isMobileViewport ? [
        {
          displayValue: locationId,
          additionalStyles: textStyles,
        },
        {
          displayValue: internalId,
          additionalStyles: textStyles,
        },
      ] : [
        {
          displayValue: townCity,
          additionalStyles: textStyles,
        },
        {
          displayValue: postcode,
          additionalStyles: textStyles,
        },
        {
          displayValue: locationId,
          additionalStyles: textStyles,
        },
        {
          displayValue: internalId,
          additionalStyles: textStyles,
        },
      ]


      return [...standardFields, ...extraFields]
    }

    return locationsData?.reduce((accumulator, locationObj: DirectoryLocation) => {
      const locationTableRow = hydrateLocationTableRow(locationObj)
      accumulator.push({ref: locationObj.location_ref, row: locationTableRow})

      if (locationObj.sub_locations) {
        const subLocationRows = locationObj.sub_locations.map(subLocation => ({
          ref: subLocation.location_ref,
          row: hydrateLocationTableRow(subLocation, true),
          isSubLocation: true,
        }))
        accumulator.push(...subLocationRows)
      }

      return accumulator
    }, [])
  }, [isMobileViewport, locationsData])

  const locationRowObjects = getLocationTableRowObjects()
  const refArray = locationRowObjects?.map(locationRowObj => locationRowObj.ref)
  const locationRows = locationRowObjects?.map(locationRowObj => locationRowObj.row)

  // Set selected location/sub-location in redux store and open correct modal
  const requestLocationSingleView = (index: number): void => {
    const {isSubLocation, ref: locationRef} = locationRowObjects[index]

    if (isSubLocation) {
      const subLocationObj = locationsData?.reduce((accumulator: {subLocation: DirectoryLocation, parentLocationRef: string}, location: DirectoryLocation) => {
        if (accumulator) { return accumulator }

        const {sub_locations: subLocations} = location
        if (subLocations) {
          const subLocation = subLocations.find(subLocation => subLocation.location_ref === locationRef)
          return subLocation ? {subLocation, parentLocationRef: location.location_ref} : null
        }
      }, null)

      const {subLocation, parentLocationRef} = subLocationObj
      dispatch(setSelectedDirectoryMerchantEntity({...subLocation, isSubLocation: true}))
      router.push(`${router.asPath}&ref=${parentLocationRef}&sub_location_ref=${locationRef}`)
    } else {
      const location = locationsData.find(location => location.location_ref === locationRef)
      dispatch(setSelectedDirectoryMerchantEntity(location))
      router.push(`${router.asPath}&ref=${locationRef}`)
    }
  }

  const setSelectedLocations = () => {
    const checkedLocationsToEntity = locationRowObjects.filter((location) => checkedRefArray.includes(location.ref)).map((location) => ({
      entityRef: location.ref,
      entityValue: location.row[0].displayValue,
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
    dispatch(setCommentsOwnerRef(merchantId as string))
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
                requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
              >Comments
              </Button>
              <Button
                handleClick={requestLocationDeleteModal}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                labelColour={LabelColour.RED}
                labelWeight={LabelWeight.SEMIBOLD}
                borderColour={BorderColour.RED}
                requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE}
              >Delete
              </Button>
            </div>
          )}
        </div>

        <Button
          handleClick={() => {
            dispatch(setLocationLabel(locationLabel))
            dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_LOCATION))
          }}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
          requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
        >{`Add ${locationLabel}`}
        </Button>
      </div>

      {locationsData && (
        <DirectoryMerchantDetailsTable tableHeaders={locationsTableHeaders} tableRows={locationRows} singleViewRequestHandler={requestLocationSingleView} refArray={refArray} />
      )}
      <DirectoryMerchantPaginationButton currentData={locationsData} setPageFn={setCurrentPage} currentPage={currentPage} setShouldSkipGetEntityByPage={setShouldSkipGetLocationsByPage} />
    </>
  )
}

export default DirectoryMerchantLocations
