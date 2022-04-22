import {useState} from 'react'
import {reset, getSelectedDirectoryPlan} from 'features/directoryPlanSlice'

import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle} from 'utils/enums'
import {getCountWithCorrectNoun} from 'utils/stringFormat'

const DirectoryPlanModal = () => {
  const dispatch = useAppDispatch()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const {name} = selectedPlan.plan_metadata
  const {merchants, locations, payment_schemes} = selectedPlan.plan_counts

  const [nameValue, setNameValue] = useState('')
  const [isNameReadyForVerification, setIsNameReadyForVerification] = useState(false)

  const totalMidCount = payment_schemes.reduce((acc, {count}) => acc + count, 0)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setIsNameReadyForVerification(false)
  }

  const verifyName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsNameReadyForVerification(true)

    // TODO: Perform relevant Verification actions and submit, placeholder for now:
    console.log(`Submitted Name: ${nameValue}. Plan Name: ${name}`)
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='Delete Plan' onCloseFn={() => dispatch(reset())}>
      <form className='flex flex-col mt-[30px]' onSubmit={verifyName}>
        <div className='font-body-3'>
          <p>Are you sure you want to delete {name}?</p>
          <p>This will also delete <span className='font-bold'> {getCountWithCorrectNoun(merchants, 'Merchant')},{' '}
            {getCountWithCorrectNoun(locations, 'Location')} and {getCountWithCorrectNoun(totalMidCount, 'MID')}</span>.</p>
          <br/>
          <p>Please enter the Plan Name to confirm.</p>
        </div>
        <TextInputGroup
          name='plan-name'
          label='Name'
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
            buttonBackground={ButtonBackground.WHITE}
            labelColour={LabelColour.RED}
            labelWeight={LabelWeight.SEMIBOLD}
          >Delete Plan
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectoryPlanModal

// 3. unit tests.

