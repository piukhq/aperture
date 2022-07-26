import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {useMidManagementIdentifiers} from 'hooks/useMidManagementIdentifiers'
import {useAppDispatch} from 'app/hooks'
import {useRouter} from 'next/router'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryIdentifier, DirectoryIdentifiers} from 'types'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'

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
    additionalStyles: 'rounded-r-[10px]',
  },
]

const DirectoryMerchantIdentifiers = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {merchantId, planId} = router.query

  const {getMerchantIdentifiersResponse} = useMidManagementIdentifiers({
    skipGetIdentifier: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const identifiersData: DirectoryIdentifiers = getMerchantIdentifiersResponse

  const [shouldDisplayAuxiliaryButtons, setShouldDisplayAuxiliaryButtons] = useState(false)

  const hydrateIdentifiersTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return identifiersData.map((identifierObj: DirectoryIdentifier) => {
      const {date_added: dateAdded, identifier_metadata: metadata} = identifierObj
      const {value, payment_scheme_merchant_name: paymentSchemeMerchantName, payment_scheme_code: paymentSchemeCode} = metadata
      return [
        {
          paymentSchemeCode,
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

  const requestIdentifierSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(identifiersData[index]))
    router.push(`${router.asPath}&ref=${identifiersData[index].identifier_ref}`)
  }

  return (
    <>
      <div className='flex justify-between h-[71px] items-center'>
        {/* TODO: More auxiliary buttons to be added at a later date */}
        <div>
          {shouldDisplayAuxiliaryButtons && (
            <Button
              handleClick={() => console.log('Delete button clicked')}
              buttonSize={ButtonSize.SMALL}
              buttonWidth={ButtonWidth.MEDIUM}
              labelColour={LabelColour.RED}
              labelWeight={LabelWeight.SEMIBOLD}
              borderColour={BorderColour.RED}
            >Delete
            </Button>
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
        <DirectoryMerchantDetailsTable tableHeaders={identifiersTableHeaders} tableRows={hydrateIdentifiersTableData()} checkboxChangeHandler={setShouldDisplayAuxiliaryButtons} singleViewRequestHandler={requestIdentifierSingleView} />
      )}
    </>
  )
}

export default DirectoryMerchantIdentifiers
