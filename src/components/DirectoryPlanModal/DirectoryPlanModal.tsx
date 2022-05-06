import {useEffect, useState, useCallback} from 'react'
import Image from 'next/image'
import {reset, getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, ModalType} from 'utils/enums'
import {useMidManagementPlans} from 'hooks/useMidManagementPlans'
import {RTKQueryErrorResponse} from 'types'
import {requestModal} from 'features/modalSlice'

const DirectoryPlanModal = () => {
  const {
    postPlan,
    postPlanResponse,
    postPlanError,
    resetPostPlanResponse,
  } = useMidManagementPlans()

  const dispatch = useAppDispatch()

  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)

  const {plan_ref, plan_metadata} = selectedPlan
  const {name, plan_id: planId, slug, icon_url: iconUrl} = plan_metadata

  const isNewPlan = !plan_ref

  // TODO: Input field logic could be refactored when functionality story is worked upon
  const [imageValue, setImageValue] = useState(null)
  const [nameValue, setNameValue] = useState(name || '')
  const [planIdValue, setPlanIdValue] = useState(`${planId || ''}`)
  const [slugValue, setSlugValue] = useState(slug || '')

  const [nameValidationError, setNameValidationError] = useState(null)
  const [planIdValidationError, setPlanIdValidationError] = useState(null)
  const [slugValidationError, setSlugValidationError] = useState(null)

  const handlePostPlanError = useCallback(() => {
    const {status, data} = postPlanError as RTKQueryErrorResponse
    const {detail} = data

    // TODO: Handle error responses other that 409 (duplicate) and everything else
    detail.map(err => {
      const {loc, msg} = err
      const location = loc[1]
      if (location === 'name') {
        setNameValidationError(status as unknown === 409 ? 'Name already exists' : msg)
      } else if (location === 'plan_id') {
        setPlanIdValidationError(status as unknown === 409 ? 'Plan ID already exists' : msg)
      } else if (location === 'slug') {
        setSlugValidationError(status as unknown === 409 ? 'Slug already exists' : msg)
      }
    })
  }, [postPlanError])

  useEffect(() => {
    if (postPlanError) {
      handlePostPlanError()
    } else if (postPlanResponse) {
      resetPostPlanResponse()
      reset()
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [postPlanError, handlePostPlanError, postPlanResponse, resetPostPlanResponse, dispatch])

  // TODO: Add code to display selected Image when added (and also check it is an actual image and other validation)
  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => setImageValue(event.target.files[0])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setNameValidationError(null)
  }

  const handlePlanIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanIdValue(event.target.value)
    setPlanIdValidationError(null)
  }

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlugValue(event.target.value)
    setSlugValidationError(null)
  }

  const handleNameBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setNameValidationError('Enter Name')
    }
  }

  const validatePlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nameValidationError) {
      if (nameValue === '') {
        setNameValidationError('Enter Name')
      } else {
        // API expects non-required blank values to be null rahter than empty strings
        const [planId, slug] = [planIdValue, slugValue].map(value => value === '' ? null : value)
        postPlan({name: nameValue, planId, slug, iconUrl: imageValue})
      }
    }
  }

  const renderAddImageLabel = () => (
    <label
      htmlFor='merchant-add-image'
      className='h-[127px] w-[127px] rounded-[30px] flex items-center justify-center bg-grey-100 dark:bg-grey-800 text-center font-heading-9 text-grey-700 dark:text-grey-300'
    >Add Image</label>
  )

  const renderExistingImage = () => <Image className='rounded-[35px] flex items-center justify-center' src={iconUrl} width={140} height={140} alt={`${name} plan image`}/>

  const renderTextFields = () => (
    <>
      <TextInputGroup
        name='plan-name'
        label='Name'
        error={nameValidationError}
        value={nameValue}
        onChange={handleNameChange}
        onFocus={() => setNameValidationError(null)}
        onBlur={handleNameBlur}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={nameValidationError ? InputColour.RED : InputColour.GREY}
      />
      <TextInputGroup
        name='plan-id'
        label='Plan ID'
        error={planIdValidationError}
        value={planIdValue}
        onChange={handlePlanIdChange}
        onFocus={() => setPlanIdValidationError(null)}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={planIdValidationError ? InputColour.RED : InputColour.GREY}
      />
      <TextInputGroup
        name='plan-slug'
        label='Slug'
        error={slugValidationError}
        value={slugValue}
        onChange={handleSlugChange}
        onFocus={() => setSlugValidationError(null)}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={slugValidationError ? InputColour.RED : InputColour.GREY}
      />
    </>
  )

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={isNewPlan ? 'New Plan' : 'Edit Plan'} onCloseFn={() => dispatch(reset())}>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validatePlan}>
        <div className='w-full flex items-center justify-center my-[4px]'>
          <div className={`flex items-center rounded-[35px] justify-center focus-within:ring-2 focus-within:ring-lightBlue ${!iconUrl && 'h-[140px] w-[140px] border-2 border-grey-400 dark:border-grey-600'}`}>
            {iconUrl ? renderExistingImage() : renderAddImageLabel()}
            <input aria-label='Add Image' className='cursor-pointer absolute block opacity-0 h-[140px] w-[140px] pin-r pin-t' type='file' name='merchant-add-image' onChange={handleImageInput}/>
          </div>
        </div>

        {renderTextFields()}
        <div className='flex justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[16px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >{isNewPlan ? 'Add Plan' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectoryPlanModal
