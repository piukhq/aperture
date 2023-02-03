export enum ButtonType {
  SUBMIT,
  BUTTON,
  RESET,
}

export enum ButtonSize {
  LARGE,
  MEDIUM_LARGE,
  MEDIUM,
  MEDIUM_ICON,
  MEDIUM_BODY_FONT,
  SMALL_BODY_FONT,
  SMALL,
  TINY,
  SMALL_MEDIUM_BODY_FONT,
  INHERIT,
}

export enum ButtonWidth {
  FULL,
  LARGE,
  MEDIUM,
  AUTO,
  ICON_TEXT,
  TINY,
  ICON_ONLY, //TODO: Add mechanism to require alt-text for accessibility
  SINGLE_VIEW_MID_ICON_ONLY,
  SINGLE_VIEW_MID_SMALL,
  SINGLE_VIEW_MID_MEDIUM,
}

export enum ButtonBackground {
  BLUE,
  COMMENTS_BLUE,
  WHITE,
  RED,
  ORANGE,
  DARK_GREY,
  LIGHT_GREY,
  LIGHTISH_GREY,
  VISA_BLUE,
  MASTERCARD_BLUE,
  AMEX_BLUE,
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
  [ButtonSize.MEDIUM_LARGE]: 'rounded-[10px] font-heading text-sm min-h-[38px]',
  [ButtonSize.MEDIUM]: 'rounded-[10px] font-heading text-2xs min-h-[38px]',
  [ButtonSize.SMALL]: 'rounded-[10px] font-heading text-3xs h-[28px]',
  [ButtonSize.TINY]: 'rounded-[6.25px] h-[23px]',
  [ButtonSize.MEDIUM_ICON]: 'rounded-[10px] font-heading tracking-[.038rem] text-sm h-[38px]', // tracking value visually matches abstract but is shown as 0.1px
  [ButtonSize.MEDIUM_BODY_FONT]: 'rounded-[10px] font-body tracking-[.006rem] text-sm min-h-[38px]',
  [ButtonSize.SMALL_MEDIUM_BODY_FONT]: 'rounded-[10px] font-heading tracking-[.006rem] text-sm',
  [ButtonSize.SMALL_BODY_FONT]: 'rounded-[10px] font-body tracking-[.006rem] text-2xs min-h-[28px]',
  [ButtonSize.INHERIT]: '',
}

export const BUTTON_WIDTH_MAPS: Record<ButtonWidth, string> = {
  [ButtonWidth.FULL]: 'w-full',
  [ButtonWidth.LARGE]: 'w-[230px]',
  [ButtonWidth.MEDIUM]: 'w-[121px] px-2',
  [ButtonWidth.AUTO]: 'w-max px-3',
  [ButtonWidth.ICON_TEXT]: 'w-[86px] px-2',
  [ButtonWidth.TINY]: 'w-[24px]',
  [ButtonWidth.ICON_ONLY]: 'w-[38px]',
  [ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY]: 'w-[36px]',
  [ButtonWidth.SINGLE_VIEW_MID_SMALL]: 'w-[72px]',
  [ButtonWidth.SINGLE_VIEW_MID_MEDIUM]: 'w-[118px]',
}

export const BUTTON_BACKGROUND_MAPS: Record<ButtonBackground, string> = {
  [ButtonBackground.WHITE]: 'bg-white',
  [ButtonBackground.BLUE]: 'bg-blue outline-green outline-offset-2',
  [ButtonBackground.COMMENTS_BLUE]: 'bg-commentsBlue outline-green outline-offset-2',
  [ButtonBackground.RED]: 'bg-red',
  [ButtonBackground.ORANGE]: 'bg-orange',
  [ButtonBackground.LIGHT_GREY]: 'bg-grey-200',
  [ButtonBackground.LIGHTISH_GREY]: 'bg-grey-300',
  [ButtonBackground.DARK_GREY]: 'bg-grey-900/50',
  [ButtonBackground.VISA_BLUE]: 'bg-visaBlue',
  [ButtonBackground.MASTERCARD_BLUE]: 'bg-mastercardBlue',
  [ButtonBackground.AMEX_BLUE]: 'bg-amexBlue',
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
  [LabelWeight.SEMIBOLD]: 'font-semibold font-heading tracking-[.006rem]',
  [LabelWeight.MEDIUM]: 'font-medium font-heading',
  [LabelWeight.REGULAR]: 'font-normal font-body',

}

export const BORDER_COLOUR_MAPS: Record<BorderColour, string> = {
  [BorderColour.RED]: 'border border-red',
  [BorderColour.BLUE]: 'border border-blue',
  [BorderColour.GREY]: 'border border-grey-300 dark:border-grey-600',
}
