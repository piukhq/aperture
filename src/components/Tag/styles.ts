export enum TagSize {
  MEDIUM,
  SMALL,
  MINI,
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
}

export enum TextStyle {
  SINGLE_LETTER,
}

export const TAG_SIZE_MAPS: Record<TagSize, string> = {
  [TagSize.MEDIUM]: 'h-[38px] w-[129px]',
  [TagSize.SMALL]: 'h-[38px] w-[93px]',
  [TagSize.MINI]: 'h-[24px] w-[24px] rounded-[12px]',
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
}

export const TEXT_STYLE_MAPS: Record<TextStyle, string> = {
  [TextStyle.SINGLE_LETTER]: 'text-[11px] cursor-default',
}
