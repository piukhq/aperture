import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, ModalType, PaymentSchemeName, PaymentSchemeSlug} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {getSelectedDirectoryMerchantPaymentScheme, reset} from 'features/directoryMerchantSlice'
import {RTKQueryErrorResponse} from 'types'

const DirectoryMidModal = () => {
  const router = useRouter()
  const {planId, merchantId} = router.query

  const {
    postMerchantMid,
    postMerchantMidResponse,
    postMerchantMidError,
    resetPostMerchantMidResponse,
  } = useMidManagementMids({skipGetMids: true, skipGetMid: true}) // Don't call GET MIDs or GET MID details

  const paymentScheme = useAppSelector(getSelectedDirectoryMerchantPaymentScheme)

  const dispatch = useAppDispatch()

  const [midValue, setMidValue] = useState('')
  const [binValue, setBinValue] = useState('')

  const [midValidationError, setMidValidationError] = useState(null)
  const [isOffboardRequired, setIsOffboardRequired] = useState(false)

  const handlePostMerchantMidError = useCallback(() => {
    const {status, data} = postMerchantMidError as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      setMidValidationError(status as unknown === 409 ? 'MID already exists' : detail[0].msg)
    }
  }, [postMerchantMidError])

  useEffect(() => {
    if (postMerchantMidError) {
      handlePostMerchantMidError()
    } else if (postMerchantMidResponse) {
      resetPostMerchantMidResponse()
      reset()
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [postMerchantMidError, resetPostMerchantMidResponse, handlePostMerchantMidError, postMerchantMidResponse, dispatch])

  const handleMidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMidValue(event.target.value)
  }
  const handleMidBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setMidValidationError('Enter MID')
    }
  }
  const handleBinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBinValue(event.target.value)
  }

  const validateMid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!midValidationError) {
      if (midValue === '') {
        setMidValidationError('Enter MID')
      } else {
        const paymentSchemeSlug: PaymentSchemeSlug = PaymentSchemeSlug[paymentScheme.toUpperCase()]
        const metadata = {
          payment_scheme_slug: paymentSchemeSlug,
          mid: midValue,
          visa_bin: binValue,
        }
        postMerchantMid({onboard: isOffboardRequired, planRef: planId as string, merchantRef: merchantId as string, mid_metadata: metadata})
      }
    }
  }

  const handleModalClose = () => {
    resetPostMerchantMidResponse()
    dispatch(reset())
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`New ${paymentScheme} MID`} onCloseFn={handleModalClose}>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validateMid}>
        <TextInputGroup
          name='mid'
          label='MID'
          error={midValidationError}
          value={midValue}
          onChange={handleMidChange}
          onFocus={() => setMidValidationError(null)}
          onBlur={handleMidBlur}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={midValidationError ? InputColour.RED : InputColour.GREY}
        />

        {paymentScheme === PaymentSchemeName.VISA && (
          <TextInputGroup
            name='bin'
            label='BIN'
            error={null}
            value={binValue}
            onChange={handleBinChange}
            inputType={InputType.TEXT}
            inputStyle={InputStyle.FULL}
            inputWidth={InputWidth.FULL}
            inputColour={InputColour.GREY}
          />
        )}

        <div className='flex gap-[13.5px] justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[16px]'>
          <Button
            handleClick={() => setIsOffboardRequired(false)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add MID
          </Button>
          <Button
            handleClick={() => setIsOffboardRequired(true)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add {'&'} Onboard MID
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectoryMidModal
