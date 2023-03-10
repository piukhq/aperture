import {ReactNode, useState, useCallback} from 'react'
import {Button, Modal, Tag, TextInputGroup} from 'components'
import VerificationTag from './components/VerificationTag'
import {useGetPlans} from 'hooks/useGetPlans'
import {useVerification} from 'hooks/useVerification'
import {Admin, EnvironmentName, ModalStyle} from 'utils/enums'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
  getProdVerificationToken,
  removeDevVerificationToken,
  removeStagingVerificationToken,
  removeProdVerificationToken,
} from 'utils/storage'
import {isValidEmail, isValidPassword} from 'utils/validation'
import {TagStyle, TagSize} from 'components/Tag/styles'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'

const CredentialsModal = () => {
  const [emailValue, setEmailValue] = useState('')
  const [isEmailReadyForValidation, setIsEmailReadyForValidation] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [isPasswordReadyForValidation, setIsPasswordReadyForValidation] = useState(false)

  const {resetDevPlans, resetStagingPlans, resetProdPlans} = useGetPlans()

  const {
    verifyDevCredentials,
    verifyStagingCredentials,
    verifyProdCredentials,
    devIsSuccess,
    stagingIsSuccess,
    prodIsSuccess,
    devError,
    stagingError,
    prodError,
    devIsLoading,
    stagingIsLoading,
    prodIsLoading,
    resetDevToken,
    resetStagingToken,
    resetProdToken,
  } = useVerification()

  const {
    AQUAMARINE_FILLED,
    YELLOW_FILLED,
    RED_FILLED,
  } = TagStyle

  const ENVIRONMENT_TAG_MAPS = {
    'DEV': AQUAMARINE_FILLED,
    'STAGING': YELLOW_FILLED,
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
      !getProdVerificationToken() && verifyProdCredentials({email: emailValue, password: passwordValue})
    }
  }

  const getEmailError = () => emailValue.length === 0 ? 'Enter email' : 'Enter valid email'

  const handleRemoveToken = useCallback((envKey: string) => {
    if (envKey === 'DEV') {
      resetDevToken()
      removeDevVerificationToken()
      resetDevPlans()
    } else if (envKey === 'STAGING') {
      resetStagingToken()
      removeStagingVerificationToken()
      resetStagingPlans()
    } else if (envKey === 'PROD') {
      resetProdToken()
      removeProdVerificationToken()
      resetProdPlans()
    }
  }, [resetDevToken, resetDevPlans, resetStagingToken, resetStagingPlans, resetProdToken, resetProdPlans])

  const renderVerificationTag = (envKey: string): ReactNode => {
    let isSuccessful, isPending, isFailure, hasVerificationToken

    // TODO: Should refactor to avoid nasty bulky if/else functions
    if (envKey === 'DEV') {
      [isSuccessful, isPending, isFailure] = [devIsSuccess, devIsLoading, devError]
      hasVerificationToken = isSuccessful || getDevVerificationToken() !== null
    } else if (envKey === 'STAGING') {
      [isSuccessful, isPending, isFailure] = [stagingIsSuccess, stagingIsLoading, stagingError]
      hasVerificationToken = isSuccessful || getStagingVerificationToken() !== null
    } else if (envKey === 'PROD') {
      [isSuccessful, isPending, isFailure] = [prodIsSuccess, prodIsLoading, prodError]
      hasVerificationToken = isSuccessful || getProdVerificationToken() !== null
    }

    const verificationProps = {
      isPending, isFailure, hasVerificationToken, envKey,
    }

    return <VerificationTag {...verificationProps} removeVerificationToken={handleRemoveToken}/>
  }

  const renderTags = () => {
    return Object.keys(EnvironmentName).map((envKey) => {
      return (
        <div key={envKey} className='flex justify-between py-[27px]'>
          <Tag tagSize={TagSize.MEDIUM} tagStyle={ENVIRONMENT_TAG_MAPS[envKey]} label={EnvironmentName[envKey]}/>
          {renderVerificationTag(envKey)}
        </div>
      )
    })
  }

  return (
    <Modal modalStyle={ModalStyle.WIDE} modalHeader='Enter Environment Credentials'>
      <form className='flex flex-col gap-[20px] mt-[30px] ' onSubmit={validateCredentials}>
        <TextInputGroup
          name='credentials-email'
          label='Email'
          autofocus
          error={isEmailReadyForValidation && !isValidEmail(emailValue) ? getEmailError() : null}
          value={emailValue}
          ariaRequired
          onChange={handleEmailChange}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={isEmailReadyForValidation && !isValidEmail(emailValue) ? InputColour.RED : InputColour.GREY} // TODO: If this is common logic for all inputs (including style guide) consider centralising logic into the component itself.
        />
        <TextInputGroup
          name='credentials-password'
          label='Password'
          error={isPasswordReadyForValidation && !isValidPassword(passwordValue) ? 'Enter password' : null}
          value={passwordValue}
          ariaRequired
          onChange={handlePasswordChange}
          inputType={InputType.PASSWORD}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={isPasswordReadyForValidation && !isValidPassword(passwordValue) ? InputColour.RED : InputColour.GREY}
        />
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.LARGE}
          buttonWidth={ButtonWidth.FULL}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
          ariaLabel='Verify Credentials'
        > Verify Credentials
        </Button>
      </form>
      <div className='mt-[20px] w-full h-[300px]'>
        {renderTags()}
      </div>
      <p className='font-subheading-4 text-center mb-[44px]'>If you are struggling to verify credentials, email {Admin.EMAIL} for support</p>
    </Modal>
  )
}

export default CredentialsModal
