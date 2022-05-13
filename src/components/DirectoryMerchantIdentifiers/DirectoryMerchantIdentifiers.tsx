import {mockIdentifiersData} from 'utils/mockIdentifiersData'
import {DirectoryIdentifier, DirectoryIdentifiers} from 'types'

import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'

const DirectoryMerchantIdentifiers = () => {
  const identifiersData: DirectoryIdentifiers = mockIdentifiersData

  const renderPaymentSchemeLogo = (index:number, paymentSchemeCode:number) => {
    return paymentSchemeCode === 1 ? <VisaSvg key={index} alt='Visa'/> : <MastercardSvg key={index} alt='Mastercard' />
  }

  const renderRow = (identifierElement:DirectoryIdentifier, index:number) => {
    const {date_added: dateAdded, identifier_metadata: identifierMetadata} = identifierElement
    const {value, payment_scheme_merchant_name: paymentSchemeMerchantName, payment_scheme_code: paymentSchemeCode} = identifierMetadata

    return (
      <tr className='h-[60px]' key={index}>
        <td className='flex items-center justify-center h-[60px]'>
          <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log(`Checkbox ${index} clicked`)} />
        </td>
        <td>
          {renderPaymentSchemeLogo(index, paymentSchemeCode)}
        </td>
        <td className='px-[9px] font-heading-8 font-regular truncate'>{value}</td>
        <td className='px-[9px] font-body-3 truncate'>{paymentSchemeMerchantName}</td>
        <td className='px-[9px] font-body-3 truncate'>{dateAdded}</td>{/* TODO: Will need formatting when coming from API */ }
        <td className='px-[9px]'></td>{/* TODO: Add Harmonia Status */}
      </tr>
    )
  }

  return (
    <div className='mx-[10px]'>
      <div className='flex h-[71px] items-center justify-end pr-[9px]'>
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

      <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
        <thead className='h-[38px] text-left bg-grey-200'>
          <tr>
            <th data-testid='table-header' aria-label='group-checkbox' className='px-[9px] w-[40px] rounded-l-[10px]'>
              <div className='flex items-center justify-center'>
                <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log('Header Checkbox clicked')}/>
              </div>
            </th>
            <th data-testid='table-header' aria-label='payment-scheme' className='px-[9px] w-[50px]'></th>
            <th data-testid='table-header' className='px-[9px] font-table-header dark:text-grey-800 w-[160px]'>VALUE</th>
            <th data-testid='table-header' className='px-[9px] font-table-header dark:text-grey-800'>SCHEME NAME</th>
            <th data-testid='table-header' className='px-[9px] font-table-header dark:text-grey-800'>DATE ADDED</th>
            <th data-testid='table-header' className='px-[9px] font-table-header dark:text-grey-800 rounded-r-[10px]'>HARMONIA STATUS</th>
          </tr>
        </thead>
        <tbody>
          {identifiersData.map((identifier, index) => renderRow(identifier, index))}
        </tbody>
      </table>
    </div>
  )
}

export default DirectoryMerchantIdentifiers
