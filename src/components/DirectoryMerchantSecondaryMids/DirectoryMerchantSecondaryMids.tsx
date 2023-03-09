import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable, DirectoryMerchantPaginationButton} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour, ButtonBackground} from 'components/Button/styles'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {getHarmoniaStatusString, getPaymentSchemeStatusString} from 'utils/statusStringFormat'
import {CommentsSubjectTypes, ModalType, PaymentSchemeName, UserPermissions} from 'utils/enums'
import {timeStampToDate} from 'utils/dateFormat'
import {useRouter} from 'next/router'
import {DirectorySecondaryMids, DirectorySecondaryMid, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryMerchantEntity, setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'

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
  const {merchantId, planId} = router.query
  const [currentPage, setCurrentPage] = useState(1)

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantSecondaryMidsResponse} = useMidManagementSecondaryMids({
    skipGetSecondaryMid: true,
    skipGetSecondaryMidsByPage: !(currentPage > 1),
    planRef: planId as string,
    merchantRef: merchantId as string,
    page: currentPage.toString(),
  })

  const secondaryMidsData: DirectorySecondaryMids = getMerchantSecondaryMidsResponse

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
          displayValue: timeStampToDate(dateAdded),
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
    router.push(`${router.asPath}&ref=${secondaryMidsData[index].secondary_mid_ref}`)
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
    dispatch(setCommentsOwnerRef(merchantId as string))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.SECONDARY_MID))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  const renderCheckedItemButtons = ():JSX.Element => (
    <div className={`flex gap-[10px] items-center justify-end ${isMobileViewport ? 'w-[300px] h-max flex-col py-4' : 'h-[71px]'}` }>
      <Button
        handleClick={() => console.log('Onboard to Harmonia button pressed') }
        buttonSize={ButtonSize.SMALL}
        buttonWidth={isMobileViewport ? ButtonWidth.FULL : ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Onboard to Harmonia
      </Button>
      <Button
        handleClick={() => console.log('Offboard from Harmonia button pressed') }
        buttonSize={ButtonSize.SMALL}
        buttonWidth={isMobileViewport ? ButtonWidth.FULL : ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Offboard from Harmonia
      </Button>
      <Button
        handleClick={() => console.log('Update to Harmonia button pressed') }
        buttonSize={ButtonSize.SMALL}
        buttonWidth={isMobileViewport ? ButtonWidth.FULL : ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Update to Harmonia
      </Button>
      <Button
        handleClick={requestBulkCommentModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={isMobileViewport ? ButtonWidth.FULL : ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Comments
      </Button>
      <Button
        handleClick={requestSecondaryMidDeleteModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={isMobileViewport ? ButtonWidth.FULL : ButtonWidth.AUTO}
        labelColour={LabelColour.RED}
        labelWeight={LabelWeight.SEMIBOLD}
        borderColour={BorderColour.RED}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE}
      >Delete
      </Button>
    </div>
  )

  return (
    <>
      <div className='flex items-end justify-between'>
        {checkedRefArray.length > 0 && renderCheckedItemButtons()}
        <div className='flex gap-[10px] h-[71px] items-center justify-end w-full'>
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

      <DirectoryMerchantPaginationButton currentData={secondaryMidsData} setPageFn={setCurrentPage} />
    </>
  )
}

export default DirectoryMerchantSecondaryMids
