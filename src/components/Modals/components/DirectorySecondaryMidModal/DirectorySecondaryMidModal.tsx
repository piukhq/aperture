import {useState, useEffect, useCallback} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, ModalType, PaymentSchemeSlug} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {getSelectedDirectoryMerchantPaymentScheme, reset} from 'features/directoryMerchantSlice'
import {RTKQueryErrorResponse} from 'types'

const DirectorySecondaryMidModal = () => {
  const {planId, merchantId} = useGetRouterQueryString()

  const {
    postMerchantSecondaryMid,
    postMerchantSecondaryMidResponse,
    postMerchantSecondaryMidError,
    resetPostMerchantSecondaryMidResponse,
  } = useDirectorySecondaryMids({skipGetSecondaryMids: true, skipGetSecondaryMid: true, skipGetSecondaryMidsByPage: true})

  const paymentScheme = useAppSelector(getSelectedDirectoryMerchantPaymentScheme)

  const dispatch = useAppDispatch()

  const [secondaryMidValue, setSecondaryMidValue] = useState<string>('')
  const [secondaryMidValidationError, setSecondaryMidValidationError] = useState<string>(null)
  const [isOnboardRequired, setIsOnboardRequired] = useState<boolean>(false)
  const [isCloseButtonFocused, setIsCloseButtonFocused] = useState<boolean>(false)

  useEffect(() => { // Reset error when close button is focused
    isCloseButtonFocused && setSecondaryMidValidationError(null)
  }, [isCloseButtonFocused])

  const handlePostMerchantSecondaryMidError = useCallback(() => {
    const {data} = postMerchantSecondaryMidError as RTKQueryErrorResponse
    if (data && data.detail) {
      const {detail} = data
      const errorMessage = detail[0].type === 'unique_error' ? 'Secondary MID already exists' : 'Invalid Secondary MID'
      setSecondaryMidValidationError(errorMessage)
    }
  }, [postMerchantSecondaryMidError])

  useEffect(() => {
    if (postMerchantSecondaryMidError) {
      handlePostMerchantSecondaryMidError()
    } else if (postMerchantSecondaryMidResponse) {
      resetPostMerchantSecondaryMidResponse()
      dispatch(reset())
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [postMerchantSecondaryMidError, resetPostMerchantSecondaryMidResponse, handlePostMerchantSecondaryMidError, postMerchantSecondaryMidResponse, dispatch])

  const handleSecondaryMidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryMidValue(event.target.value)
  }

  const handleSecondaryMidBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setSecondaryMidValidationError('Enter Secondary MID')
    }
  }

  const validateSecondaryMid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!secondaryMidValidationError) {
      if (secondaryMidValue === '') {
        setSecondaryMidValidationError('Enter Secondary MID')
      } else {
        const paymentSchemeSlug = PaymentSchemeSlug[paymentScheme.toUpperCase()]
        const metadata = {
          secondary_mid: secondaryMidValue,
          payment_enrolment_status: 'unknown',
          payment_scheme_slug: paymentSchemeSlug,
        }
        postMerchantSecondaryMid({
          planRef: planId,
          merchantRef: merchantId,
          locationRef: '',
          secondary_mid_metadata: metadata,
          onboard: isOnboardRequired,
        })
      }
    }
  }

  const handleModalClose = () => {
    resetPostMerchantSecondaryMidResponse()
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`New ${paymentScheme} Secondary MID`} onCloseFn={handleModalClose} setIsCloseButtonFocused={setIsCloseButtonFocused}>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validateSecondaryMid}>
        <TextInputGroup
          name='secondary-mid'
          label='Secondary MID'
          autofocus
          error={secondaryMidValidationError}
          value={secondaryMidValue}
          onChange={handleSecondaryMidChange}
          onFocus={() => setSecondaryMidValidationError(null)}
          onBlur={handleSecondaryMidBlur}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={secondaryMidValidationError ? InputColour.RED : InputColour.GREY}
        />

        <div className='flex gap-[13.5px] justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[16px]'>
          <Button
            handleClick={() => setIsOnboardRequired(false)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add Secondary MID
          </Button>
          <Button
            handleClick={() => setIsOnboardRequired(true)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add {'&'} Onboard Secondary MID
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectorySecondaryMidModal
