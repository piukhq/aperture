import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable, DirectoryMerchantPaginationButton, BulkActionsDropdown} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour, ButtonBackground} from 'components/Button/styles'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {getHarmoniaStatusString, getPaymentSchemeStatusString} from 'utils/statusStringFormat'
import {timeStampToDate} from 'utils/dateFormat'
import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {DirectorySecondaryMids, DirectorySecondaryMid, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {setHarmoniaActionType} from 'features/directoryHarmoniaSlice'
import {setSelectedDirectoryMerchantEntity, setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import {CommentsSubjectTypes, HarmoniaActionTypes, ModalType, PaymentSchemeName, UserPermissions, BulkActionButtonStyle} from 'utils/enums'

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
  const router = useRouter()
  const isMobileViewport = useIsMobileViewportDimensions()
  const {merchantId = '', planId} = useGetRouterQueryString()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [shouldSkipGetSecondaryMidsByPage, setShouldSkipGetSecondaryMidsByPage] = useState<boolean>(true)

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantSecondaryMidsResponse} = useDirectorySecondaryMids({
    skipGetSecondaryMid: true,
    skipGetSecondaryMidsByPage: shouldSkipGetSecondaryMidsByPage,
    planRef: planId,
    merchantRef: merchantId,
    page: currentPage.toString(),
  })

  const secondaryMidsData: DirectorySecondaryMids = getMerchantSecondaryMidsResponse || []

  const hydrateSecondaryMidsTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return secondaryMidsData.map((secondaryMidObj: DirectorySecondaryMid) => {
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

  const refArray = secondaryMidsData?.map(secondaryMid => secondaryMid.secondary_mid_ref)

  const requestSecondaryMidSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(secondaryMidsData[index]))
    router.push(`${router.asPath.split('&ref')[0]}&ref=${secondaryMidsData[index].secondary_mid_ref}`, undefined, {scroll: false})

  }

  const requestSecondaryMidModal = (paymentScheme: PaymentSchemeName) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MID))
  }

  const setSelectedSecondaryMids = () => {
    const checkedSecondaryMidsToEntity = secondaryMidsData.filter((secondaryMid) => checkedRefArray.includes(secondaryMid.secondary_mid_ref)).map((secondaryMid) => ({
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
        label: 'Comments',
        handleClick: requestBulkCommentModal,
        buttonStyle: BulkActionButtonStyle.COMMENT,
      },
      {
        label: 'Delete',
        handleClick: requestSecondaryMidDeleteModal,
        buttonStyle: BulkActionButtonStyle.DELETE,
      },
    ]
    const noItemsSelected = checkedRefArray.length === 0
    if (isMobileViewport) {
      return (
        <BulkActionsDropdown actionsMenuItems={actionsMenuItems} isDisabled={noItemsSelected}/>
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

  return (
    <>
      <div className='flex items-end justify-end gap-4'>
        {renderBulkActionButtons()}
        <div className='flex gap-[10px] h-[71px] items-center justify-end'>
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

      {secondaryMidsData && (
        <DirectoryMerchantDetailsTable tableHeaders={secondaryMidsTableHeaders} tableRows={hydrateSecondaryMidsTableData()} singleViewRequestHandler={requestSecondaryMidSingleView} refArray={refArray} />
      )}

      <DirectoryMerchantPaginationButton currentData={secondaryMidsData} setPageFn={setCurrentPage} currentPage={currentPage} setShouldSkipGetEntityByPage={setShouldSkipGetSecondaryMidsByPage} />
    </>
  )
}

export default DirectoryMerchantSecondaryMids
