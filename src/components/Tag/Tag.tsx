import React from 'react'
import {classNames} from 'utils/classNames'
import {TagSize, TagStyle, TextStyle, TAG_SIZE_MAPS, TAG_STYLE_MAPS, TEXT_STYLE_MAPS} from './styles'

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
      <p data-testid='tag-label'
        className={classNames(
          'text-sm font-heading font-medium tracking-[.1px]',
          TEXT_STYLE_MAPS[textStyle],
        )}>{label}</p>
    </div>
  )
}

export default React.memo(Tag)
