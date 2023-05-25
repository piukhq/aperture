import React, {ReactNode, useState, useRef} from 'react'
import {Combobox} from '@headlessui/react'
import {classNames} from 'utils/classNames'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import {HydratedPlan} from 'types'
import {
  InputType,
  InputWidth,
  InputColour,
  InputStyle,
  INPUT_TYPE_MAPS,
  INPUT_WIDTH_MAPS,
  INPUT_COLOUR_MAPS,
  INPUT_STYLE_MAPS,
} from './styles'

// This can be expanded when there are additional usecases
type SelectItem = HydratedPlan

type Props = {
  inputType: InputType
  label?: string
  name: string
  error?: string
  inputColour: InputColour
  inputWidth: InputWidth
  inputStyle: InputStyle
  svgIcon?: ReactNode
  placeholder?: string
  autofocus?: boolean
  value?: string
  ariaRequired?: boolean
  maxLength?: number
  selectValues?: SelectItem[]
  selectedValue?: SelectItem
  borderShadow?: boolean
  handleSelectValueChange?: (item: SelectItem) => void
  onChange: (event: { target: { value: string}}) => void
  onBlur?: (event: { target: { value: string}}) => void
  onFocus?: () => void
  renderFn?: (item: SelectItem) => JSX.Element
}
const TextInputGroup = (props: Props) => {
  const {
    inputStyle = InputStyle.FULL,
    inputType = InputType.TEXT,
    inputColour = InputColour.GREY,
    label,
    inputWidth = InputWidth.MEDIUM,
    svgIcon = false,
    error = null,
    name,
    placeholder,
    autofocus,
    value,
    maxLength,
    ariaRequired,
    selectValues,
    selectedValue,
    borderShadow,
    handleSelectValueChange,
    onChange,
    onBlur,
    onFocus,
    renderFn,
  } = props

  const [selectDefaultValue, setSelectDefaultValue] = useState('default')
  const [isFocused, setIsFocused] = useState(false)
  const [isSearchSelectMenuOpen, setIsSearchSelectMenuOpen] = useState(false)

  const isOutlineStyle = inputStyle === InputStyle.FULL || inputStyle === InputStyle.FULL_SMALL

  const renderInputElement = () => (
    <input
      onFocus={() => {
        setIsFocused(true)
        setIsSearchSelectMenuOpen(false)
        onFocus && onFocus()
      }}
      onBlur={(event) => {
        setIsFocused(false)
        onBlur && onBlur(event)
      }}
      autoFocus={autofocus}
      aria-required={ariaRequired ? 'true' : 'false'}
      type={INPUT_TYPE_MAPS[inputType]}
      autoComplete='on'
      name={name}
      id={`bink-form-field-${name}`}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className={classNames(
        'w-full h-full font-body text-sm tracking[.006rem] text-grey-800 dark:text-grey-300 focus:outline-lightBlue',
        INPUT_COLOUR_MAPS[inputColour].input,
        INPUT_STYLE_MAPS[inputStyle].input,
        isSearchSelectMenuOpen && 'rounded-none rounded-t-[10px] border-b-2 border-grey-300'
      )}
    />
  )

  const handleSelectChange = (e) => {
    setSelectDefaultValue(e.target.value)
  }

  const renderSelectElement = () => (
    <select
      name={name}
      id={`bink-form-field-${name}`}
      defaultValue={selectDefaultValue}
      onChange={handleSelectChange}
      className={classNames(
        'w-full h-full font-body text-sm tracking[.006rem] text-grey-800 dark:text-grey-600 px-[8px]',
        INPUT_COLOUR_MAPS[inputColour].input,
        INPUT_STYLE_MAPS[inputStyle].input,
      )}
    >
      <option value='default' disabled hidden>Search...</option>
      {selectValues && selectValues.map((value, _index) => (
        <option key={_index}>{value as unknown as ReactNode}</option>
      ))}
    </select>
  )

  // This is needed to ensure that the input field looses focus when the user selects a an item from the list
  const [fieldJustBlurred, setFieldJustBlurred] = useState(false)
  const inputRef = useRef(null)

  const handleSelectItemClick = (item: SelectItem) => {
    handleSelectValueChange(item)
    setIsSearchSelectMenuOpen(false)
    setFieldJustBlurred(true)
  }

  const renderSearchSelectElement = () => (
    <>
      {isSearchSelectMenuOpen && <div onClick={() => setIsSearchSelectMenuOpen(false)} className='fixed inset-0 bg-grey-975/[0.33] dark:bg-grey-200/[0.33]'/>}
      <div className='relative'>
        <Combobox value={selectedValue} onChange={handleSelectItemClick}>
          <Combobox.Input as='input' ref={inputRef}
            aria-label='Plan List'
            displayValue={() => value}
            autoComplete='off'
            onChange={onChange}
            onFocus={() => {
              if (fieldJustBlurred) {
                setFieldJustBlurred(false)
                inputRef.current.blur()
              } else {
                setIsFocused(true)
                setIsSearchSelectMenuOpen(true)
              }
            }}
            onBlur={() => {
              setIsFocused(false)
            }}
            className={classNames(
              'w-full h-full font-body text-sm tracking[.006rem] text-grey-800 dark:text-grey-400 focus:outline-lightBlue',
              INPUT_COLOUR_MAPS[inputColour].input,
              INPUT_STYLE_MAPS[inputStyle].input,
              isSearchSelectMenuOpen && 'rounded-none rounded-t-[10px] border-b-2 border-grey-300 dark:border-grey-600'
            )}
          />

          <button
            className='absolute top-[10px] right-[10px]'
            aria-label={isSearchSelectMenuOpen ? 'Close Menu' : 'Open Menu' }
            onClick={() => setIsSearchSelectMenuOpen((isOpen) => !isOpen)}
          >
            <div className='flex justify-center items-center w-[18px] h-[18px]'>
              <ArrowDownSvg className={classNames(
                'fill-grey-600',
                isSearchSelectMenuOpen && 'rotate-180'
              )} />
            </div>
          </button>

          {isSearchSelectMenuOpen && (
            <Combobox.Options static as='ul' className='scrollable bg-white dark:bg-grey-950 max-h-[660px] overflow-y-auto rounded-b-[10px] w-full'>
              {selectValues.map((value, _index) => (
                <Combobox.Option as='li' key={_index} value={value}
                  className={({active}) => `relative select-none cursor-pointer h-[60px] pl-[23px] pr-[15px] flex items-center 
                ${active ? 'bg-grey-300 dark:bg-grey-800 text-white' : 'text-gray-900'}`
                  }>
                  {renderFn(value)}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Combobox>
      </div>
    </>
  )

  const renderInputType = (inputType: number): ReactNode => {
    if (inputType === InputType.SEARCH || inputType === InputType.TEXT || inputType === InputType.PASSWORD) {
      return renderInputElement()
    } else if (inputType === InputType.SELECT) {
      return renderSelectElement()
    } else if (inputType === InputType.SEARCH_SELECT) {
      return renderSearchSelectElement()
    }
  }

  return (
    <div className={classNames(
      'relative',
      INPUT_STYLE_MAPS[inputStyle].container,
      INPUT_WIDTH_MAPS[inputWidth],
      borderShadow && 'shadow-sm rounded-[10px]',
    )}>
      {label && (
        <label htmlFor={`bink-form-field-${name}`} className={classNames(
          INPUT_STYLE_MAPS[inputStyle].label,
          isOutlineStyle && INPUT_COLOUR_MAPS[inputColour].label,
          isFocused && 'text-lightBlue',
        )} >
          {label}
        </label>
      )}

      {renderInputType(inputType)}

      {svgIcon && (
        <div className={INPUT_STYLE_MAPS[inputStyle].icon}>
          {svgIcon}
        </div>
      )}
      {error && (
        <span role='alert' data-testid={`${name}-input-error`} className='text-body text-[.75rem] text-right text-red absolute top-[28%] right-[12px]'>
          {error}
        </span>
      )}
    </div>
  )
}

export default TextInputGroup
