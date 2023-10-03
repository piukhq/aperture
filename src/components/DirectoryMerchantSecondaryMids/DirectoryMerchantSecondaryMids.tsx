import {useState, useEffect} from 'react'
import {Button, DirectoryMerchantDetailsTable, BulkActionsDropdown, DirectoryMerchantTableFilter} from 'components'
import {ButtonSize, LabelColour, LabelWeight, BorderColour, ButtonBackground, ButtonWidth} from 'components/Button/styles'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {getHarmoniaStatusString, getPaymentSchemeStatusString} from 'utils/statusStringFormat'
import {timeStampToDate} from 'utils/dateFormat'
import {useRouter} from 'next/router'
import {directoryMerchantSecondaryMidsApi} from 'services/DirectoryMerchantSecondaryMids'
import {setShouldRefreshEntityList, getShouldRefreshEntityList} from 'features/directoryMerchantSlice'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {DirectorySecondaryMids, DirectorySecondaryMid, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {setHarmoniaActionType} from 'features/directoryHarmoniaSlice'
import {setSelectedDirectoryMerchantEntity, setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import {CommentsSubjectTypes, HarmoniaActionTypes, ModalType, PaymentSchemeName, UserPermissions, BulkActionButtonStyle, DirectoryTxmStatusDisplayValue} from 'utils/enums'

const secondaryMidsTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
  {
    isPaymentIcon: true,
  },
  {
    displayValue: 'VALUE',
    additionalStyles: 'w-[160px]',
  },
  {
    displayValue: 'STORE NAME',
  },
  {
    displayValue: 'DATE ADDED',
  },
  {
    displayValue: 'SCHEME STATUS',
  },
  {
    displayValue: 'HARMONIA STATUS',
  },
]

const DirectoryMerchantSecondaryMids = () => {
  const dispatch = useAppDispatch()
  const shouldRefreshEntityList = useAppSelector(getShouldRefreshEntityList)
  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)
  const router = useRouter()
  const isMobileViewport = useIsMobileViewportDimensions()
  const {merchantId = '', planId} = useGetRouterQueryString()
  const [shouldShowFilters, setShouldShowFilters] = useState<boolean>(false)
  const [shouldShowAll, setShouldShowAll] = useState<boolean>(false)
  const [textFilterValue, setTextFilterValue] = useState<string>('')
  const [filteredList, setFilteredList] = useState<DirectorySecondaryMids>([])

  const {getMerchantSecondaryMidsResponse, getMerchantSecondaryMidsRefresh} = useDirectorySecondaryMids({
    skipGetSecondaryMid: true,
    planRef: planId,
    merchantRef: merchantId,
  })


  useEffect(() => { // handle update when harmonia status instructs an update on modal close
    if (shouldRefreshEntityList) {
      getMerchantSecondaryMidsRefresh()
      dispatch(directoryMerchantSecondaryMidsApi.util.invalidateTags(['MerchantSecondaryMid']))
      dispatch(setShouldRefreshEntityList(false))
    }
  }, [dispatch, getMerchantSecondaryMidsRefresh, shouldRefreshEntityList])

  useEffect(() => { // checks if there are more than 350 secondary mids to require the show all button
    getMerchantSecondaryMidsResponse && !shouldShowAll && setShouldShowAll(getMerchantSecondaryMidsResponse.length <= 350)
  }, [getMerchantSecondaryMidsResponse, shouldShowAll])

  const secondaryMidsData: DirectorySecondaryMids = textFilterValue.length > 1 ? filteredList : getMerchantSecondaryMidsResponse || []

  const visibleSecondaryMids = shouldShowAll ? secondaryMidsData : secondaryMidsData.slice(0, 350)

  const hydrateSecondaryMidsTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return visibleSecondaryMids.map((secondaryMidObj: DirectorySecondaryMid) => {
      const {date_added: dateAdded, secondary_mid_metadata: metadata, txm_status: txmStatus} = secondaryMidObj
      const {secondary_mid: secondaryMid, payment_scheme_slug: paymentSchemeSlug, payment_scheme_store_name: paymentSchemeStoreName, payment_enrolment_status: paymentEnrolmentStatus} = metadata
      return [
        {
          paymentSchemeSlug,
        },
        {
          displayValue: secondaryMid,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: paymentSchemeStoreName,
          additionalStyles: 'font-body-3 truncate',
        },
        {
          displayValue: timeStampToDate(dateAdded, {isShortDate: isMobileViewport}),
          additionalStyles: 'font-body-3 truncate',
        },
        {...getPaymentSchemeStatusString(paymentEnrolmentStatus)},
        {...getHarmoniaStatusString(txmStatus)},
      ]
    })
  }

  const refArray = visibleSecondaryMids?.map(secondaryMid => secondaryMid.secondary_mid_ref)

  const requestSecondaryMidSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(visibleSecondaryMids[index]))
    router.push(`${router.asPath.split('&ref')[0]}&ref=${visibleSecondaryMids[index].secondary_mid_ref}`, undefined, {scroll: false})
  }

  const requestSecondaryMidModal = (paymentScheme: PaymentSchemeName) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MID))
  }

  const setSelectedSecondaryMids = () => {
    const checkedSecondaryMidsToEntity = visibleSecondaryMids.filter((secondaryMid) => checkedRefArray.includes(secondaryMid.secondary_mid_ref)).map((secondaryMid) => ({
      entityRef: secondaryMid.secondary_mid_ref,
      entityValue: secondaryMid.secondary_mid_metadata.secondary_mid,
      paymentSchemeSlug: secondaryMid.secondary_mid_metadata.payment_scheme_slug,
      entitySchemeStatus: secondaryMid.secondary_mid_metadata.payment_enrolment_status,
    }))
    dispatch(setSelectedDirectoryEntityCheckedSelection(checkedSecondaryMidsToEntity))
  }

  const requestSecondaryMidDeleteModal = ():void => {
    setSelectedSecondaryMids()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE))
  }

  const requestBulkCommentModal = () => {
    setSelectedSecondaryMids()
    dispatch(setModalHeader('Secondary MID Comment'))
    dispatch(setCommentsOwnerRef(merchantId))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.SECONDARY_MID))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  const requestOnboardModal = ():void => {
    setSelectedSecondaryMids()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.ONBOARD))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
  }
  const requestOffboardModal = ():void => {
    setSelectedSecondaryMids()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.OFFBOARD))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
  }
  const requestUpdateModal = ():void => {
    setSelectedSecondaryMids()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.UPDATE))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
  }
  const requestSchemeStatusModal = ():void => {
    setSelectedSecondaryMids()
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
        handleClick: requestSecondaryMidDeleteModal,
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
                buttonWidth={buttonStyle === BulkActionButtonStyle.HARMONIA ? ButtonWidth.AUTO : ButtonWidth.MEDIUM}
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

  const secondaryMidFilteringFn = (currentValue:string) => {
    if (getMerchantSecondaryMidsResponse) {
      return getMerchantSecondaryMidsResponse.filter((secondaryMid:DirectorySecondaryMid) => {
        const {secondary_mid_metadata: metadata, txm_status: txmStatus} = secondaryMid
        const {
          secondary_mid: secondaryMidValue,
          payment_scheme_store_name: secondaryMidStoreName,
          payment_scheme_slug: paymentSchemeSlug,
          payment_enrolment_status: paymentEnrolmentStatus,
        } = metadata

        const lowerCaseTextFilterValue = currentValue.toLowerCase()
        // txm status uses a display value and we want to avoid clashes like 'onboarded' and 'Not onboarded'
        const txmStatusToCompare = DirectoryTxmStatusDisplayValue[txmStatus].substring(0, currentValue.length).toLowerCase()

        return secondaryMidValue.toLowerCase().includes(lowerCaseTextFilterValue)
          || secondaryMidStoreName?.toLowerCase().includes(lowerCaseTextFilterValue)
          || paymentSchemeSlug.toLowerCase().includes(lowerCaseTextFilterValue)
          || paymentEnrolmentStatus?.toLowerCase().includes(lowerCaseTextFilterValue)
          || txmStatusToCompare === lowerCaseTextFilterValue
      })
    } else {
      return []
    }
  }

  return (
    <>
      <div className='flex items-end justify-end gap-4 sticky top-60 bg-white dark:bg-grey-825'>
        {renderBulkActionButtons()}
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
            handleClick={() => requestSecondaryMidModal(PaymentSchemeName.VISA)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.VISA_BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel='Add Visa Secondary MID'
          >
            Add <AddVisaSvg className='pb-[1px] w-[39px]' alt=''/>
          </Button>

          <Button
            handleClick={() => requestSecondaryMidModal(PaymentSchemeName.MASTERCARD)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.MASTERCARD_BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel='Add Mastercard Secondary MID'
          >
            Add <AddMastercardSvg className='pb-[1px] w-[36px]' alt=''/>
          </Button>
        </div>
      </div>

      <DirectoryMerchantTableFilter isActive={shouldShowFilters} filterFn={secondaryMidFilteringFn} setFilteredList={setFilteredList} textFilterValue={textFilterValue} setTextFilterValue={setTextFilterValue} />

      {visibleSecondaryMids && (
        <DirectoryMerchantDetailsTable tableHeaders={secondaryMidsTableHeaders} tableRows={hydrateSecondaryMidsTableData()} singleViewRequestHandler={requestSecondaryMidSingleView} refArray={refArray} />
      )}

      { visibleSecondaryMids.length === 0 && textFilterValue.length > 1 && (
        <div className='flex flex-col items-center justify-center h-[100px]'>
          <p className='text-grey-600 dark:text-grey-400 text-center font-body-2'>No Secondary MIDs found</p>
        </div>
      )} { !shouldShowAll && getMerchantSecondaryMidsResponse && (
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

export default DirectoryMerchantSecondaryMids
