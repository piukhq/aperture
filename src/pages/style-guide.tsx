import Colours from 'components/StyleGuide/Colours'

import {
  Heading0,
  Heading2,
  Heading6Title,
  Heading7Medium,
} from 'components/Typography'

import NavigationItem from 'components/NavigationItem'
import TextInputGroup from 'components/TextInputGroup'
import {useState} from 'react'
import Button from 'components/Button'


import DashboardSvg from 'images/icons/dashboard.svg'
import ArrowDownSvg from 'images/icons/arrow-down.svg'
import WriteSvg from 'images/icons/write.svg'
import PlusSvg from 'images/icons/plus.svg'
import TrashSvg from 'images/icons/trash.svg'
import SearchSvg from 'images/icons/search.svg'
import SettingsSvg from 'images/icons/settings.svg'
import EmailSvg from 'images/icons/email.svg'
import ProfileSvg from 'images/icons/profile.svg'
import Typography from 'components/StyleGuide/Typography'


export default function StyleGuide () {


  const [textFieldValue, setTextFieldValue] = useState('')

  const sectionClass = 'min-w-[1200px] w-full bg-grey-100 dark:bg-grey-850 p-12 flex flex-col gap-6 mb-12'

  return (
    <div className='m-4'>
      <Heading0>Style Guide</Heading0>
      <Colours />
      <Typography sectionClass={sectionClass}/>


      <section className={sectionClass}>
        <Heading2>Buttons</Heading2>
        <div className='grid grid-cols-2 gap-4 pt-4 items-center'>
          <div className='flex flex-col'>
            <Heading6Title>PRIMARY</Heading6Title>
            <div className='pb-8'>
              <div className='flex gap-2 py-4'>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.BLUE}
                  labelColour={Button.labelColour.WHITE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Primary Button
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.WHITE}
                  labelColour={Button.labelColour.BLUE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Primary Button
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  borderColour={Button.borderColour.BLUE}
                  labelColour={Button.labelColour.BLUE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Primary Button
                </Button>
              </div>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.FULL}
                buttonBackground={Button.buttonBackground.BLUE}
                labelColour={Button.labelColour.WHITE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
            </div>
            <div className='pb-8'>
              <Heading6Title>SECONDARY</Heading6Title>
              <div className='flex gap-4 py-4'>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  borderColour={Button.borderColour.RED}
                  labelColour={Button.labelColour.RED}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.DARK_GREY}
                  labelColour={Button.labelColour.WHITE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.LIGHT_GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
              </div>
              <div className='flex gap-4 py-4'>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.LIGHT_GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.WHITE}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.MEDIUM}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.LIGHT_GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.MEDIUM}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM_BODY_FONT}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  borderColour={Button.borderColour.GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.REGULAR}
                > Secondary
                </Button>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <Heading6Title>SMALL PRIMARY</Heading6Title>
            <div className='pb-8'>
              <div className='flex gap-2 py-4'>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.BLUE}
                  labelColour={Button.labelColour.WHITE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Primary Button
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.WHITE}
                  labelColour={Button.labelColour.BLUE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Primary Button
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  borderColour={Button.borderColour.BLUE}
                  labelColour={Button.labelColour.BLUE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Primary Button
                </Button>
              </div>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.FULL}
                buttonBackground={Button.buttonBackground.BLUE}
                labelColour={Button.labelColour.WHITE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
            </div>
            <div className='pb-8'>
              <Heading6Title>SMALL SECONDARY</Heading6Title>
              <div className='flex gap-4 py-4'>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  borderColour={Button.borderColour.RED}
                  labelColour={Button.labelColour.RED}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.DARK_GREY}
                  labelColour={Button.labelColour.WHITE}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.LIGHT_GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
              </div>
              <div className='flex gap-4 py-4'>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.LIGHT_GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.SEMIBOLD}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.WHITE}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.MEDIUM}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  buttonBackground={Button.buttonBackground.LIGHT_GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.MEDIUM}
                > Secondary
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.SMALL_BODY_FONT}
                  buttonWidth={Button.buttonWidth.MEDIUM}
                  borderColour={Button.borderColour.GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.REGULAR}
                > Secondary
                </Button>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <Heading6Title>WITH ICON [Some icons may differ as not found]</Heading6Title>
            <div className='pb-8'>
              <div className='flex gap-2 py-4'>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.LARGE}
                  buttonWidth={Button.buttonWidth.LARGE}
                  buttonBackground={Button.buttonBackground.WHITE}
                  labelColour={Button.labelColour.GREY}
                  svgIcon={<WriteSvg/>}
                > Write Message
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM_ICON}
                  buttonWidth={Button.buttonWidth.ICON_TEXT}
                  buttonBackground={Button.buttonBackground.BLUE}
                  labelColour={Button.labelColour.WHITE}
                  labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
                  svgIcon={<PlusSvg/>}
                > New
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM_ICON}
                  buttonWidth={Button.buttonWidth.ICON_TEXT}
                  buttonBackground={Button.buttonBackground.LIGHT_GREY}
                  labelColour={Button.labelColour.GREY}
                  labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
                  svgIcon={<PlusSvg fill='#b5b5be'/>}
                > New
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM_ICON}
                  buttonWidth={Button.buttonWidth.ICON_ONLY}
                  buttonBackground={Button.buttonBackground.BLUE}
                  labelColour={Button.labelColour.WHITE}
                  svgIcon={<SettingsSvg/>}
                />
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM_ICON}
                  buttonWidth={Button.buttonWidth.ICON_ONLY}
                  borderColour={Button.borderColour.RED}
                  labelColour={Button.labelColour.RED}
                  svgIcon={<TrashSvg/>}
                >
                </Button>

              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <Heading6Title>TAG</Heading6Title>
            <div className='pb-8'>
              <div className='flex gap-2 py-4'>
                <div className='flex items-center justify-center h-[28px] px-6 bg-grey-200 font-heading text-grey-700 font-medium text-4xs rounded-[5px]'>Tag</div>
                <div className='flex items-center justify-center h-[28px] px-6 bg-grey-800 font-heading text-grey-100 font-regular text-4xs border border-grey-500 rounded-[5px]'>Tag</div>
                <div className='flex items-center justify-center h-[28px] px-6 bg-blue/10 font-heading text-blue font-regular text-4xs rounded-[5px]'>Tag</div>
              </div>
            </div>
          </div>
        </div>

      </section>


      <section className={sectionClass}>
        <Heading2>Form - Desktop</Heading2>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <div className='flex flex-col gap-8'>
            <Heading6Title>ONBOARDING 1</Heading6Title>
            <TextInputGroup
              name='firstName'
              label='First Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='email'
              label='Your Email / Username'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='email'
              label='Your Email / Username'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.GREY}
            />
            <TextInputGroup
              name='email'
              label='Enter Password'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.PASSWORD}
              inputStyle={TextInputGroup.inputStyle.FULL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.RED}
            />
            <Heading6Title>ONBOARDING 3</Heading6Title>
            <TextInputGroup
              name='email'
              label='Enter Email'
              value={textFieldValue}
              placeholder='Your Email'
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<EmailSvg/>}
            />
            <TextInputGroup
              name='email error'
              label='Enter Email'
              value={textFieldValue}
              error='Wrong ID'
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<EmailSvg/>}
            />
            <TextInputGroup
              name='Short Name'
              label='Short Name'
              value={textFieldValue}
              placeholder='First Name'
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='email error'
              label='Enter Email'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.PASSWORD}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.GREEN}
              svgIcon={<EmailSvg/>}
            />

          </div>
          <div className='flex flex-col gap-8'>
            <Heading6Title>ONBOARDING 2</Heading6Title>
            <TextInputGroup
              name='Mail Address'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Password'
              label='Password'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.PASSWORD}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.DARK_GREY}
              svgIcon={<ProfileSvg/>}
            />
          </div>
          <div className='flex flex-col gap-6'>
            <Heading6Title>EMAIL FORM</Heading6Title>
            <TextInputGroup
              name='Search Emails'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.DARK_GREY}
            />
            <TextInputGroup
              name='Search Emails'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='Search Emails'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_SMALL_LABEL_HIDDEN}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.DARK_GREY}
            />
            <TextInputGroup
              name='Search Emails'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_SMALL_LABEL_HIDDEN}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
          </div>
          <div className='flex flex-col gap-6'>
            <Heading6Title>SEARCH FORM</Heading6Title>
            <div className='grid grid-cols-2'>
              <TextInputGroup
                name='Search'
                label='Search'
                placeholder='Search...'
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                inputType={TextInputGroup.inputType.SEARCH}
                inputStyle={TextInputGroup.inputStyle.WHITE_ICON_LEFT_SMALL}
                inputWidth={TextInputGroup.inputWidth.MEDIUM}
                inputColour={TextInputGroup.inputColour.LIGHT_GREY}
                svgIcon={<SearchSvg/>}
              />
              <TextInputGroup
                name='Search'
                label='Search'
                placeholder='Search'
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                inputType={TextInputGroup.inputType.SEARCH}
                inputStyle={TextInputGroup.inputStyle.WHITE_ICON_RIGHT_SMALL}
                inputWidth={TextInputGroup.inputWidth.MEDIUM}
                inputColour={TextInputGroup.inputColour.LIGHT_GREY}
                svgIcon={<SearchSvg/>}
              />
              <Heading7Medium>[Skipping - due to content needed]</Heading7Medium>
              <TextInputGroup
                name='Search'
                label='Search'
                placeholder='Search...'
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                inputType={TextInputGroup.inputType.SEARCH}
                inputStyle={TextInputGroup.inputStyle.TRANSPARENT_ICON_LEFT_SMALL}
                inputWidth={TextInputGroup.inputWidth.MEDIUM}
                inputColour={TextInputGroup.inputColour.LIGHT_GREY}
                svgIcon={<SearchSvg/>}
              />
            </div>
            <TextInputGroup
              name='Search'
              label='Search'
              placeholder='Search...'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.SEARCH}
              inputStyle={TextInputGroup.inputStyle.WHITE_ICON_RIGHT}
              inputWidth={TextInputGroup.inputWidth.FULL}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<SearchSvg/>}
            />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <Heading2>Form - Mobile</Heading2>
        <div className='grid grid-cols-3 gap-2 p-2'>
          <div className='flex flex-col gap-6'>
            <Heading6Title>ONBOARDING MOBILE 1</Heading6Title>
            <TextInputGroup
              name='Mail Address'
              label='Mail Address'
              placeholder='Mail Address'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL_SMALL_LABEL_HIDDEN}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
            />
            <TextInputGroup
              name='Your Email/ Username'
              label='Your Email/ Username'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='Enter Password'
              label='Enter Password'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.PASSWORD}
              inputStyle={TextInputGroup.inputStyle.FULL_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.RED}
            />
          </div>
          <div className='flex flex-col gap-6'>
            <Heading6Title>ONBOARDING MOBILE 2</Heading6Title>
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Password'
              label='Password'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.PASSWORD}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<EmailSvg/>}
            />
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.DARK_GREY}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.RED}
              svgIcon={<ProfileSvg/>}
            />
          </div>
          <div className='flex flex-col gap-6'>
            <Heading6Title>ONBOARDING MOBILE 3</Heading6Title>
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              placeholder='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              placeholder='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Full Name'
              label='Full Name'
              placeholder='Full Name'
              error='Wrong ID'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.RED}
              svgIcon={<ProfileSvg/>}
            />
            <TextInputGroup
              name='Password'
              label='Password'
              placeholder='Password'
              error='Wrong ID'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.PASSWORD}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.GREEN}
              svgIcon={<EmailSvg/>}
            />
          </div>
        </div>
      </section>


      {/* Font Weights here are different to abstract but visually match */}
      <section className={sectionClass}>
        <Heading2>Menu</Heading2>
        <div className='flex flex-col gap-4'>
          <Heading6Title>SIDE MENU</Heading6Title>
          <div className='grid grid-cols-3 gap-4'>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-medium text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-900 dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu</span>
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base text-sm tracking-[0.1px] text-white bg-blue'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu</span>
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-medium text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-blue dark:border-l-white'><DashboardSvg /></span>
              <span className='col-span-7 text-left'>Menu</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-2 rounded-full bg-red font-body text-sm p-1 text-white px-1'>3</span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-semibold text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-grey-100 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-blue dark:border-l-white'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu Active</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-semibold font-base text-sm tracking-[0.1px] text-white bg-blue'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu Active</span>
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center'><DashboardSvg /></span>
              <span className='col-span-7 text-left '>Menu</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-2 rounded-full bg-red font-body text-sm p-1 text-white'>3</span>
            </button>

          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Heading6Title>SUB MENU</Heading6Title>
          <div className='grid grid-cols-3 gap-4'>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-900 dark:text-grey-500  hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full font-body text-sm pr-6 text-right text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-white/50 dark:text-grey-500 bg-blue hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-300'>102</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-900 dark:text-grey-500  hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 text-red text-3xl border-l-transparent'>&bull;</span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu Active</span>
              <span className='col-span-2 rounded-full font-body text-sm pr-6 text-right text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-grey-100 dark:text-grey-500 bg-blue hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu Active</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-300'>102</span>
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Heading6Title>PEOPLE & GROUP</Heading6Title>
          <div className='grid grid-cols-1'>
            <Heading7Medium>[Not Implemented]</Heading7Medium>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Heading6Title>NAV MENU</Heading6Title>
          <div className='grid grid-cols-1 gap-4'>
            <button className='grid place-content-center w-[147px] h-[70px] font-heading font-medium text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-800 dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='w-[110px] h-[70px] flex items-center gap-1 border-t-4 border-t-transparent'><SearchSvg className='scale-75' />Schedule</span>
            </button>
            <button className='grid place-content-center w-[147px] h-[70px] font-heading font-semibold text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-white'>
              <span className='w-[110px] h-[70px] flex items-center gap-1 border-t-[3px] border-t-blue dark:border-t-white'><DashboardSvg className='scale-75' />Dashboard</span>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col gap-4'>
            <Heading6Title>NAV MENU [Extra Design]</Heading6Title>
            <div className='flex flex-col gap-4'>
              <NavigationItem
                path='/style-guide'
                label='Style Guide'
                svgIcon={<DashboardSvg/>}
              />
              <NavigationItem
                path='/'
                label='Home'
                svgIcon={<DashboardSvg/>}
              />
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <Heading6Title>USER PROFILE</Heading6Title>
            <div className='flex flex-col gap-4'>
              <Heading7Medium>[Not Implemented]</Heading7Medium>
            </div>
          </div>
        </div>
      </section>


      <section className={sectionClass}>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <div className='flex flex-col gap-8'>
            <Heading2>Tab Menu</Heading2>
            <div className='grid grid-cols-3 gap-4'>
              <button className='grid place-content-center w-[80px] h-[50px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <span className='flex items-center gap-3 border-b-4 border-b-transparent'>Jobs</span>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-transparent font-heading tracking-[0.1px] bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-sm font-normal text-grey-700 tracking-[0.2px] dark:text-grey-100'>Likes</p>
                <p className='text-base font-medium text-grey-900 tracking-[.1px] dark:text-grey-100'>12,2K</p>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-transparent font-heading tracking-[0.1px] bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-base font-medium text-grey-900 tracking-[.1px] dark:text-grey-100'>12,2K</p>
                <p className='text-sm font-normal  text-grey-700 tracking-[0.2px] dark:text-grey-100'>Likes</p>
              </button>


              <button className='grid gap-1 place-content-center w-[80px] h-[50px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <span className='place-content-center flex w-[60px] h-[50px] items-center gap-3 border-b-4 border-b-blue'>Home</span>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-blue font-heading tracking-[0.1px]  text-blue bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-sm font-normal  tracking-[0.2px] dark:text-grey-100'>Posts</p>
                <p className='text-base font-medium tracking-[.1px] dark:text-grey-100'>10,3K</p>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-blue font-heading tracking-[0.1px]  text-blue bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-base font-medium tracking-[.1px] dark:text-grey-100'>10,3K</p>
                <p className='text-sm font-normal  tracking-[0.2px] dark:text-grey-100'>Posts</p>
              </button>

            </div>
          </div>
          <div className='flex flex-col gap-8'>
            <Heading2>Badge</Heading2>
            <Heading7Medium>[Skipped - No imminent use case]</Heading7Medium>
          </div>
        </div>
      </section>


      <section className={sectionClass}>
        <Heading2>Tag & Status</Heading2>
        <div className='grid grid-cols-5 gap-4'>
          <div className='flex flex-col gap-4 p-4'>
            <Heading6Title>SKILL</Heading6Title>
            <Heading6Title>Not implemented</Heading6Title>

          </div>
          <div className='flex flex-col gap-4 p-4'>
            <Heading6Title>STATUS 1</Heading6Title>
            <div className='h-[26px] w-[82px] bg-aquamarine/10'>
              <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-aquamarine dark:text-grey-100 text-center'}>
               Completed
              </p>
            </div>
            <div className='h-[26px] w-[82px] bg-lightBlue/10'>
              <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-lightBlue dark:text-grey-100 text-center'}>
               For Pickup
              </p>
            </div>
            <div className='h-[26px] w-[82px] bg-yellow/10'>
              <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-yellow dark:text-grey-100 text-center'}>
               It&lsquo;s Enough
              </p>
            </div>
            <div className='h-[26px] w-[82px] bg-red/10'>
              <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-red dark:text-grey-100 text-center'}>
               Declined
              </p>
            </div>


          </div>
          <div className='flex flex-col gap-4 p-4'>
            <Heading6Title>PAGINATION</Heading6Title>
            <div className='h-[24px] w-[9px] bg-lightBlue/10'>
              <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-blue dark:text-grey-100 text-center'}>
               1
              </p>
            </div>
            <div className='h-[24px] w-[9px] items-center'>
              <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-grey-500  dark:text-grey-100 text-center'}>
               1
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-4 p-4'>
            <Heading6Title>ENVIRONMENT</Heading6Title>
            <div className='flex items-center justify-center bg-aquamarine rounded-[10px] h-[38px] w-[129px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Develop</p>
            </div>
            <div className='flex items-center justify-center bg-yellow rounded-[10px] h-[38px] w-[129px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Staging</p>
            </div>
            <div className='flex items-center justify-center bg-lightBlue rounded-[10px] h-[38px] w-[129px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Sandbox</p>
            </div>
            <div className='flex items-center justify-center bg-red rounded-[10px] h-[38px] w-[129px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Production</p>
            </div>
          </div>
          <div className='flex flex-col gap-4 p-4'>
            <Heading6Title>STATUS 2</Heading6Title>
            <div className='flex items-center justify-center border border-lightBlue text-lightBlue rounded-[10px] h-[38px] w-[93px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Verified</p>
            </div>
            <div className='flex items-center justify-center border border-yellow text-yellow rounded-[10px] h-[38px] w-[93px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Pending</p>
            </div>
            <div className='flex items-center justify-center border border-grey-600 text-grey-600 rounded-[10px] h-[38px] w-[93px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Unverified</p>
            </div>
            <div className='flex items-center justify-center border border-red text-red rounded-[10px] h-[38px] w-[93px]'>
              <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Failed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
