import React, {ReactNode} from 'react'
import {classNames} from 'utils/classNames'
import usePermissions from 'hooks/usePermissions'
import {UserPermissions} from 'utils/enums'

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
  buttonWidth?: ButtonWidth,
  buttonBackground?: ButtonBackground,
  labelColour?: LabelColour,
  labelWeight?: LabelWeight,
  borderColour?: BorderColour,
  children?: ReactNode,
  handleClick?: () => void,
  ariaLabel?: string,
  autoFocus?:boolean
  additionalStyles?: string,
  isDisabled?: boolean,
  noShadow?: boolean,
  requiredPermission?: UserPermissions,
}

const Button = (props: ButtonProps) => {
  const {
    buttonType = 'button',
    buttonSize = ButtonSize.MEDIUM,
    buttonWidth = ButtonWidth.MEDIUM,
    buttonBackground = '',
    labelColour = LabelColour.WHITE,
    labelWeight = LabelWeight.SEMIBOLD,
    borderColour = '',
    handleClick,
    ariaLabel,
    children,
    autoFocus,
    requiredPermission,
    noShadow,
    additionalStyles = '',
    isDisabled = false,
  } = props

  const {hasRequiredPermission} = usePermissions()
  if (requiredPermission && !hasRequiredPermission(requiredPermission)) {
    return null
  }

  return (
    <button
      id={ariaLabel ? ariaLabel : `${children}-button`} // Used for QA Automation Testing to more easily target buttons
      className={classNames(
        BUTTON_SIZE_MAPS[buttonSize],
        BUTTON_WIDTH_MAPS[buttonWidth],
        BUTTON_BACKGROUND_MAPS[buttonBackground],
        BORDER_COLOUR_MAPS[borderColour],
        LABEL_COLOUR_MAPS[labelColour],
        LABEL_WEIGHT_MAPS[labelWeight],
        isDisabled ? 'bg-opacity-[.7] cursor-not-allowed' : 'hover:bg-opacity-[.7] active:bg-opacity-[.55] duration-300',
        !buttonBackground && 'hover:text-opacity-70 hover:border-opacity-70 active:text-opacity-70 active:border-opacity-70',
        additionalStyles,
        !noShadow && 'shadow-sm'
      )}
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      onClick={handleClick}
      type={BUTTON_TYPE_MAPS[buttonType]}
      disabled={isDisabled}
    >
      <div className='flex items-center justify-center whitespace-nowrap gap-2'>
        {children}
      </div>
    </button>
  )
}

export default React.memo(Button)
