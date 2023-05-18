import {useState, useEffect, useCallback} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, ModalType, PaymentSchemeSlug} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {useMidManagementPsimis} from 'hooks/useMidManagementPsimis'
import {getSelectedDirectoryMerchantPaymentScheme, reset} from 'features/directoryMerchantSlice'
import {RTKQueryErrorResponse} from 'types'

const DirectoryPsimiModal = () => {
  const {planId, merchantId} = useGetRouterQueryString()

  const {
    postMerchantPsimi,
    postMerchantPsimiResponse,
    postMerchantPsimiError,
    resetPostMerchantPsimiResponse,
  } = useMidManagementPsimis({skipGetPsimis: true, skipGetPsimi: true, skipGetPsimisByPage: true})

  const paymentScheme = useAppSelector(getSelectedDirectoryMerchantPaymentScheme)

  const dispatch = useAppDispatch()

  const [psimiValue, setPsimiValue] = useState('')
  const [psimiValidationError, setPsimiValidationError] = useState(null)
  const [isOnboardRequired, setIsOnboardRequired] = useState(false)
  const [isCloseButtonFocused, setIsCloseButtonFocused] = useState(false)

  useEffect(() => { // Reset error when close button is focused
    isCloseButtonFocused && setPsimiValidationError(null)
  }, [isCloseButtonFocused])


  const handlePostMerchantPsimiError = useCallback(() => {
    const {status, data} = postMerchantPsimiError as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      setPsimiValidationError(status as unknown === 409 ? 'PSIMI already exists' : detail[0].msg)
    }
  }, [postMerchantPsimiError])

  useEffect(() => { // Handle response from postMerchantPsimi
    if (postMerchantPsimiError) {
      handlePostMerchantPsimiError()
    } else if (postMerchantPsimiResponse) {
      resetPostMerchantPsimiResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
      dispatch(reset())

    }
  }, [postMerchantPsimiError, resetPostMerchantPsimiResponse, handlePostMerchantPsimiError, postMerchantPsimiResponse, dispatch])


  const handlePsimiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPsimiValue(event.target.value)
  }
  const handlePsimiBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setPsimiValidationError('Enter PSIMI')
    }
  }

  const validatePsimi = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!psimiValidationError) {
      if (psimiValue === '') {
        setPsimiValidationError('Enter PSIMI')
      } else {
        const paymentSchemeSlug = PaymentSchemeSlug[paymentScheme.toUpperCase()]
        const metadata = {
          value: psimiValue,
          payment_scheme_merchant_name: null, // Never populated for a new PSIMI
          payment_scheme_slug: paymentSchemeSlug,
        }
        postMerchantPsimi({onboard: isOnboardRequired, planRef: planId, merchantRef: merchantId, psimi_metadata: metadata})
      }
    }
  }

  const handleModalClose = () => {
    resetPostMerchantPsimiResponse()
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`New ${paymentScheme} PSIMI`} onCloseFn={handleModalClose} setIsCloseButtonFocused={setIsCloseButtonFocused}>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validatePsimi}>
        <TextInputGroup
          name='psimi'
          label='PSIMI'
          autofocus
          error={psimiValidationError}
          value={psimiValue}
          onChange={handlePsimiChange}
          onFocus={() => setPsimiValidationError(null)}
          onBlur={handlePsimiBlur}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={psimiValidationError ? InputColour.RED : InputColour.GREY}
        />

        <div className='flex gap-[13.5px] justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[16px]'>
          <Button
            handleClick={() => setIsOnboardRequired(false)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add PSIMI
          </Button>
          <Button
            handleClick={() => setIsOnboardRequired(true)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add {'&'} Onboard PSIMI
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectoryPsimiModal
