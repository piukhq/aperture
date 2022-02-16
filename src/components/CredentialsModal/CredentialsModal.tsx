import {ReactNode, useState} from 'react'
import {Button, Modal, Tag, TextInputGroup} from 'components'
import VerificationTag from './components/VerificationTag'
import {useVerificationHook} from './hooks/useVerificationHook'
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
  const [emailError, setEmailError] = useState(null)
  const [passwordValue, setPasswordValue] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const {
    verifyDevCredentials,
    verifyStagingCredentials,
    devIsSuccess,
    stagingIsSuccess,
    devError,
    stagingError,
    devIsLoading,
    stagingIsLoading,
  } = useVerificationHook()

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
    setEmailError(null)
    setEmailValue(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(null)
    setPasswordValue(event.target.value)
  }

  const validateCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validEmail = isValidEmail(emailValue)
    const validPassword = isValidPassword(passwordValue)

    if (!validEmail) {
      emailValue.length === 0 ? setEmailError('Enter email') : setEmailError('Enter valid email')
    }
    if (!validPassword) {
      setPasswordError('Enter password')
    }
    if (validEmail && validPassword) {
      !getDevVerificationToken() && verifyDevCredentials({email: emailValue, password: passwordValue})
      !getStagingVerificationToken() && verifyStagingCredentials({email: emailValue, password: passwordValue})
    }
  }

  const renderVerificationTag = (envKey: string): ReactNode => {
    let isSuccessful, isPending, isFailure, hasVerificationToken, removeVerificationToken

    // TODO: Should refactor to avoid nasty bulky if/else functions
    if (envKey === 'DEV') {
      [isSuccessful, isPending, isFailure] = [devIsSuccess, devIsLoading, devError]
      hasVerificationToken = isSuccessful || getDevVerificationToken() !== null
      removeVerificationToken = removeDevVerificationToken
    } else if (envKey === 'STAGING') {
      [isSuccessful, isPending, isFailure] = [stagingIsSuccess, stagingIsLoading, stagingError]
      hasVerificationToken = isSuccessful || getStagingVerificationToken() !== null
      removeVerificationToken = removeStagingVerificationToken
    }

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
      <form className='flex flex-col gap-[20px]' onSubmit={validateCredentials}>
        <TextInputGroup
          name='credentials-email'
          label='Email'
          error={emailError}
          value={emailValue}
          onChange={handleEmailChange}
          inputType={TextInputGroup.inputType.TEXT}
          inputStyle={TextInputGroup.inputStyle.FULL}
          inputWidth={TextInputGroup.inputWidth.FULL}
          inputColour={emailError ? TextInputGroup.inputColour.RED : TextInputGroup.inputColour.GREY} // TODO: If this is common logic for all inputs (including style guide) consider centralising logic into the component itself.
        />
        <TextInputGroup
          name='credentials-password'
          label='Password'
          error={passwordError}
          value={passwordValue}
          onChange={handlePasswordChange}
          inputType={TextInputGroup.inputType.PASSWORD}
          inputStyle={TextInputGroup.inputStyle.FULL}
          inputWidth={TextInputGroup.inputWidth.FULL}
          inputColour={passwordError ? TextInputGroup.inputColour.RED : TextInputGroup.inputColour.GREY}
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
      <p className='font-subheading-4 text-center'>If you are struggling to verify credentials, email cmorrow@bink.com for support</p>
    </Modal>
  )
}

export default CredentialsModal
