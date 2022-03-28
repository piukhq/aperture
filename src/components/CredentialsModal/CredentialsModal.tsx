import {ReactNode, useState} from 'react'
import {Button, Modal, Tag, TextInputGroup} from 'components'
import VerificationTag from './components/VerificationTag'
import {useVerificationHook} from 'hooks/useVerificationHook'
import {useGetPlansHook} from 'hooks/useGetPlansHook'
import {EnvironmentName} from 'utils/enums'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
  removeDevVerificationToken,
  removeStagingVerificationToken,
} from 'utils/storage'
import {isValidEmail, isValidPassword} from 'utils/validation'

const CredentialsModal = () => {
  const [emailValue, setEmailValue] = useState('')
  const [isEmailReadyForValidation, setIsEmailReadyForValidation] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [isPasswordReadyForValidation, setIsPasswordReadyForValidation] = useState(false)

  const {
    verifyDevCredentials,
    verifyStagingCredentials,
    devIsSuccess,
    stagingIsSuccess,
    devError,
    stagingError,
    devIsLoading,
    stagingIsLoading,
    resetDevToken,
    resetStagingToken,
  } = useVerificationHook()

  const {resetDevPlans, resetStagingPlans} = useGetPlansHook()

  const {
    AQUAMARINE_FILLED,
    YELLOW_FILLED,
    LIGHT_BLUE_FILLED,
    RED_FILLED,
  } = Tag.tagStyle

  const ENVIRONMENT_TAG_MAPS = {
    'DEV': AQUAMARINE_FILLED,
    'STAGING': YELLOW_FILLED,
    'SANDBOX': LIGHT_BLUE_FILLED,
    'PROD': RED_FILLED,
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value)
    setIsEmailReadyForValidation(false)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value)
    setIsPasswordReadyForValidation(false)
  }

  const validateCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    setIsEmailReadyForValidation(true)
    setIsPasswordReadyForValidation(true)
    e.preventDefault()
    if (isValidEmail(emailValue) && isValidPassword(passwordValue)) {
      !getDevVerificationToken() && verifyDevCredentials({email: emailValue, password: passwordValue})
      !getStagingVerificationToken() && verifyStagingCredentials({email: emailValue, password: passwordValue})
    }
  }

  const getEmailError = () => emailValue.length === 0 ? 'Enter email' : 'Enter valid email'


  const handleRemoveToken = (envKey: string) => {
    if (envKey === 'DEV') {
      resetDevToken()
      removeDevVerificationToken()
      resetDevPlans()
    } else if (envKey === 'STAGING') {
      resetStagingToken()
      removeStagingVerificationToken()
      resetStagingPlans()
    }
  }

  const renderVerificationTag = (envKey: string): ReactNode => {
    let isSuccessful, isPending, isFailure, hasVerificationToken

    // TODO: Should refactor to avoid nasty bulky if/else functions
    if (envKey === 'DEV') {
      [isSuccessful, isPending, isFailure] = [devIsSuccess, devIsLoading, devError]
      hasVerificationToken = isSuccessful || getDevVerificationToken() !== null
    } else if (envKey === 'STAGING') {
      [isSuccessful, isPending, isFailure] = [stagingIsSuccess, stagingIsLoading, stagingError]
      hasVerificationToken = isSuccessful || getStagingVerificationToken() !== null
    }

    const removeVerificationToken = () => handleRemoveToken(envKey)

    const verificationProps = {
      isPending, isFailure, hasVerificationToken, removeVerificationToken,
    }

    return <VerificationTag {...verificationProps} />
  }

  const renderTags = () => {
    return Object.keys(EnvironmentName).map((envKey) => {
      return (
        <div key={envKey} className='flex justify-between py-[27px]'>
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={ENVIRONMENT_TAG_MAPS[envKey]} label={EnvironmentName[envKey]}/>
          {renderVerificationTag(envKey)}
        </div>
      )
    })
  }

  return (
    <Modal modalHeader='Enter Environment Credentials'>
      <form className='flex flex-col gap-[20px] mt-[30px] ' onSubmit={validateCredentials}>
        <TextInputGroup
          name='credentials-email'
          label='Email'
          error={isEmailReadyForValidation && !isValidEmail(emailValue) ? getEmailError() : null}
          value={emailValue}
          onChange={handleEmailChange}
          inputType={TextInputGroup.inputType.TEXT}
          inputStyle={TextInputGroup.inputStyle.FULL}
          inputWidth={TextInputGroup.inputWidth.FULL}
          inputColour={isEmailReadyForValidation && !isValidEmail(emailValue) ? TextInputGroup.inputColour.RED : TextInputGroup.inputColour.GREY} // TODO: If this is common logic for all inputs (including style guide) consider centralising logic into the component itself.
        />
        <TextInputGroup
          name='credentials-password'
          label='Password'
          error={isPasswordReadyForValidation && !isValidPassword(passwordValue) ? 'Enter password' : null}
          value={passwordValue}
          onChange={handlePasswordChange}
          inputType={TextInputGroup.inputType.PASSWORD}
          inputStyle={TextInputGroup.inputStyle.FULL}
          inputWidth={TextInputGroup.inputWidth.FULL}
          inputColour={isPasswordReadyForValidation && !isValidPassword(passwordValue) ? TextInputGroup.inputColour.RED : TextInputGroup.inputColour.GREY}
        />
        <Button
          buttonType={Button.buttonType.SUBMIT}
          buttonSize={Button.buttonSize.LARGE}
          buttonWidth={Button.buttonWidth.FULL}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
          labelWeight={Button.labelWeight.SEMIBOLD}
        > Verify Credentials
        </Button>
      </form>
      <div className='mt-[20px] w-[609px] h-[368px]'>
        {renderTags()}
      </div>
      <p className='font-subheading-4 text-center mb-[44px]'>If you are struggling to verify credentials, email cmorrow@bink.com for support</p>
    </Modal>
  )
}

export default CredentialsModal
