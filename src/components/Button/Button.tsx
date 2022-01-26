import React, {ReactNode} from 'react'
import {classNames} from 'utils/classNames'

enum ButtonHeight {
  TALL,
  PRIMARY,
  SECONDARY
}

enum ButtonWidth {
  FULL,
  MEDIUM,
  ICON_TEXT,
  ICON_ONLY,
}

enum ButtonBackground {
  BLUE,
  WHITE,
  RED,
  DARK_GREY,
  LIGHT_GREY,
  }
enum LabelColour {
  WHITE,
  BLUE,
  RED,
  GREY,
}

enum LabelWeight {
 SEMIBOLD,
 MEDIUM,
 REGULAR,
}

enum BorderColour {
RED,
BLUE,
GREY,
}


const BUTTON_HEIGHT_MAPS: Record<ButtonHeight, string> = {
  [ButtonHeight.TALL]: 'h-[48px]',
  [ButtonHeight.PRIMARY]: 'h-[38px]',
  [ButtonHeight.SECONDARY]: 'h-[28px]',
}
const BUTTON_WIDTH_MAPS: Record<ButtonWidth, string> = {
  [ButtonWidth.FULL]: 'w-full',
  [ButtonWidth.MEDIUM]: 'w-[120px]',
  [ButtonWidth.ICON_TEXT]: 'w-[86px]',
  [ButtonWidth.ICON_ONLY]: 'w-[38px]',
}
const BUTTON_BACKGROUND_MAPS: Record<ButtonBackground, string> = {
  [ButtonBackground.WHITE]: 'bg-white',
  [ButtonBackground.BLUE]: 'bg-blue',
  [ButtonBackground.RED]: 'bg-red',
  [ButtonBackground.LIGHT_GREY]: 'bg-grey-200',
  [ButtonBackground.DARK_GREY]: 'bg-grey-900/50',
}
const LABEL_COLOUR_MAPS: Record<LabelColour, string> = {
  [LabelColour.WHITE]: 'text-white',
  [LabelColour.BLUE]: 'text-blue',
  [LabelColour.RED]: 'text-red',
  [LabelColour.GREY]: 'text-grey',
}
const LABEL_WEIGHT_MAPS: Record<LabelWeight, string> = {
  [LabelWeight.SEMIBOLD]: 'font-semibold',
  [LabelWeight.MEDIUM]: 'font-medium',
  [LabelWeight.REGULAR]: 'font-normal',
}
const BORDER_COLOUR_MAPS: Record<BorderColour, string> = {
  [BorderColour.RED]: 'border-red',
  [BorderColour.BLUE]: 'border-blue',
  [BorderColour.GREY]: 'border-grey-300',
}


type Props = {
  buttonHeight: ButtonHeight,
  buttonWidth: ButtonWidth,
  buttonBackground: ButtonBackground,
  labelColour: LabelColour,
  labelWeight: LabelWeight,
  borderColour?: BorderColour,
  children: ReactNode
  handleClick: () => void
}

export default function Button (props: Props) {
  const {buttonHeight, buttonWidth, buttonBackground, labelColour, labelWeight, borderColour, handleClick, children} = props

  return (
    <button className={classNames(
      'px-3 font-heading text-white font-semibold text-2xs rounded-[10px]',
      BUTTON_HEIGHT_MAPS[buttonHeight],
      BUTTON_WIDTH_MAPS[buttonWidth],
      BUTTON_BACKGROUND_MAPS[buttonBackground],
      BORDER_COLOUR_MAPS[borderColour],
      LABEL_COLOUR_MAPS[labelColour],
      LABEL_WEIGHT_MAPS[labelWeight],
    )}
    onClick={handleClick}
    >
      {children}
    </button>
  )
}


Button.buttonHeight = ButtonHeight
Button.buttonWidth = ButtonWidth
Button.buttonBackground = ButtonBackground
Button.labelColour = LabelColour
Button.labelWeight = LabelWeight
Button.BorderColour = BorderColour
