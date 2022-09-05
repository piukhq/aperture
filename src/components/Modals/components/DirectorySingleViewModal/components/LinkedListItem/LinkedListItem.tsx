import {Button, Tag, PaymentCardIcon} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import {TagStyle, TagSize, TextStyle, TextColour} from 'components/Tag/styles'
import CloseIcon from 'icons/svgs/close.svg'
import {LinkableEntities} from 'utils/enums'

type Props = {
  index: number,
  paymentSchemeCode?: number | null,
  value: string,
  refValue: string,
  unlinkFn: () => void,
  isUnlinking: boolean,
  isInUnlinkingConfirmationState: boolean,
  setSelectedUnlinkIndexFn: (index: number) => void,
  setShouldRenderNewLinkDropdownMenuFn: (shouldRenderDropdownMenu: boolean) => void,
  setNewLinkNotificationFn: (notification: string) => void,
  entityType: LinkableEntities
}

// Component used to display linked MIDs, Secondary MIDs and Locations
const LinkedListItem = ({
  index,
  paymentSchemeCode,
  value,
  refValue,
  setSelectedUnlinkIndexFn,
  isInUnlinkingConfirmationState,
  unlinkFn,
  isUnlinking,
  setShouldRenderNewLinkDropdownMenuFn,
  setNewLinkNotificationFn,
  entityType,
}: Props) => {

  const handleInitialUnlinkButtonClick = () => {
    setSelectedUnlinkIndexFn(index)
    setShouldRenderNewLinkDropdownMenuFn(false)
  }

  const renderDefaultStateButtons = () => (
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
        handleClick={handleInitialUnlinkButtonClick}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
        borderColour={BorderColour.RED}
        ariaLabel={`Unlink ${refValue}`}
      ><CloseIcon className='w-[14px] h-[14px] fill-red' />
      </Button>
    </div>
  )

  const renderUnlinkConfirmationStateButtons = () => {
    setNewLinkNotificationFn('')
    return <div className='flex items-center justify-between gap-[5px]' >
      <p className='absolute -translate-x-[160px] font-body-4 pl-[5px] bg-white dark:bg-grey-850 text-red max-w-[157px] z-10'>Are you sure you want to unlink this {entityType}?</p>
      <Button
        handleClick={() => setSelectedUnlinkIndexFn(null)}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        ariaLabel={'Cancel'}
      ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
      </Button>

      {isUnlinking ? (
        <Tag
          tagSize={TagSize.MEDIUM}
          textStyle={TextStyle.MEDIUM}
          textColour={TextColour.WHITE}
          tagStyle={TagStyle.RED_FILLED}
          label='Unlinking...'
        />
      ) : (
        <Button
          handleClick={unlinkFn}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.RED}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
          ariaLabel={'Confirm unlink'}
        > { isUnlinking ? 'Unlinking... ' : 'Yes, unlink'}
        </Button>
      )}
    </div>
  }

  return (
    <div key={index} className='flex w-full justify-between h-[35px]'>
      <div className='flex items-center overflow-x-hidden '>
        {entityType !== LinkableEntities.LOCATION && (
          <div className='w-[42px] h-[30px] mr-[13px]'>
            {paymentSchemeCode && <PaymentCardIcon paymentSchemeCode={paymentSchemeCode} />}
          </div>
        )}

        <p className='font-modal-data'>
          {value}
        </p>
      </div>
      {isInUnlinkingConfirmationState ? renderUnlinkConfirmationStateButtons() : renderDefaultStateButtons()}
    </div>
  )
}

export default LinkedListItem
