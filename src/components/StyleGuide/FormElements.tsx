
import {useState} from 'react'

import {Heading2, Heading6Title, Heading7Medium} from 'components/Text'
import TextInputGroup from 'components/TextInputGroup'


import EmailSvg from 'images/icons/email.svg'
import ProfileSvg from 'images/icons/profile.svg'
import SearchSvg from 'images/icons/search.svg'


export default function FormElements ({sectionClass}) {

  const [textFieldValue, setTextFieldValue] = useState('')

  return (
    <>
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
            <div className='grid grid-cols-2 gap-6'>
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
    </>
  )
}
