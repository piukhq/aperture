import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, ModalType, PaymentSchemeSlug} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {getSelectedDirectoryMerchantPaymentScheme, reset} from 'features/directoryMerchantSlice'
import {RTKQueryErrorResponse} from 'types'

const DirectorySecondaryMidModal = () => {
  const router = useRouter()
  const {planId, merchantId} = router.query

  const {
    postMerchantSecondaryMid,
    postMerchantSecondaryMidResponse,
    postMerchantSecondaryMidError,
    resetPostMerchantSecondaryMidResponse,
  } = useMidManagementSecondaryMids({skipGetSecondaryMids: true, skipGetSecondaryMid: true})

  const paymentScheme = useAppSelector(getSelectedDirectoryMerchantPaymentScheme)

  const dispatch = useAppDispatch()

  const [secondaryMidValue, setSecondaryMidValue] = useState('')
  const [secondaryMidValidationError, setSecondaryMidValidationError] = useState(null)
  const [isOnboardRequired, setIsOnboardRequired] = useState(false)

  const handlePostMerchantSecondaryMidError = useCallback(() => {
    const {data} = postMerchantSecondaryMidError as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      setSecondaryMidValidationError(detail[0].msg)
    }
  }, [postMerchantSecondaryMidError])

  useEffect(() => {
    if (postMerchantSecondaryMidError) {
      handlePostMerchantSecondaryMidError()
    } else if (postMerchantSecondaryMidResponse) {
      resetPostMerchantSecondaryMidResponse()
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
          planRef: planId as string,
          merchantRef: merchantId as string,
          locationRef: '',
          secondary_mid_metadata: metadata,
          onboard: isOnboardRequired,
        })
      }
    }
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`New ${paymentScheme} Secondary MID`} onCloseFn={() => dispatch(reset())}>
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