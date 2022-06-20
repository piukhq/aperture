export enum TagSize {
  MEDIUM,
  SMALL,
  MINI,
  SINGLE_VIEW_MID_MEDIUM
}

export enum TagStyle {
  AQUAMARINE_FILLED,
  AQUAMARINE_OUTLINE,
  YELLOW_FILLED,
  YELLOW_OUTLINE,
  LIGHT_BLUE_FILLED,
  LIGHT_BLUE_OUTLINE,
  RED_FILLED,
  RED_OUTLINE,
  GREY_OUTLINE,
  LIGHT_GREY_FILLED
}

export enum TextStyle {
  SINGLE_LETTER,
  MEDIUM
}

export enum TextColour {
  WHITE,
  GREY
}

export const TAG_SIZE_MAPS: Record<TagSize, string> = {
  [TagSize.MEDIUM]: 'h-[38px] w-[129px]',
  [TagSize.SMALL]: 'h-[38px] w-[93px]',
  [TagSize.MINI]: 'h-[24px] w-[24px] rounded-[12px]',
  [TagSize.SINGLE_VIEW_MID_MEDIUM]: 'h-[36px] w-[118px]',
}

export const TAG_STYLE_MAPS: Record<TagStyle, string> = {
  [TagStyle.AQUAMARINE_FILLED]: 'bg-aquamarine text-white',
  [TagStyle.AQUAMARINE_OUTLINE]: 'bg-transparent border border-aquamarine text-aquamarine',
  [TagStyle.YELLOW_FILLED]: 'bg-yellow text-white',
  [TagStyle.YELLOW_OUTLINE]: 'border border-yellow text-yellow',
  [TagStyle.LIGHT_BLUE_FILLED]: 'bg-lightBlue text-white',
  [TagStyle.LIGHT_BLUE_OUTLINE]: 'border border-lightBlue text-lightBlue',
  [TagStyle.RED_FILLED]: 'bg-red text-white',
  [TagStyle.RED_OUTLINE]: 'border border-red text-red',
  [TagStyle.GREY_OUTLINE]: 'border border-grey-600 text-grey-600',
  [TagStyle.LIGHT_GREY_FILLED]: 'bg-grey-200',
}

export const TEXT_STYLE_MAPS: Record<TextStyle, string> = {
  [TextStyle.SINGLE_LETTER]: 'text-[11px] cursor-default',
  [TextStyle.MEDIUM]: 'font-semibold text-2xs text-grey-700 cursor-default',
}

export const TEXT_COLOUR_MAPS: Record<TextColour, string> = {
  [TextColour.WHITE]: 'text-white',
  [TextColour.GREY]: 'text-grey-700',
}
