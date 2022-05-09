import {mockMidsData} from 'utils/mockMidsData'
import {DirectoryMids} from 'types'

import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import AddAmexSvg from 'icons/svgs/add-amex.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'

const DirectoryMerchantMids = () => {
  const midsData: DirectoryMids = mockMidsData

  const renderPaymentSchemeLogo = (index:number, paymentSchemeCode) => {
    const paymentSchemeArray = [<VisaSvg key={index} alt='Visa'/>, <MastercardSvg key={index} alt='Mastercard' />, <AmexSvg key={index} alt='Amex'/>]
    return paymentSchemeArray[paymentSchemeCode - 1]
  }

  const renderRow = (midElement, index) => {
    const {date_added: dateAdded} = midElement
    const {payment_scheme_code: paymentSchemeCode, mid, visa_bin: visaBin} = midElement.mid_metadata

    return (
      <tr className='h-[60px]' key={index}>
        <td className='flex items-center justify-center h-[60px]'>
          <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log(`Checkbox ${index} clicked`)} />
        </td>
        <td>
          {renderPaymentSchemeLogo(index, paymentSchemeCode)}
        </td>
        <td className='px-[9px] font-heading-8 font-regular  truncate'>{mid}</td>
        <td className='px-[9px] font-body-3 truncate'>{visaBin}</td>
        <td className='px-[9px] font-body-3 truncate'>{dateAdded}</td>{/* TODO: Will need formatting when coming from API */ }
        <td className='px-[9px]'></td>
        <td className='px-[9px]'></td>
      </tr>
    )
  }

  return (
    <div className='mx-[10px]'>
      <div className='flex h-[71px] items-center justify-end pr-[9px]'>
        <button
          onClick={() => console.log('Placeholder: Add Visa MID')}
          aria-label='Add Visa MID'
        ><AddVisaSvg alt=''/>
        </button>
        <button
          onClick={() => console.log('Placeholder: Add Mastercard MID')}
          aria-label='Add Mastercard MID'
        ><AddMastercardSvg alt=''/>
        </button>
        <button
          onClick={() => console.log('Placeholder: Add AMEX MID')}
          aria-label='Add Amex MID'
        ><AddAmexSvg alt=''/>
        </button>
      </div>

      <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
        <thead className='h-[38px] text-left bg-grey-200'>
          <tr>
            <th data-testid='table-header' aria-label='group-checkbox' className='px-[9px] w-[40px] rounded-tl-[10px] rounded-bl-[10px]'>
              <div className='flex items-center justify-center'>
                <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log('Header Checkbox clicked')}/>
              </div>
            </th>
            <th data-testid='table-header' aria-label='payment-scheme' className='px-[9px] w-[40px]'></th>
            <th data-testid='table-header' className='px-[9px] font-table-header text-grey-800'>VALUE</th>
            <th data-testid='table-header' className='px-[9px] font-table-header text-grey-800'>BIN</th>
            <th data-testid='table-header' className='px-[9px] font-table-header text-grey-800'>DATE ADDED</th>
            <th data-testid='table-header' className='px-[9px] font-table-header text-grey-800'>SCHEME STATUS</th>
            <th data-testid='table-header' className='px-[9px] font-table-header text-grey-800 rounded-tr-[10px] rounded-br-[10px]'>HARMONIA STATUS</th>
          </tr>
        </thead>
        <tbody>
          {midsData.map((mid, index) => renderRow(mid, index))}
        </tbody>
      </table>
    </div>
  )
}

export default DirectoryMerchantMids

