import Image from 'next/image'
import { Headline, Subtitle, LabelText, Sidebar, Hyperlink, Error, Paragraph } from '../components/Typography'
import Button from '../components/Button' // TODO: Look into Typescript issues

export default function DesignSystem() {


  const renderSwatches = () => ( // Weird 'bug' to do with class purging. Tailwinds removes unused classes at Build. If you build a class dynamically ('bg-' + {swatch}) it doesn't recognize it as a real class and is removed.  Might be a way to get values from tailwinds config directly. Left as is right now.
    ['bg-binkGreen', 
    'bg-primaryGreen',
    'bg-binkGrey',
    'bg-white',
    'bg-toolBg',
    'bg-outlineGrey',
    'bg-invalidRed',
    'bg-envDevFg',
    'bg-envStagingFg',
    'bg-envSandboxFg',
    'bg-envProdFg',
    'bg-envDevBg',
    'bg-envStagingBg',
    'bg-envSandboxBg',
    'bg-envProdBg',
    ].map( swatch => (
      <div key={swatch} className='w-full rounded border-2 border-black m-1 flex-column'>
        <div className={`${swatch} w-full h-24`}></div>
        <Paragraph extraClasses='text-center'>{swatch.split('-')[1]}</Paragraph>
      </div>
    ))
  )

  const sectionClass: string = 'm-10 w-148 bg-outlineGrey/12 shadow-md p-8 flex flex-col gap-8' // An idea for component-only repetition.

  return (
    <div className='m-4'>
        <Headline>Design System</Headline>
        <Paragraph>This is the equivalent to the Typography page for Bink Web. A singular place to look at initial UI Elements and consider how best to manage them for features. </Paragraph>

        <section className={sectionClass}>
          <Subtitle extraClasses='text-center text-2xl'>Colour Palette</Subtitle>
          <div className='w-max grid gap-4 grid-cols-4 auto-rows-auto'> 
            {renderSwatches()}
          </div>
        </section>

        <section className={sectionClass}>
          <div>
            <Subtitle extraClasses='text-center text-2xl'>Typography</Subtitle>
            <Subtitle>Font</Subtitle>
            <Paragraph>Nunito Sans - The quick brown fox jumps over the lazy dog</Paragraph>
          </div>
          <div>
            <Subtitle>Weights</Subtitle>
            <ul className='list-disc'>
              <li className='font-light'>Light - 300</li>
              <li className='font-semibold'>Semibold - 600</li>
              <li className='font-bold'>Bold - 700</li>
              <li className='font-extrabold'>Extrabold - 800 (where is this used in design?)</li>
            </ul>
          </div>
          <div>
            <Subtitle>Font</Subtitle>
            <ul className='list-disc'>
              <li><Headline>Headline element - 33px - Bold</Headline></li>
              <li><Subtitle>Subtitle - 16px - Semibold</Subtitle></li>
              <li><Paragraph>Body text - 16px - Light</Paragraph></li>
              <li><LabelText>Label text - 16px - Regular</LabelText></li>
              <li><Sidebar>Sidebar title - 16px - Semibold</Sidebar></li>
              <li><Hyperlink href='/'>Hyperlink - 16px - Regular</Hyperlink></li>
              <li><a href='bink.com'>Visited Hyperlink (not currently specified)</a></li>
              <li><Error>This is error text - 14pt - Regular</Error></li>
            </ul>
          </div>
        </section>

        <section className={sectionClass}>
        <Subtitle extraClasses='text-center text-2xl'>Buttons</Subtitle>
          <Paragraph>Could be a Button component as per Bink Web with different styles as shown below:</Paragraph>
            <Subtitle>Large</Subtitle>
            <Button large>View In Django</Button>
            <Subtitle>Small</Subtitle>
            <Button small>Load assets</Button>
            <Subtitle>Icon</Subtitle>
            <Button icon>
              <Image src='/images/refresh.png'alt='' height='20' width='27' />
            </Button> 
            <Subtitle>Circular</Subtitle>
            <div className='flex gap-2'>
              <Button circular>
                <Image src='/images/left-chevron.png' alt='back' width='25' height='25'/>
              </Button>
              <Button circular>
                <Image src='/images/left-chevron.png' alt='forward' width='25' height='25' className='rotate-180'/>
              </Button>
            </div>
            <Subtitle>Navigation Menu Item</Subtitle>
            
              <button className='flex justify-start items-center w-60 h-12 bg-primaryGreen/12 text-primaryGreen font-semibold rounded-xl'>
                <span className='px-3 pt-2'><Image src='/images/menu-assets.png'alt='' height='18' width='23' /></span><span>Asset comparator</span>
              </button>
            
            <Subtitle>Environment Selection Buttons</Subtitle>
            <div className='flex gap-2'>
              <Button develop>D</Button> 
              <Button staging>S</Button> 
              <Button sandbox>S</Button> 
              <Button production>D</Button> 
              
            </div>
        </section>

        <section className={sectionClass}>
        <Subtitle extraClasses='text-center text-2xl'>Environment Labels</Subtitle>
          <Paragraph>Not intended to be buttons, not sure if they are reusable so will leave as is for now:</Paragraph>
          <ul className='flex flex-col gap-2'>
            <li><div className='w-52 h-7 bg-envDevBg text-envDevFg leading-7 border border-envDevFg rounded-md text-center font-bold'>DEVELOPMENT</div></li>
            <li><div className='w-52 h-7 bg-envStagingBg text-envStagingFg leading-7 border border-envStagingFg rounded-md text-center font-bold'>STAGING</div></li>
            <li><div className='w-52 h-7 bg-envSandboxBg text-envSandboxFg leading-7 border border-envSandboxFg rounded-md text-center font-bold'>SANDBOX</div></li>
            <li><div className='w-52 h-7 bg-envProdBg text-envProdFg leading-7 border border-envProdFg rounded-md text-center font-bold'>PRODUCTION</div></li>
          </ul>
        </section>
    </div>
  )
}
