import {useRef, useState} from 'react'
import useAutosizeTextArea from './useAutosizeTextArea'
import ArrowRightSvg from 'icons/svgs/arrow-right.svg'

type Props = {
  accessibilityLabel: string
  placeholder: string
  buttonClickHandler: () => void
}

const AutosizeTextArea = ({accessibilityLabel, placeholder, buttonClickHandler}: Props) => {
  const [value, setValue] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current, value)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target?.value)
  }

  return (
    <div className='relative flex w-full'>
      <textarea
        aria-label={`${accessibilityLabel} text area`}
        data-testid='textarea'
        className={
          'scrollbar-hidden w-full min-h-[50px] max-h-[85px] resize-none pl-[12px] py-[11px] pr-[40px] rounded-[10px] border-[1px] border-grey-500 dark:bg-grey-825 font-body-3  focus:outline-lightBlue'
        }
        onChange={handleInputChange}
        placeholder={placeholder}
        ref={textAreaRef}
        rows={1}
        value={value}
      />
      <button data-testid='submit-button' onClick={buttonClickHandler} aria-label={`${accessibilityLabel} button`} className='absolute right-[10px] bottom-[14px]'>
        <ArrowRightSvg className='h-[22px] w-[22px]' />
      </button>
    </div>
  )
}

export default AutosizeTextArea
