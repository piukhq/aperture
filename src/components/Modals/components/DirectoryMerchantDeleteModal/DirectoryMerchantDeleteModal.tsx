import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {reset, getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {requestModal} from 'features/modalSlice'
import {ModalStyle, ModalType} from 'utils/enums'
import {getMerchantMidCountFromPaymentSchemes} from 'utils/paymentSchemes'
import {getCountWithCorrectNoun} from 'utils/stringFormat'
import {useDirectoryMerchants} from 'hooks/useDirectoryMerchants'
import {RTKQueryErrorResponse} from 'types'

const DirectoryMerchantDeleteModal = () => {
  const router = useRouter()
  const {planId, merchantId} = useGetRouterQueryString()
  // Seed state if selected merchant has counts available, else counts endpoint will be called to populate state
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const {merchant_ref: merchantRef, merchant_metadata: merchantMetadata, merchant_counts: merchantCounts} = selectedMerchant
  const [locationsCount, setLocationsCount] = useState<number>(merchantCounts?.locations || 0)
  const [midsCount, setMidsCount] = useState<number>(getMerchantMidCountFromPaymentSchemes(merchantCounts?.payment_schemes) || 0)
  const [nameValue, setNameValue] = useState<string>('')
  const [nameValidationError, setNameValidationError] = useState<string>('')

  const {
    deleteMerchant,
    deleteMerchantIsSuccess,
    deleteMerchantError,
    resetDeleteMerchantResponse,
    getMerchantResponse,
  } = useDirectoryMerchants({
    skipGetMerchantCounts: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const dispatch = useAppDispatch()
  const {name, location_label: locationLabel} = merchantMetadata

  useEffect(() => {
    if (getMerchantResponse) {
      const {total_locations: totalLocations, payment_schemes: paymentSchemes} = getMerchantResponse.merchant_counts
      const totalMids = getMerchantMidCountFromPaymentSchemes(paymentSchemes)
      setLocationsCount(totalLocations)
      setMidsCount(totalMids)
    }
  }, [getMerchantResponse, merchantCounts])

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
      dispatch(reset())
      dispatch(requestModal(ModalType.NO_MODAL))
      router.asPath.includes(merchantRef) && router.replace(`/mid-management/directory/${planId}`)
    }
  }, [deleteMerchantError, resetDeleteMerchantResponse, handleDeleteMerchantError, deleteMerchantIsSuccess, dispatch, router, merchantId, planId, merchantRef])

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
      deleteMerchant({name: nameValue, planRef: planId, merchantRef})
    }
  }

  const renderDeleteForm = () => (
    <form className='flex flex-col mt-[30px]' onSubmit={verifyName}>
      <div className='font-body-3 mb-[10px]'>
        <p>Are you sure you want to delete {name}?</p>
        <p data-testid='second-paragraph'
          className={'font-bold'}>This will also delete <span>
            {getCountWithCorrectNoun(locationsCount, locationLabel)} and {getCountWithCorrectNoun(midsCount, 'MID')}
          </span>.
        </p>
        <br />
        <p>Please enter the Merchant Name to confirm.</p>
      </div>
      <TextInputGroup
        name='merchant-name'
        label='Merchant Name'
        autofocus
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
  )

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='Delete Merchant' onCloseFn={() => dispatch(reset())}>
      {merchantCounts || getMerchantResponse ? renderDeleteForm() : <i className='font-body-4'>Loading...</i>}
    </Modal>
  )
}

export default DirectoryMerchantDeleteModal
