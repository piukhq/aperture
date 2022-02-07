import Button from 'components/Button'
import Modal from 'components/Modal'
import Tag from 'components/Tag'
import TextInputGroup from 'components/TextInputGroup'
import {isValidEmail, isValidPassword} from 'utils/validation'
import {useState} from 'react'

import {usePostLoginQuery} from 'features/apiSlice'

const loginDetails:any = {
  email: 'lk_test1@bink.com',
  password: 'Portals1',
  client_id: 'kudr77sTA0t5cvleNquOFUMHl68NMcqoCqRWrjlc3ZO60NFI3s',
  bundle_id: 'com.bink.portal.internal',
}

const CredentialsModal = () => {
  const {
    data: loginResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = usePostLoginQuery(JSON.parse(JSON.stringify(loginDetails)))

  const [emailValue, setEmailValue] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [passwordValue, setPasswordValue] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  if (isLoading) {
    console.log('Loading')
  } else if (isSuccess) {
    console.log(loginResponse)
  } else if (isError) {
    console.log(error)
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
    if (!isValidEmail(emailValue)) {
      emailValue.length === 0 ? setEmailError('Enter email') : setEmailError('Enter valid email')
    }
    if (!isValidPassword(passwordValue)) {
      setPasswordError('Enter password')
    }
    if (isValidEmail(emailValue) && isValidPassword(passwordValue)) {
      postCredentials()
    }
  }

  const postCredentials = async () => { // Placeholder for future functionality
    console.log(`Valid Credentials : Email: ${emailValue} Password: ${passwordValue}`)
    // await
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
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.GREY_OUTLINE} label='Unverified' />
        </div>
        <div className='flex justify-between py-[27px]'>
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.YELLOW_FILLED} label={'Staging'}/>
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.GREY_OUTLINE} label='Unverified' />
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
