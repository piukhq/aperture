import React, {ReactNode} from 'react'
import {classNames} from 'utils/classNames'

enum ButtonType {
  SUBMIT,
  BUTTON,
  RESET,
}

enum ButtonSize {
  LARGE,
  MEDIUM,
  MEDIUM_ICON,
  MEDIUM_BODY_FONT,
  SMALL_BODY_FONT,
  SMALL,
}

enum ButtonWidth {
  FULL,
  LARGE,
  MEDIUM,
  AUTO,
  ICON_TEXT,
  ICON_ONLY, //TODO: Add mechanism to require alt-text for accessibility
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
  LIGHT_GREY,
  GREY,
  DARK_GREY,
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

const BUTTON_TYPE_MAPS: Record<ButtonType, string> = {
  [ButtonType.SUBMIT]: 'submit',
  [ButtonType.BUTTON]: 'button',
  [ButtonType.RESET]: 'reset',
}

const BUTTON_SIZE_MAPS: Record<ButtonSize, string> = {
  [ButtonSize.LARGE]: 'font-heading text-sm min-h-[48px]',
  [ButtonSize.MEDIUM]: 'font-heading text-2xs min-h-[38px]',
  [ButtonSize.SMALL]: 'font-heading text-3xs h-[28px]',
  [ButtonSize.MEDIUM_ICON]: 'font-heading tracking-[0.6px] text-sm h-[38px]', // tracking value visually matches abstract but is shown as 0.1px
  [ButtonSize.MEDIUM_BODY_FONT]: 'font-body tracking-[0.1px] text-sm min-h-[38px]',
  [ButtonSize.SMALL_BODY_FONT]: 'font-body tracking-[0.1px] text-2xs min-h-[28px]',
}
const BUTTON_WIDTH_MAPS: Record<ButtonWidth, string> = {
  [ButtonWidth.FULL]: 'w-full',
  [ButtonWidth.LARGE]: 'w-[230px]',
  [ButtonWidth.MEDIUM]: 'w-[121px] px-2',
  [ButtonWidth.AUTO]: 'w-max px-3',
  [ButtonWidth.ICON_TEXT]: 'w-[86px] px-2',
  [ButtonWidth.ICON_ONLY]: 'w-[38px]',
}
const BUTTON_BACKGROUND_MAPS: Record<ButtonBackground, string> = {
  [ButtonBackground.WHITE]: 'bg-white',
  [ButtonBackground.BLUE]: 'bg-blue hover:bg-blend-darken',
  [ButtonBackground.RED]: 'bg-red',
  [ButtonBackground.LIGHT_GREY]: 'bg-grey-200',
  [ButtonBackground.DARK_GREY]: 'bg-grey-900/50',
}
const LABEL_COLOUR_MAPS: Record<LabelColour, string> = {
  [LabelColour.WHITE]: 'text-grey-100',
  [LabelColour.BLUE]: 'text-blue',
  [LabelColour.RED]: 'text-red',
  [LabelColour.LIGHT_GREY]: 'text-grey-600',
  [LabelColour.GREY]: 'text-grey-700',
  [LabelColour.DARK_GREY]: 'text-grey-800',
}
const LABEL_WEIGHT_MAPS: Record<LabelWeight, string> = {
  [LabelWeight.SEMIBOLD]: 'font-semibold font-heading',
  [LabelWeight.MEDIUM]: 'font-medium font-heading',
  [LabelWeight.REGULAR]: 'font-normal font-body',

}
const BORDER_COLOUR_MAPS: Record<BorderColour, string> = {
  [BorderColour.RED]: 'border border-red',
  [BorderColour.BLUE]: 'border border-blue',
  [BorderColour.GREY]: 'border border-grey-300',
}

export interface ButtonProps {
  buttonType?: ButtonType,
  buttonSize: ButtonSize,
  buttonWidth: ButtonWidth,
  buttonBackground?: ButtonBackground,
  labelColour?: LabelColour,
  labelWeight?: LabelWeight,
  borderColour?: BorderColour,
  children?: ReactNode
  handleClick?: () => void
}

const Button = (props: ButtonProps) => {
  const {
    buttonType = 'button',
    buttonSize = ButtonSize.MEDIUM,
    buttonWidth = ButtonWidth.MEDIUM,
    buttonBackground,
    labelColour = LabelColour.WHITE,
    labelWeight = LabelWeight.SEMIBOLD,
    borderColour,
    handleClick,
    children,
  } = props

  return (
    <button
      className={classNames(
        'rounded-[10px]',
        BUTTON_SIZE_MAPS[buttonSize],
        BUTTON_WIDTH_MAPS[buttonWidth],
        BUTTON_BACKGROUND_MAPS[buttonBackground],
        BORDER_COLOUR_MAPS[borderColour],
        LABEL_COLOUR_MAPS[labelColour],
        LABEL_WEIGHT_MAPS[labelWeight],
      )}
      onClick={handleClick}
      type={BUTTON_TYPE_MAPS[buttonType]}
    >
      <div className='flex items-center justify-center whitespace-nowrap gap-2'>
        {children}
      </div>
    </button>
  )
}


Button.buttonType = ButtonType
Button.buttonSize = ButtonSize
Button.buttonWidth = ButtonWidth
Button.buttonBackground = ButtonBackground
Button.labelColour = LabelColour
Button.labelWeight = LabelWeight
Button.borderColour = BorderColour

export default Button
