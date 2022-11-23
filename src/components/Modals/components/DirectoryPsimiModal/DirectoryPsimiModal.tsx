import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
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
  const router = useRouter()
  const {planId, merchantId} = router.query

  const {
    postMerchantPsimi,
    postMerchantPsimiResponse,
    postMerchantPsimiError,
    resetPostMerchantPsimiResponse,
  } = useMidManagementPsimis({skipGetPsimis: true, skipGetPsimi: true})

  const paymentScheme = useAppSelector(getSelectedDirectoryMerchantPaymentScheme)

  const dispatch = useAppDispatch()

  const [psimiValue, setPsimiValue] = useState('')
  const [psimiValidationError, setPsimiValidationError] = useState(null)
  const [isOnboardRequired, setIsOnboardRequired] = useState(false)

  const handlePostMerchantPsimiError = useCallback(() => {
    const {status, data} = postMerchantPsimiError as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      setPsimiValidationError(status as unknown === 409 ? 'PSIMI already exists' : detail[0].msg)
    }
  }, [postMerchantPsimiError])

  useEffect(() => {
    if (postMerchantPsimiError) {
      handlePostMerchantPsimiError()
    } else if (postMerchantPsimiResponse) {
      resetPostMerchantPsimiResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
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
        const paymentSchemeSlug = PaymentSchemeSlug[paymentScheme]
        const metadata = {
          value: psimiValue,
          payment_scheme_merchant_name: null, // Never populated for a new PSIMI
          payment_scheme_slug: paymentSchemeSlug,
        }
        postMerchantPsimi({onboard: isOnboardRequired, planRef: planId as string, merchantRef: merchantId as string, psimi_metadata: metadata})
      }
    }
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`New ${paymentScheme} PSIMI`} onCloseFn={() => dispatch(reset())}>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validatePsimi}>
        <TextInputGroup
          name='psimi'
          label='PSIMI'
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