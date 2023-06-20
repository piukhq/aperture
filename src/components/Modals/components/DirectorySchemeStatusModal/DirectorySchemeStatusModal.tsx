import {useState} from 'react'
import {Button, PaymentCardIcon, Modal, Dropdown} from 'components'
import {ButtonType, ButtonSize, ButtonWidth, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {ModalStyle, PaymentSchemeStatusDisplayValue, UserPermissions} from 'utils/enums'
import useGetDirectoryRouterString from 'hooks/useGetRouterQueryString'
import {DirectoryMerchantEntitySelectedItem} from 'types'

const DirectorySchemeStatusModal = () => {
  enum RouterEntityLabel {
    'mids' = 'MID',
    'secondary-mids'= 'Secondary MID',
    'psimis'= 'PSIMI',
  }

  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState<string>(PaymentSchemeStatusDisplayValue['Not enrolled'])

  const paymentSchemeStatusValues: string[] = [
    PaymentSchemeStatusDisplayValue['enrolled'],
    PaymentSchemeStatusDisplayValue['enrolling'],
    PaymentSchemeStatusDisplayValue['not_enrolled'],
    PaymentSchemeStatusDisplayValue['unenrolled'],
  ]

  const {tab} = useGetDirectoryRouterString()
  const selectedEntities = useAppSelector(getSelectedDirectoryEntityCheckedSelection)
  const hasMultipleEntities = selectedEntities.length > 1
  const entityLabel = `${RouterEntityLabel[tab]}${hasMultipleEntities ? 's' : ''}`

  const dispatch = useAppDispatch()
  const errorMessage = '' // Placeholder for functionality to be added

  const renderListItem = (listItem: DirectoryMerchantEntitySelectedItem) => {
    const {entityRef, entityValue, paymentSchemeSlug} = listItem

    return (
      <li className='font-bold flex items-center gap-[2px]' key={entityRef}>
        {entityValue}
        {paymentSchemeSlug && (
          <PaymentCardIcon
            paymentSchemeSlug={paymentSchemeSlug}
            paymentSchemeIconStyles='flex w-[20px] h-[15px] justify-center mx-[2px] items-center'
          />
        )}
      </li>
    )
  }

  const handleApply = () => {
    // Placeholder for functionality to be added
    console.log('Apply button clicked')
    console.log('Payment scheme status:', paymentSchemeStatus)
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Set ${entityLabel} Enrolment Status`} onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}>
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p data-testid='paragraph-1'>Are you sure you want to <strong>update the payment scheme enrolment status</strong> of the following {entityLabel}:</p>
        <ul>
          {selectedEntities.map(entity => renderListItem(entity))}
        </ul>
        <p data-testid='paragraph-2'>Enrolment status for {hasMultipleEntities ? 'these ' : 'this '}{entityLabel} will be set to</p>
        <div className='flex flex-col h-[50px] pl-[15px] pb-[60px]'>
          <label className='font-modal-heading'>PAYMENT SCHEME STATUS</label>
          <div className='w-[200px] h-[28px]'>
            <Dropdown
              displayValue={paymentSchemeStatus || 'Select Status'}
              displayValues={paymentSchemeStatusValues}
              onChangeDisplayValue={(selectedPaymentSchemeStatus: string) => setPaymentSchemeStatus(selectedPaymentSchemeStatus)}
              isDisabled={false}
              selectedValueStyles='font-normal text-grey-600'
              requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            />
          </div>
        </div>
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p role='alert' className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        <Button
          handleClick={handleApply}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
        >Apply
        </Button>
      </section>
    </Modal>
  )
}

export default DirectorySchemeStatusModal
