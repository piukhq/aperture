import {DirectoryMerchantDetailsTable} from 'components'
import {useRouter} from 'next/router'
import {DirectoryMids, DirectoryMid} from 'types'
import {ModalType, PaymentSchemeName} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal, selectModal} from 'features/modalSlice'
import {setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme} from 'features/directoryMerchantSlice'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import AddAmexSvg from 'icons/svgs/add-amex.svg'
import {DirectoryMerchantDetailsTableHeader, DirectoryMerchantDetailsTableCell} from 'types'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {useState} from 'react'
import {Button, DirectoryMidDeleteModal} from 'components'
import {ButtonWidth, ButtonSize, LabelColour, BorderColour} from 'components/Button/styles'


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
    displayValue: 'HARMONIA STATUS',
  },
]

const DirectoryMerchantMids = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {merchantId, planId} = router.query
  const [checkedRefArray, setCheckedRefArray] = useState<string[]>([])

  const {getMerchantMidsResponse} = useMidManagementMids({
    skipGetMid: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const modalRequested: ModalType = useAppSelector(selectModal)
  const midsData: DirectoryMids = getMerchantMidsResponse

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

  const refArray = midsData?.map(mid => mid.mid_ref)

  const requestMidModal = (paymentScheme) => {
    dispatch(setSelectedDirectoryMerchantPaymentScheme(paymentScheme))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MID))
  }

  const requestMidSingleView = (index:number):void => {
    dispatch(setSelectedDirectoryMerchantEntity(midsData[index]))
    router.push(`${router.asPath}&ref=${midsData[index].mid_ref}`)
  }

  const requestMidDeleteModal = ():void => {
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MID_DELETE))
  }

  const renderCheckedItemButtons = () => (
    <div className='flex gap-[10px] h-[71px] items-center justify-end'>
      <Button
        handleClick={() => console.log('Onboard to Harmonia button pressed') }
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
      >
        Onboard to Harmonia
      </Button>
      <Button
        handleClick={() => console.log('Offboard from Harmonia button pressed') }
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ButtonWidth.AUTO}
        labelColour={LabelColour.GREY}
        borderColour={BorderColour.GREY}
      >
        Offboard from Harmonia
      </Button>
      <Button
        handleClick={requestMidDeleteModal}
        buttonSize={ButtonSize.SMALL}
        buttonWidth={ButtonWidth.MEDIUM}
        labelColour={LabelColour.RED}
        borderColour={BorderColour.RED}
      >
        Delete
      </Button>
    </div>
  )

  const getCheckedMidsArray = () => {
    return midsData.filter((mid) => {
      if (checkedRefArray.includes(mid.mid_ref)) {
        return mid
      }
    })
  }

  return (
    <>
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_MID_DELETE && <DirectoryMidDeleteModal checkedMidsArray={getCheckedMidsArray()}/>}
      <div className='flex items-center justify-between'>
        {checkedRefArray.length > 0 ? renderCheckedItemButtons() : <div />}
        <div className='flex gap-[10px] h-[71px] items-center justify-end'>
          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-visaBlue rounded-[10px]'
            onClick={() => requestMidModal(PaymentSchemeName.VISA)}
            aria-label='Add Visa MID'
          >
            <p className='pr-[5px] text-[14px] font-medium font-heading text-grey-100'>Add</p>
            <AddVisaSvg className='pb-[1px] w-[39px]' alt=''/>
          </button>

          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-mastercardBlue rounded-[10px]'
            onClick={() => requestMidModal(PaymentSchemeName.MASTERCARD)}
            aria-label='Add Mastercard MID'
          >
            <p className='pr-[5px] text-[14px] font-medium font-heading text-grey-100'>Add</p>
            <AddMastercardSvg className='pb-[1px] w-[35px]' alt=''/>
          </button>

          <button
            className='flex flex-row h-[38px] px-[7px] justify-center items-center bg-amexBlue rounded-[10px]'
            onClick={() => requestMidModal(PaymentSchemeName.AMEX)}
            aria-label='Add Amex MID'
          >
            <p className='pr-[3px] text-[14px] font-medium font-heading text-grey-100'>Add</p>
            <AddAmexSvg className='pb-[2px] w-[55px]' alt=''/>
          </button>
        </div>
      </div>

      {midsData && (
        <DirectoryMerchantDetailsTable
          tableHeaders={midsTableHeaders}
          tableRows={hydrateMidTableData()}
          singleViewRequestHandler={requestMidSingleView}
          refArray={refArray}
          checkboxChangeHandler={setCheckedRefArray}
        />
      )}
    </>
  )
}

export default DirectoryMerchantMids
