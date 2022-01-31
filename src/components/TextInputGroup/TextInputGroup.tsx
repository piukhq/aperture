import React, {ReactNode} from 'react'
import {classNames} from 'utils/classNames'

enum InputType {
  TEXT,
  PASSWORD,
  SEARCH,
  SELECT,
}

enum InputWidth {
  FULL,
  LARGE,
  MEDIUM,
}

enum InputColour {
  BLUE,
  RED,
  GREY,
  DARK_GREY,
  LIGHT_GREY,
  GREEN,
}

enum InputStyle {
  FULL,
  UNDERLINE_ICON_LEFT,
  UNDERLINE_ICON_RIGHT,
  FULL_SMALL,
  FULL_SMALL_LABEL_HIDDEN,
  UNDERLINE_ICON_LEFT_SMALL,
  UNDERLINE_ICON_RIGHT_SMALL,
  UNDERLINE_SMALL_LABEL_HIDDEN,
  WHITE_ICON_LEFT_SMALL,
  TRANSPARENT_ICON_LEFT_SMALL,
  TRANSPARENT_ICON_RIGHT_SMALL,
  WHITE_ICON_LEFT,
  WHITE_ICON_RIGHT_SMALL,
  WHITE_ICON_RIGHT,
}


const INPUT_TYPE_MAPS: Record<InputType, string> = {
  [InputType.TEXT]: 'text',
  [InputType.PASSWORD]: 'password',
  [InputType.SEARCH]: 'search',
  [InputType.SELECT]: 'select',
}

const INPUT_WIDTH_MAPS: Record<InputWidth, string> = {
  [InputWidth.FULL]: 'w-full',
  [InputWidth.LARGE]: 'w-[500px]',
  [InputWidth.MEDIUM]: 'w-[260px]',
}

const INPUT_COLOUR_MAPS: Record<InputColour, { label: string, input: string}> = {
  [InputColour.BLUE]: {
    label: 'text-blue',
    input: 'border-lightBlue border-b-lightBlue',
  },
  [InputColour.RED]: {
    label: 'text-red',
    input: 'border-red border-b-red',
  },
  [InputColour.GREY]: {
    label: 'text-grey-500',
    input: 'border-grey-500 border-b-grey-500',
  },
  [InputColour.DARK_GREY]: {
    label: 'text-grey-500',
    input: 'border-grey-700 border-b-grey-700',
  },
  [InputColour.LIGHT_GREY]: {
    label: 'text-grey-300',
    input: 'border-grey-300 border-b-grey-300',
  },
  [InputColour.GREEN]: {
    label: 'text-green',
    input: 'border-green border-b-green',
  },
}

const INPUT_STYLE_MAPS: Record<InputStyle, { container: string, label: string, input: string, icon: string}> = {
  [InputStyle.UNDERLINE_ICON_LEFT]: {
    container: 'h-[48px]',
    label: 'hidden',
    input: 'w-full h-[48px] pl-9 border-b-[1px] bg-transparent font-body text-base tracking-[0.1px]',
    icon: 'absolute top-[12px] left-[1px]',
  },
  [InputStyle.UNDERLINE_ICON_LEFT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-9 border-b-[1px] bg-transparent font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[8px] left-[1px]',
  },
  [InputStyle.UNDERLINE_ICON_RIGHT]: {
    container: 'h-[58px]',
    label: 'absolute top-[-13px] px-1 text-2xs text-grey-500 font-body bg-grey-100 dark:bg-grey-850 z-10',
    input: 'w-full h-[39px] pl-1 pr-10 border-b-[1px] bg-transparent font-body text-base tracking-[0.1px]',
    icon: 'absolute top-[17px] right-[1px]',
  },
  [InputStyle.UNDERLINE_ICON_RIGHT_SMALL]: {
    container: 'h-[55px]',
    label: 'absolute top-[-13px] px-1 text-2xs text-grey-500 font-body bg-grey-100 dark:bg-grey-850 z-10 tracking-[0px]',
    input: 'w-full h-[37px] pr-10 pl-1 border-b-[1px] bg-transparent font-body text-sm tracking-[0.09px]',
    icon: 'absolute top-[5px] right-[10px]',
  },
  [InputStyle.UNDERLINE_SMALL_LABEL_HIDDEN]: {
    container: 'h-[55px]',
    label: 'hidden',
    input: 'w-full h-[39px] p-1 border-b-[1px] bg-transparent font-body text-sm tracking-[0.09px]',
    icon: 'absolute top-[10px] right-[1px]',
  },
  [InputStyle.FULL]: {
    container: 'h-[48px]',
    label: 'absolute top-[-8px] left-[13px] px-1 dark:bg-grey-850 text-2xs font-body bg-grey-100 dark:bg-grey-850 z-10',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [InputStyle.FULL_SMALL]: {
    container: 'h-[42px]',
    label: 'absolute top-[-8px] left-[13px] px-1 dark:bg-grey-850 text-3xs font-body bg-grey-100 dark:bg-grey-850 z-10',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [InputStyle.FULL_SMALL_LABEL_HIDDEN]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [InputStyle.WHITE_ICON_LEFT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-12 bg-white dark:bg-grey-825 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[10px]',
  },
  [InputStyle.TRANSPARENT_ICON_LEFT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-8 bg-transparent rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[1px]',
  },
  [InputStyle.WHITE_ICON_RIGHT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-7 bg-white dark:bg-grey-825 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] right-[10px]',
  },
  [InputStyle.WHITE_ICON_LEFT]: {
    container: 'h-[50px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-8 bg-white dark:bg-grey-825 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[1px]',
  },
  [InputStyle.WHITE_ICON_RIGHT]: {
    container: 'h-[50px] flex items-center',
    label: 'hidden',
    input: 'w-full h-[50px] pl-7 bg-white dark:bg-grey-825 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute right-[18px]',
  },
  [InputStyle.TRANSPARENT_ICON_RIGHT_SMALL]: {
    container: 'h-[50px] flex items-center',
    label: 'hidden',
    input: 'w-full h-[50px] pl-7 dark:bg-grey-825 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute right-[18px]',
  },
}

type Props = {
  inputType: InputType
  label: string
  name: string
  error?: string
  inputColour: InputColour
  inputWidth: InputWidth
  inputStyle: InputStyle
  svgIcon?: ReactNode
  placeholder?: string
  value: string
  onChange: (event: { target: { value: string}}) => void
}
export default function TextInputGroup (props: Props) {
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
    value,
    onChange,
  } = props

  const isOutlineStyle = inputStyle === InputStyle.FULL || inputStyle === InputStyle.FULL_SMALL


  const renderInputElement = () => <input
    type={INPUT_TYPE_MAPS[inputType]}
    name={name}
    id={`bink-form-field-${name}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={classNames(
      'w-full h-full font-body text-sm tracking-[0.1px] text-grey-800 dark:text-grey-100',
      INPUT_COLOUR_MAPS[inputColour].input,
      INPUT_STYLE_MAPS[inputStyle].input,
    )}
  />


  const renderSelectElement = () => <select
    name={name}
    id={`bink-form-field-${name}`}
    className={classNames(
      'w-full h-full font-body text-sm tracking-[0.1px] text-grey-800 dark:text-grey-100 ',
      INPUT_COLOUR_MAPS[inputColour].input,
      INPUT_STYLE_MAPS[inputStyle].input,
    )}
  >
    <option value='' disabled selected>{placeholder}</option>
    <option>Example Option 1</option>
    <option>Example Option 2</option>
  </select>


  return (
    <div className={classNames(
      'relative',
      INPUT_STYLE_MAPS[inputStyle].container,
      INPUT_WIDTH_MAPS[inputWidth],
    )}>
      <label className={classNames(
        INPUT_STYLE_MAPS[inputStyle].label,
        isOutlineStyle && INPUT_COLOUR_MAPS[inputColour].label,
      )} >
        {label}
      </label>
      {inputType === InputType.SELECT ? renderSelectElement() : renderInputElement()}
      {svgIcon && <div className={INPUT_STYLE_MAPS[inputStyle].icon}>
        {svgIcon}
      </div>}
      {error && <span className='w-24 text-body text-sm text-right text-red absolute top-1/4 right-[10px]'>
        {error}
      </span>}
    </div>
  )
}

TextInputGroup.inputType = InputType
TextInputGroup.inputColour = InputColour
TextInputGroup.inputWidth = InputWidth
TextInputGroup.inputStyle = InputStyle
