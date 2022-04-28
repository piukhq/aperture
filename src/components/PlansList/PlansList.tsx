import {useEffect, useState, useCallback} from 'react'
import {TextInputGroup, Button} from 'components'
import Plan from './components/Plan'
import SearchSvg from 'icons/svgs/search.svg'
import CheckSvg from 'icons/svgs/check.svg'
import {useGetFormattedPlansListHook} from 'hooks/useGetFormattedPlansListHook'
import {useAppDispatch} from 'app/hooks'
import {setSelectedPlanImages} from 'features/planAssetsSlice'
import {getCachedPlanSlug, setCachedPlanSlug, removeCachedPlanSlug} from 'utils/storage'
import {HydratedPlan} from 'types'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'

const PlansList = () => {
  const {uniquePlansList, devIsLoading, stagingIsLoading, prodIsLoading} = useGetFormattedPlansListHook()
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loadAssetsError, setLoadAssetsError] = useState(null)

  const filteredPlansList = uniquePlansList.filter(plan => plan.account.plan_name.toLowerCase().includes(searchValue.toLowerCase()))

  const storePlanAssets = useCallback((selectedPlan) => {
    const plan = uniquePlansList.find(plan => plan.slug === selectedPlan.slug)

    const {devImages = [], stagingImages = [], prodImages = []} = plan || {}
    const planAssets = {
      dev: devImages,
      staging: stagingImages,
      prod: prodImages,
    }
    dispatch(setSelectedPlanImages(planAssets))
  }, [uniquePlansList, dispatch])

  useEffect(() => {
    const cachedPlanSlug = getCachedPlanSlug()
    if (cachedPlanSlug && !selectedPlan) {
      // Make sure that relevant plans are available before proceeding
      if (!devIsLoading && !stagingIsLoading && !prodIsLoading) {
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
  }, [devIsLoading, stagingIsLoading, prodIsLoading, uniquePlansList, selectedPlan, storePlanAssets])

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
    <div className='w-full z-20' data-testid='plan-list-container'>
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
          inputType={InputType.SEARCH_SELECT}
          inputStyle={InputStyle.WHITE_ICON_LEFT_SMALL}
          inputWidth={InputWidth.FULL}
          inputColour={InputColour.LIGHT_GREY}
          svgIcon={<SearchSvg/>}
        />
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
          handleClick={handleLoadAssets}
          ariaLabel='Load Assets'
        >
          <CheckSvg/>Load Assets
        </Button>
      </div>
      <p className='h-[24px] text-red text-center text-body font-body-3 ml-[160px]'>{loadAssetsError}</p>
    </div>
  )
}

export default PlansList
