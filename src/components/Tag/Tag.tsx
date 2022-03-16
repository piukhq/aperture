import React from 'react'
import {classNames} from 'utils/classNames'

enum TagSize {
  MEDIUM,
  SMALL,
  MINI,
}

enum TagStyle {
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

enum TextStyle {
  SINGLE_LETTER,
}

const TAG_SIZE_MAPS: Record<TagSize, string> = {
  [TagSize.MEDIUM]: 'h-[38px] w-[129px]',
  [TagSize.SMALL]: 'h-[38px] w-[93px]',
  [TagSize.MINI]: 'h-[24px] w-[24px] rounded-[12px]',
}

const TAG_STYLE_MAPS: Record<TagStyle, string> = {
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

const TEXT_STYLE_MAPS: Record<TextStyle, string> = {
  [TextStyle.SINGLE_LETTER]: 'text-[11px] cursor-default',
}

type Props = {
  tagSize: TagSize,
  tagStyle: TagStyle,
  textStyle?: TextStyle,
  label: string,
}

const Tag = (props: Props) => {
  const {tagSize, tagStyle, textStyle, label} = props
  return (
    <div className={classNames(
      'flex items-center justify-center rounded-[10px]',
      TAG_SIZE_MAPS[tagSize],
      TAG_STYLE_MAPS[tagStyle],
    )}>
      <p className={classNames(
        'text-sm font-heading font-medium tracking-[.1px]',
        TEXT_STYLE_MAPS[textStyle],
      )}>{label}</p>
    </div>
  )
}

Tag.tagSize = TagSize
Tag.tagStyle = TagStyle
Tag.textStyle = TextStyle

// TODO: This component should be memoized so as to avoid unnecessary re-renders
// Must look into a component refactor to accomodate this
export default Tag
