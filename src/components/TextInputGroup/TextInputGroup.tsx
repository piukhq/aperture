import React, {ReactNode} from 'react'
import {classNames} from 'utils/classNames'

// Type, Colour, Size, Border, Icon something

enum InputType {
  NAME,
  PASSWORD,
}
enum Colour {
  BLUE,
  RED,
  GREY,
  LIGHTGREY,
  GREEN,
}

enum Size {
  LARGE,
  SMALL,
}

enum Border {
  BOTTOM,
  FULL,
}

const INPUTTYPE_MAPS: Record<InputType, string> = {
  [InputType.NAME]: 'name',
  [InputType.PASSWORD]: 'password',

}

const SIZE_MAPS: Record<Size, string> = {
  [Size.SMALL]: 'px-2.5 text-xs',
  [Size.LARGE]: 'px-3 text-lg',
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
  [Colour.LIGHTGREY]: {
    label: 'text-grey-300',
    input: 'border-grey-300 border-b-grey-300',
  },
  [Colour.GREEN]: {
    label: 'text-green',
    input: 'border-green border-b-green',
  },
}

const BORDER_MAPS: Record<Border, { label: string, input: string}> = {
  [Border.BOTTOM]: {
    label: 'absolute top-[-13px] px-1 dark:bg-grey-800 text-2xs font-body bg-grey-100 z-10',
    input: 'w-full h-[39px] p-1 border-b-[1px] border-b-grey-400 bg-transparent font-body text-base tracking-[0.1px]',
  },
  [Border.FULL]: {
    label: 'absolute top-[-8px] left-[13px] px-1 dark:bg-grey-800 text-2xs font-body bg-grey-100 z-10',
    input: 'w-full h-full p-4 border border-grey-300 bg-transparent rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
  },
}

type Props = {
  inputType: InputType
  label: string
  colour: Colour
  border: Border
  size: Size
  children?: ReactNode
}

export default function TextInputGroup (props: Props) {
  const {inputType, colour, label, border, size} = props

  return (
    <div className='relative w-[240px] h-[48px]'>
      <label className={classNames(
        COLOUR_MAPS[colour].label,
        BORDER_MAPS[border].label,
        SIZE_MAPS[size]
      )} >
        {label}
      </label>
      <input className={classNames(
        'w-full h-full font-body text-sm tracking-[0.1px] text-grey-800',
        COLOUR_MAPS[colour].input,
        BORDER_MAPS[border].input,
      )}
      type={INPUTTYPE_MAPS[inputType]}
      />
    </div>
  )
}
TextInputGroup.defaultProps = {
  inputType: InputType.NAME,
  label: 'Label',
  colour: Colour.GREY,
  size: Size.LARGE,
}

TextInputGroup.inputType = InputType
TextInputGroup.colour = Colour
TextInputGroup.border = Border
TextInputGroup.size = Size
