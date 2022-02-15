import {ReactNode, useState} from 'react'
import {Button, Modal, Tag, TextInputGroup} from 'components'

import {useVerificationHook} from './hooks/useVerificationHook'

import {isValidEmail, isValidPassword} from 'utils/validation'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
} from 'utils/storage'

const CredentialsModal = () => {
  const [emailValue, setEmailValue] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [passwordValue, setPasswordValue] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const {
    verifyDevCredentials,
    verifyStagingCredentials,
    devError,
    stagingError,
    devIsLoading,
    stagingIsLoading,
    devIsSuccess,
    stagingIsSuccess,
  } = useVerificationHook()

  const {LIGHT_BLUE_OUTLINE, YELLOW_OUTLINE, RED_OUTLINE, GREY_OUTLINE} = Tag.tagStyle

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

  const determineStatusTag = (isStaging: boolean): ReactNode => {
    let tagStyle = GREY_OUTLINE
    let label = 'Unverified'

    const [isSuccessful, isPending, isFailure] = isStaging
      ? [stagingIsSuccess, stagingIsLoading, stagingError]
      : [devIsSuccess, devIsLoading, devError]

    const hasVerificationToken = isStaging ? getStagingVerificationToken() : getDevVerificationToken()

    if (isSuccessful || hasVerificationToken) {
      tagStyle = LIGHT_BLUE_OUTLINE
      label = 'Verified'
    } else if (isPending) {
      tagStyle = YELLOW_OUTLINE
      label = 'Pending'
    } else if (isFailure) {
      tagStyle = RED_OUTLINE
      label = 'Failed'
    }

    return (
      <Tag tagSize={Tag.tagSize.SMALL} tagStyle={tagStyle} label={label} />
    )
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
        <div className='flex justify-between py-[27px]'>
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.AQUAMARINE_FILLED} label={'Develop'}/>
          {determineStatusTag(false)}
        </div>
        <div className='flex justify-between py-[27px]'>
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.YELLOW_FILLED} label={'Staging'}/>
          {determineStatusTag(true)}
        </div>
        <div className='flex justify-between py-[27px]'>
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.LIGHT_BLUE_FILLED} label={'Sandbox'}/>
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.GREY_OUTLINE} label='Unverified' />
        </div>
        <div className='flex justify-between py-[27px]'>
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.RED_FILLED} label={'Production'}/>
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.GREY_OUTLINE} label='Unverified' />
        </div>
      </div>
      <p className='font-subheading-4 text-center'>If you are struggling to verify credentials, email cmorrow@bink.com for support</p>
    </Modal>
  )
}

export default CredentialsModal
