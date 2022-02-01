import {useState} from 'react'

import TextInputGroup from 'components/TextInputGroup'
import EmailSvg from 'icons/svgs/email.svg'
import ProfileSvg from 'icons/svgs/profile.svg'
import SearchSvg from 'icons/svgs/search.svg'


type Props = {
  sectionClass: string,
}

const FormElements = ({sectionClass}: Props) => {

  const [textFieldValue, setTextFieldValue] = useState('')

  return (
    <>
      <section className={sectionClass}>
        <h2 className='font-heading-2'>Form - Desktop</h2>
        <p className='font-body-1'>A number of elements are missing from the Abstract here. </p>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <div className='flex flex-col gap-8'>
            <h4 className='font-heading-6 text-grey-600'>ONBOARDING 1</h4>
            <TextInputGroup
              name='desktop-1'
              label='First Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='desktop-2'
              label='Your Email / Username'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='desktop-3'
              label='Your Email / Username'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.GREY}
            />
            <form action=''>
              <TextInputGroup
                name='desktop-4'
                label='Enter Password'
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                inputType={TextInputGroup.inputType.PASSWORD}
                inputStyle={TextInputGroup.inputStyle.FULL}
                inputWidth={TextInputGroup.inputWidth.LARGE}
                inputColour={TextInputGroup.inputColour.RED}
              />
            </form>
            <h4 className='font-heading-6 text-grey-600'>ONBOARDING 3</h4>
            <TextInputGroup
              name='desktop-5'
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
              name='desktop-6'
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
              name='desktop-7'
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
              name='error-email-2'
              label='Enter Email'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.GREEN}
              svgIcon={<EmailSvg/>}
            />
          </div>
          <div className='flex flex-col gap-8'>
            <h4 className='font-heading-6 text-grey-600'>ONBOARDING 2</h4>
            <TextInputGroup
              name='desktop-8'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<ProfileSvg/>}
            />
            <form action=''>
              <TextInputGroup
                name='desktop-9'
                label='Password'
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                inputType={TextInputGroup.inputType.PASSWORD}
                inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT}
                inputWidth={TextInputGroup.inputWidth.LARGE}
                inputColour={TextInputGroup.inputColour.LIGHT_GREY}
                svgIcon={<ProfileSvg/>}
              />
            </form>
            <TextInputGroup
              name='desktop-10'
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
            <h4 className='font-heading-6 text-grey-600'>EMAIL FORM</h4>
            <TextInputGroup
              name='desktop-11'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              placeholder='All Emails'
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.DARK_GREY}
            />
            <TextInputGroup
              name='desktop-12'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              placeholder='All Emails'
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='desktop-13'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              placeholder='All Emails'
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_SMALL_LABEL_HIDDEN}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.DARK_GREY}
            />
            <TextInputGroup
              name='desktop-14'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              placeholder='All Emails'
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_SMALL_LABEL_HIDDEN}
              inputWidth={TextInputGroup.inputWidth.LARGE}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
          </div>
          <div className='flex flex-col gap-6'>
            <h4 className='font-heading-6 text-grey-600'>SEARCH FORM</h4>
            <div className='grid grid-cols-2 gap-6'>
              <TextInputGroup
                name='desktop-15'
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
                name='desktop-16'
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
              <p className='font-heading-7 font-medium'>[Skipping - due to context needed]</p>
              <TextInputGroup
                name='desktop-17'
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
              name='desktop-18'
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
        <h2 className='font-heading-2'>Form - Mobile</h2>
        <div className='grid grid-cols-3 gap-2 p-2'>
          <div className='flex flex-col gap-6'>
            <h4 className='font-heading-6 text-grey-600'>ONBOARDING MOBILE 1</h4>
            <TextInputGroup
              name='mobile-1'
              label='Search'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.SELECT}
              inputStyle={TextInputGroup.inputStyle.WHITE_ICON_RIGHT}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              placeholder='Your Country'
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <TextInputGroup
              name='mobile-2'
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
              name='mobile-3'
              label='Your Email/ Username'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.FULL_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
            />
            <form action=''>
              <TextInputGroup
                name='mobile-4'
                label='Enter Password'
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                inputType={TextInputGroup.inputType.PASSWORD}
                inputStyle={TextInputGroup.inputStyle.FULL_SMALL}
                inputWidth={TextInputGroup.inputWidth.MEDIUM}
                inputColour={TextInputGroup.inputColour.RED}
              />
            </form>
          </div>
          <div className='flex flex-col gap-6'>
            <h4 className='font-heading-6 text-grey-600'>ONBOARDING MOBILE 2</h4>
            <TextInputGroup
              name='mobile-5'
              label='Full Name'
              value={textFieldValue}
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.LIGHT_GREY}
              svgIcon={<ProfileSvg/>}
            />
            <form action=''>
              <TextInputGroup
                name='mobile-6'
                label='Password'
                value={textFieldValue}
                onChange={event => setTextFieldValue(event.target.value)}
                inputType={TextInputGroup.inputType.PASSWORD}
                inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_RIGHT_SMALL}
                inputWidth={TextInputGroup.inputWidth.MEDIUM}
                inputColour={TextInputGroup.inputColour.LIGHT_GREY}
                svgIcon={<EmailSvg/>}
              />
            </form>
            <TextInputGroup
              name='mobile-7'
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
              name='mobile-8'
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
              name='mobile-13'
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
            <h4 className='font-heading-6 text-grey-600'>ONBOARDING MOBILE 3</h4>
            <TextInputGroup
              name='mobile-9'
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
              name='mobile-10'
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
              name='mobile-11'
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
            <form action=''>
              <TextInputGroup
                name='mobile-12'
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
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default FormElements
