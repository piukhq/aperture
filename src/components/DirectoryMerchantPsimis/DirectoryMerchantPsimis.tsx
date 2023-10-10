import {useState, useEffect} from 'react'
import {Button, DirectoryMerchantDetailsTable, BulkActionsDropdown, DirectoryMerchantTableFilter} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour, ButtonBackground} from 'components/Button/styles'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useRouter} from 'next/router'
import {directoryMerchantPsimisApi} from 'services/DirectoryMerchantPsimis'
import {setShouldRefreshEntityList, getShouldRefreshEntityList} from 'features/directoryMerchantSlice'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, HarmoniaActionTypes, ModalType, PaymentSchemeName, UserPermissions, BulkActionButtonStyle, DirectoryTxmStatusDisplayValue} from 'utils/enums'
import {isMatchingDateFilter} from 'utils/filters'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import {DirectoryPsimi, DirectoryPsimis, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {getHarmoniaStatusString} from 'utils/statusStringFormat'
import {timeStampToDate} from 'utils/dateFormat'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import {setHarmoniaActionType} from 'features/directoryHarmoniaSlice'

const psimisTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
  {
    isPaymentIcon: true,
  },
  {
    displayValue: 'VALUE',
    additionalStyles: 'w-[160px]',
  },
  {
    displayValue: 'SCHEME NAME',
  },
  {
    displayValue: 'DATE ADDED',
  },
  {
    displayValue: 'HARMONIA STATUS',
  },
]

const DirectoryMerchantPsimis = () => {
  const dispatch = useAppDispatch()
  const shouldRefreshEntityList = useAppSelector(getShouldRefreshEntityList)
  const router = useRouter()
  const isMobileViewport = useIsMobileViewportDimensions()
  const {merchantId = '', planId} = useGetRouterQueryString()
  const [shouldShowAll, setShouldShowAll] = useState<boolean>(false)
  const [shouldShowFilters, setShouldShowFilters] = useState<boolean>(false)
  const [textFilterValue, setTextFilterValue] = useState<string>('')
  const [filteredList, setFilteredList] = useState<DirectoryPsimis>([])
  const [hasDateFilter, setHasDateFilter] = useState<boolean>(false)

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantPsimisResponse, getMerchantPsimisRefresh} = useDirectoryPsimis({
    skipGetPsimi: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  useEffect(() => { // handle update when harmonia status instructs an update on modal close
    if (shouldRefreshEntityList) {
      getMerchantPsimisRefresh()
      dispatch(directoryMerchantPsimisApi.util.invalidateTags(['MerchantPsimi']))
      dispatch(setShouldRefreshEntityList(false))
    }
  }, [dispatch, getMerchantPsimisRefresh, shouldRefreshEntityList])

  useEffect(() => { // checks if there are more than 350 psimis to show the show all button
    getMerchantPsimisResponse && !shouldShowAll && setShouldShowAll(getMerchantPsimisResponse.length <= 350)
  }, [getMerchantPsimisResponse, shouldShowAll])

  const psimisData:DirectoryPsimis = (textFilterValue.length > 1 || hasDateFilter) ? filteredList : getMerchantPsimisResponse || []

  const visiblePsimis = shouldShowAll ? psimisData : psimisData.slice(0, 350)

  const hydratePsimisTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return visiblePsimis.map((psimiObj: DirectoryPsimi) => {
      const {date_added: dateAdded, psimi_metadata: metadata, txm_status: txmStatus} = psimiObj
      const {value, payment_scheme_merchant_name: paymentSchemeMerchantName, payment_scheme_slug: paymentSchemeSlug} = metadata
      return [
        {
          paymentSchemeSlug,
        },
        {
          displayValue: value,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: paymentSchemeMerchantName,
          additionalStyles: 'font-body-3 truncate',
        },
        {
          displayValue: timeStampToDate(dateAdded, {isShortDate: isMobileViewport}),
          additionalStyles: 'font-body-3 truncate',
        },
        {...getHarmoniaStatusString(txmStatus)},
      ]
    })
  }

  const refArray = visiblePsimis?.map(psimi => psimi.psimi_ref)

  const requestPsimiSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(visiblePsimis[index]))
    router.push(`${router.asPath.split('&ref')[0]}&ref=${visiblePsimis[index].psimi_ref}`, undefined, {scroll: false})
  }

  const setSelectedPsimis = () => {
    const checkedPsimisToEntity = visiblePsimis.filter((psimi) => checkedRefArray.includes(psimi.psimi_ref)).map((psimi) => ({
      entityRef: psimi.psimi_ref,
      entityValue: psimi.psimi_metadata.value,
      paymentSchemeSlug: psimi.psimi_metadata.payment_scheme_slug,
    }))
    dispatch(setSelectedDirectoryEntityCheckedSelection(checkedPsimisToEntity))
  }

  const requestPsimiModal = (paymentScheme: PaymentSchemeName) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PSIMI))
  }

  const requestPsimiDeleteModal = ():void => {
    setSelectedPsimis()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PSIMIS_DELETE))
  }

  const requestBulkCommentModal = () => {
    setSelectedPsimis()
    dispatch(setModalHeader('PSIMI Comment'))
    dispatch(setCommentsOwnerRef(merchantId))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.PSIMI))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  const requestOnboardModal = ():void => {
    setSelectedPsimis()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.ONBOARD))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
  }
  const requestOffboardModal = ():void => {
    setSelectedPsimis()
    dispatch(setHarmoniaActionType(HarmoniaActionTypes.OFFBOARD))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_HARMONIA))
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
        label: 'Add Comments',
        handleClick: requestBulkCommentModal,
        buttonStyle: BulkActionButtonStyle.COMMENT,
      },
      {
        label: 'Delete',
        handleClick: requestPsimiDeleteModal,
        buttonStyle: BulkActionButtonStyle.DELETE,
      },
    ]

    if (isMobileViewport) {
      return (
        <BulkActionsDropdown actionsMenuItems={actionsMenuItems}/>
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

  const psimiFilteringFn = (currentValue: string, fromDateFilterValue: string = '', toDateFilterValue: string = '') => {
    if (getMerchantPsimisResponse) {
      setShouldShowAll(true)
      return getMerchantPsimisResponse?.filter((psimi) => {
        const {value, payment_scheme_merchant_name: paymentSchemeMerchantName} = psimi.psimi_metadata
        const dateAdded = psimi.date_added

        const lowerCaseTextFilterValue = currentValue.toLowerCase()
        const txmStatusToCompare = DirectoryTxmStatusDisplayValue[psimi.txm_status].substring(0, currentValue.length).toLowerCase()

        if (!isMatchingDateFilter(dateAdded, fromDateFilterValue, toDateFilterValue, setHasDateFilter)) {
          return false
        }

        if (textFilterValue.length <= 1) {
          return true
        }

        return value.toLowerCase().includes(lowerCaseTextFilterValue)
          || paymentSchemeMerchantName && paymentSchemeMerchantName.toLowerCase().includes(lowerCaseTextFilterValue)
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
            ariaLabel='Show filters'
          >
           Filter <ArrowDownSvg className={`${shouldShowFilters && 'rotate-180'} duration-300 w-[15px] opacity-50  dark:fill-white`} alt=''/>
          </Button>
          <Button
            handleClick={() => requestPsimiModal(PaymentSchemeName.VISA)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.VISA_BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel='Add Visa PSIMI'
          >
            Add <AddVisaSvg className='pb-[1px] w-[39px]' alt=''/>
          </Button>
          <Button
            handleClick={() => requestPsimiModal(PaymentSchemeName.MASTERCARD)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.MASTERCARD_BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel='Add Mastercard PSIMI'
          >
            Add <AddMastercardSvg className='pb-[1px] w-[36px]' alt=''/>
          </Button>
        </div>
      </div>

      <DirectoryMerchantTableFilter isActive={shouldShowFilters} filterFn={psimiFilteringFn} setFilteredList={setFilteredList} textFilterValue={textFilterValue} setTextFilterValue={setTextFilterValue} />

      {visiblePsimis && (
        <DirectoryMerchantDetailsTable tableHeaders={psimisTableHeaders} tableRows={hydratePsimisTableData()} singleViewRequestHandler={requestPsimiSingleView} refArray={refArray} />
      )}

      { visiblePsimis.length === 0 && getMerchantPsimisResponse && (
        <div className='flex flex-col items-center justify-center h-[100px]'>
          <p className='text-grey-600 dark:text-grey-400 text-center font-body-2'>No PSIMIs found</p>
        </div>
      )}

      { !shouldShowAll && getMerchantPsimisResponse && (
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

export default DirectoryMerchantPsimis
