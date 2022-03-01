import {useMemo, useState} from 'react'
import {TextInputGroup, Button} from 'components'
import Plan from './components/Plan'
import SearchSvg from 'icons/svgs/search.svg'
import CheckSvg from 'icons/svgs/check.svg'
import {useGetPlansHook} from 'hooks/useGetPlansHook'
import {useAppDispatch} from 'app/hooks'

import {setSelectedPlanAssets} from 'features/planAssetsSlice'


const PlansList = () => {
  const {uniquePlansList, devPlans, stagingPlans} = useGetPlansHook()
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [selectedPlanSlug, setSelectedPlanSlug] = useState(null)
  const [loadAssetsError, setLoadAssetsError] = useState(null)


  const handlePlanClick = (item) => {
    setValue(item.account.plan_name)
    setSelectedPlanSlug(item.slug)
    setLoadAssetsError(null)
  }

  const handleLoadAssets = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedPlanSlug) {
      const devAssets = devPlans?.find(plan => plan.slug === selectedPlanSlug)?.images || []
      const stagingAssets = stagingPlans?.find(plan => plan.slug === selectedPlanSlug)?.images || []
      const planAssets = {
        dev: devAssets,
        staging: stagingAssets,
      }
      dispatch(setSelectedPlanAssets(planAssets))
    } else {
      setLoadAssetsError('Select a plan above to load assets')
    }
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
    <div className='w-full z-20'>
      <form className='w-full flex gap-[25px]' onSubmit={handleLoadAssets}>
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
        <Button
          buttonType={Button.buttonType.SUBMIT}
          buttonSize={Button.buttonSize.MEDIUM_ICON}
          buttonWidth={Button.buttonWidth.AUTO}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
          labelWeight={Button.labelWeight.MEDIUM}
        > <CheckSvg/>Load Assets
        </Button>
      </form>
      <p className='h-[24px] text-red text-center text-body font-body-3 ml-[160px]'>{loadAssetsError}</p>
    </div>
  )
}

export default PlansList
