import {mockMidsData} from 'utils/mockMidsData'
import {DirectoryMids} from 'types'
import {ModalType, PaymentSchemeName} from 'utils/enums'
import {
  useAppDispatch,
} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryMidPaymentScheme} from 'features/directoryMidSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import AddAmexSvg from 'icons/svgs/add-amex.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'

const DirectoryMerchantMids = () => {
  const midsData: DirectoryMids = mockMidsData
  const dispatch = useAppDispatch()

  const renderPaymentSchemeLogo = (index:number, paymentSchemeCode) => {
    if (paymentSchemeCode === 1) {
      return <VisaSvg key={index} alt='Visa'/>
    } else if (paymentSchemeCode === 2) {
      return <MastercardSvg key={index} alt='Mastercard' />
    } else if (paymentSchemeCode === 3) {
      return <AmexSvg key={index} alt='Amex'/>
    }
  }

  const renderRow = (midElement, index) => {
    const {date_added: dateAdded, mid_metadata: midMetadata} = midElement
    const {payment_scheme_code: paymentSchemeCode, mid, visa_bin: visaBin} = midMetadata

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

  const requestMidModal = (paymentScheme) => {
    dispatch(setSelectedDirectoryMidPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MID))
  }

  return (
    <div className='mx-[10px]'>
      <div className='flex h-[71px] items-center justify-end pr-[9px]'>
        <button
          onClick={() => requestMidModal(PaymentSchemeName.VISA)}
          aria-label='Add Visa MID'
        ><AddVisaSvg alt=''/>
        </button>
        <button
          onClick={() => requestMidModal(PaymentSchemeName.MASTERCARD)}
          aria-label='Add Mastercard MID'
        ><AddMastercardSvg alt=''/>
        </button>
        <button
          onClick={() => requestMidModal(PaymentSchemeName.AMEX)}
          aria-label='Add Amex MID'
        ><AddAmexSvg alt=''/>
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
            <th data-testid='table-header' aria-label='payment-scheme' className='px-[9px] w-[40px]'></th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>VALUE</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>BIN</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>DATE ADDED</th>
            <th data-testid='table-header' className='px-[9px] font-table-header'>SCHEME STATUS</th>
            <th data-testid='table-header' className='px-[9px] font-table-header rounded-r-[10px]'>HARMONIA STATUS</th>
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

