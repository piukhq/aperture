import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import CloseIcon from 'icons/svgs/close.svg'
import PaymentCardIcon from '../PaymentCardIcon'

type Props = {
  index: number,
  paymentSchemeCode: number | null,
  value: string,
  refValue: string,
}

// Component used to display linked MIDs and Secondary MIDs respectively
const LocationMidsListItem = ({index, paymentSchemeCode, value, refValue}: Props) => {

  return (
    <div key={index} className='flex w-full justify-between '>
      <div className='flex items-center'>
        <div className='w-[42px] h-[30px]'>
          {paymentSchemeCode && <PaymentCardIcon paymentSchemeCode={paymentSchemeCode} />}
        </div>

        <p className='ml-[13px] font-single-view-data'>
          {value}
        </p>
      </div>

      <div className='flex items-center gap-[10px]'>
        <Button
          handleClick={() => console.log('View button clicked')}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
          ariaLabel={`View ${refValue}`}
        >View
        </Button>

        <Button
          handleClick={() => console.log('Unlink button clicked')}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
          borderColour={BorderColour.RED}
          ariaLabel={`Unlink ${refValue}`}
        ><CloseIcon className='w-[14px] h-[14px] fill-red' />
        </Button>
      </div>
    </div>
  )
}
export default LocationMidsListItem
