import {useEffect, useState, useCallback} from 'react'
import Image from 'next/image'
import {reset, getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle, ModalType} from 'utils/enums'
import {useDirectoryPlans} from 'hooks/useDirectoryPlans'
import {RTKQueryErrorResponse} from 'types'
import {requestModal} from 'features/modalSlice'

const DirectoryPlanModal = () => {
  const {
    postPlan,
    postPlanResponse,
    postPlanError,
    resetPostPlanResponse,
    putPlan,
    putPlanResponse,
    putPlanError,
    resetPutPlanResponse,
  } = useDirectoryPlans({
    skipGetPlans: true,
    skipGetPlan: true,
  })

  const dispatch = useAppDispatch()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)

  const {plan_ref, plan_metadata} = selectedPlan
  const {name, plan_id: planId, slug, icon_url: iconUrl} = plan_metadata

  const isNewPlan = !plan_ref

  // TODO: Input field logic could be refactored when functionality story is worked upon
  const [imageValue, setImageValue] = useState<string| null>(null)
  const [nameValue, setNameValue] = useState<string>(name || '')
  const [planIdValue, setPlanIdValue] = useState<string>(`${planId || ''}`)
  const [slugValue, setSlugValue] = useState<string>(slug || '')
  const [nameValidationError, setNameValidationError] = useState<string>('')
  const [planIdValidationError, setPlanIdValidationError] = useState<string>('')
  const [slugValidationError, setSlugValidationError] = useState<string>('')
  const [isCloseButtonFocused, setIsCloseButtonFocused] = useState<boolean>(false)

  useEffect(() => { // Reset error when close button is focused
    if (isCloseButtonFocused) {
      setNameValidationError('')
      setPlanIdValidationError('')
      setSlugValidationError('')
    }
  }, [isCloseButtonFocused])

  const handlePlanError = useCallback((planError: RTKQueryErrorResponse) => {
    const {status, data} = planError

    if (data && data.detail) {
      const {detail} = data
      // TODO: Handle error responses other that 409 (duplicate) and everything else
      detail.forEach(err => {
        const {loc, msg} = err
        const location = loc?.[1]
        if (location === 'name') {
          setNameValidationError(status as unknown === 409 ? 'Name already exists' : msg)
        } else if (location === 'plan_id') {
          setPlanIdValidationError(status as unknown === 409 ? 'Plan ID already exists' : msg)
        } else if (location === 'slug') {
          setSlugValidationError(status as unknown === 409 ? 'Slug already exists' : msg)
        } else {
          setNameValidationError(msg)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (postPlanError || putPlanError) {
      handlePlanError(postPlanError as RTKQueryErrorResponse || putPlanError as RTKQueryErrorResponse)
    } else if (postPlanResponse || putPlanResponse) {
      postPlanResponse ? resetPostPlanResponse() : resetPutPlanResponse()
      dispatch(reset())
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [
    postPlanError,
    putPlanError,
    handlePlanError,
    postPlanResponse,
    putPlanResponse,
    resetPostPlanResponse,
    resetPutPlanResponse,
    dispatch,
  ])

  // TODO: Add code to display selected Image when added (and also check it is an actual image and other validation)
  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => event.target.files && setImageValue(event.target.files[0].name)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setNameValidationError('')
  }

  const handlePlanIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanIdValue(event.target.value)
    setPlanIdValidationError('')
  }

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCasedValue = event.target.value.toLowerCase()
    setSlugValue(lowerCasedValue)
    // check of event target value is a valid slug, which can only contain lower case letters, minus and hyphens
    const validSlugRegex = /^[a-z-]*$/
    if (!validSlugRegex.test(lowerCasedValue) && lowerCasedValue !== '') {
      setSlugValidationError('Unsupported characters')
    } else {
      setSlugValidationError('')
    }
  }

  const handleNameBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setNameValidationError('Enter name')
    }
  }

  const validatePlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nameValidationError && !planIdValidationError && !slugValidationError) {
      if (nameValue === '') {
        setNameValidationError('Enter name')
      } else {
        // API expects non-required blank values to be '' rahter than empty strings
        const [planId, slug] = [planIdValue, slugValue].map(value => value === '' ? '' : value)
        // TODO: add logic to PATCH Plan when updating
        if (isNewPlan) {
          postPlan({name: nameValue, plan_id: parseInt(planId), slug, icon_url: imageValue})
        } else {
          putPlan({name: nameValue, plan_id: parseInt(planId), slug, icon_url: imageValue, planRef: plan_ref})
        }
      }
    }
  }

  const renderAddImageLabel = () => (
    <label
      htmlFor='merchant-add-image'
      className='h-[127px] w-[127px] rounded-[30px] flex items-center justify-center bg-grey-100 dark:bg-grey-800 text-center font-heading-9 text-grey-700 dark:text-grey-300'
    >Add Image</label>
  )

  const renderExistingImage = () => <Image className='rounded-[35px] flex items-center justify-center' src={iconUrl || ''} width={140} height={140} alt={`${name} plan image`}/>

  const renderTextFields = () => (
    <>
      <TextInputGroup
        name='plan-name'
        label='Name'
        autofocus
        error={nameValidationError}
        value={nameValue}
        onChange={handleNameChange}
        onFocus={() => setNameValidationError('')}
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
        maxLength={9} // TODO: raise this limit once the int size is increased in the API
        value={planIdValue}
        onChange={handlePlanIdChange}
        onFocus={() => setPlanIdValidationError('')}
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
        onFocus={() => setSlugValidationError('')}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={slugValidationError ? InputColour.RED : InputColour.GREY}
      />
    </>
  )

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={isNewPlan ? 'New Plan' : 'Edit Plan'} onCloseFn={() => dispatch(reset())} setIsCloseButtonFocused={setIsCloseButtonFocused}>
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
