import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {useMidManagementPsimis} from 'hooks/useMidManagementPsimis'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useRouter} from 'next/router'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import {DirectoryPsimi, DirectoryPsimis} from 'types'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, ModalType, PaymentSchemeName} from 'utils/enums'
import {setCommentsOwnerRef, setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'
import {getHarmoniaStatusString} from 'utils/statusStringFormat'

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
  const {merchantId, planId} = router.query

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantPsimisResponse} = useMidManagementPsimis({
    skipGetPsimi: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
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
          displayValue: dateAdded,
          additionalStyles: 'font-body-3 truncate',
        },
        {...getHarmoniaStatusString(txmStatus)},
      ]
    })
  }

  const refArray = psimisData?.map(psimi => psimi.psimi_ref)

  const requestPsimiSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(psimisData[index]))
    router.push(`${router.asPath}&ref=${psimisData[index].psimi_ref}`)
  }

  const setSelectedPsimis = () => {
    const checkedPsimisToEntity = psimisData.filter((psimi) => checkedRefArray.includes(psimi.psimi_ref)).map((psimi) => ({
      entityRef: psimi.psimi_ref,
      entityValue: psimi.psimi_metadata.value,
      paymentSchemeSlug: psimi.psimi_metadata.payment_scheme_slug,
    }))
    dispatch(setSelectedDirectoryEntityCheckedSelection(checkedPsimisToEntity))
  }

  const requestPsimiAddModal = (paymentScheme: PaymentSchemeName) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PSIMI))
  }

  const requestPsimisDeleteModal = ():void => {
    setSelectedPsimis()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE))
  }

  const requestBulkCommentModal = () => {
    // TODO: Will possibly need to change from Psimis to PSIMIs
    setSelectedPsimis()
    dispatch(setModalHeader('PSIMI Comment'))
    dispatch(setCommentsOwnerRef(planId as string))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.PSIMI))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  const renderCheckedItemButtons = ():JSX.Element => (
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
        handleClick={requestPsimisDeleteModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ButtonWidth.MEDIUM}
        labelColour={LabelColour.RED}
        labelWeight={LabelWeight.SEMIBOLD}
        borderColour={BorderColour.RED}
      >Delete
      </Button>
    </div>
  )

  return (
    <>
      <div className='flex items-center justify-between'>
        {checkedRefArray.length > 0 && renderCheckedItemButtons()}
        <div className='flex gap-[10px] h-[71px] items-center justify-end w-full'>
          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-visaBlue rounded-[10px]'
            onClick={() => requestPsimiAddModal(PaymentSchemeName.VISA)}
            aria-label='Add Visa PSIMI'
          >
            <p className='pr-[5px] text-[.875rem] font-medium font-heading text-grey-100'>Add</p>
            <AddVisaSvg className='pb-[1px] w-[39px]' alt=''/>
          </button>

          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-mastercardBlue rounded-[10px]'
            onClick={() => requestPsimiAddModal(PaymentSchemeName.MASTERCARD)}
            aria-label='Add Mastercard PSIMI'
          >
            <p className='pr-[5px] text-[.875rem] font-medium font-heading text-grey-100'>Add</p>
            <AddMastercardSvg className='pb-[1px] w-[35px]' alt=''/>
          </button>
        </div>
      </div>

      {psimisData && (
        <DirectoryMerchantDetailsTable tableHeaders={psimisTableHeaders} tableRows={hydratePsimisTableData()} singleViewRequestHandler={requestPsimiSingleView} refArray={refArray} />
      )}
    </>
  )
}

export default DirectoryMerchantPsimis
