import Image from 'next/image'

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
} from '../components/Typography'
import Button from '../components/Button'
import NavigationItem from '../components/NavigationItem'

export default function DesignSystem() {

  const demoButtonClickEvent = () => {console.log('Button Clicked')}

  const renderLargeSwatches = () => (
    [
    'bg-blue',,
    'bg-yellow',
    'bg-lightBlue',
    'bg-aquamarine',
    ].map( swatch => (
      <div key={swatch} className={`${swatch} w-full h-36 rounded-2xl`}>
         <Body1Regular>{swatch.split('-')[1]}</Body1Regular>
      </div>
    ))
  )
  const renderMediumSwatches = () => (
    [
    'bg-orange',
    'bg-red',
    'bg-green',
    'bg-purple',
    'bg-pink',
    ].map( swatch => (
      <div key={swatch} className={`${swatch} w-full h-8 rounded-xl`}>
         <Body1Regular>{swatch.split('-')[1]}</Body1Regular>
      </div>
    ))
  )
  const renderSmallSwatches = () => (
    [
    'bg-grey-900',
    'bg-grey-800',
    'bg-grey-700',
    'bg-grey-600',
    'bg-grey-500',
    'bg-grey-400',
    'bg-grey-300',
    'bg-grey-200',
    'bg-grey-100',
    ].map( (swatch, index) => (
      <div key={swatch} className={`${swatch} w-full h-12`}>
         <Body1Regular>{swatch.split('-')[2]}</Body1Regular>
      </div>
    ))
  )

  const sectionClass: string = 'w-full p-12' // An idea for component-only repetition.

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


        <section className={sectionClass}>
          <Heading2>Buttons</Heading2>
          <div className='grid grid-cols-2 gap-4 pt-4 items-center'>
            <div className='flex flex-col'>
              <Heading6Title>PRIMARY</Heading6Title>
              <div className='pb-8'>
                <div className='flex gap-2 py-4'>
                  <button className='w-[120px] h-[38px] px-3 bg-blue font-heading text-white font-semibold text-2xs rounded-[10px]'>Primary Button</button>
                  <button className='w-[120px] h-[38px] bg-white font-heading text-blue font-semibold text-2xs rounded-[10px]'>Primary Button</button>
                  <button className='w-[120px] h-[38px] bg-transparent font-heading text-blue border border-blue font-semibold text-2xs rounded-[10px]'>Primary Button</button>
                </div>
                <button className='w-full h-[38px] bg-blue font-heading text-white font-semibold sel-c text-2xs rounded-[10px] '>Full Width Button</button>
              </div>
              <div className='pb-8'>
                <Heading6Title>SECONDARY</Heading6Title>
                <div className='flex gap-4 py-4'>
                  <button className='w-[120px] h-[38px] bg-transparent font-heading text-red border border-red font-semibold text-2xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[38px] px-3 bg-grey-900/50 font-heading text-white font-semibold text-2xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[38px] bg-grey-200 font-heading text-grey-700 font-semibold text-2xs rounded-[10px]'>Secondary</button>
                </div>
                <div className='flex gap-4 py-4'>
                  <button className='w-[120px] h-[38px] font-heading text-grey-700 border border-grey-300 font-semibold text-2xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[38px] px-3 bg-white font-heading text-grey-700 font-medium text-2xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[38px] bg-grey-200 font-heading text-grey-700 font-medium text-2xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[38px] font-heading text-grey-700 border border-grey-300 font-regular text-sm rounded-[10px]'>Secondary</button>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <Heading6Title>SMALL PRIMARY</Heading6Title>
              <div className='pb-8'>
                <div className='flex gap-2 py-4'>
                  <button className='w-[120px] h-[28px] px-3 bg-blue font-heading text-white font-semibold text-3xs rounded-[10px]'>Primary Button</button>
                  <button className='w-[120px] h-[28px] bg-white font-heading text-blue font-semibold text-3xs rounded-[10px]'>Primary Button</button>
                  <button className='w-[120px] h-[28px] bg-transparent font-heading text-blue border border-blue font-semibold text-3xs rounded-[10px]'>Primary Button</button>
                </div>
                <button className='w-full h-[28px] bg-blue font-heading text-white font-semibold sel-c text-3xs rounded-[10px] '>Full Width Button</button>
              </div>
              <div className='pb-8'>
                <Heading6Title>SMALL SECONDARY</Heading6Title>
                <div className='flex gap-4 py-4'>
                  <button className='w-[120px] h-[28px] bg-transparent font-heading text-red border border-red font-semibold text-3xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[28px] px-3 bg-grey-900/50 font-heading text-white font-semibold text-3xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[28px] bg-grey-200 font-heading text-grey-700 font-semibold text-3xs rounded-[10px]'>Secondary</button>
                </div>
                <div className='flex gap-4 py-4'>
                  <button className='w-[120px] h-[28px] font-heading text-grey-700 border border-grey-300 font-semibold text-3xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[28px] px-3 bg-white font-heading text-grey-700 font-medium text-3xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[28px] bg-grey-200 font-heading text-grey-700 font-medium text-3xs rounded-[10px]'>Secondary</button>
                  <button className='w-[120px] h-[28px] font-heading text-grey-700 border border-grey-300 font-regular text-2xs tracking-[0px] rounded-[10px]'>Secondary</button>
                </div>
              </div>
            </div>

            <div className='flex flex-col'>
              <Heading6Title>WITH ICON</Heading6Title>
              <div className='pb-8'>
                <div className='flex gap-2 py-4'>
                  <button className='flex items-center justify-center w-[230px] h-[48px] px-3 bg-white font-heading leading-7 text-grey-800 font-semibold text-sm rounded-[10px]'><span className='pr-3 pt-2'><Image src='/images/icon-write.png'alt='' height='19' width='19' /></span><span>Write Message</span></button>
                  <button className='flex items-center h-[38px] px-4 bg-blue font-heading leading-7 tracking-[0.1px] text-white font-semibold text-sm rounded-[10px]'><span className='pr-3 pt-2'><Image src='/images/plus.svg'alt='' height='19' width='19' /></span><span>New</span></button>
                  <button className='flex items-center h-[38px] px-4 bg-grey-200 font-heading leading-7 tracking-[0.1px] text-grey-700 font-semibold text-sm rounded-[10px]'><span className='pr-3 pt-2'><Image src='/images/icon-write.png'alt='' height='19' width='19' /></span><span>New</span></button>
                  <button className='flex items-center justify-center h-[38px] w-[38px] bg-blue rounded-[6.32px]'><Image src='/images/icon-write.png'alt='' height='19' width='19' /></button>
                  <button className='flex items-center justify-center h-[38px] w-[38px] border border-red font-heading rounded-[6.32px]'><span className='pt-2'><Image src='/images/icon-write.png'alt='' height='19' width='19' /></span></button>
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
          <div className='grid grid-cols-2 gap-4 p-4 items-center'>
            <div className='flex flex-col'>
              <Heading6Title>ONBOARDING 1</Heading6Title>
              <div className='relative'>
                <label className='absolute top-[-8px] left-[10px] px-1 dark:bg-grey-800 text-xs text-lightBlue bg-inherit'>First Name</label>
                <input type='name' className='w-[240px] h-[48px] border border-lightBlue bg-transparent rounded-[10px]'></input>
              </div>

              </div>
            <div className='flex flex-col'>
              <Heading6Title>ONBOARDING 2</Heading6Title>
            </div>
            <div className='flex flex-col'>
              <Heading6Title>EMAIL FORM</Heading6Title>
              Drop downs here
            </div>
            <div className='flex flex-col'>
              <Heading6Title>SEARCH FORM</Heading6Title>
              Search here
            </div>
          </div>
        </section>


        <section className={sectionClass}>
          <Heading2>Menu</Heading2>
          <div className='flex flex-col gap-4 p-4'>
              <Heading6Title>SIDE MENU</Heading6Title>
            <div className='grid grid-cols-3'>
              <NavigationItem path='/style-guide' iconPath='/images/plus.svg' label='Example Nav Item' />
            </div>
          </div>
          <div className='flex flex-col gap-4 p-4'>
              <Heading6Title>SUB MENU</Heading6Title>
            <div className='grid grid-cols-3'>
              <NavigationItem path='/style-guide' iconPath='/images/plus.svg' label='Example Nav Item' />
            </div>
          </div>
          <div className='flex flex-col gap-4 p-4'>
              <Heading6Title>NAV MENU</Heading6Title>
            <div className='grid grid-cols-3'>
              <NavigationItem path='/style-guide' iconPath='/images/plus.svg' label='Style Guide' />
              <NavigationItem path='/asset-comparator' iconPath='/images/icon-write.svg' label='Asset Comparator' />
            </div>
          </div>
        </section>












{/* 
        <section className={sectionClass}>
        <Heading3 styles='text-center text-2xl'>Buttons</Heading3>
          <Body1Regular styles='text-grey-500'>Could be a Button component as per Bink Web with different styles as shown below:</Body1Regular>
            <Heading2>Large</Heading2>
            <Button handleClick={demoButtonClickEvent} large>View In Django</Button>
            <Heading2>Small</Heading2>
            <Button handleClick={demoButtonClickEvent} small>Load assets</Button>
            <Heading2>Icon</Heading2>
            <Button handleClick={demoButtonClickEvent} icon>
              <Image src='/images/refresh.png'alt='' height='20' width='27' />
            </Button> 
            <Heading2>Circular</Heading2>
            <div className='flex gap-2'>
              <Button handleClick={demoButtonClickEvent} circular>
                <Image src='/images/left-chevron.png' alt='back' width='25' height='25'/>
              </Button>
              <Button handleClick={demoButtonClickEvent} circular>
                <Image src='/images/left-chevron.png' alt='forward' width='25' height='25' className='rotate-180'/>
              </Button>
            </div>
            <Heading2>Navigation Menu Item</Heading2>
            
              <button className='flex items-center w-60 h-12 bg-primaryGreen/12 text-primaryGreen font-semibold rounded-xl'>
                <span className='px-3 pt-2'><Image src='/images/menu-assets.png'alt='' height='18' width='23' /></span><span>Asset comparator</span>
              </button>
            
            <Heading2>Environment Selection Buttons</Heading2>
            <div className='flex gap-2'>
              <Button handleClick={demoButtonClickEvent} develop>D</Button> 
              <Button handleClick={demoButtonClickEvent} staging>S</Button> 
              <Button handleClick={demoButtonClickEvent} sandbox>S</Button> 
              <Button handleClick={demoButtonClickEvent} production>D</Button> 
              
            </div>
        </section>

        <section className={sectionClass}>
        <Heading2 styles='text-center text-2xl'>Environment Labels</Heading2>
          <Body1Regular>Not intended to be buttons, not sure if they are reusable so will leave as is for now:</Body1Regular>
          <ul className='flex flex-col gap-2'>
            <li><div className='w-52 h-7 bg-envDevBg text-envDevFg leading-7 border border-envDevFg rounded-md text-center font-bold'>DEVELOPMENT</div></li>
            <li><div className='w-52 h-7 bg-envStagingBg text-envStagingFg leading-7 border border-envStagingFg rounded-md text-center font-bold'>STAGING</div></li>
            <li><div className='w-52 h-7 bg-envSandboxBg text-envSandboxFg leading-7 border border-envSandboxFg rounded-md text-center font-bold'>SANDBOX</div></li>
            <li><div className='w-52 h-7 bg-envProdBg text-envProdFg leading-7 border border-envProdFg rounded-md text-center font-bold'>PRODUCTION</div></li>
          </ul>
        </section> */}
    </div>
  )
}
