import {Button, PaymentCardIcon} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight, BorderColour} from 'components/Button/styles'
import CloseIcon from 'icons/svgs/close.svg'
import {useState} from 'react'
import {LinkableEntities, PaymentSchemeSlug} from 'utils/enums'

type Props = {
  paymentSchemeSlug?: PaymentSchemeSlug,
  value: string,
  link: string,
  refValue: string,
  unlinkFn: () => void,
  isUnlinking: boolean,
  setShouldRenderNewLinkDropdownMenuFn: (shouldRenderDropdownMenu: boolean) => void,
  setNewLinkNotificationFn: (notification: string) => void,
  entityType: LinkableEntities
}

// Component used to display linked MIDs, Secondary MIDs and Locations
const LinkedListItem = ({
  paymentSchemeSlug,
  value,
  link,
  refValue,
  unlinkFn,
  isUnlinking,
  setShouldRenderNewLinkDropdownMenuFn,
  setNewLinkNotificationFn,
  entityType,
}: Props) => {
  const [isInUnlinkingConfirmationState, setIsInUnlinkingConfirmationState] = useState(false)

  const handleInitialUnlinkButtonClick = () => {
    setIsInUnlinkingConfirmationState(true)
    setShouldRenderNewLinkDropdownMenuFn(false)
    setNewLinkNotificationFn('')
  }

  const renderDefaultStateButton = () => (
    <div className='flex items-center'>
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

  const renderUnlinkConfirmationStateButtons = () => (
    <section data-testid='unlink-confirmation-section' className='flex items-center justify-between gap-[5px]' >
      <p className='absolute -translate-x-[160px] font-body-4 pl-[5px] bg-white dark:bg-grey-850 text-red max-w-[157px] z-10'>Are you sure you want to unlink this {entityType}?</p>

      <Button
        handleClick={() => setIsInUnlinkingConfirmationState(false)}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        ariaLabel={'Cancel'}
      ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
      </Button>
      <Button
        handleClick={unlinkFn}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.MEDIUM}
        buttonBackground={ButtonBackground.RED}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        isDisabled={isUnlinking}
      > { isUnlinking ? 'Unlinking... ' : 'Yes, unlink'}
      </Button>
    </section>
  )

  return (
    <div className='flex w-full justify-between h-[35px]'>
      <a href={link} className='flex items-center overflow-x-hidden font-modal-data text-blue'>
        {entityType !== LinkableEntities.LOCATION && (
          <div className='w-[42px] h-[30px] mr-[13px]'>
            {paymentSchemeSlug && <PaymentCardIcon paymentSchemeSlug={paymentSchemeSlug} />}
          </div>
        )}
        {value}
      </a>

      {isInUnlinkingConfirmationState ? renderUnlinkConfirmationStateButtons() : renderDefaultStateButton()}
    </div>
  )
}

export default LinkedListItem
