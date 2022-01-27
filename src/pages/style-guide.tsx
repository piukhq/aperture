import {
  Heading0,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6Semibold,
  Heading6Title,
  Heading6Medium,
  Heading7Semibold,
  Heading7Medium,
  Heading7Strikethrough,
  Heading8,
  Heading9Semibold,
  Heading9Medium,
  Heading10,
  Body1Regular,
  Body1Medium,
  Body2Regular,
  Body2Strikethrough,
  Body2Medium,
  Body3Regular,
  Body3Medium,
  Body3Bold,
  Body4Regular,
  Body4Medium,
  Body4Bold,
  Subheading1Regular,
  Subheading1Medium,
  Subheading2Regular,
  Subheading2Strikethrough,
  Subheading2Medium,
  Subheading3Regular,
  Subheading3Strikethrough,
  Subheading3Medium,
  Subheading4Regular,
  Subheading4Medium,
} from 'components/Typography'

import CheckCircleSvg from 'images/check-circle.svg'
import NavigationItem from 'components/NavigationItem'
import TextInputGroup from 'components/TextInputGroup'
import {useState} from 'react'
import Button from 'components/Button'


import WriteSvg from 'images/icons/write.svg'
import PlusSvg from 'images/icons/plus.svg'


export default function DesignSystem () {

  const [textFieldValue, setTextFieldValue] = useState('')

  const renderLargeSwatches = () => [
    'bg-blue',
    'bg-yellow',
    'bg-lightBlue',
    'bg-aquamarine',
  ].map(swatch => <div key={swatch} className={`${swatch} w-full h-36 rounded-2xl`}>
    <Body1Regular>{swatch.split('-')[1]}</Body1Regular>
  </div>
  )

  const renderMediumSwatches = () => [
    'bg-orange',
    'bg-red',
    'bg-green',
    'bg-purple',
    'bg-pink',
  ].map(swatch => <div key={swatch} className={`${swatch} w-full h-8 rounded-xl`}>
    <Body1Regular>{swatch.split('-')[1]}</Body1Regular>
  </div>
  )

  const renderSmallSwatches = () => [
    'bg-grey-900',
    'bg-grey-800',
    'bg-grey-700',
    'bg-grey-600',
    'bg-grey-500',
    'bg-grey-400',
    'bg-grey-300',
    'bg-grey-200',
    'bg-grey-100',
  ].map((swatch) => <div key={swatch} className={`${swatch} w-full h-12`}>
    <Body1Regular>{swatch.split('-')[2]}</Body1Regular>
  </div>
  )


  const sectionClass = 'w-full p-12 flex flex-col gap-6' // An idea for component-level repetition.

  return (
    <div className='m-4'>
      <Heading0>Style Guide</Heading0>
      <section className={sectionClass}>
        <Heading2>Colours</Heading2>
        <div className='w-full grid gap-4 grid-cols-4 auto-rows-auto'>
          {renderLargeSwatches()}
        </div>
        <div className='w-full grid gap-4 grid-cols-5 auto-rows-auto'>
          {renderMediumSwatches()}
        </div>
        <div className='w-full grid grid-cols-9 auto-rows-auto'>
          {renderSmallSwatches()}
        </div>
      </section>


      <section className={sectionClass}>
        <Heading2>Typography</Heading2>
        <div className='w-full grid gap-12 grid-cols-2'>
          <div>
            <div className='grid grid-cols-2 mb-12 items-center'>
              <p className='text-[80px] font-heading text-grey-900 dark:text-grey-100'>Aa</p>
              <div >
                <Heading7Semibold>PRIMARY FONT</Heading7Semibold>
                <Heading4>Poppins</Heading4>
              </div>
            </div>
            <p className='font-heading text-xl font-medium text-grey-600 dark:text-grey-600 mb-16'>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz<br/>0123456789</p>
            <div>
              <div>
                <Heading6Title>HEADING</Heading6Title>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading0>H0</Heading0>
                <p className= 'text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Bold - 56px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading1>H1</Heading1>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 48px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading2>H2</Heading2>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 36px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading3>H3</Heading3>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 28px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading4>H4</Heading4>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 24px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading5>H5</Heading5>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 18px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading6Semibold>H6</Heading6Semibold>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading6Title>H6 Title</Heading6Title>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading6Medium>H6</Heading6Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading7Semibold>H7</Heading7Semibold>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading7Medium>H7</Heading7Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading7Strikethrough>H7</Heading7Strikethrough>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading8>H8</Heading8>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading9Semibold>H9</Heading9Semibold>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 12px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading9Medium>H9</Heading9Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 12px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Heading10>H10</Heading10>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Semibold - 11px</p>
              </div>
            </div>
          </div>
          <div>

            <div className='grid grid-cols-2 mb-12 items-center'>
              <p className='text-[80px] font-body text-grey-900 dark:text-grey-100'>Aa</p>
              <div >
                <Heading7Semibold>SECONDARY FONT</Heading7Semibold>
                <Heading4>Roboto</Heading4>
              </div>
            </div>
            <p className='font-body text-xl font-medium text-grey-600 dark:text-grey-600 mb-16'>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz<br/>0123456789</p>
            <div>
              <div>
                <Heading6Title>BODY</Heading6Title>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body1Regular>Body 1</Body1Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 18px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body1Medium>Body 1</Body1Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 18px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body2Regular>Body 2</Body2Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body2Strikethrough>Body 2</Body2Strikethrough>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body2Medium>Body 2</Body2Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body3Regular>Body 3</Body3Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body3Medium>Body 3</Body3Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body3Bold>Body 3</Body3Bold>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Bold - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body3Bold>Body 3</Body3Bold>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Bold - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body4Regular>Body 4</Body4Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 12px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body4Medium>Body 4</Body4Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 12px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Body4Bold>Body 4</Body4Bold>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Bold - 12px</p>
              </div>
              <div className='pt-16 pb-12'>
                <Heading6Title>SUBHEADING</Heading6Title>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading1Regular>Subheading 1</Subheading1Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 18px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading1Medium>Subheading 1</Subheading1Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 18px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading2Regular>Subheading 2</Subheading2Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading2Medium>Subheading 2</Subheading2Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading2Strikethrough>Subheading 2</Subheading2Strikethrough>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 16px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading3Regular>Subheading 3</Subheading3Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading3Medium>Subheading 3</Subheading3Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading3Strikethrough>Subheading 3</Subheading3Strikethrough>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 14px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading4Regular>Subheading 4</Subheading4Regular>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Regular - 12px</p>
              </div>
              <div className='grid grid-cols-2 pt-8 items-center'>
                <Subheading4Medium>Subheading 4</Subheading4Medium>
                <p className='text-lg font-body font-normal text-grey-500 dark:text-grey-500'>Medium - 12px</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      <section className={sectionClass}>s
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
            <Heading6Title>WITH ICON</Heading6Title>
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
                  svgIcon={<PlusSvg/>}
                > New
                </Button>
                <Button
                  handleClick={() => console.log('clicked')}
                  buttonSize={Button.buttonSize.MEDIUM_ICON}
                  buttonWidth={Button.buttonWidth.ICON_ONLY}
                  borderColour={Button.borderColour.RED}
                  svgIcon={<CheckCircleSvg/>}
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
              // svgIcon={<CheckCircleSvg/>}
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
              // svgIcon={<CheckCircleSvg/>}
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
              // svgIcon={<CheckCircleSvg/>}
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
              // svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
            />
            <TextInputGroup
              name='Short Name'
              label='Enter Email'
              value={textFieldValue}
              placeholder='First Name'
              onChange={event => setTextFieldValue(event.target.value)}
              inputType={TextInputGroup.inputType.TEXT}
              inputStyle={TextInputGroup.inputStyle.UNDERLINE_ICON_LEFT}
              inputWidth={TextInputGroup.inputWidth.MEDIUM}
              inputColour={TextInputGroup.inputColour.BLUE}
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
                svgIcon={<CheckCircleSvg/>}
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
                svgIcon={<CheckCircleSvg/>}
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
                svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
              svgIcon={<CheckCircleSvg/>}
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
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-500 bg-white hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-white'><CheckCircleSvg /></span>
              <span className='col-span-8 pl-4 text-left'>Menu</span>
              <span className='col-span-2'><CheckCircleSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base text-sm tracking-[0.1px] text-white bg-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'><CheckCircleSvg /></span>
              <span className='col-span-8 pl-4 text-left'>Menu</span>
              <span className='col-span-2'><CheckCircleSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-medium text-sm tracking-[0.1px] text-blue bg-white hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-blue'><CheckCircleSvg /></span>
              <span className='col-span-8 pl-4 text-left'>Menu</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-2 rounded-full bg-red font-body text-sm p-1 text-white px-1'>3</span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-semibold text-sm tracking-[0.1px] text-blue bg-white hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-blue'><CheckCircleSvg /></span>
              <span className='col-span-8 pl-4 text-left'>Menu Active</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-2'><CheckCircleSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-semibold font-base text-sm tracking-[0.1px] text-white bg-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-white'><CheckCircleSvg /></span>
              <span className='col-span-8 pl-4 text-left'>Menu Active</span>
              <span className='col-span-2'><CheckCircleSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 bg-white hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center'><CheckCircleSvg /></span>
              <span className='col-span-8 pl-4 text-left '>Menu</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-2 rounded-full bg-red font-body text-sm p-1 text-white'>3</span>
            </button>

          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Heading6Title>SUB MENU</Heading6Title>
          <div className='grid grid-cols-3 gap-4'>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-grey-900 dark:text-grey-500 bg-white hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full font-body text-sm pr-6 text-right text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-white/50 dark:text-grey-500 bg-blue hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-300'>102</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-grey-900 dark:text-grey-500 bg-white hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 text-red text-3xl border-l-transparent'>&bull;</span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-blue dark:text-grey-500 bg-white hover:text-blue'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu Active</span>
              <span className='col-span-2 rounded-full font-body text-sm pr-6 text-right text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-grey-100 dark:text-grey-500 bg-blue hover:text-blue'>
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
            <button className='grid place-content-center w-[147px] h-[70px] font-heading font-medium text-sm tracking-[0.1px] text-grey-800 bg-white hover:text-blue'>
              <span className='w-[110px] h-[70px] flex items-center gap-3 border-t-4 border-t-transparent'><CheckCircleSvg />Schedule</span>
            </button>
            <button className='grid place-content-center w-[147px] h-[70px] font-heading font-semibold text-sm tracking-[0.1px] text-blue bg-white'>
              <span className='w-[110px] h-[70px] flex items-center gap-3 border-t-[3px] border-t-blue'><CheckCircleSvg />Dashboard</span>
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
                svgIcon={<CheckCircleSvg/>}
              />
              <NavigationItem
                path='/'
                label='Home'
                svgIcon={<CheckCircleSvg/>}
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
              <button className='grid place-content-center w-[80px] h-[50px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 bg-white hover:text-blue'>
                <span className='flex items-center gap-3 border-b-4 border-b-transparent'>Jobs</span>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-transparent font-heading tracking-[0.1px] bg-white hover:text-blue'>
                <p className='text-sm font-normal  text-grey-700 tracking-[0.2px] dark:text-grey-100'>Likes</p>
                <p className='text-base font-medium text-grey-900 tracking-[.1px] dark:text-grey-100'>12,2K</p>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-transparent font-heading tracking-[0.1px] bg-white hover:text-blue'>
                <p className='text-base font-medium text-grey-900 tracking-[.1px] dark:text-grey-100'>12,2K</p>
                <p className='text-sm font-normal  text-grey-700 tracking-[0.2px] dark:text-grey-100'>Likes</p>
              </button>
   



              <button className='grid gap-1 place-content-center w-[80px] h-[50px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 bg-white hover:text-blue'>
                <span className='place-content-center flex w-[60px] h-[50px] items-center gap-3 border-b-4 border-b-blue'>Home</span>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-blue font-heading tracking-[0.1px]  text-blue bg-white hover:text-blue'>
                <p className='text-sm font-normal  tracking-[0.2px] dark:text-grey-100'>Posts</p>
                <p className='text-base font-medium tracking-[.1px] dark:text-grey-100'>10,3K</p>
              </button>

              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-blue font-heading tracking-[0.1px]  text-blue bg-white hover:text-blue'>
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
