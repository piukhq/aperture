import {useState} from 'react'
import {Button, DirectoryMerchantDetailsTable} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {mockSecondaryMidsData} from 'utils/mockSecondaryMidsData'
import {DirectorySecondaryMids, DirectorySecondaryMid} from 'types'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'

const secondaryMidsTableHeaders = [
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
  const [shouldDisplayAuxiliaryButtons, setShouldDisplayAuxiliaryButtons] = useState(false)
  const secondaryMidsData: DirectorySecondaryMids = mockSecondaryMidsData

  const hydrateSecondaryMidsTableData = () => {
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

  return (
    <>
      <div className='flex justify-between h-[71px] items-center pr-[9px]'>
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

        <div>
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

      <DirectoryMerchantDetailsTable tableHeaders={secondaryMidsTableHeaders} tableRows={hydrateSecondaryMidsTableData()} checkBoxChangeHandler={setShouldDisplayAuxiliaryButtons} />
    </>
  )
}

export default DirectoryMerchantSecondaryMids
