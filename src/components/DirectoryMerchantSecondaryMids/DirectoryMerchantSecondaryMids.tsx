import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {mockSecondaryMidsData} from 'utils/mockSecondaryMidsData'
import {useRouter} from 'next/router'
import {DirectorySecondaryMids, DirectorySecondaryMid} from 'types'
import {ModalType} from 'utils/enums'
import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'

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
    additionalStyles: 'rounded-r-[10px]',
  },
]

const DirectoryMerchantSecondaryMids = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  const [shouldDisplayAuxiliaryButtons, setShouldDisplayAuxiliaryButtons] = useState(false)
  const secondaryMidsData: DirectorySecondaryMids = mockSecondaryMidsData

  const hydrateSecondaryMidsTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return secondaryMidsData.map((secondaryMidObj: DirectorySecondaryMid) => {
      const {date_added: dateAdded, secondary_mid_metadata: metadata} = secondaryMidObj
      const {secondary_mid: secondaryMid, payment_scheme_code: paymentSchemeCode, payment_scheme_store_name: paymentSchemeStoreName} = metadata
      return [
        {
          paymentSchemeCode,
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
        {},
        {},
      ]
    })
  }

  const handleRowClick = (index) => {
    dispatch(setSelectedDirectoryMerchantEntity(secondaryMidsData[index]))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
    router.isReady && router.push(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}&ref=${secondaryMidsData[index].secondary_mid_ref}`)
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
            onClick={() => console.log('Placeholder: Request Visa Secondary MID')}
            aria-label='Add Visa Secondary MID'
          ><AddVisaSvg alt=''/>
          </button>
          <button
            onClick={() => console.log('Placeholder: Request Mastercard Secondary MID')}
            aria-label='Add Mastercard Secondary MID'
          ><AddMastercardSvg alt=''/>
          </button>
        </div>
      </div>

      <DirectoryMerchantDetailsTable tableHeaders={secondaryMidsTableHeaders} tableRows={hydrateSecondaryMidsTableData()} checkboxChangeHandler={setShouldDisplayAuxiliaryButtons} rowClickHandler={handleRowClick} />
    </>
  )
}

export default DirectoryMerchantSecondaryMids
