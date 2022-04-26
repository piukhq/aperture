import {useState} from 'react'
import {reset, getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'

import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle} from 'utils/enums'
import {getCountWithCorrectNoun} from 'utils/stringFormat'

const DirectoryMerchantDeleteModal = () => {
  const dispatch = useAppDispatch()
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const {name, location_label: locationLabel} = selectedMerchant.merchant_metadata
  const {locations, payment_schemes: paymentSchemes} = selectedMerchant.merchant_counts

  const [nameValue, setNameValue] = useState('')
  const [isNameReadyForVerification, setIsNameReadyForVerification] = useState(false)

  const totalMidCount = paymentSchemes.reduce((acc, {count}) => acc + count, 0)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setIsNameReadyForVerification(false)
  }

  const verifyName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsNameReadyForVerification(true)

    // TODO: Perform relevant Verification actions and submit
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
          error={null} // TODO: add any errors as per Verification
          value={nameValue}
          onChange={handleNameChange}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL_LABEL_HIDDEN}
          inputWidth={InputWidth.FULL}
          inputColour={isNameReadyForVerification ? InputColour.RED : InputColour.GREY} // TODO: Add verified check conditional
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
