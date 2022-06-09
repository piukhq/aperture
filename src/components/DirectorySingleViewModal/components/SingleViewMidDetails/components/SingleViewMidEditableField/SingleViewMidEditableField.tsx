import {useEffect, useState} from 'react'
import {DirectoryMid} from 'types'
import {Button, Tag, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, BorderColour, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {TagStyle, TagSize, TextStyle} from 'components/Tag/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CloseIcon from 'icons/svgs/close.svg'
import TrashSvg from 'icons/svgs/trash.svg'

type Props = {
  label: string
  value: string | null
  handleValueChange: (value: string) => void
  handleCancel: () => void
  handleSave: () => void
  handleDelete: () => void
  isSaving: boolean
  successResponse: DirectoryMid
}

const SingleViewMidEditableField = ({label, value, handleValueChange, handleCancel, handleSave, handleDelete, isSaving, successResponse}: Props) => {
  const [isInEditState, setIsInEditState] = useState(false)
  const [isInDeleteState, setIsInDeleteState] = useState(false)
  const [validationError, setValidationError] = useState(null)

  useEffect(() => {
    if (successResponse) {
      setIsInEditState(false)
      setIsInDeleteState(false)
    }
  }, [successResponse])

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
    // Ensure only numeric value are entered
    if (value.match(/^[0-9]*$/)) {
      handleSave()
    } else {
      setValidationError('Enter numeric value')
    }
  }

  return (
    <section className='h-[38px] flex justify-between mb-[34px] items-center'>
      {isInEditState ? (
        <>
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
            {isSaving ? (
              <Tag
                tagSize={TagSize.SINGLE_VIEW_MID_MEDIUM}
                textStyle={TextStyle.MEDIUM}
                tagStyle={TagStyle.LIGHT_GREY_FILLED}
                label='Saving...'
              />
            ) : (
              <div className='flex gap-[10px]'>
                <Button
                  handleClick={onSaveHandler}
                  buttonType={ButtonType.SUBMIT}
                  buttonSize={ButtonSize.MEDIUM}
                  buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
                  buttonBackground={ButtonBackground.BLUE}
                  labelColour={LabelColour.WHITE}
                  labelWeight={LabelWeight.SEMIBOLD}
                >Save
                </Button>

                <Button
                  handleClick={onCancelHandler}
                  buttonSize={ButtonSize.MEDIUM_ICON}
                  buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
                  buttonBackground={ButtonBackground.LIGHT_GREY}
                ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className='font-single-view-heading'>{label}</h2>
            <p className='font-single-view-data'>{value || 'Unknown'}</p>
          </div>

          {isInDeleteState ? (
            <>
              <div className='flex gap-[10px]'>
                <div className='w-[160px]'>
                  <p className='font-body-4 text-red'>Are you sure you want to delete this {label}?</p>
                </div>
                <Button
                  handleClick={onCancelHandler}
                  buttonSize={ButtonSize.MEDIUM_ICON}
                  buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
                  buttonBackground={ButtonBackground.LIGHT_GREY}
                ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
                </Button>

                <Button
                  handleClick={handleDelete}
                  buttonType={ButtonType.SUBMIT}
                  buttonSize={ButtonSize.MEDIUM_ICON}
                  buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
                  borderColour={BorderColour.RED}
                  labelColour={LabelColour.RED}
                  labelWeight={LabelWeight.SEMIBOLD}
                  ariaLabel={`Delete ${label}`}
                >Yes, Delete
                </Button>
              </div>
            </>
          ) : (
            <div className='flex gap-[10px]'>
              <Button
                buttonType={ButtonType.SUBMIT}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={value ? ButtonWidth.SINGLE_VIEW_MID_SMALL : ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.SEMIBOLD}
                handleClick={() => setIsInEditState(true)}
                ariaLabel={value ? 'Edit' : `Add ${label}`}
              >{value ? 'Edit' : `Add ${label}`}
              </Button>

              {value && (
                <Button
                  handleClick={() => setIsInDeleteState(true)}
                  buttonSize={ButtonSize.MEDIUM_ICON}
                  buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
                  borderColour={BorderColour.RED}
                  labelColour={LabelColour.RED}
                ><TrashSvg className='fill-red' />
                </Button>
              )}
            </div>
          )}

        </>
      )}
    </section>
  )
}
export default SingleViewMidEditableField
