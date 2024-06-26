import {useEffect, useState} from 'react'
import {DirectoryMerchantDetailsTable, Button, BulkActionsDropdown, DirectoryMerchantTableFilter} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {useRouter} from 'next/router'
import {CommentsSubjectTypes, HarmoniaActionTypes, ModalType, PaymentSchemeName, UserPermissions, BulkActionButtonStyle, DirectoryTxmStatusDisplayValue} from 'utils/enums'
import {DirectoryMids, DirectoryMid, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {getHarmoniaStatusString, getPaymentSchemeStatusString} from 'utils/statusStringFormat'
import {timeStampToDate} from 'utils/dateFormat'
import {isMatchingDateFilter} from 'utils/filters'
import {directoryMerchantMidsApi} from 'services/DirectoryMerchantMids'
import {setShouldRefreshEntityList, getShouldRefreshEntityList} from 'features/directoryMerchantSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import {setModalHeader, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {setHarmoniaActionType} from 'features/directoryHarmoniaSlice'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import AddAmexSvg from 'icons/svgs/add-amex.svg'

// Sorting functionality, what table fields to allow sort by and what property to sort by
type SortableField = 'VALUE' | 'DATE ADDED'
const fieldToPropertyMapping = {
  'VALUE': {isMetadataField: true, property: 'mid'},
  'DATE ADDED': {isMetadataField: false, property: 'date_added'},
}

const DirectoryMerchantMids = () => {
  const dispatch = useAppDispatch()
  const shouldRefreshEntityList = useAppSelector(getShouldRefreshEntityList)
  const router = useRouter()
  const {planId, merchantId = ''} = useGetRouterQueryString()
  const isMobileViewport = useIsMobileViewportDimensions()
  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const [shouldShowFilters, setShouldShowFilters] = useState<boolean>(false)
  const [shouldShowAll, setShouldShowAll] = useState<boolean>(false)
  const [textFilterValue, setTextFilterValue] = useState<string>('')
  const [hasDateFilter, setHasDateFilter] = useState<boolean>(false)
  const [filteredList, setFilteredList] = useState<DirectoryMids>([])
  const [sortedList, setSortedList] = useState<DirectoryMids>([])
  const [fieldSortedBy, setFieldSortedBy] = useState<SortableField>('DATE ADDED')
  const [sortFieldsAscendingTracker, setSortFieldsAscendingTracker] = useState({
    'DATE ADDED': true,
    'VALUE': false,
  })

  const {getMerchantMidsResponse, getMerchantMidsRefresh} = useDirectoryMids({
    skipGetMid: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const resetSorting = () => { // We reset sorting when filters are applied/removed.
    setSortedList([])
    setFieldSortedBy('DATE ADDED')
    setSortFieldsAscendingTracker({
      'DATE ADDED': true,
      'VALUE': false,
    })
  }

  const hasActiveFilters = textFilterValue.length > 1 || hasDateFilter
  useEffect(() => {
    hasActiveFilters && resetSorting()
  }, [hasActiveFilters])

  // Logic to work out what data to display, in the order of filtered, truncated sorted...
  const allMids: DirectoryMids = hasActiveFilters ? filteredList : getMerchantMidsResponse || []
  const potentiallyTruncatedMids: DirectoryMids = shouldShowAll ? allMids : allMids.slice(0, 350)
  const visibleMids = sortedList.length > 0 ? sortedList : potentiallyTruncatedMids

  useEffect(() => { // handle update when harmonia status instructs an update on modal close
    if (shouldRefreshEntityList) {
      getMerchantMidsRefresh()
      dispatch(directoryMerchantMidsApi.util.invalidateTags(['MerchantMid']))
      dispatch(setShouldRefreshEntityList(false))
    }
  }, [dispatch, getMerchantMidsRefresh, getMerchantMidsResponse, shouldRefreshEntityList])

  useEffect(() => { // checks if there are more than 350 mids to require the show all button
    getMerchantMidsResponse && !shouldShowAll && setShouldShowAll(getMerchantMidsResponse.length <= 350)
  }, [getMerchantMidsResponse, shouldShowAll])

  const midsTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
    {
      isPaymentIcon: true,
    },
    {
      displayValue: 'VALUE',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker.VALUE,
    },
    {
      displayValue: 'BIN',
    },
    {
      displayValue: 'DATE ADDED',
      isSortable: true,
      isCurrentSortDirectionAscending: sortFieldsAscendingTracker['DATE ADDED'],
    },
    {
      displayValue: 'SCHEME STATUS',
    },
    {
      displayValue: 'HARMONIA STATUS',
    },
  ]
  // TODO: Would be good to have this in a hook once the data is retrieved from the api
  const hydrateMidTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return visibleMids.map((midObj: DirectoryMid) => {
      const {date_added: dateAdded, mid_metadata: metadata, txm_status: txmStatus} = midObj
      const {payment_scheme_slug: paymentSchemeSlug, mid, visa_bin: visaBin, payment_enrolment_status: paymentEnrolmentStatus = ''} = metadata
      return [
        {
          paymentSchemeSlug,
        },
        {
          displayValue: mid,
          isSortable: true,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: visaBin,
          additionalStyles: 'font-body-3 truncate',
        },
        {
          displayValue: timeStampToDate(dateAdded, {isShortDate: isMobileViewport}),
          isSortable: true,
          additionalStyles: 'font-body-3 truncate',
        },
        {...getPaymentSchemeStatusString(paymentEnrolmentStatus)},
        {...getHarmoniaStatusString(txmStatus)},
      ]
    })
  }

  const refArray = visibleMids?.map(mid => mid.mid_ref)

  const requestMidModal = (paymentScheme: PaymentSchemeName) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MID))
  }

  const requestMidSingleView = (index:number):void => {
    const requestedMid = visibleMids[index]
    dispatch(setSelectedDirectoryMerchantEntity(requestedMid))
    router.push(`${router.asPath.split('&ref')[0]}&ref=${requestedMid.mid_ref}`, undefined, {scroll: false})
  }
  const setSelectedMids = () => {
    const checkedMidsToEntity = visibleMids.filter((mid) => checkedRefArray.includes(mid.mid_ref)).map((mid) => ({
      entityRef: mid.mid_ref,
      entityValue: mid.mid_metadata.mid,
      paymentSchemeSlug: mid.mid_metadata.payment_scheme_slug,
      entitySchemeStatus: mid.mid_metadata.payment_enrolment_status,
    }))
    dispatch(setSelectedDirectoryEntityCheckedSelection(checkedMidsToEntity))
  }

  const requestMidDeleteModal = ():void => {
    setSelectedMids()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MIDS_DELETE))
  }

  const requestBulkCommentModal = () => {
    setSelectedMids()
    dispatch(setModalHeader('MID Comment'))
    dispatch(setCommentsOwnerRef(merchantId))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.MID))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  const requestOnboardModal = ():void => {
    setSelectedMids()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.ONBOARD))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
  }
  const requestOffboardModal = ():void => {
    setSelectedMids()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.OFFBOARD))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
  }
  const requestUpdateModal = ():void => {
    setSelectedMids()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.UPDATE))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
  }

  const requestSchemeStatusModal = ():void => {
    setSelectedMids()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_SCHEME_STATUS))
  }

  const renderBulkActionButtons = ():JSX.Element => {
    const actionsMenuItems = [
      {
        label: 'Onboard',
        handleClick: requestOnboardModal,
        buttonStyle: BulkActionButtonStyle.HARMONIA,
      },
      {
        label: 'Offboard',
        handleClick: requestOffboardModal,
        buttonStyle: BulkActionButtonStyle.HARMONIA,
      },
      {
        label: 'Update',
        handleClick: requestUpdateModal,
        buttonStyle: BulkActionButtonStyle.HARMONIA,
      },
      {
        label: 'Scheme Status',
        handleClick: requestSchemeStatusModal,
        buttonStyle: BulkActionButtonStyle.HARMONIA,
      },

      {
        label: 'Add Comments',
        handleClick: requestBulkCommentModal,
        buttonStyle: BulkActionButtonStyle.COMMENT,
      },
      {
        label: 'Delete',
        handleClick: requestMidDeleteModal,
        buttonStyle: BulkActionButtonStyle.DELETE,
      },
    ]

    if (isMobileViewport) {
      return (
        <BulkActionsDropdown isDisabled={checkedRefArray.length === 0} actionsMenuItems={actionsMenuItems}/>
      )
    } else {
      const noItemsSelected = checkedRefArray.length === 0
      return (
        <div className='flex gap-[10px] items-center h-max py-4 flex-wrap w-full justify-start'>
          {actionsMenuItems.map((actionMenuItem) => {
            const {label, handleClick, buttonStyle} = actionMenuItem
            return (
              <Button
                key={label}
                handleClick={handleClick}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={buttonStyle === BulkActionButtonStyle.HARMONIA ? ButtonWidth.AUTO : ButtonWidth.AUTO}
                labelColour={buttonStyle !== BulkActionButtonStyle.DELETE ? LabelColour.GREY : LabelColour.RED}
                borderColour={BorderColour.GREY}
                requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
                isDisabled={noItemsSelected}
                additionalStyles={`${noItemsSelected && 'opacity-40'}`}
              >{label}
              </Button>
            )
          })}
        </div>
      )
    }
  }

  const midFilteringFn = (textFilterValue:string, fromDateFilterValue: string = '', toDateFilterValue: string = '') => {
    if (getMerchantMidsResponse) {
      setShouldShowAll(true)
      return getMerchantMidsResponse.filter((mid:DirectoryMid) => {

        const {mid_metadata: metadata, txm_status: txmStatus, date_added: dateAdded} = mid
        const {
          mid: midValue,
          visa_bin: visaBin,
          payment_scheme_slug: paymentSchemeSlug,
          payment_enrolment_status: paymentEnrolmentStatus,
        } = metadata

        if (!isMatchingDateFilter(dateAdded, fromDateFilterValue, toDateFilterValue, setHasDateFilter)) {
          return false
        }

        // Text Filtering
        if (textFilterValue.length <= 1) {
          return true // no text filter
        }

        const lowerCaseTextFilterValue = textFilterValue.toLowerCase()
        // txm status uses a display value and we want to avoid clashes like 'onboarded' and 'Not onboarded'
        const txmStatusToCompare = DirectoryTxmStatusDisplayValue[txmStatus].substring(0, textFilterValue.length).toLowerCase()
        return midValue.toLowerCase().includes(lowerCaseTextFilterValue)
          || visaBin?.toLowerCase().includes(lowerCaseTextFilterValue)
          || paymentSchemeSlug.toLowerCase().includes(lowerCaseTextFilterValue)
          || paymentEnrolmentStatus?.toLowerCase().includes(lowerCaseTextFilterValue)
          || txmStatusToCompare === lowerCaseTextFilterValue
      })
    } else {
      return []
    }
  }

  const sortingFunctionContainer = (field: SortableField) => {
    setShouldShowAll(true)
    const isMetadataField = fieldToPropertyMapping[field].isMetadataField
    const property = fieldToPropertyMapping[field].property

    const sortFn = (a: DirectoryMid, b: DirectoryMid) => {
      const aProperty = isMetadataField ? a.mid_metadata[property] : a[property]
      const bProperty = isMetadataField ? b.mid_metadata[property] : b[property]

      if (sortFieldsAscendingTracker[field]) {
        return aProperty?.localeCompare(bProperty)
      } else {
        return bProperty?.localeCompare(aProperty)
      }
    }

    setFieldSortedBy(field)
    setSortedList([...allMids].sort(sortFn))
    setSortFieldsAscendingTracker({...sortFieldsAscendingTracker, [field]: !sortFieldsAscendingTracker[field]})
  }

  return (
    <>
      <div className='flex items-end justify-end gap-4 sticky top-60 bg-white dark:bg-grey-825'>
        {renderBulkActionButtons() }
        <div className='flex gap-[10px] h-[71px] items-center justify-end'>
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
            handleClick={() => requestMidModal(PaymentSchemeName.VISA)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.VISA_BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel='Add Visa MID'
          >
            Add <AddVisaSvg className='pb-[1px] w-[39px]' alt=''/>
          </Button>

          <Button
            handleClick={() => requestMidModal(PaymentSchemeName.MASTERCARD)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.MASTERCARD_BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel='Add Mastercard MID'
          >
            Add <AddMastercardSvg className='pb-[1px] w-[36px]' alt=''/>
          </Button>
          <Button
            handleClick={() => requestMidModal(PaymentSchemeName.AMEX)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.AMEX_BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel='Add AMEX MID'
          >
            Add <AddAmexSvg className='pb-[1px] w-[55px]' alt=''/>
          </Button>
        </div>
      </div>

      <DirectoryMerchantTableFilter
        isActive={shouldShowFilters}
        filterFn={midFilteringFn}
        setFilteredList={setFilteredList}
        textFilterValue={textFilterValue}
        setTextFilterValue={setTextFilterValue}
        setHasDateFilter={setHasDateFilter}
        resetSortingFn={resetSorting}
      />

      {visibleMids && (
        <DirectoryMerchantDetailsTable
          fieldSortedBy={fieldSortedBy}
          sortingFn={sortingFunctionContainer}
          tableHeaders={midsTableHeaders}
          tableRows={hydrateMidTableData()}
          singleViewRequestHandler={requestMidSingleView}
          refArray={refArray}
        />
      )}

      { visibleMids.length === 0 && getMerchantMidsResponse && (
        <div className='flex flex-col items-center justify-center h-[100px]'>
          <p className='text-grey-600 dark:text-grey-400 text-center font-body-2'>No MIDs found</p>
        </div>
      )}

      { !shouldShowAll && getMerchantMidsResponse && (
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

export default DirectoryMerchantMids
