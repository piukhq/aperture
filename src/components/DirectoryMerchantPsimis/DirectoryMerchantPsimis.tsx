import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable, DirectoryMerchantPaginationButton, BulkActionsDropdown} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour, ButtonBackground} from 'components/Button/styles'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, HarmoniaActionTypes, ModalType, PaymentSchemeName, UserPermissions, BulkActionButtonStyle} from 'utils/enums'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import {DirectoryPsimi, DirectoryPsimis, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {getHarmoniaStatusString} from 'utils/statusStringFormat'
import {timeStampToDate} from 'utils/dateFormat'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
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
  const router = useRouter()
  const isMobileViewport = useIsMobileViewportDimensions()
  const {merchantId, planId} = useGetRouterQueryString()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [shouldSkipGetPsimisByPage, setShouldSkipGetPsimisByPage] = useState<boolean>(true)

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantPsimisResponse} = useDirectoryPsimis({
    skipGetPsimi: true,
    skipGetPsimisByPage: shouldSkipGetPsimisByPage,
    planRef: planId,
    merchantRef: merchantId,
    page: currentPage.toString(),
  })

  const psimisData: DirectoryPsimis = getMerchantPsimisResponse

  const hydratePsimisTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return psimisData.map((psimiObj: DirectoryPsimi) => {
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
          displayValue: timeStampToDate(dateAdded, isMobileViewport),
          additionalStyles: 'font-body-3 truncate',
        },
        {...getHarmoniaStatusString(txmStatus)},
      ]
    })
  }

  const refArray = psimisData?.map(psimi => psimi.psimi_ref)

  const requestPsimiSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(psimisData[index]))
    router.push(`${router.asPath.split('&ref')[0]}&ref=${psimisData[index].psimi_ref}`, undefined, {scroll: false})
  }

  const setSelectedPsimis = () => {
    const checkedPsimisToEntity = psimisData.filter((psimi) => checkedRefArray.includes(psimi.psimi_ref)).map((psimi) => ({
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
    // TODO: Will possibly need to change from Psimis to PSIMIs
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

  const renderCheckedItemButtons = ():JSX.Element => {
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
        label: 'Comments',
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
              >{label}
              </Button>
            )
          })}
        </div>
      )
    }
  }


  return (
    <>
      <div className='flex items-end justify-end gap-4'>
        {checkedRefArray.length > 0 && renderCheckedItemButtons()}
        <div className='flex gap-[10px] h-[71px] items-center justify-end'>
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
      {psimisData && (
        <DirectoryMerchantDetailsTable tableHeaders={psimisTableHeaders} tableRows={hydratePsimisTableData()} singleViewRequestHandler={requestPsimiSingleView} refArray={refArray} />
      )}
      <DirectoryMerchantPaginationButton currentData={psimisData} setPageFn={setCurrentPage} currentPage={currentPage} setShouldSkipGetEntityByPage={setShouldSkipGetPsimisByPage} />
    </>
  )
}

export default DirectoryMerchantPsimis
