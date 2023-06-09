import {useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {reset, getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {requestModal} from 'features/modalSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useDirectoryPlans} from 'hooks/useDirectoryPlans'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, ModalType} from 'utils/enums'
import {getCountWithCorrectNoun} from 'utils/stringFormat'
import {RTKQueryErrorResponse} from 'types'

const DirectoryPlanDeleteModal = () => {
  const [nameValue, setNameValue] = useState('')
  const [nameValidationError, setNameValidationError] = useState(null)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const {plan_ref: planId, total_mid_count: totalMidCount} = selectedPlan
  const {name} = selectedPlan.plan_metadata
  const {merchants, locations} = selectedPlan.plan_counts || {}

  const {
    deletePlan,
    deletePlanIsSuccess,
    deletePlanError,
    resetDeletePlanResponse,
  } = useDirectoryPlans({
    skipGetPlan: true,
    planRef: planId,
  })


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
  }

  const verifyName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nameValue === '') {
      setNameValidationError('Enter plan name')
    } else if (nameValue !== name) {
      setNameValidationError('Enter correct plan name')
    } else {
      setNameValidationError(null)
      deletePlan({planRef: selectedPlan.plan_ref})
    }
  }

  const handleDeletePlanError = useCallback(() => {
    const {data} = deletePlanError as RTKQueryErrorResponse
    if (data && data.detail) {
      const {detail} = data
      setNameValidationError(detail[0].msg)
    }
  }, [deletePlanError])

  useEffect(() => {
    if (deletePlanError) {
      handleDeletePlanError()
    } else if (deletePlanIsSuccess) {
      resetDeletePlanResponse()
      dispatch(reset())
      dispatch(requestModal(ModalType.NO_MODAL))
      router.asPath.includes(planId) && router.replace('/mid-management/directory/')
    }
  }, [deletePlanError, resetDeletePlanResponse, handleDeletePlanError, deletePlanIsSuccess, dispatch, router, planId])

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='Delete Plan' onCloseFn={() => dispatch(reset())}>
      <form className='flex flex-col mt-[30px]' onSubmit={verifyName}>
        <div className='font-body-3 mb-[10px]'>
          <p>Are you sure you want to delete {name}?</p>
          <p data-testid='second-paragraph'>This will also delete <span className='font-bold'> {getCountWithCorrectNoun(merchants, 'Merchant')},{' '}
            {getCountWithCorrectNoun(locations, 'Location')} and {getCountWithCorrectNoun(totalMidCount, 'MID')}</span>.</p>
          <br/>
          <p>Please enter the Plan Name to confirm.</p>
        </div>
        <TextInputGroup
          autofocus
          name='plan-name'
          label='Plan Name'
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
          >Delete Plan
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectoryPlanDeleteModal
