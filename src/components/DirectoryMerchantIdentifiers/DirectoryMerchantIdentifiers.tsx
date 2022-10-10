import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {useMidManagementIdentifiers} from 'hooks/useMidManagementIdentifiers'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useRouter} from 'next/router'
import {getSelectedDirectoryTableCheckedRefs, setSelectedDirectoryEntityCheckedSelection, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryIdentifier, DirectoryIdentifiers} from 'types'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, ModalType} from 'utils/enums'
import {setCommentsSubjectType, setModalHeader} from 'features/directoryCommentsSlice'

const identifiersTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
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

const DirectoryMerchantIdentifiers = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {merchantId, planId} = router.query

  const checkedRefArray = useAppSelector(getSelectedDirectoryTableCheckedRefs)

  const {getMerchantIdentifiersResponse} = useMidManagementIdentifiers({
    skipGetIdentifier: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const identifiersData: DirectoryIdentifiers = getMerchantIdentifiersResponse

  const hydrateIdentifiersTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return identifiersData.map((identifierObj: DirectoryIdentifier) => {
      const {date_added: dateAdded, identifier_metadata: metadata} = identifierObj
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
        {},
      ]
    })
  }

  const refArray = identifiersData?.map(identifier => identifier.identifier_ref)

  const requestIdentifierSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(identifiersData[index]))
    router.push(`${router.asPath}&ref=${identifiersData[index].identifier_ref}`)
  }

  const setSelectedIdentifiers = () => {
    const checkedIdentifiersToEntity = identifiersData.filter((identifier) => checkedRefArray.includes(identifier.identifier_ref)).map((identifier) => ({
      entityRef: identifier.identifier_ref,
      entityValue: identifier.identifier_metadata.value,
      paymentSchemeSlug: identifier.identifier_metadata.payment_scheme_slug,
    }))
    dispatch(setSelectedDirectoryEntityCheckedSelection(checkedIdentifiersToEntity))
  }

  const requestIdentifiersDeleteModal = ():void => {
    setSelectedIdentifiers()
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE))
  }

  const requestBulkCommentModal = () => {
    // TODO: Will possibly need to change from Identifiers to PSIMIs
    setSelectedIdentifiers()
    dispatch(setModalHeader('Identifier Comment'))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.PSIMI))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_BULK_COMMENT))
  }

  return (
    <>
      <div className='flex justify-between h-[71px] items-center'>
        {/* TODO: More auxiliary buttons to be added at a later date */}
        <div>
          {checkedRefArray.length > 0 && (
            <div className='flex gap-[10px] h-[71px] items-center'>
              <Button
                handleClick={requestBulkCommentModal}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.AUTO}
                labelColour={LabelColour.GREY}
                borderColour={BorderColour.GREY}
              >Comments
              </Button>
              <Button
                handleClick={requestIdentifiersDeleteModal}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                labelColour={LabelColour.RED}
                labelWeight={LabelWeight.SEMIBOLD}
                borderColour={BorderColour.RED}
              >Delete
              </Button>
            </div>
          )}
        </div>

        <div className='flex gap-[10px] h-[71px] items-center justify-end'>
          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-visaBlue rounded-[10px]'
            onClick={() => console.log('Placeholder: Request Visa Identifier')}
            aria-label='Add Visa Identifier'
          >
            <p className='pr-[5px] text-[14px] font-medium font-heading text-grey-100'>Add</p>
            <AddVisaSvg className='pb-[1px] w-[39px]' alt=''/>
          </button>

          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-mastercardBlue rounded-[10px]'
            onClick={() => console.log('Placeholder: Request Mastercard Identifier')}
            aria-label='Add Mastercard Identifier'
          >
            <p className='pr-[5px] text-[14px] font-medium font-heading text-grey-100'>Add</p>
            <AddMastercardSvg className='pb-[1px] w-[35px]' alt=''/>
          </button>
        </div>
      </div>

      {identifiersData && (
        <DirectoryMerchantDetailsTable tableHeaders={identifiersTableHeaders} tableRows={hydrateIdentifiersTableData()} singleViewRequestHandler={requestIdentifierSingleView} refArray={refArray} />
      )}
    </>
  )
}

export default DirectoryMerchantIdentifiers
