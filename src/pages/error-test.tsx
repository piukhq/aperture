import {ButtonBackground, ButtonSize, ButtonWidth, LabelColour} from 'components/Button/styles'
import {getSelectedDirectoryPlan, setSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {Button} from 'components'
import {useState} from 'react'

const ErrorTest = () => {
  // The logic with Redux selectors replicates an issue seen in the wild as the only way I can think of to recreate it while still fooling EsLint and Typescript into letting me build it successfully
  const [isGoingToCrash, setIsGoingToCrash] = useState(false)
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const dispatch = useAppDispatch()

  isGoingToCrash && dispatch(setSelectedDirectoryPlan({
    plan_ref: 'test',
    plan_metadata: {name: 'test', icon_url: ''},
    plan_counts: {merchants: 1, locations: 1, payment_schemes: []},
  }))

  const throwError = () => {
    setIsGoingToCrash(true)
    console.log(selectedPlan)
  }

  const throwException = () => {
    throw new Error('This is a test exception because you clicked the Generate Exception button')
  }

  return (
    <div className='m-8 w-full flex-col justify-center items-center gap-4 overflow-hidden'>
      <div className={'flex flex-col gap-4 items-center'}>
        <h2 className='font-heading-1'>Error Test Page 💥</h2>
        <p className='font-body-1 font-medium mt-4 '>This page allows us to test what happens when we encounter errors in Aperture</p>
        <p className='font-body-2 font-medium mt-16 mb-2 w-1/2 text-center'> This button causes a recoverable error that shows a message in the console as well as generating an event in Sentry.</p>
        <Button
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.ORANGE}
          labelColour={LabelColour.WHITE}
          handleClick={throwException}
        >Generate Exception
        </Button>
        <p className='font-body-2 font-medium mt-16 mb-2 w-1/2 text-center'> This button will cause the app to crash completely and should render a custom error page when not in development mode.</p>
        <Button
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.RED}
          labelColour={LabelColour.WHITE}
          handleClick={throwError}
        >Generate Error
        </Button>
        <p className='font-body-2 font-medium mt-16 mb-2 w-1/2 text-center'> This button will open a new tab to a page that does not exist and thus show the 404 page instead.</p>
        <a className='flex justify-center items-center text-white text-md hover:bg-green/75 bg-green text-center rounded-lg font-heading-7 text-sm duration-500 w-[120px] h-[38px] pointer-cursor' target='_blank' href={'/thispagedoesnotexistsoitwillgivea404error'} rel='noreferrer'>
          Generate 404 Page
        </a>

      </div>
    </div>
  )
}

export default ErrorTest
