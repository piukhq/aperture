import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useEffect, useState} from 'react'
import {DirectoryTxmStatusDisplayValue, UserPermissions} from 'utils/enums'

type Props = {
  txmStatus: string
  offboardEntityFn: () => void,
  onboardEntityFn: () => void,
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
  isOnboardingLoading,
  isOnboardingSuccess,
  isOffboardingLoading,
  isOffboardingSuccess,
  isDisabled,
}: Props) => {

  const [harmoniaStatusButtonAction, setHarmoniaStatusButtonAction] = useState<string>('')
  const harmoniaStatus = DirectoryTxmStatusDisplayValue[txmStatus]

  const isLoading = isOnboardingLoading || isOffboardingLoading || harmoniaStatus === DirectoryTxmStatusDisplayValue.onboarding || harmoniaStatus === DirectoryTxmStatusDisplayValue.offboarding

  useEffect(() => {
    if (harmoniaStatus === DirectoryTxmStatusDisplayValue.onboarded) {
      setHarmoniaStatusButtonAction('Offboard')
    } else if (harmoniaStatus === DirectoryTxmStatusDisplayValue.not_onboarded || DirectoryTxmStatusDisplayValue.offboarded) {
      setHarmoniaStatusButtonAction('Onboard')
    }
  }, [harmoniaStatus, isOffboardingLoading, isOffboardingSuccess, isOnboardingLoading, isOnboardingSuccess, txmStatus])

  return (
    <section className='h-[38px] flex justify-between mb-[34px] items-center'>
      <div>
        <h2 className='font-modal-heading'>HARMONIA STATUS</h2>
        <p className='font-modal-data' data-testid='harmonia-status'>{harmoniaStatus}</p>
      </div>
      <Button
        handleClick={() => harmoniaStatus === DirectoryTxmStatusDisplayValue.onboarded ? offboardEntityFn() : onboardEntityFn()}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.MEDIUM}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        labelColour={LabelColour.GREY}
        labelWeight={LabelWeight.SEMIBOLD}
        isDisabled={isDisabled || isLoading}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
        noShadow
      >{isLoading ? 'Loading' : harmoniaStatusButtonAction}
      </Button>
    </section>
  )
}

export default HarmoniaStatus
