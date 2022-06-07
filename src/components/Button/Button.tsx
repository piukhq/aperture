import React, {ReactNode} from 'react'
import {classNames} from 'utils/classNames'
import {
  ButtonType,
  ButtonSize,
  ButtonWidth,
  ButtonBackground,
  LabelColour,
  LabelWeight,
  BorderColour,
  BUTTON_TYPE_MAPS,
  BUTTON_SIZE_MAPS,
  BUTTON_WIDTH_MAPS,
  BUTTON_BACKGROUND_MAPS,
  LABEL_COLOUR_MAPS,
  LABEL_WEIGHT_MAPS,
  BORDER_COLOUR_MAPS,
} from './styles'
export interface ButtonProps {
  buttonType?: ButtonType,
  buttonSize?: ButtonSize,
  buttonWidth: ButtonWidth,
  buttonBackground?: ButtonBackground,
  labelColour?: LabelColour,
  labelWeight?: LabelWeight,
  borderColour?: BorderColour,
  children?: ReactNode,
  handleClick?: () => void,
  ariaLabel?: string,
  autoFocus?:boolean
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
    ariaLabel,
    children,
    autoFocus,
  } = props

  return (
    <button
      className={classNames(
        BUTTON_SIZE_MAPS[buttonSize],
        BUTTON_WIDTH_MAPS[buttonWidth],
        BUTTON_BACKGROUND_MAPS[buttonBackground],
        BORDER_COLOUR_MAPS[borderColour],
        LABEL_COLOUR_MAPS[labelColour],
        LABEL_WEIGHT_MAPS[labelWeight],
        'hover:bg-opacity-[.7] active:bg-opacity-[.55]'
      )}
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      onClick={handleClick}
      type={BUTTON_TYPE_MAPS[buttonType]}
    >
      <div className='flex items-center justify-center whitespace-nowrap gap-2'>
        {children}
      </div>
    </button>
  )
}

export default React.memo(Button)
