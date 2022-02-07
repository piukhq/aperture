// Placeholder for actual component outlined in PTL-59

import {TextInputGroup} from 'components'
import SearchSvg from 'icons/svgs/search.svg'

const PlansList = () => {
  return (
    <TextInputGroup
      name='placeholder'
      label='Search'
      placeholder='Search...'
      value={null}
      onChange={() => null}
      inputType={TextInputGroup.inputType.SELECT}
      inputStyle={TextInputGroup.inputStyle.WHITE_ICON_LEFT_SMALL}
      inputWidth={TextInputGroup.inputWidth.FULL}
      inputColour={TextInputGroup.inputColour.LIGHT_GREY}
      svgIcon={<SearchSvg/>}
    />

  )
}

export default PlansList
