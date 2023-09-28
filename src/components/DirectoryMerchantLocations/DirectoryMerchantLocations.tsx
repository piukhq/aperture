import {useCallback, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {Button, DirectoryMerchantDetailsTable, DirectoryMerchantTableFilter} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryLocations, DirectoryLocation, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useDirectoryLocations} from 'hooks/useDirectoryLocations'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, ModalType, UserPermissions} from 'utils/enums'
import {timeStampToDate} from 'utils/dateFormat'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {setLocationLabel} from 'features/directoryLocationSlice'
import PathSvg from 'icons/svgs/path.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

type LocationRowObject = {
  ref: string,
  locationRef?: string,
  isSubLocation?: boolean,
  row: DirectoryMerchantDetailsTableCell[]
}

type Props = {
  locationLabel: string
}

const DirectoryMerchantLocations = ({locationLabel}: Props) => {
  const router = useRouter()
  const {merchantId = '', planId = ''} = useGetRouterQueryString()
  const isMobileViewport = useIsMobileViewportDimensions()
  const [currentPage] = useState<number>(1)
  const [shouldShowFilters, setShouldShowFilters] = useState<boolean>(false)
  const [textFilterValue, setTextFilterValue] = useState<string>('')
  const [filteredList, setFilteredList] = useState<DirectoryLocations>([])

  const dispatch = useAppDispatch()
  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantLocationsResponse} = useDirectoryLocations({
    skipGetLocation: true,
    skipGetLocationsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
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
      additionalStyles: isMobileViewport ? 'hidden' : '',
    },
    {
      displayValue: 'POSTCODE',
      additionalStyles: isMobileViewport ? 'hidden' : '',
    },
    {
      displayValue: 'LOCATION ID',
    },
    {
      displayValue: 'INTERNAL ID',
    },
  ]

  const locationsData: DirectoryLocations = useMemo(() => textFilterValue.length > 1 ? filteredList : getMerchantLocationsResponse || [], [filteredList, getMerchantLocationsResponse, textFilterValue.length])

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
          displayValue: timeStampToDate(dateAdded, {isShortDate: isMobileViewport}),
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
      // @ts-expect-error - Wierd never typing error
      accumulator.push({ref: locationObj.location_ref, row: locationTableRow})

      if (locationObj.sub_locations) {
        const subLocationRows = locationObj.sub_locations.map(subLocation => ({
          ref: subLocation.location_ref,
          row: hydrateLocationTableRow(subLocation, true),
          isSubLocation: true,
        }))
        // @ts-expect-error - Wierd never typing error
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
    const baseUrl = router.asPath.split('&ref')[0]

    if (isSubLocation) {
      const subLocationObj = locationsData?.reduce((accumulator: {subLocation: DirectoryLocation, parentLocationRef: string}, location: DirectoryLocation) => {
        if (accumulator) { return accumulator }

        const {sub_locations: subLocations} = location
        if (subLocations) {
          const subLocation = subLocations.find(subLocation => subLocation.location_ref === locationRef)
          return subLocation ? {subLocation, parentLocationRef: location.location_ref} : null
        }
      }, null)

      const {subLocation, parentLocationRef} = subLocationObj || {subLocation: null, parentLocationRef: null}
      subLocation && dispatch(setSelectedDirectoryMerchantEntity({...subLocation, isSubLocation: true}))
      router.push(`${baseUrl}&ref=${parentLocationRef}&sub_location_ref=${locationRef}`)
    } else {
      const location = locationsData.find(location => location.location_ref === locationRef)
      location && dispatch(setSelectedDirectoryMerchantEntity(location))
      router.push(`${baseUrl}&ref=${locationRef}`, undefined, {scroll: false})
    }
  }

  const setSelectedLocations = () => {
    const checkedLocationsToEntity = locationRowObjects.filter((location) => checkedRefArray.includes(location.ref)).map((location) => ({
      entityRef: location.ref,
      entityValue: location.row[0].displayValue || '',
    }))
    checkedLocationsToEntity && dispatch(setSelectedDirectoryEntityCheckedSelection(checkedLocationsToEntity))
  }

  const requestLocationDeleteModal = ():void => {
    setSelectedLocations()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE))
  }

  const requestBulkCommentModal = () => {
    setSelectedLocations()
    dispatch(setModalHeader('Location Comment'))
    dispatch(setCommentsOwnerRef(merchantId))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.LOCATION))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  const locationFilteringFn = (currentValue:string) => {
    if (getMerchantLocationsResponse) {
      return getMerchantLocationsResponse.filter((location: DirectoryLocation) => {
        const {location_metadata} = location
        const {
          name,
          address_line_1: addressLine1,
          town_city: townCity,
          postcode,
          location_id: locationId,
          merchant_internal_id: merchantInternalId,
        } = location_metadata

        const lowerCaseTextFilterValue = currentValue.toLowerCase()

        return name?.toLowerCase().includes(lowerCaseTextFilterValue) ||
        addressLine1?.toLowerCase().includes(lowerCaseTextFilterValue) ||
        townCity?.toLowerCase().includes(lowerCaseTextFilterValue) ||
        postcode?.toLowerCase().includes(lowerCaseTextFilterValue) ||
        locationId?.toLowerCase().includes(lowerCaseTextFilterValue) ||
        merchantInternalId?.toLowerCase().includes(lowerCaseTextFilterValue)
      })
    } else {
      return []
    }
  }

  const noItemsSelected = checkedRefArray.length === 0
  return (
    <>
      <div className='flex justify-between h-[71px] items-center px-[9px] sticky top-60 bg-white dark:bg-grey-825'>

        <div>
          <div className='flex gap-[10px] h-[71px] items-center'>
            <Button
              handleClick={requestBulkCommentModal}
              buttonSize={ButtonSize.SMALL}
              buttonWidth={ButtonWidth.AUTO}
              labelColour={LabelColour.GREY}
              borderColour={BorderColour.GREY}
              requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
              isDisabled={noItemsSelected}
              additionalStyles={`${noItemsSelected && 'opacity-40'}`}
            >Add Comments
            </Button>
            <Button
              handleClick={requestLocationDeleteModal}
              buttonSize={ButtonSize.SMALL}
              buttonWidth={ButtonWidth.MEDIUM}
              labelColour={LabelColour.RED}
              labelWeight={LabelWeight.SEMIBOLD}
              borderColour={BorderColour.RED}
              requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE}
              isDisabled={noItemsSelected}
              additionalStyles={`${noItemsSelected && 'opacity-40'}`}
            >Delete
            </Button>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button
            handleClick={() => setShouldShowFilters(!shouldShowFilters)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            borderColour={BorderColour.GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.REGULAR}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel={shouldShowFilters ? 'Hide filters' : 'Show filters'}
          >
           Filter <ArrowDownSvg className={`${shouldShowFilters && 'rotate-180'} duration-300 w-[15px] opacity-50  dark:fill-white`} alt=''/>
          </Button>
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
      </div>

      <DirectoryMerchantTableFilter isActive={shouldShowFilters} filterFn={locationFilteringFn} setFilteredList={setFilteredList} textFilterValue={textFilterValue} setTextFilterValue={setTextFilterValue} />

      {locationsData && (
        <DirectoryMerchantDetailsTable tableHeaders={locationsTableHeaders} tableRows={locationRows} singleViewRequestHandler={requestLocationSingleView} refArray={refArray} />
      )}
      {/* <DirectoryMerchantPaginationButton currentData={locationsData} setPageFn={setCurrentPage} currentPage={currentPage} setShouldSkipGetEntityByPage={setShouldSkipGetLocationsByPage} /> */}
    </>
  )
}

export default DirectoryMerchantLocations
