import {mockSecondaryMidsData} from 'utils/mockSecondaryMidsData'
import {DirectorySecondaryMids, DirectorySecondaryMid} from 'types'

import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'

const DirectoryMerchantSecondaryMids = () => {
  const secondaryMidsData: DirectorySecondaryMids = mockSecondaryMidsData

  const renderRow = ({date_added: dateAdded, secondary_mid_metadata: secondaryMidMetadata}:DirectorySecondaryMid, index:number) => {
    const {secondary_mid, payment_scheme_code: paymentSchemeCode, payment_scheme_store_name: paymentSchemeStoreName} = secondaryMidMetadata

    return (
      <tr className='h-[60px]' key={index}>
        <td className='flex items-center justify-center h-[60px]'>
          <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log(`Checkbox ${index} clicked`)} />
        </td>
        <td>
          {paymentSchemeCode === 1 ? <VisaSvg alt='Visa'/> : <MastercardSvg alt='Mastercard' />}
        </td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{secondary_mid}</td>
        <td className='px-[9px] font-body-3 truncate'>{paymentSchemeStoreName}</td>
        <td className='px-[9px] font-body-3 truncate'>{dateAdded}</td>{/* TODO: Will need formatting when coming from API */ }
        <td className='px-[9px]'></td>{/* TODO: Add Scheme Status */}
        <td className='px-[9px]'></td>{/* TODO: Add Harmonia Status */}
      </tr>
    )
  }

  return (
    <div className='mx-[10px]'>
      <div className='flex h-[71px] items-center justify-end pr-[9px]'>
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

      <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
        <thead className='h-[38px] text-left bg-grey-200'>
          <tr>
            <th data-testid='table-header' aria-label='group-checkbox' className='px-[9px] w-[40px] rounded-l-[10px]'>
              <div className='flex items-center justify-center'>
                <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log('Header Checkbox clicked')}/>
              </div>
            </th>
            <th data-testid='table-header' aria-label='payment-scheme' className='px-[9px] w-[50px]'></th>
            <th data-testid='table-header' className='px-[9px] font-table-header w-[160px]'>VALUE</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>STORE NAME</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>DATE ADDED</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>SCHEME STATUS</th>
            <th data-testid='table-header' className='px-[9px] font-table-header rounded-r-[10px]'>HARMONIA STATUS</th>
          </tr>
        </thead>
        <tbody>
          {secondaryMidsData.map((secondaryMid, index) => renderRow(secondaryMid, index))}
        </tbody>
      </table>
    </div>
  )
}

export default DirectoryMerchantSecondaryMids