import Button from 'components/Button'
import Modal from 'components/Modal'
import Tag from 'components/Tag'
import TextInputGroup from 'components/TextInputGroup'
import {useState} from 'react'


const CredentialsModal = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const submitCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(`Email: ${emailValue} Password: ${passwordValue}`)
  }

  return (
    <Modal modalHeader='Enter Environment Credentials'>
      <form className='flex flex-col gap-[20px]' onSubmit={submitCredentials}>
        <TextInputGroup
          name='credentials-email'
          label='Email'
          value={emailValue}
          onChange={event => setEmailValue(event.target.value)}
          inputType={TextInputGroup.inputType.TEXT}
          inputStyle={TextInputGroup.inputStyle.FULL}
          inputWidth={TextInputGroup.inputWidth.FULL}
          inputColour={TextInputGroup.inputColour.GREY}
        />
        <TextInputGroup
          name='credentials-password'
          label='Password'
          value={passwordValue}
          onChange={event => setPasswordValue(event.target.value)}
          inputType={TextInputGroup.inputType.PASSWORD}
          inputStyle={TextInputGroup.inputStyle.FULL}
          inputWidth={TextInputGroup.inputWidth.FULL}
          inputColour={TextInputGroup.inputColour.GREY}
        />
        <Button
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
