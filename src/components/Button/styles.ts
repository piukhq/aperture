export enum ButtonType {
  SUBMIT,
  BUTTON,
  RESET,
}

export enum ButtonSize {
  LARGE,
  MEDIUM,
  MEDIUM_ICON,
  MEDIUM_BODY_FONT,
  SMALL_BODY_FONT,
  SMALL,
  TINY,
}

export enum ButtonWidth {
  FULL,
  LARGE,
  MEDIUM,
  AUTO,
  ICON_TEXT,
  TINY,
  ICON_ONLY, //TODO: Add mechanism to require alt-text for accessibility
}

export enum ButtonBackground {
  BLUE,
  WHITE,
  RED,
  DARK_GREY,
  LIGHT_GREY,
}

export enum LabelColour {
  WHITE,
  BLUE,
  RED,
  LIGHT_GREY,
  GREY,
  DARK_GREY,
}

export enum LabelWeight {
 SEMIBOLD,
 MEDIUM,
 REGULAR,
}

export enum BorderColour {
  RED,
  BLUE,
  GREY,
}

export const BUTTON_TYPE_MAPS: Record<ButtonType, string> = {
  [ButtonType.SUBMIT]: 'submit',
  [ButtonType.BUTTON]: 'button',
  [ButtonType.RESET]: 'reset',
}

export const BUTTON_SIZE_MAPS: Record<ButtonSize, string> = {
  [ButtonSize.LARGE]: 'rounded-[10px] font-heading text-sm min-h-[48px]',
  [ButtonSize.MEDIUM]: 'rounded-[10px] font-heading text-2xs min-h-[38px]',
  [ButtonSize.SMALL]: 'rounded-[10px] font-heading text-3xs h-[28px]',
  [ButtonSize.TINY]: 'rounded-[6.25px] h-[23px]',
  [ButtonSize.MEDIUM_ICON]: 'rounded-[10px] font-heading tracking-[0.6px] text-sm h-[38px]', // tracking value visually matches abstract but is shown as 0.1px
  [ButtonSize.MEDIUM_BODY_FONT]: 'rounded-[10px] font-body tracking-[0.1px] text-sm min-h-[38px]',
  [ButtonSize.SMALL_BODY_FONT]: 'rounded-[10px] font-body tracking-[0.1px] text-2xs min-h-[28px]',
}

export const BUTTON_WIDTH_MAPS: Record<ButtonWidth, string> = {
  [ButtonWidth.FULL]: 'w-full',
  [ButtonWidth.LARGE]: 'w-[230px]',
  [ButtonWidth.MEDIUM]: 'w-[121px] px-2',
  [ButtonWidth.AUTO]: 'w-max px-3',
  [ButtonWidth.ICON_TEXT]: 'w-[86px] px-2',
  [ButtonWidth.TINY]: 'w-[24px]',
  [ButtonWidth.ICON_ONLY]: 'w-[38px]',
}

export const BUTTON_BACKGROUND_MAPS: Record<ButtonBackground, string> = {
  [ButtonBackground.WHITE]: 'bg-white',
  [ButtonBackground.BLUE]: 'bg-blue hover:bg-blend-darken',
  [ButtonBackground.RED]: 'bg-red',
  [ButtonBackground.LIGHT_GREY]: 'bg-grey-200',
  [ButtonBackground.DARK_GREY]: 'bg-grey-900/50',
}

export const LABEL_COLOUR_MAPS: Record<LabelColour, string> = {
  [LabelColour.WHITE]: 'text-grey-100',
  [LabelColour.BLUE]: 'text-blue',
  [LabelColour.RED]: 'text-red',
  [LabelColour.LIGHT_GREY]: 'text-grey-600',
  [LabelColour.GREY]: 'text-grey-700',
  [LabelColour.DARK_GREY]: 'text-grey-800',
}

export const LABEL_WEIGHT_MAPS: Record<LabelWeight, string> = {
  [LabelWeight.SEMIBOLD]: 'font-semibold font-heading',
  [LabelWeight.MEDIUM]: 'font-medium font-heading',
  [LabelWeight.REGULAR]: 'font-normal font-body',

}

export const BORDER_COLOUR_MAPS: Record<BorderColour, string> = {
  [BorderColour.RED]: 'border border-red',
  [BorderColour.BLUE]: 'border border-blue',
  [BorderColour.GREY]: 'border border-grey-300 dark:border-grey-600',
}
