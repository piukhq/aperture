import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import {reset, getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {requestModal} from 'features/modalSlice'
import {ModalStyle, ModalType} from 'utils/enums'
import {getCountWithCorrectNoun} from 'utils/stringFormat'
import {useMidManagementMerchants} from 'hooks/useMidManagementMerchants'
import {RTKQueryErrorResponse} from 'types'

const DirectoryMerchantDeleteModal = () => {
  const router = useRouter()
  const {planId, merchantId} = router.query

  const {
    deleteMerchant,
    deleteMerchantIsSuccess,
    deleteMerchantError,
    resetDeleteMerchantResponse,
  } = useMidManagementMerchants({
    skipGetMerchant: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const dispatch = useAppDispatch()
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)

  const {merchant_ref: merchantRef, merchant_metadata: merchantMetadata, merchant_counts: merchantCounts} = selectedMerchant

  const {name, location_label: locationLabel} = merchantMetadata
  const {locations, payment_schemes: paymentSchemes} = merchantCounts

  const [nameValue, setNameValue] = useState('')
  const [nameValidationError, setNameValidationError] = useState(null)

  const totalMidCount = paymentSchemes.reduce((acc, {count}) => acc + count, 0)

  const handleDeleteMerchantError = useCallback(() => {
    const {data} = deleteMerchantError as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      setNameValidationError(detail[0].msg)
    }
  }, [deleteMerchantError])

  useEffect(() => {
    if (deleteMerchantError) {
      handleDeleteMerchantError()
    } else if (deleteMerchantIsSuccess) {
      resetDeleteMerchantResponse()
      reset()
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [deleteMerchantError, resetDeleteMerchantResponse, handleDeleteMerchantError, deleteMerchantIsSuccess, dispatch])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setNameValidationError(null)
  }

  const verifyName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nameValue === '') {
      setNameValidationError('Enter merchant name')
    } else if (nameValue !== name) {
      setNameValidationError('Enter correct merchant name')
    } else {
      deleteMerchant({name: nameValue, planRef: planId as string, merchantRef})
    }
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='Delete Merchant' onCloseFn={() => dispatch(reset())}>
      <form className='flex flex-col mt-[30px]' onSubmit={verifyName}>
        <div className='font-body-3 mb-[10px]'>
          <p>Are you sure you want to delete {name}?</p>
          <p data-testid='second-paragraph'>This will also delete <span className='font-bold'>
            {locations} {locationLabel} and {getCountWithCorrectNoun(totalMidCount, 'MID')}</span>.</p>
          <br/>
          <p>Please enter the Merchant Name to confirm.</p>
        </div>
        <TextInputGroup
          name='merchant-name'
          label='Merchant Name'
          error={nameValidationError}
          value={nameValue}
          onChange={handleNameChange}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL_LABEL_HIDDEN}
          inputWidth={InputWidth.FULL}
          inputColour={nameValidationError ? InputColour.RED : InputColour.GREY}
        />
        <div className='flex justify-end border-t-[1px] border-grey-200 dark:border-grey-800 mt-[13px] pt-[16px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            borderColour={BorderColour.RED}
            buttonWidth={ButtonWidth.MEDIUM}
            labelColour={LabelColour.RED}
            labelWeight={LabelWeight.SEMIBOLD}
          >Delete Merchant
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectoryMerchantDeleteModal
