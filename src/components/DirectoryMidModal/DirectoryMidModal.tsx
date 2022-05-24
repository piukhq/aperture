import {useState} from 'react'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, PaymentSchemeName} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMidPaymentScheme, reset} from 'features/directoryMidSlice'

const DirectoryMidModal = () => {
  const paymentScheme = useAppSelector(getSelectedDirectoryMidPaymentScheme)
  const dispatch = useAppDispatch()

  const [midValue, setMidValue] = useState('')
  const [binValue, setBinValue] = useState('')

  const [midValidationError, setMidValidationError] = useState(null)

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
    // TODO: Perform relevant validation and submit, placeholder for now. Probably don't want to use bin field if not VISA
    console.log({
      name: midValue,
      bin: binValue,
    })
  }

  const renderBinField = () => (
    <>
      {<TextInputGroup
        name='bin'
        label='BIN'
        error={null} // TODO: add any errors as per validation
        value={binValue}
        onChange={handleBinChange}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={InputColour.GREY} // TODO: Add validation formatting
      />
      }
    </>
  )

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`New ${paymentScheme} MID`} onCloseFn={() => dispatch(reset())}>
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
        {paymentScheme === PaymentSchemeName.VISA && renderBinField()}
        <div className='flex gap-[13.5px] justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[16px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add MID
          </Button>
          <Button
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
