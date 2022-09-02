import {useEffect, useState} from 'react'
import {Button, Tag, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, BorderColour, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {TagStyle, TagSize, TextStyle, TextColour} from 'components/Tag/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CloseIcon from 'icons/svgs/close.svg'
import TrashSvg from 'icons/svgs/trash.svg'

type Props = {
  header: string
  label: string
  value: string | null
  handleValueChange: (value: string) => void
  handleCancel: () => void
  handleSave: () => void
  handleDelete: () => void
  onEdit?: () => void
  isSaving: boolean
  successResponse: unknown
  errorResponse: unknown
  handleValidation?: (value: string) => unknown
  validationErrorMessage?: string
  dropdownValues?: Array<string>
}

const SingleViewMidEditableField = ({
  header,
  label,
  value,
  handleValueChange,
  handleCancel,
  handleSave,
  handleDelete,
  isSaving,
  successResponse,
  errorResponse,
  handleValidation,
  validationErrorMessage,
  dropdownValues,
  onEdit,
}: Props) => {
  const [isInEditState, setIsInEditState] = useState(false)
  const [isInDeleteState, setIsInDeleteState] = useState(false)
  const [validationError, setValidationError] = useState(null)

  useEffect(() => {
    if (successResponse || errorResponse) {
      setIsInEditState(false)
      setIsInDeleteState(false)
    }
  }, [successResponse, errorResponse])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null)
    handleValueChange(event.target.value)
  }

  const onCancelHandler = () => {
    handleCancel()
    setIsInEditState(false)
    setIsInDeleteState(false)
  }

  const onSaveHandler = () => {
    if (handleValidation) {
      if (handleValidation(value)) {
        handleSave()
      } else {
        setValidationError(validationErrorMessage)
      }
    } else {
      handleSave()
    }
  }

  const onEditHandler = () => {
    onEdit && onEdit()
    setIsInEditState(true)
  }

  const renderHeader = () => (
    <p className='font-modal-heading m-0'>{header}</p>
  )

  const renderDeleteState = () => (
    <div className='flex gap-[10px] h-[38px]'>
      <div className='w-[160px]'>
        <p className='font-body-4 text-red'>Are you sure you want to delete this {label}?</p>
      </div>
      <Button
        handleClick={onCancelHandler}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        ariaLabel={`Close ${label} delete`}
      ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
      </Button>

      <Button
        handleClick={handleDelete}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.MEDIUM}
        buttonBackground={ButtonBackground.RED}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        ariaLabel={`Delete ${label}`}
      >Yes, Delete
      </Button>
    </div>
  )

  const renderReadOnlyState = () => (
    <div className='w-full'>
      {renderHeader()}
      <div className='flex w-full items-center justify-between'>
        <p className='font-modal-data'>{value || 'Unknown'}</p>

        {isInDeleteState ? renderDeleteState() : (
          <div className='flex gap-[10px]'>
            <Button
              buttonType={ButtonType.SUBMIT}
              buttonSize={ButtonSize.MEDIUM}
              buttonWidth={value ? ButtonWidth.SINGLE_VIEW_MID_SMALL : ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
              buttonBackground={ButtonBackground.LIGHT_GREY}
              labelColour={LabelColour.GREY}
              labelWeight={LabelWeight.SEMIBOLD}
              handleClick={onEditHandler}
              ariaLabel={value ? (dropdownValues ? 'View' : 'Edit') : `Add ${label}`}
            >{value ? (dropdownValues ? 'View' : 'Edit') : `Add ${label}`}
            </Button>

            {value && (
              <Button
                handleClick={() => setIsInDeleteState(true)}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
                borderColour={BorderColour.RED}
                labelColour={LabelColour.RED}
                ariaLabel={`Trash ${label}`}
              ><TrashSvg className='fill-red' />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const renderEditSaveAndCloseButtons = () => {
    if (isSaving) {
      return (
        <Tag
          tagSize={TagSize.SINGLE_VIEW_MID_MEDIUM}
          textStyle={TextStyle.MEDIUM}
          textColour={TextColour.GREY}
          tagStyle={TagStyle.LIGHT_GREY_FILLED}
          label='Saving...'
        />
      )
    }
    return (
      <div className='flex gap-[10px]'>
        <Button
          handleClick={onSaveHandler}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
          ariaLabel={`Save ${label}`}
        >Save
        </Button>

        <Button
          handleClick={onCancelHandler}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          ariaLabel={`Close ${label} edit`}
        ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
        </Button>
      </div>
    )
  }

  const renderEditableDropdownMenu = () => (
    <div className='w-full'>
      <div className='mb-[3px]'>
        {renderHeader()}
      </div>
      <div className='flex h-[36px] w-full gap-[10px] justify-between'>
        <div className='w-[392px]'>
          <Dropdown displayValue={value} displayValues={dropdownValues} onChangeDisplayValue={handleValueChange} selectedValueStyles='font-normal text-grey-600' />
        </div>

        {renderEditSaveAndCloseButtons()}
      </div>
    </div>
  )

  const renderEditableInputField = () => (
    <div className='flex mt-[13px] w-full justify-between items-center'>
      <TextInputGroup
        name={`${label}-input-field`}
        label={label}
        autofocus
        error={validationError}
        value={value || ''}
        ariaRequired
        onChange={onChangeHandler}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={validationError ? InputColour.RED : InputColour.GREY}
      />

      <div className='ml-[10px] flex'>
        {renderEditSaveAndCloseButtons()}
      </div>
    </div>
  )

  const renderEditState = () => {
    return dropdownValues ? renderEditableDropdownMenu() : renderEditableInputField()
  }


  return (
    <section className='flex mb-[34px] items-center'>
      {isInEditState ? renderEditState() : renderReadOnlyState()}
    </section>
  )
}
export default SingleViewMidEditableField