import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {useRouter} from 'next/router'
import {DirectorySecondaryMids, DirectorySecondaryMid} from 'types'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryMerchantEntity, setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryTableCheckedRefs} from 'features/directoryMerchantSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {CommentsSubjectTypes, ModalType} from 'utils/enums'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {getHarmoniaStatusString, getPaymentSchemeStatusString} from 'utils/statusStringFormat'

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
  const {merchantId, planId} = router.query

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantSecondaryMidsResponse} = useMidManagementSecondaryMids({
    skipGetSecondaryMid: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
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
          displayValue: dateAdded,
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
    dispatch(setCommentsOwnerRef(planId as string))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.SECONDARY_MID))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  const renderCheckedItemButtons = ():JSX.Element => (
    (
      <div className='flex gap-[10px] h-[71px] items-center'>
        <Button
          handleClick={() => console.log('Onboard to Harmonia button pressed') }
          buttonSize={ButtonSize.SMALL}
          buttonWidth={ButtonWidth.AUTO}
          labelColour={LabelColour.GREY}
          borderColour={BorderColour.GREY}
        >Onboard to Harmonia
        </Button>
        <Button
          handleClick={() => console.log('Offboard from Harmonia button pressed') }
          buttonSize={ButtonSize.SMALL}
          buttonWidth={ButtonWidth.AUTO}
          labelColour={LabelColour.GREY}
          borderColour={BorderColour.GREY}
        >Offboard from Harmonia
        </Button>
        <Button
          handleClick={requestBulkCommentModal}
          buttonSize={ButtonSize.SMALL}
          buttonWidth={ButtonWidth.AUTO}
          labelColour={LabelColour.GREY}
          borderColour={BorderColour.GREY}
        >Comments
        </Button>
        <Button
          handleClick={requestSecondaryMidDeleteModal}
          buttonSize={ButtonSize.SMALL}
          buttonWidth={ButtonWidth.MEDIUM}
          labelColour={LabelColour.RED}
          labelWeight={LabelWeight.SEMIBOLD}
          borderColour={BorderColour.RED}
        >Delete
        </Button>
      </div>
    )
  )

  return (
    <>
      <div className='flex items-center justify-between'>
        {checkedRefArray.length > 0 && renderCheckedItemButtons()}
        <div className='flex gap-[10px] h-[71px] items-center justify-end w-full'>
          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-visaBlue rounded-[10px]'
            onClick={() => console.log('Placeholder: Request Visa Secondary MID')}
            aria-label='Add Visa Secondary MID'
          >
            <p className='pr-[5px] text-[14px] font-medium font-heading text-grey-100'>Add</p>
            <AddVisaSvg className='pb-[1px] w-[39px]' alt=''/>
          </button>

          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-mastercardBlue rounded-[10px]'
            onClick={() => console.log('Placeholder: Request Mastercard Secondary MID')}
            aria-label='Add Mastercard Secondary MID'
          >
            <p className='pr-[5px] text-[14px] font-medium font-heading text-grey-100'>Add</p>
            <AddMastercardSvg className='pb-[1px] w-[35px]' alt=''/>
          </button>
        </div>
      </div>

      {secondaryMidsData && (
        <DirectoryMerchantDetailsTable tableHeaders={secondaryMidsTableHeaders} tableRows={hydrateSecondaryMidsTableData()} singleViewRequestHandler={requestSecondaryMidSingleView} refArray={refArray} />
      )}
    </>
  )
}

export default DirectoryMerchantSecondaryMids
