import {useState} from 'react'
import {DirectoryMerchantDetailsTable, DirectoryMerchantPaginationButton, Button} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {useRouter} from 'next/router'
import {CommentsSubjectTypes, HarmoniaActionTypes, ModalType, PaymentSchemeName, UserPermissions} from 'utils/enums'
import {DirectoryMids, DirectoryMid, DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {getHarmoniaStatusString, getPaymentSchemeStatusString} from 'utils/statusStringFormat'
import {timeStampToDate} from 'utils/dateFormat'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import {setModalHeader, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import {useMidManagementMids} from 'hooks/useMidManagementMids'

import {setHarmoniaActionType} from 'features/directoryHarmoniaSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import AddAmexSvg from 'icons/svgs/add-amex.svg'

const midsTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
  {
    isPaymentIcon: true,
  },
  {
    displayValue: 'VALUE',
  },
  {
    displayValue: 'BIN',
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

const DirectoryMerchantMids = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isMobileViewport = useIsMobileViewportDimensions()
  const {merchantId, planId} = router.query
  const [currentPage, setCurrentPage] = useState(1)

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantMidsResponse} = useMidManagementMids({
    skipGetMid: true,
    skipGetMidsByPage: !(currentPage > 1),
    planRef: planId as string,
    page: currentPage.toString() as string,
    merchantRef: merchantId as string,
  })

  const midsData: DirectoryMids = getMerchantMidsResponse

  // TODO: Would be good to have this in a hook once the data is retrieved from the api
  const hydrateMidTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return midsData.map((midObj: DirectoryMid) => {
      const {date_added: dateAdded, mid_metadata: metadata, txm_status: txmStatus} = midObj
      const {payment_scheme_slug: paymentSchemeSlug, mid, visa_bin: visaBin, payment_enrolment_status: paymentEnrolmentStatus} = metadata
      return [
        {
          paymentSchemeSlug,
        },
        {
          displayValue: mid,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: visaBin,
          additionalStyles: 'font-body-3 truncate',
        },
        {
          displayValue: timeStampToDate(dateAdded, isMobileViewport),
          additionalStyles: 'font-body-3 truncate',
        },
        {...getPaymentSchemeStatusString(paymentEnrolmentStatus)},
        {...getHarmoniaStatusString(txmStatus)},
      ]
    })
  }

  const refArray = midsData?.map(mid => mid.mid_ref)

  const requestMidModal = (paymentScheme) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MID))
  }

  const requestMidSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(midsData[index]))
    router.push(`${router.asPath}&ref=${midsData[index].mid_ref}`)
  }

  const setSelectedMids = () => {
    const checkedMidsToEntity = midsData.filter((mid) => checkedRefArray.includes(mid.mid_ref)).map((mid) => ({
      entityRef: mid.mid_ref,
      entityValue: mid.mid_metadata.mid,
      paymentSchemeSlug: mid.mid_metadata.payment_scheme_slug,
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
    dispatch(setCommentsOwnerRef(merchantId as string))
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

  const renderCheckedItemButtons = ():JSX.Element => (
    <div className={`flex gap-[10px] items-center ${isMobileViewport ? 'h-max py-4 flex-wrap justify-center items-center' : 'w-full flex-wrap justify-start h-[71px]'}`}>
      <Button
        handleClick={requestOnboardModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Onboard to Harmonia
      </Button>
      <Button
        handleClick={requestOffboardModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Offboard from Harmonia
      </Button>
      <Button
        handleClick={requestUpdateModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Update to Harmonia
      </Button>
      <Button
        handleClick={requestBulkCommentModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ ButtonWidth.MEDIUM}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Comments
      </Button>
      <Button
        handleClick={requestMidDeleteModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ ButtonWidth.MEDIUM}
        labelColour={LabelColour.RED}
        borderColour={BorderColour.RED}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE}
      >Delete
      </Button>
    </div>
  )

  return (
    <>
      <div className='flex items-end justify-end gap-4'>
        {checkedRefArray.length > 0 && renderCheckedItemButtons() }
        <div className='flex gap-[10px] h-[71px] items-center justify-end'>
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
      {midsData && (
        <DirectoryMerchantDetailsTable
          tableHeaders={midsTableHeaders}
          tableRows={hydrateMidTableData()}
          singleViewRequestHandler={requestMidSingleView}
          refArray={refArray}
        />
      )}
      <DirectoryMerchantPaginationButton currentData={midsData} setPageFn={setCurrentPage} />
    </>
  )
}

export default DirectoryMerchantMids
