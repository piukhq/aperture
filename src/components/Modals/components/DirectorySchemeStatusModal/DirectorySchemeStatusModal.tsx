import {useState} from 'react'
import {Button, PaymentCardIcon, Modal, Dropdown} from 'components'
import {ButtonType, ButtonSize, ButtonWidth, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {ModalStyle, PaymentSchemeSlug, PaymentSchemeStatus, PaymentSchemeStatusDisplayValue, UserPermissions} from 'utils/enums'
import {getPaymentSchemeStatusString} from 'utils/statusStringFormat'
import useGetDirectoryRouterString from 'hooks/useGetRouterQueryString'
import {DirectoryMerchantEntitySelectedItem} from 'types'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'

const DirectorySchemeStatusModal = () => {

  const dispatch = useAppDispatch()
  const {planId = '', merchantId, tab = ''} = useGetDirectoryRouterString()
  const [paymentSchemeStatus, setPaymentSchemeStatus] = useState<string>(PaymentSchemeStatusDisplayValue['Not enrolled'])

  const {
    patchMerchantMidsBulk,
    patchMerchantMidsBulkIsSuccess,
    resetPatchMerchantMidsBulkResponse,
    patchMerchantMidsBulkIsError,
    patchMerchantMidsBulkIsLoading,
  } = useDirectoryMids({
    skipGetMid: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const {
    patchMerchantSecondaryMidsBulk,
    patchMerchantSecondaryMidsBulkIsSuccess,
    resetPatchMerchantSecondaryMidsBulkResponse,
    patchMerchantSecondaryMidsBulkIsError,
    patchMerchantSecondaryMidsBulkIsLoading,
  } = useDirectorySecondaryMids({
    skipGetSecondaryMid: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const isPatchSuccessful = patchMerchantMidsBulkIsSuccess || patchMerchantSecondaryMidsBulkIsSuccess
  const isError = patchMerchantMidsBulkIsError || patchMerchantSecondaryMidsBulkIsError
  const isLoading = patchMerchantMidsBulkIsLoading || patchMerchantSecondaryMidsBulkIsLoading

  enum RouterEntityLabel {
    'mids' = 'MID',
    'secondary-mids'= 'Secondary MID',
    'psimis'= 'PSIMI',
  }


  const paymentSchemeStatusValues: string[] = [
    PaymentSchemeStatusDisplayValue['enrolled'],
    PaymentSchemeStatusDisplayValue['enrolling'],
    PaymentSchemeStatusDisplayValue['not_enrolled'],
    PaymentSchemeStatusDisplayValue['unenrolled'],
  ]

  const selectedEntities = useAppSelector(getSelectedDirectoryEntityCheckedSelection)
  const hasMultipleEntities = selectedEntities.length > 1
  const entityLabel = `${RouterEntityLabel[tab]}${hasMultipleEntities ? 's' : ''}`

  const handleApply = () => {
    // Convert Dropdown value to API enum value, underscore for 'not enrolled'
    const paymentSchemeStatusEnumKey:string = paymentSchemeStatus.toUpperCase().replace(/ /g, '_')
    if (tab === 'mids') {
      patchMerchantMidsBulk({
        planRef: planId,
        merchantRef: merchantId,
        mid_refs: selectedEntities.map(entity => entity.entityRef),
        payment_enrolment_status: PaymentSchemeStatus[paymentSchemeStatusEnumKey],
      })
    } else if (tab === 'secondary-mids') {
      patchMerchantSecondaryMidsBulk({
        planRef: planId,
        merchantRef: merchantId,
        secondary_mid_refs: selectedEntities.map(entity => entity.entityRef),
        payment_enrolment_status: PaymentSchemeStatus[paymentSchemeStatusEnumKey],
      })
    }
  }

  const renderSuccess = () => (
    <>
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p>{entityLabel} enrolment status has been successfully changed</p>
      </section>
    </>
  )

  const renderSchemeStatusForm = () => {

    const renderListItem = (listItem: DirectoryMerchantEntitySelectedItem) => {
      const {entityRef, entityValue, paymentSchemeSlug = PaymentSchemeSlug.VISA, entitySchemeStatus = ''} = listItem
      return (
        <li className='font-bold flex items-center gap-[2px]' key={entityRef}>
          {entityValue}
          <PaymentCardIcon
            paymentSchemeSlug={paymentSchemeSlug}
            paymentSchemeIconStyles='flex w-[20px] h-[15px] justify-center mx-[2px] items-center'
          />
          <span className={getPaymentSchemeStatusString(entitySchemeStatus).textColour + 'ml-2'}>{PaymentSchemeStatusDisplayValue[entitySchemeStatus]}</span>
        </li>
      )
    }

    return (
      <>
        <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
          <p data-testid='paragraph-1'>Are you sure you want to <strong>update the payment scheme enrolment status</strong> of the following {entityLabel}:</p>
          <ul>
            {selectedEntities.map(entity => renderListItem(entity))}
          </ul>
          <p data-testid='paragraph-2'>Enrolment status for {hasMultipleEntities ? 'these ' : 'this '}{entityLabel} will be set to</p>
          <div className='flex flex-col h-[50px] pl-[15px] mb-[60px]'>
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
          <p role='alert' className='font-body-4 text-red text-center w-full'>{isError && `${entityLabel} status update failed`}</p>
          <Button
            handleClick={handleApply}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            isDisabled={isLoading}
          >Apply{isLoading && 'ing'}
          </Button>
        </section>
      </>
    )
  }

  const handleModalClose = () => {
    dispatch(setSelectedDirectoryEntityCheckedSelection([]))
    resetPatchMerchantMidsBulkResponse()
    resetPatchMerchantSecondaryMidsBulkResponse()
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Set ${entityLabel} Enrolment Status`} onCloseFn={handleModalClose}>
      {isPatchSuccessful ? renderSuccess() : renderSchemeStatusForm()}
    </Modal>
  )
}

export default DirectorySchemeStatusModal
