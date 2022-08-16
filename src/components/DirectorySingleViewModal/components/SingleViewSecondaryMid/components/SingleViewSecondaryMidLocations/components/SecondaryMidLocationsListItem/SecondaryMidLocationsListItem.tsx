import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import CloseIcon from 'icons/svgs/close.svg'

type Props = {
  locationRef: string,
  locationTitle: string,
}

const SecondaryMidLocationsListItem = ({locationRef, locationTitle}: Props) => {

  const renderDefaultStateButtons = () => ( // TODO: Confirmation State buttons to be added
    <div className='flex items-center gap-[10px]'>
      <Button
        handleClick={() => console.log('View button clicked')}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        labelColour={LabelColour.GREY}
        labelWeight={LabelWeight.SEMIBOLD}
        ariaLabel={`View ${locationRef}`}
      >View
      </Button>

      <Button
        handleClick={() => console.log('Unlink button clicked')}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
        borderColour={BorderColour.RED}
        ariaLabel={`Unlink ${locationRef}`}
      ><CloseIcon className='w-[14px] h-[14px] fill-red' />
      </Button>
    </div>
  )

  return (
    <div className='flex w-full justify-between h-[35px]'>
      <p className='flex items-center w-[390px] font-single-view-data truncate'>
        {locationTitle}
      </p>
      {renderDefaultStateButtons()}
    </div>
  )
}

export default SecondaryMidLocationsListItem
