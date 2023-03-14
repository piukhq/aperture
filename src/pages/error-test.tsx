import {ButtonBackground, ButtonSize, ButtonWidth, LabelColour} from 'components/Button/styles'
import {Button} from 'components'

const ErrorTest = () => {
  const throwError = () => {
    throw new Error('This is a test error because you clicked the button')
  }

  return (
    <div className='m-8 w-full flex-col justify-center items-center gap-4 overflow-hidden'>
      <div className={'flex flex-col gap-4 items-center'}>
        <h2 className='font-heading-4'>Error Test Page</h2>
        <p className='font-body-1 font-medium mt-4 mb-8'>This page allows us to test what happens when we encounter a client-side error</p>
        <Button
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.ORANGE}
          labelColour={LabelColour.WHITE}
          handleClick={throwError}
        >Generate Error
        </Button>

      </div>
    </div>
  )
}

export default ErrorTest
