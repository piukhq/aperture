import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useEffect, useState} from 'react'
import {DirectoryTxmStatus} from 'utils/enums'

type Props = {
  txmStatus: string
  offboardEntityFn: () => void,
  onboardEntityFn: () => void,
  isOnboardingLoading: boolean,
  isOnboardingSuccess: boolean,
  isOffboardingLoading: boolean,
  isOffboardingSuccess: boolean,
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
}: Props) => {

  const [harmoniaStatusButtonAction, setHarmoniaStatusButtonAction] = useState('')
  const harmoniaStatus = DirectoryTxmStatus[txmStatus]

  useEffect(() => {
    if (harmoniaStatus === DirectoryTxmStatus.offboarding || isOffboardingLoading) {
      setHarmoniaStatusButtonAction('Offboarding')
    } else if (harmoniaStatus === DirectoryTxmStatus.onboarding || isOnboardingLoading) {
      setHarmoniaStatusButtonAction('Onboarding')
    } else if (harmoniaStatus === DirectoryTxmStatus.onboarded) {
      setHarmoniaStatusButtonAction('Offboard')
    } else if (harmoniaStatus === DirectoryTxmStatus.not_onboarded) {
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
        handleClick={() => harmoniaStatus === DirectoryTxmStatus.onboarded ? offboardEntityFn() : onboardEntityFn()}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.MEDIUM}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        labelColour={LabelColour.GREY}
        labelWeight={LabelWeight.SEMIBOLD}
        isDisabled={isOnboardingLoading || isOffboardingLoading || (harmoniaStatus === DirectoryTxmStatus.onboarding || harmoniaStatus === DirectoryTxmStatus.offboarding)}
      > {harmoniaStatusButtonAction}
      </Button>
    </section>
  )
}

export default HarmoniaStatus
