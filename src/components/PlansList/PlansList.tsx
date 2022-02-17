// Placeholder for actual component outlined in PTL-59

import {TextInputGroup} from 'components'
import SearchSvg from 'icons/svgs/search.svg'
import {useGetPlansHook} from 'hooks/useGetPlansHook'

const PlansList = () => {
  const {planListByUniqueName} = useGetPlansHook()

  return (
    <TextInputGroup
      name='placeholder'
      label='Search'
      placeholder='Search...'
      selectValues={planListByUniqueName}
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
