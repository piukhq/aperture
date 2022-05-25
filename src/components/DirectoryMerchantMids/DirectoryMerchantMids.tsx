import {DirectoryMerchantDetailsTable} from 'components'
import {useRouter} from 'next/router'
import {mockMidsData} from 'utils/mockMidsData'
import {DirectoryMids, DirectoryMid} from 'types'
import {ModalType, PaymentSchemeName} from 'utils/enums'
import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import AddAmexSvg from 'icons/svgs/add-amex.svg'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'

const midsTableHeaders: DirectoryMerchantDetailsTableHeader[] = [
  {
    isPaymentIcon: true,
  },
  {
    displayValue: 'VALUE',
  },
  {
    displayValue: 'BIN',
  },
  {
    displayValue: 'DATE ADDED',
  },
  {
    displayValue: 'SCHEME STATUS',
  },
  {
    additionalStyles: 'rounded-r-[10px]',
    displayValue: 'HARMONIA STATUS',
  },
]

const DirectoryMerchantMids = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  const midsData: DirectoryMids = mockMidsData

  // TODO: Would be good to have this in a hook once the data is retrieved from the api
  const hydrateMidTableData = (): Array<DirectoryMerchantDetailsTableCell[]> => {
    return midsData.map((midObj: DirectoryMid) => {
      const {date_added: dateAdded, mid_metadata: metadata} = midObj
      const {payment_scheme_code: paymentSchemeCode, mid, visa_bin: visaBin} = metadata
      return [
        {
          paymentSchemeCode,
        },
        {
          displayValue: mid,
          additionalStyles: 'font-heading-8 font-regular truncate',
        },
        {
          displayValue: visaBin,
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


  const requestMidModal = (paymentScheme) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MID))
  }

  const handleRowClick = (index) => {
    dispatch(setSelectedDirectoryMerchantEntity(midsData[index]))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
    router.isReady && router.push(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}&ref=${midsData[index].mid_ref}`)
  }

  return (
    <>
      <div className='flex h-[71px] items-center justify-end'>
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

      <DirectoryMerchantDetailsTable tableHeaders={midsTableHeaders} tableRows={hydrateMidTableData()} rowClickHandler={handleRowClick} />
    </>
  )
}

export default DirectoryMerchantMids
