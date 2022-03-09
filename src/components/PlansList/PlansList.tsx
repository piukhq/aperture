import {useEffect, useState, useCallback} from 'react'
import {TextInputGroup, Button} from 'components'
import Plan from './components/Plan'
import SearchSvg from 'icons/svgs/search.svg'
import CheckSvg from 'icons/svgs/check.svg'
import {useGetPlansHook} from 'hooks/useGetPlansHook'
import {useAppDispatch} from 'app/hooks'
import {setSelectedPlanAssets} from 'features/planAssetsSlice'
import {getCachedPlanSlug, setCachedPlanSlug, removeCachedPlanSlug} from 'utils/storage'
import {HydratedPlan} from 'types'

const PlansList = () => {
  const {uniquePlansList, devIsLoading, stagingIsLoading} = useGetPlansHook()
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loadAssetsError, setLoadAssetsError] = useState(null)

  const filteredPlansList = uniquePlansList.filter(plan => plan.account.plan_name.toLowerCase().includes(searchValue.toLowerCase()))

  const storePlanAssets = useCallback((selectedPlan) => {
    const {devImages, stagingImages} = uniquePlansList.find(plan => plan.slug === selectedPlan.slug)
    const planAssets = {
      dev: devImages,
      staging: stagingImages,
    }
    dispatch(setSelectedPlanAssets(planAssets))
  }, [uniquePlansList, dispatch])

  useEffect(() => {
    const cachedPlanSlug = getCachedPlanSlug()
    if (cachedPlanSlug && !selectedPlan) {
      // Make sure that relevant plans are available before proceeding
      if (!devIsLoading && !stagingIsLoading) {
        // Check if plan still exists
        const plan = uniquePlansList.find(plan => plan.slug === cachedPlanSlug)
        if (plan) {
          setSearchValue(plan.account.plan_name as string)
          setSelectedPlan(plan)
          storePlanAssets(plan)
        } else {
          removeCachedPlanSlug()
        }
      }
    }
  }, [devIsLoading, stagingIsLoading, uniquePlansList, selectedPlan, storePlanAssets])

  const handlePlanClick = (plan: HydratedPlan) => {
    setSearchValue(plan.account.plan_name)
    setSelectedPlan(plan)
    setLoadAssetsError(null)
  }

  const handleLoadAssets = () => {
    if (selectedPlan && selectedPlan.account.plan_name === searchValue) {
      storePlanAssets(selectedPlan)
      setCachedPlanSlug(selectedPlan.slug)
    } else {
      setLoadAssetsError('Select a plan above to load assets')
    }
  }

  const renderPlan = (plan) => (
    <div className='flex items-center place-content-between w-full'>
      <Plan plan={plan} />
    </div>
  )

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className='w-full z-20'>
      <div className='w-full flex gap-[25px]'>
        <TextInputGroup
          name='placeholder'
          label='Search'
          placeholder='Search...'
          selectValues={filteredPlansList}
          renderFn={renderPlan}
          selectedValue={selectedPlan}
          handleSelectValueChange={handlePlanClick}
          value={searchValue}
          onChange={handleSearchTextChange}
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
          handleClick={handleLoadAssets}
        >
          <CheckSvg/>Load Assets
        </Button>
      </div>
      <p className='h-[24px] text-red text-center text-body font-body-3 ml-[160px]'>{loadAssetsError}</p>
    </div>
  )
}

export default PlansList
