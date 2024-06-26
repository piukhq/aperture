import {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {isMatchingDateFilter} from 'utils/filters'
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

// Sorting functionality, what table fields to allow sort by and what property to sort by
type SortableField = 'NAME' | 'DATE ADDED' | 'ADDRESS' | 'TOWN' | 'POSTCODE' | 'LOCATION ID' | 'INTERNAL ID'
const fieldToPropertyMapping = {
  'NAME': {isMetadataField: true, property: 'name'},
  'DATE ADDED': {isMetadataField: false, property: 'date_added'},
  'ADDRESS': {isMetadataField: true, property: 'address_line_1'},
  'TOWN': {isMetadataField: true, property: 'town_city'},
  'POSTCODE': {isMetadataField: true, property: 'postcode'},
  'LOCATION ID': {isMetadataField: true, property: 'location_id'},
  'INTERNAL ID': {isMetadataField: true, property: 'merchant_internal_id'},
}
const initialSortingState = {
  'DATE ADDED': true,
  'NAME': false,
  'ADDRESS': false,
  'TOWN': false,
  'POSTCODE': false,
  'LOCATION ID': false,
  'INTERNAL ID': false,
}


const DirectoryMerchantLocations = ({locationLabel}: Props) => {
  const router = useRouter()
  const {merchantId = '', planId = ''} = useGetRouterQueryString()
  const isMobileViewport = useIsMobileViewportDimensions()
  const [shouldShowFilters, setShouldShowFilters] = useState<boolean>(false)
  const [shouldShowAll, setShouldShowAll] = useState<boolean>(false)
  const [textFilterValue, setTextFilterValue] = useState<string>('')
  const [filteredList, setFilteredList] = useState<DirectoryLocations>([])
  const [hasDateFilter, setHasDateFilter] = useState<boolean>(false)
  const [sortedList, setSortedList] = useState<DirectoryLocations>([])
  const [fieldSortedBy, setFieldSortedBy] = useState<SortableField>('DATE ADDED')
  const [sortFieldsAscendingTracker, setSortFieldsAscendingTracker] = useState(initialSortingState)

  const resetSorting = () => { // We reset sorting when filters are applied/removed.
    setSortedList([])
    setFieldSortedBy('DATE ADDED')
    setSortFieldsAscendingTracker(initialSortingState)
  }

  const hasActiveFilters = textFilterValue.length > 1 || hasDateFilter
  useEffect(() => {
    hasActiveFilters && resetSorting()
  }, [hasActiveFilters])

  const dispatch = useAppDispatch()
  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantLocationsResponse} = useDirectoryLocations({
    skipGetLocation: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  useEffect(() => { // checks if there are more than 350 locations to require the show all button
    getMerchantLocationsResponse && !shouldShowAll && setShouldShowAll(getMerchantLocationsResponse.length <= 350)
  }, [getMerchantLocationsResponse, shouldShowAll])

  const locationsTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
    {
      displayValue: 'NAME',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['NAME'],
    },
    {
      displayValue: 'DATE ADDED',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['DATE ADDED'],
    },
    {
      additionalStyles: 'w-[100px]',
      displayValue: 'PHYSICAL',
    },
    {
      displayValue: 'ADDRESS',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['ADDRESS'],
    },
    {
      displayValue: 'TOWN',
      additionalStyles: isMobileViewport ? 'hidden' : '',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['TOWN'],
    },
    {
      displayValue: 'POSTCODE',
      additionalStyles: isMobileViewport ? 'hidden' : '',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['POSTCODE'],
    },
    {
      displayValue: 'LOCATION ID',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['LOCATION ID'],
    },
    {
      displayValue: 'INTERNAL ID',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['INTERNAL ID'],
    },
  ]

  const allLocations: DirectoryLocations = useMemo(() => (textFilterValue.length > 1 || hasDateFilter) ? filteredList : getMerchantLocationsResponse || [], [filteredList, getMerchantLocationsResponse, hasDateFilter, textFilterValue.length])
  const potentiallyTruncatedLocations = shouldShowAll ? allLocations : allLocations.slice(0, 350)
  const visibleLocations = sortedList.length > 0 ? sortedList : potentiallyTruncatedLocations

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

    return visibleLocations?.reduce((accumulator, locationObj: DirectoryLocation) => {
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
  }, [isMobileViewport, visibleLocations])

  const locationRowObjects = getLocationTableRowObjects()
  const refArray = locationRowObjects?.map(locationRowObj => locationRowObj.ref)
  const locationRows = locationRowObjects?.map(locationRowObj => locationRowObj.row)

  // Set selected location/sub-location in redux store and open correct modal
  const requestLocationSingleView = (index: number): void => {
    const {isSubLocation, ref: locationRef} = locationRowObjects[index]
    const baseUrl = router.asPath.split('&ref')[0]

    if (isSubLocation) {
      const subLocationObj = visibleLocations?.reduce((accumulator: {subLocation: DirectoryLocation, parentLocationRef: string}, location: DirectoryLocation) => {
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
      const location = visibleLocations.find(location => location.location_ref === locationRef)
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

  const locationFilteringFn = (currentValue:string, fromDateFilterValue: string = '', toDateFilterValue: string = '') => {
    if (getMerchantLocationsResponse) {
      setShouldShowAll(true)
      return getMerchantLocationsResponse.filter((location: DirectoryLocation) => {
        const {location_metadata, date_added: dateAdded} = location
        const {
          name,
          address_line_1: addressLine1,
          town_city: townCity,
          postcode,
          location_id: locationId,
          merchant_internal_id: merchantInternalId,
        } = location_metadata


        if (!isMatchingDateFilter(dateAdded, fromDateFilterValue, toDateFilterValue, setHasDateFilter)) {
          return false
        }

        // Text Filtering
        if (textFilterValue.length <= 1) {
          return true // no text filter
        }
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


  const sortingFunctionContainer = (field: SortableField) => {
    setShouldShowAll(true)
    const isMetadataField = fieldToPropertyMapping[field].isMetadataField
    const property = fieldToPropertyMapping[field].property
    const metadata = 'location_metadata'

    const sortFn = (a: DirectoryLocation, b: DirectoryLocation) => {
      const aProperty = isMetadataField ? a[metadata][property] : a[property]
      const bProperty = isMetadataField ? b[metadata][property] : b[property]

      if (sortFieldsAscendingTracker[field]) {
        return aProperty?.localeCompare(bProperty)
      } else {
        return bProperty?.localeCompare(aProperty)
      }
    }

    setFieldSortedBy(field)
    setSortedList([...allLocations].sort(sortFn))
    setSortFieldsAscendingTracker({...sortFieldsAscendingTracker, [field]: !sortFieldsAscendingTracker[field]})
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

      <DirectoryMerchantTableFilter
        isActive={shouldShowFilters}
        filterFn={locationFilteringFn}
        setFilteredList={setFilteredList}
        textFilterValue={textFilterValue}
        setTextFilterValue={setTextFilterValue}
        setHasDateFilter={setHasDateFilter}
        resetSortingFn={resetSorting}
      />

      {visibleLocations && (
        <DirectoryMerchantDetailsTable
          fieldSortedBy={fieldSortedBy}
          sortingFn={sortingFunctionContainer}
          tableHeaders={locationsTableHeaders}
          tableRows={locationRows}
          singleViewRequestHandler={requestLocationSingleView}
          refArray={refArray}
        />
      )}

      { visibleLocations.length === 0 && getMerchantLocationsResponse && (
        <div className='flex flex-col items-center justify-center h-[100px]'>
          <p className='text-grey-600 dark:text-grey-400 text-center font-body-2'>No Locations found</p>
        </div>
      )}

      { !shouldShowAll && getMerchantLocationsResponse && (
        <div className='w-full flex justify-center my-8'>
          <Button
            handleClick={() => setShouldShowAll(true)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
          ><ArrowDownSvg fill='white' />Show All
          </Button>
        </div>
      )}
    </>
  )
}

export default DirectoryMerchantLocations
