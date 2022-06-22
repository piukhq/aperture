import React from 'react'
import {classNames} from 'utils/classNames'
import {TagSize, TagStyle, TextStyle, TextColour, TAG_SIZE_MAPS, TAG_STYLE_MAPS, TEXT_STYLE_MAPS, TEXT_COLOUR_MAPS} from './styles'

type Props = {
  tagSize: TagSize,
  tagStyle: TagStyle,
  textStyle?: TextStyle,
  textColour?: TextColour,
  label: string,
}

const Tag = (props: Props) => {
  const {tagSize, tagStyle, textStyle, textColour, label} = props
  return (
    <div className={classNames(
      'flex items-center justify-center rounded-[10px]',
      TAG_SIZE_MAPS[tagSize],
      TAG_STYLE_MAPS[tagStyle],
    )}>
      <p data-testid='tag-label'
        className={classNames(
          'text-sm font-heading tracking-[.1px]',
          // Needed to stop 'font-medium' overriding provided font weight in `textStyle`
          // Not sure why it does this
          `${!textStyle && 'font-medium'}`,
          TEXT_STYLE_MAPS[textStyle],
          TEXT_COLOUR_MAPS[textColour],
        )}>{label}</p>
    </div>
  )
}

export default React.memo(Tag)
