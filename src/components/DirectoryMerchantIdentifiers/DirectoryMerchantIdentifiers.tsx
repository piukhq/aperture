import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {mockIdentifiersData} from 'utils/mockIdentifiersData'
import {useAppDispatch} from 'app/hooks'
import {useRouter} from 'next/router'
import {requestModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'
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
  const {merchantId, planId, tab} = router.query
  const [shouldDisplayAuxiliaryButtons, setShouldDisplayAuxiliaryButtons] = useState(false)
  const identifiersData: DirectoryIdentifiers = mockIdentifiersData

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

  const handleRowClick = (index) => {
    dispatch(setSelectedDirectoryMerchantEntity(identifiersData[index]))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
    router.isReady && router.push(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}&ref=${identifiersData[index].identifier_ref}`)
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

        <div className='flex h-[38px] items-center'>
          <button
            onClick={() => console.log('Placeholder: Request Visa Identifier')}
            aria-label='Add Visa Identifier'
          ><AddVisaSvg alt=''/>
          </button>
          <button
            onClick={() => console.log('Placeholder: Request Mastercard Identifier')}
            aria-label='Add Mastercard Identifier'
          ><AddMastercardSvg alt=''/>
          </button>
        </div>
      </div>

      <DirectoryMerchantDetailsTable tableHeaders={identifiersTableHeaders} tableRows={hydrateIdentifiersTableData()} checkboxChangeHandler={setShouldDisplayAuxiliaryButtons} rowClickHandler={handleRowClick} />
    </>
  )
}

export default DirectoryMerchantIdentifiers
