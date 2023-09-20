import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useEffect, useState} from 'react'
import {DirectoryTxmStatusDisplayValue, UserPermissions} from 'utils/enums'
import {useAppDispatch} from 'app/hooks'
import {setHasHarmoniaStatusUpdate} from 'features/directoryMerchantSlice'


type Props = {
  txmStatus: string
  offboardEntityFn: () => void,
  onboardEntityFn: () => void,
  shouldRefresh: boolean,
  setShouldRefresh: (shouldRefresh: boolean) => void,
  isOnboardingLoading: boolean,
  isOnboardingSuccess: boolean,
  isOffboardingLoading: boolean,
  isOffboardingSuccess: boolean,
  isDisabled: boolean,
}

// Component used to display Harmonia Status and on/offboarding functionality
const HarmoniaStatus = ({
  txmStatus,
  offboardEntityFn,
  onboardEntityFn,
  shouldRefresh,
  setShouldRefresh,
  isOnboardingLoading,
  isOnboardingSuccess,
  isOffboardingLoading,
  isOffboardingSuccess,
  isDisabled,
}: Props) => {

  const dispatch = useAppDispatch()
  const [harmoniaStatusButtonAction, setHarmoniaStatusButtonAction] = useState<string>('')
  const harmoniaStatus = DirectoryTxmStatusDisplayValue[txmStatus]

  const isOffboarding = (isOffboardingLoading || isOffboardingSuccess) && harmoniaStatus === DirectoryTxmStatusDisplayValue.onboarded
  const isOnboarding = isOnboardingLoading || isOnboardingSuccess && harmoniaStatus === DirectoryTxmStatusDisplayValue.not_onboarded || DirectoryTxmStatusDisplayValue.offboarded

  const buttonLabel = () => {
    if (isOffboarding && shouldRefresh) {
      return 'Offboarding...'
    } else if (isOnboarding && shouldRefresh) {
      return 'Onboarding...'
    } else {
      return harmoniaStatusButtonAction
    }
  }

  useEffect(() => {
    if (harmoniaStatus === DirectoryTxmStatusDisplayValue.onboarded) {
      setHarmoniaStatusButtonAction('Offboard')
    } else if (harmoniaStatus === DirectoryTxmStatusDisplayValue.not_onboarded || DirectoryTxmStatusDisplayValue.offboarded) {
      setHarmoniaStatusButtonAction('Onboard')
    }
  }, [harmoniaStatus, isOffboardingLoading, isOffboardingSuccess, isOnboardingLoading, isOnboardingSuccess, txmStatus])

  const handleClick = () => {
    setShouldRefresh(true)
    dispatch(setHasHarmoniaStatusUpdate(true)) // Instructs the Single View Modal component to call for a refresh of the entity and entities on close
    harmoniaStatus === DirectoryTxmStatusDisplayValue.onboarded ? offboardEntityFn() : onboardEntityFn()
  }

  return (
    <section className='h-[38px] flex justify-between mb-[34px] items-center'>
      <div>
        <h2 className='font-modal-heading'>HARMONIA STATUS</h2>
        <p className={`font-modal-data ${shouldRefresh && 'animate-pulse'}`} data-testid='harmonia-status'>{shouldRefresh ? buttonLabel() : harmoniaStatus}</p>
      </div>
      <Button
        handleClick={handleClick}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.MEDIUM}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        labelColour={LabelColour.GREY}
        labelWeight={LabelWeight.SEMIBOLD}
        isDisabled={isDisabled || shouldRefresh}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
        noShadow
      >{buttonLabel()}
      </Button>
    </section>
  )
}

export default HarmoniaStatus
