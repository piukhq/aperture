import {useMemo, useState} from 'react'
import {TextInputGroup} from 'components'
import Plan from './components/Plan'
import SearchSvg from 'icons/svgs/search.svg'
import {useGetPlansHook} from 'hooks/useGetPlansHook'

const PlansList = () => {
  const {uniquePlansList} = useGetPlansHook()

  const [value, setValue] = useState('')

  const handlePlanClick = (item) => {
    setValue(item.account.plan_name)
  }

  const list = useMemo(() => {
    if (uniquePlansList) {
      return uniquePlansList.map((item, _index) => (
        <div key={_index} onClick={() => handlePlanClick(item)} className='flex items-center place-content-between w-full'>
          <Plan plan={item} />
        </div>
      ))
    }
    return []
  }, [uniquePlansList])

  return (
    <TextInputGroup
      name='placeholder'
      label='Search'
      placeholder='Search...'
      selectValues={list}
      value={value}
      onChange={() => null}
      inputType={TextInputGroup.inputType.SEARCH_SELECT}
      inputStyle={TextInputGroup.inputStyle.WHITE_ICON_LEFT_SMALL}
      inputWidth={TextInputGroup.inputWidth.FULL}
      inputColour={TextInputGroup.inputColour.LIGHT_GREY}
      svgIcon={<SearchSvg/>}
    />
  )
}

export default PlansList
