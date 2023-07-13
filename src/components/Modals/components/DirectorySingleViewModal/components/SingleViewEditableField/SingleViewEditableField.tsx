import {useEffect, useState} from 'react'
import {Button, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, BorderColour, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import SingleViewCombobox from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewCombobox'
import CloseIcon from 'icons/svgs/close.svg'
import TrashSvg from 'icons/svgs/trash.svg'
import {UserPermissions} from 'utils/enums'

type Props = {
  header: string
  label: string
  actionVerb: string
  value: string
  link?: string
  handleValueChange: (value: string) => void
  handleCancel: () => void
  handleSave: () => void
  handleDelete?: () => void
  onEdit?: () => void
  isSaving: boolean
  successResponse: unknown
  errorResponse: unknown
  handleValidation?: (value: string) => unknown
  validationErrorMessage?: string
  warningMessage?: string
  dropdownValues?: Array<string>
  isDisabled: boolean
  shouldUseCombobox?: boolean
}

const SingleViewEditableField = ({
  header,
  label,
  actionVerb,
  value,
  link,
  handleValueChange,
  handleCancel,
  handleSave,
  handleDelete,
  isSaving,
  successResponse,
  errorResponse,
  handleValidation,
  validationErrorMessage = '',
  warningMessage,
  dropdownValues,
  onEdit,
  isDisabled,
  shouldUseCombobox,
}: Props) => {
  const [isInEditState, setIsInEditState] = useState<boolean>(false)
  const [isInDeleteState, setIsInDeleteState] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<string>('')

  useEffect(() => {
    if (successResponse) {
      setIsInEditState(false)
      setIsInDeleteState(false)
    }
  }, [successResponse, errorResponse])


  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError('')
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
      <div className='w-[160px] absolute -translate-x-40 bg-white/75 dark:bg-black/50'>
        <p role='alert' className='font-body-4 text-red'>Are you sure you want to {actionVerb} this {label}?</p>
      </div>
      <Button
        handleClick={onCancelHandler}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        ariaLabel={`Close ${label} ${actionVerb} confirmation`}
        noShadow
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
        ariaLabel={`${actionVerb} ${label} confirmation`}
        isDisabled={isDisabled}
        noShadow
      >Yes, {actionVerb}
      </Button>
    </div>
  )

  const formattedValue = value?.length > 50 ? value?.substring(0, 50) + '...' : value

  const renderReadOnlyState = () => (
    <div className='w-full'>
      {renderHeader()}
      <div className='flex w-full items-center justify-between'>
        {link && value ? (
          <a className='font-modal-data text-blue' href={link}>{formattedValue}</a>
        ) : (
          <p className='font-modal-data'>{formattedValue || 'Unknown'}</p>
        )}
        {isInDeleteState ? renderDeleteState() : (
          <div className='flex gap-[10px]'>
            <Button
              buttonType={ButtonType.SUBMIT}
              buttonSize={ButtonSize.MEDIUM}
              buttonWidth={value ? ButtonWidth.SINGLE_VIEW_MID_SMALL : ButtonWidth.AUTO}
              buttonBackground={ButtonBackground.LIGHT_GREY}
              labelColour={LabelColour.GREY}
              labelWeight={LabelWeight.SEMIBOLD}
              handleClick={onEditHandler}
              ariaLabel={value ? 'Edit' : `Add ${label}`}
              isDisabled={isDisabled}
              requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
              noShadow
            >{value ? 'Edit' : `Add ${label}`}
            </Button>

            {value && handleDelete && (
              <Button
                handleClick={() => setIsInDeleteState(true)}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
                borderColour={BorderColour.RED}
                labelColour={LabelColour.RED}
                ariaLabel={`${actionVerb} ${label}`}
                isDisabled={isDisabled}
                requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
                noShadow
              >
                {actionVerb === 'unlink' ? <CloseIcon className='w-[14px] h-[14px] fill-red' /> : <TrashSvg className='fill-red hover:fill-red/70' />}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const renderEditSaveAndCloseButtons = () => (
    <div className='flex gap-[10px] justify-end'>
      <Button
        handleClick={onSaveHandler}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={isSaving ? ButtonWidth.MEDIUM : ButtonWidth.SINGLE_VIEW_MID_SMALL}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        isDisabled={isDisabled || isSaving}
        noShadow
      >{isSaving ? 'Saving' : 'Save'}
      </Button>
      { !isSaving && (
        <Button
          handleClick={onCancelHandler}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          ariaLabel={`Close ${label} edit`}
          noShadow
        ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
        </Button>
      )}
    </div>
  )

  const renderEditableSelectionMenu = () => (
    <div className='w-full'>
      <div className='mb-[3px]'>
        {renderHeader()}
      </div>
      <div className='flex h-[36px] w-full gap-[10px] justify-between'>
        { shouldUseCombobox ? (
          <SingleViewCombobox
            selectedEntity={value}
            availableEntities={dropdownValues || []}
            entityValueFn={(entity: string) => entity}
            onChangeFn={handleValueChange}
            entityLabel = 'Location'
            isDisabled={isDisabled}
          />
        ) : (
          <Dropdown
            displayValue={formattedValue}
            displayValues={dropdownValues || []}
            onChangeDisplayValue={handleValueChange}
            isDisabled={isDisabled}
            selectedValueStyles='font-normal text-grey-600'
          />
        )
        }
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
        value={formattedValue || ''}
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
    return dropdownValues ? renderEditableSelectionMenu() : renderEditableInputField()
  }

  return (
    <section className='items-center'>
      <div className='flex mb-[15px]'>
        {isInEditState ? renderEditState() : renderReadOnlyState()}
      </div>
      <p className='font-body-4 dark:text-grey-600 max-w-[550px]'>{isInEditState && warningMessage}</p>
    </section>
  )
}
export default SingleViewEditableField
