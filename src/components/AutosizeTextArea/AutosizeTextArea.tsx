import {useEffect, useRef, useState} from 'react'
import useAutosizeTextArea from './useAutosizeTextArea'
import ArrowRightSvg from 'icons/svgs/arrow-right.svg'
import {classNames} from 'utils/classNames'

type Props = {
  accessibilityLabel: string
  placeholder: string
  submitHandler: (value: string) => void
  shouldClearText?: boolean
}

const AutosizeTextArea = ({accessibilityLabel, placeholder, submitHandler, shouldClearText = false}: Props) => {
  const [value, setValue] = useState('')
  const [inputValidationError, setInputValidationError] = useState(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, value)

  useEffect(() => {
    // Clear entered text when necessary
    shouldClearText && setValue('')
  }, [shouldClearText])

  const handleTextValidation = () => {
    // Remove new lines
    const validationValue = value.trim()
    if (validationValue === '') {
      setInputValidationError('Enter text')
    } else {
      submitHandler(value)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target?.value)
  }

  const handleKeyDownPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setInputValidationError(null)

    if(e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      handleTextValidation()
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleTextValidation()
  }

  return (
    <form className='relative flex w-full' onSubmit={handleFormSubmit}>
      <textarea
        aria-label={`${accessibilityLabel} text area`}
        data-testid='textarea'
        className={classNames(
          'scrollbar-hidden w-full min-h-[50px] max-h-[85px] resize-none pl-[12px] py-[11px] pr-[40px] rounded-[10px] border-[1px] border-grey-500 bg-white dark:bg-grey-825 font-body-3  focus:outline-lightBlue',
          `${inputValidationError && 'border-red'}`
        )}
        onChange={handleInputChange}
        placeholder={placeholder}
        ref={textAreaRef}
        rows={1}
        value={value}
        onKeyDown={handleKeyDownPress}
      />
      {inputValidationError && (
        <span data-testid={'input-error'} className='font-body-3 text-right text-red absolute right-[50px] bottom-[13px]'>
          {inputValidationError}
        </span>
      )}
      <button data-testid='submit-button' aria-label={`${accessibilityLabel} button`} className='absolute right-[10px] bottom-[14px]'>
        <ArrowRightSvg className='h-[22px] w-[22px]' />
      </button>
    </form>
  )
}

export default AutosizeTextArea
