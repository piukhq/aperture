import Button from 'components/Button'
import Tag from 'components/Tag'
import TextInputGroup from 'components/TextInputGroup'
import type {NextPage} from 'next'
import {useState} from 'react'

const ModalTestPage: NextPage = () => {

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  return (
    <>
      <div className='w-[750px] h-[780px] p-[70px] m-24 bg-white dark:bg-grey-850'>

        <h1 className='font-heading-4 mb-[30px]'>Enter Environment Credentials</h1>
        <form className='flex flex-col gap-[20px]'>
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
            handleClick={() => console.log(`Email: ${emailValue} Password: ${passwordValue}`)}
            buttonSize={Button.buttonSize.LARGE}
            buttonWidth={Button.buttonWidth.FULL}
            buttonBackground={Button.buttonBackground.BLUE}
            labelColour={Button.labelColour.WHITE}
            labelWeight={Button.labelWeight.SEMIBOLD}
          > Primary Button
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
      </div>
    </>
  )
}

export default ModalTestPage
