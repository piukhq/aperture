import React, {ReactNode} from 'react'
import {classNames} from 'utils/classNames'

// Type, Colour, Border, Icon something

enum InputType {
  NAME,
  PASSWORD,
}
enum Colour {
  BLUE,
  RED,
  GREY,
  LIGHT_GREY,
  GREEN,
}

enum Border {
  FULL,
  UNDERLINE_ICON_LEFT,
  UNDERLINE_ICON_RIGHT,
  FULL_SMALL,
  UNDERLINE_ICON_LEFT_SMALL,
  UNDERLINE_ICON_RIGHT_SMALL,
  WHITE_ICON_LEFT,
}


const INPUTTYPE_MAPS: Record<InputType, string> = {
  [InputType.NAME]: 'name',
  [InputType.PASSWORD]: 'password',
}

const COLOUR_MAPS: Record<Colour, { label: string, input: string}> = {
  [Colour.BLUE]: {
    label: 'text-blue',
    input: 'border-lightBlue border-b-lightBlue',
  },
  [Colour.RED]: {
    label: 'text-red',
    input: 'border-red border-b-red',
  },
  [Colour.GREY]: {
    label: 'text-grey-500',
    input: 'border-grey-500 border-b-grey-500',
  },
  [Colour.LIGHT_GREY]: {
    label: 'text-grey-300',
    input: 'border-grey-300 border-b-grey-300',
  },
  [Colour.GREEN]: {
    label: 'text-green',
    input: 'border-green border-b-green',
  },
}

const BORDER_MAPS: Record<Border, { container: string, label: string, input: string, icon: string}> = {
  [Border.UNDERLINE_ICON_LEFT]: {
    container: 'w-full h-[48px]',
    label: 'hidden',
    input: 'w-full h-[48px] pl-6 border-b-[1px] border-b-grey-400 bg-transparent font-body text-base tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[1px]',
  },
  [Border.UNDERLINE_ICON_LEFT_SMALL]: {
    container: 'w-full h-[42px]',
    label: 'hidden',
    input: 'w-full h-[26px] pl-6 border-b-[1px] border-b-grey-400 bg-transparent font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[1px]',
  },
  [Border.UNDERLINE_ICON_RIGHT]: {
    container: 'w-full h-[58px]',
    label: 'absolute top-[-13px] px-1 dark:bg-grey-800 text-2xs text-grey-500 font-body bg-grey-100 z-10',
    input: 'w-full h-[39px] p-1 border-b-[1px] border-b-grey-400 bg-transparent font-body text-base tracking-[0.1px]',
    icon: 'absolute top-[10px] right-[1px]',
  },
  [Border.UNDERLINE_ICON_RIGHT_SMALL]: {
    container: 'w-full h-[55px]',
    label: 'absolute top-[-13px] px-1 dark:bg-grey-800 text-2xs text-grey-500 font-body bg-grey-100 z-10 tracking-[0px]',
    input: 'w-full h-[16px] p-1 border-b-[1px] border-b-grey-400 bg-transparent font-body text-sm tracking-[0.09px]',
    icon: 'absolute top-[10px] right-[1px]',
  },
  [Border.FULL]: {
    container: 'w-full h-[48px]',
    label: 'absolute top-[-8px] left-[13px] px-1 dark:bg-grey-800 text-2xs font-body bg-grey-100 z-10',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-base tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [Border.FULL_SMALL]: {
    container: 'w-full h-[42px]',
    label: 'absolute top-[-8px] left-[13px] px-1 dark:bg-grey-800 text-3xs font-body bg-grey-100 z-10',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [Border.WHITE_ICON_LEFT]: {
    container: 'w-full h-[42px]',
    label: 'hidden',
    input: 'w-full h-full p-8 border border-grey-300 bg-white rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: 'absolute top-[10px] left-[1px]',
  },
}

type Props = {
  inputType: InputType
  label: string
  name: string
  error?: string
  colour: Colour
  border: Border
  svgIcon?: ReactNode
  placeholder?: string
  value: string
  onChange: (event: { target: { value: string}}) => void // Might need tweaking
}

export default function TextInputGroup (props: Props) {
  const {inputType, colour, label, border, svgIcon, error, name, placeholder, value, onChange} = props

  const isOutlineStyle = border === Border.FULL || border === Border.FULL_SMALL

  return (
    <div className={classNames(
      'relative',
      BORDER_MAPS[border].container,
    )}>
      <label className={classNames(
        BORDER_MAPS[border].label,
        isOutlineStyle && COLOUR_MAPS[colour].label,
      )} >
        {label}
      </label>

      <input
        type={INPUTTYPE_MAPS[inputType]}
        name={name}
        id={`bink-form-field-${name}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classNames(
          'w-full h-full font-body text-sm tracking-[0.1px] text-grey-800',
          COLOUR_MAPS[colour].input,
          BORDER_MAPS[border].input,
        )}
      />
      {svgIcon && <div className={BORDER_MAPS[border].icon}>
        {svgIcon}
      </div>}
      {error && <span className='w-24 text-body text-sm text-red absolute top-[12px] right-[4px]'>
        {error}
      </span>}
    </div>
  )
}
TextInputGroup.defaultProps = {
  inputType: InputType.NAME,
  label: 'Label',
  colour: Colour.GREY,
  svgIcon: false,
  error: null,
}

TextInputGroup.inputType = InputType
TextInputGroup.colour = Colour
TextInputGroup.border = Border
